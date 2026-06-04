import { EQUIP_DB, LEAGUES, NEW_EQUIP_COST, COMMON_UPGRADE_COSTS, EPIC_UPGRADE_COSTS, TH_CAPS, RAID_SHOP, WAR_LOOT_BY_TH, GEM_MINE_PRODUCTION, TRADER_SHOP } from "./constants";
import { Cost, EquipmentItem, EquipmentState, HeroType, PriorityItem, Rarity, StrategyState } from "./types";

export const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(0) + 'k';
    return num.toString();
};

export const getMaxAllowedLevel = (thLevel: number, item: EquipmentItem): number => {
    // Check if equipment is unlocked at this TH level
    if (item.unlockTh && thLevel < item.unlockTh) {
        return 0; // Effectively locked
    }
    
    // If TH is below 8, we fallback to TH8 caps (or 0 if not allowed, but simplified to TH8 for calculator)
    const cap = TH_CAPS[thLevel] || TH_CAPS[8];
    return item.type === 'common' ? cap.common : cap.epic;
};

export const getRemainingCost = (type: Rarity, currentLvl: number, targetLvl: number): Cost => {
    // If target level is 0, it means item is Locked by TH -> No cost
    if (targetLvl === 0) return { shiny: 0, glowy: 0, starry: 0 };

    // If current level is 0 (Not Owned), treat as Level 1 for ore cost calculation
    // (Unlock usually costs currency/gems/pass, not ores. Ores start from Lv 1->2)
    const startLvl = Math.max(1, currentLvl);

    if (startLvl >= targetLvl) return { shiny: 0, glowy: 0, starry: 0 };

    // Select the appropriate cost array
    const costsArray = type === 'common' ? COMMON_UPGRADE_COSTS : EPIC_UPGRADE_COSTS;

    // Slice from current level minus 1 (because index 0 is 1->2)
    // To targetLevel minus 1.
    const remainingCosts = costsArray.slice(startLvl - 1, targetLvl - 1);

    // Sum up the remaining costs
    return remainingCosts.reduce((acc, curr) => ({
        shiny: acc.shiny + curr.shiny,
        glowy: acc.glowy + curr.glowy,
        starry: acc.starry + curr.starry
    }), { shiny: 0, glowy: 0, starry: 0 });
};

export const calculateNeeded = (state: EquipmentState, thLevel: number, mode: 'all' | 'unlocked' = 'all'): Cost => {
    let totS = 0, totG = 0, totSt = 0;
    
    (Object.keys(EQUIP_DB) as HeroType[]).forEach(hero => {
        EQUIP_DB[hero].forEach(item => {
            const key = `${hero}_${item.id}`;
            const lvl = state[key] || 1; // Default to 1 if undefined
            
            // If mode is unlocked, skip locked items (lvl 0)
            if (mode === 'unlocked' && lvl === 0) return;

            const targetLvl = getMaxAllowedLevel(thLevel, item);
            const cost = getRemainingCost(item.type, lvl, targetLvl);
            totS += cost.shiny;
            totG += cost.glowy;
            totSt += cost.starry;
        });
    });

    return { shiny: Math.round(totS), glowy: Math.round(totG), starry: Math.round(totSt) };
};

export const calculatePriorityNeeded = (state: EquipmentState, thLevel: number, priorityList: PriorityItem[]): Cost => {
    let totS = 0, totG = 0, totSt = 0;
    
    priorityList.forEach(pItem => {
        const key = pItem.id;
        const [hero, id] = key.split('_') as [HeroType, string];
        const item = EQUIP_DB[hero]?.find(i => i.id === key.replace(hero + '_', ''));
        
        if (item) {
            const lvl = state[key] || 1;
            // The max possible for this item at this TH
            const thCap = getMaxAllowedLevel(thLevel, item);
            
            // The user's target, capped by TH limit
            // If target is 0 or undefined, assume they want to max it (legacy support)
            let userTarget = pItem.target || thCap;
            
            // Ensure we don't calculate beyond TH cap
            const effectiveTarget = Math.min(userTarget, thCap);

            const cost = getRemainingCost(item.type, lvl, effectiveTarget);
            totS += cost.shiny;
            totG += cost.glowy;
            totSt += cost.starry;
        }
    });

    return { shiny: Math.round(totS), glowy: Math.round(totG), starry: Math.round(totSt) };
};

