
export type OreType = 'shiny' | 'glowy' | 'starry';
export type HeroType = 'BK' | 'AQ' | 'GW' | 'RC' | 'MP' | 'DD';
export type Rarity = 'common' | 'epic';
export type Lang = 'it' | 'en';
export type WarFreq = 'nonstop' | 'casual' | 'rare' | 'never';
export type EventShopStrat = 'skin' | 'ores';
export type ResourceViewMode = 'all' | 'unlocked' | 'priority';

export interface EquipmentItem {
    id: string;
    name: string;
    type: Rarity;
    imageUrl?: string;
    unlockTh?: number;
}

export interface PriorityItem {
    id: string;
    target: number;
}

export interface Cost {
    shiny: number;
    glowy: number;
    starry: number;
}

export interface League {
    id: number;
    name: string;
    shiny: number;
    glowy: number;
    starry: number;
}

export interface EquipmentState {
    [key: string]: number;
}

export interface StrategyState {
    // Global
    thLevel: number;
    leagueId: number;
    
    // Raids
    raidMedals: number; // Weekly income
    raidBuyStarry: number; // 0, 1, 2
    raidBuyGlowy: number; // 0, 1, 2
    raidBuyShiny: number; // 0, 1, 2
    raidConvertExcess: boolean; // Convert remaining medals to gems (buy/sell potions)

    // Wars
    warFreq: WarFreq;
    warWinRate: number; // 0, 50, 100
    cwlActive: boolean;

    // Gems
    gemMineLevel: number; // 1-10
    clearObstacles: boolean; // Avg ~6 gems/day
    clanGames: boolean; // ~100 gems/month estimate
    traderBuyGlowy: boolean; // Buy 600 glowy for 275 gems (weekly)
    traderBuyStarry: boolean; // Buy 10 starry for 275 gems (weekly)

    // Events
    eventPass: boolean;
    eventShopStrat: EventShopStrat;
    newReleases: boolean;
}

export interface Translations {
    app_title: string;
    section_strategy: string;
    label_medals: string;
    label_war: string;
    opt_war_nonstop: string;
    opt_war_casual: string;
    opt_war_rare: string;
    opt_war_never: string;
    label_winrate: string;
    opt_win_0: string;
    opt_win_50: string;
    opt_win_100: string;
    label_cwl: string;
    desc_cwl: string;
    label_pass: string;
    desc_pass: string;
    label_shop: string;
    opt_shop_skin: string;
    opt_shop_ores: string;
    section_equip: string;
    btn_edit_equip: string;
    title_equip_manager: string;
    btn_copy: string;
    btn_import: string;
    section_resources: string;
    badge_auto: string;
    result_title: string;
    result_subtitle: string;
    label_new_releases: string;
    table_title: string;
    col_source: string;
    row_bonus: string;
    row_event: string;
    row_cost: string;
    row_net: string;
    msg_deficit: string;
    msg_ok: string;
    months: string;
    month: string;
    days: string;
    day: string;
    less_than_month: string;
    never: string;
    calculating: string;
    title_priority: string;
    desc_priority: string;
    time_to_max: string;
    empty_priority: string;
    // Resource View Modes
    res_view_all: string;
    res_view_unlocked: string;
    res_view_priority: string;
    // Raid Strategy
    raid_title: string;
    raid_desc: string;
    raid_income: string;
    raid_budget: string;
    raid_remaining: string;
    raid_over_budget: string;
    // Gems
    gems_title: string;
    gems_income: string;
    gems_expense: string;
    gems_balance: string;
    label_gem_mine: string;
    label_obstacles: string;
    label_clan_games: string;
    label_trader: string;
    trader_glowy: string;
    trader_starry: string;
    raid_convert: string;
    raid_convert_desc: string;
}