export const calculateGemIncome = (strategy: StrategyState) => {
    // Monthly Gem Income Calculation
    
    // 1. Gem Mine (Daily * 30)
    const mineRate = GEM_MINE_PRODUCTION[strategy.gemMineLevel] || 0;
    const monthlyMine = mineRate * 30;

    // 2. Obstacles (Home + Builder Base)
    // Avg ~2 gems per obstacle, 3 obstacles/day total -> ~6/day
    const monthlyObstacles = strategy.clearObstacles ? 6 * 30 : 0;

    // 3. Clan Games (Variable, avg 100 if maxed)
    const monthlyClanGames = strategy.clanGames ? 100 : 0;

    // 4. Raid Medals Conversion (Sell Magic Items)
    // 3 Training Potions = 300 medals = 30 gems per week
    let monthlyRaidConversion = 0;
    
    // Calculate raid medals leftover after ore purchase
    const weeklyRaidCost = 
        (strategy.raidBuyStarry * RAID_SHOP.starry.cost) +
        (strategy.raidBuyGlowy * RAID_SHOP.glowy.cost) +
        (strategy.raidBuyShiny * RAID_SHOP.shiny.cost);
    
    const excessMedals = Math.max(0, strategy.raidMedals - weeklyRaidCost);
    
    if (strategy.raidConvertExcess) {
        // Can buy max 3 Training Potions (100 each) + 3 Clock Tower (100 each) per week
        // Each sells for 10 gems. Max 60 gems/week from shop cycling.
        // We approximate: 10 gems per 100 medals.
        const potentialGems = Math.floor(excessMedals / 100) * 10;
        const cappedGems = Math.min(60, potentialGems); // Cap at realistic weekly shop limits
        monthlyRaidConversion = cappedGems * 4;
    }

    const totalIncome = Math.round(monthlyMine + monthlyObstacles + monthlyClanGames + monthlyRaidConversion);

    // Expenses (Trader)
    let weeklyExpense = 0;
    if (strategy.traderBuyGlowy) weeklyExpense += TRADER_SHOP.glowy.gems;
    if (strategy.traderBuyStarry) weeklyExpense += TRADER_SHOP.starry.gems;

    const totalExpense = weeklyExpense * 4;
    const balance = totalIncome - totalExpense;

    return {
        totalIncome,
        totalExpense,
        balance,
        breakdown: {
            mine: monthlyMine,
            obstacles: monthlyObstacles,
            games: monthlyClanGames,
            conversion: monthlyRaidConversion
        }
    };
};

export const calculateIncome = (strategy: StrategyState) => {
    const league = LEAGUES.find(l => l.id === strategy.leagueId) || LEAGUES[LEAGUES.length - 1];
    
    // 1. Star Bonus (Daily * 30)
    const monthlyStarBonus = { 
        shiny: league.shiny * 30, 
        glowy: league.glowy * 30, 
        starry: league.starry * 30 
    };

    // 2. War
    // Get base loot per attack for current TH
    const thLoot = WAR_LOOT_BY_TH[strategy.thLevel] || WAR_LOOT_BY_TH[16];
    
    let warsPerMonth = 0;
    if (strategy.warFreq === 'nonstop') warsPerMonth = 15; // 30 / 2 days
    else if (strategy.warFreq === 'casual') warsPerMonth = 8; // 2 * 4 weeks
    else if (strategy.warFreq === 'rare') warsPerMonth = 4; // 1 * 4 weeks

    // Calculate Average Multiplier based on Win Rate
    // Win (100%) = 1.0
    // Loss (0%) = 3/7 ~= 0.428
    // 50% = Average of the two
    const winRateDecimal = strategy.warWinRate / 100;
    const lossMultiplier = 3/7;
    const avgMultiplier = (winRateDecimal * 1.0) + ((1 - winRateDecimal) * lossMultiplier);

    const warLoot = { 
        shiny: thLoot.shiny * 2 * warsPerMonth * avgMultiplier, // 2 attacks per war 
        glowy: thLoot.glowy * 2 * warsPerMonth * avgMultiplier, 
        starry: thLoot.starry * 2 * warsPerMonth * avgMultiplier 
    };

    // 3. CWL
    const cwlIncome = strategy.cwlActive ? { shiny: 5000, glowy: 250, starry: 75 } : { shiny: 0, glowy: 0, starry: 0 };

    // 4. Raid Medals (Weekly * 4)
    // Based on user selection
    const weeklyRaidLoot = {
        shiny: strategy.raidBuyShiny * RAID_SHOP.shiny.amount,
        glowy: strategy.raidBuyGlowy * RAID_SHOP.glowy.amount,
        starry: strategy.raidBuyStarry * RAID_SHOP.starry.amount
    };
    
    const raidLoot = {
        shiny: weeklyRaidLoot.shiny * 4,
        glowy: weeklyRaidLoot.glowy * 4,
        starry: weeklyRaidLoot.starry * 4
    };

    // 5. Events
    let eventS = 5000;
    let eventG = 400;
    let eventSt = 0;
    
    if (strategy.eventPass) {
        eventG += 600;
        eventSt += 80;
    }
    
    if (strategy.eventShopStrat === 'ores') {
        eventS += 2000; eventG += 200; eventSt += 10;
    }

    // 6. Trader (Gem Purchases)
    let traderS = 0; 
    let traderG = 0; 
    let traderSt = 0;

    if (strategy.traderBuyGlowy) traderG += (TRADER_SHOP.glowy.amount * 4);
    if (strategy.traderBuyStarry) traderSt += (TRADER_SHOP.starry.amount * 4);


    const totalIncome = {
        shiny: monthlyStarBonus.shiny + warLoot.shiny + cwlIncome.shiny + eventS + raidLoot.shiny + traderS,
        glowy: monthlyStarBonus.glowy + warLoot.glowy + cwlIncome.glowy + eventG + raidLoot.glowy + traderG,
        starry: monthlyStarBonus.starry + warLoot.starry + cwlIncome.starry + eventSt + raidLoot.starry + traderSt
    };

    const netIncome = {
        shiny: totalIncome.shiny - (strategy.newReleases ? NEW_EQUIP_COST.shiny : 0),
        glowy: totalIncome.glowy - (strategy.newReleases ? NEW_EQUIP_COST.glowy : 0),
        starry: totalIncome.starry - (strategy.newReleases ? NEW_EQUIP_COST.starry : 0)
    };

    const gemData = calculateGemIncome(strategy);

    return {
        monthlyStarBonus,
        warLoot: { shiny: warLoot.shiny + cwlIncome.shiny, glowy: warLoot.glowy + cwlIncome.glowy, starry: warLoot.starry + cwlIncome.starry },
        raidLoot,
        eventLoot: { shiny: eventS, glowy: eventG, starry: eventSt },
        traderLoot: { shiny: traderS, glowy: traderG, starry: traderSt },
        totalIncome,
        netIncome,
        gemData
    };
};

// --- SHARE UTILS ---
export const generateShareUrl = (strategy: StrategyState, equipState: EquipmentState, priorityList: PriorityItem[]): string => {
    try {
        const payload = { s: strategy, e: equipState, p: priorityList };
        const jsonStr = JSON.stringify(payload);
        const encoded = btoa(jsonStr); // Simple Base64 encoding
        const url = new URL(window.location.href);
        url.searchParams.set('config', encoded);
        return url.toString();
    } catch (e) {
        console.error("Failed to generate share URL", e);
        return window.location.href;
    }
};

export const parseShareUrl = (): { strategy?: StrategyState, equipState?: EquipmentState, priorityList?: PriorityItem[] } | null => {
    try {
        const params = new URLSearchParams(window.location.search);
        const config = params.get('config');
        if (!config) return null;
        
        const jsonStr = atob(config);
        const payload = JSON.parse(jsonStr);
        return {
            strategy: payload.s,
            equipState: payload.e,
            priorityList: payload.p
        };
    } catch (e) {
        console.error("Failed to parse share URL", e);
        return null;
    }
};