import { useState, useEffect, useMemo, useRef } from 'react';
import { EQUIP_DB, I18N, MIN_LEAGUE_MAP } from './constants';
import { EquipmentState, HeroType, StrategyState, Lang, ResourceViewMode, PriorityItem } from './types';
import { calculateIncome, calculateNeeded, calculatePriorityNeeded, parseShareUrl, getMaxAllowedLevel } from './utils';

const STORAGE_KEY = 'clash_equip_calc_v1';

export const useClashCalculator = () => {
    // --- STATE INITIALIZATION LOGIC ---
    // 1. Check URL Params (Share Link)
    // 2. Check Local Storage
    // 3. Default
    
    const sharedConfig = useMemo(() => parseShareUrl(), []);
    const savedConfig = useMemo(() => {
        try {
            const item = localStorage.getItem(STORAGE_KEY);
            return item ? JSON.parse(item) : null;
        } catch(e) { return null; }
    }, []);

    const [lang, setLang] = useState<Lang>(savedConfig?.lang || 'it');
    const [theme, setTheme] = useState<'dark' | 'light'>(savedConfig?.theme || 'light');
    const [view, setView] = useState<'dashboard' | 'equipment' | 'strategy'>('dashboard');
    const [resourceView, setResourceView] = useState<ResourceViewMode>('all');
    const [activeTab, setActiveTab] = useState<HeroType>('BK');
    
    // Onboarding State: True if no saved config and no shared config
    const [showOnboarding, setShowOnboarding] = useState<boolean>(!savedConfig && !sharedConfig);

    // Equipment State
    const getInitialEquipState = () => {
        if (sharedConfig?.equipState) return sharedConfig.equipState;
        if (savedConfig?.equipState) return savedConfig.equipState;
        
        const s: EquipmentState = {};
        Object.keys(EQUIP_DB).forEach(h => EQUIP_DB[h as HeroType].forEach(i => s[`${h}_${i.id}`] = 1));
        return s;
    };
    const [equipState, setEquipState] = useState<EquipmentState>(getInitialEquipState());
    
    // Strategy State
    const defaultStrategy: StrategyState = {
        raidMedals: 1400,
        raidBuyStarry: 1, 
        raidBuyGlowy: 2,  
        raidBuyShiny: 0,
        raidConvertExcess: false,
        warFreq: 'nonstop',
        warWinRate: 50,
        cwlActive: true,
        gemMineLevel: 9,
        clearObstacles: true,
        clanGames: true,
        traderBuyGlowy: false,
        traderBuyStarry: false,
        eventPass: false,
        eventShopStrat: 'ores',
        newReleases: true,
        thLevel: 16,
        leagueId: 28 
    };

    const [strategy, setStrategy] = useState<StrategyState>(sharedConfig?.strategy || savedConfig?.strategy || defaultStrategy);

    // Priority State
    // Migration helper: Convert old string[] to PriorityItem[]
    const getInitialPriorityList = (): PriorityItem[] => {
        const raw = sharedConfig?.priorityList || savedConfig?.priorityList || [];
        if (!Array.isArray(raw)) return [];
        if (raw.length === 0) return [];
        
        // If it's already an object array
        if (typeof raw[0] === 'object') return raw as PriorityItem[];

        // If it's a string array (Migration)
        return (raw as string[]).map(id => {
            const hero = id.split('_')[0] as HeroType;
            const item = EQUIP_DB[hero]?.find(i => i.id === id.replace(`${hero}_`, ''));
            const max = item ? getMaxAllowedLevel(strategy.thLevel, item) : 18;
            return { id, target: max };
        });
    };

    const [priorityList, setPriorityList] = useState<PriorityItem[]>(getInitialPriorityList());

    // --- PERSISTENCE EFFECT ---
    const isFirstRun = useRef(true);
    useEffect(() => {
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
        const stateToSave = {
            lang,
            theme,
            equipState,
            priorityList,
            strategy
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    }, [lang, theme, equipState, priorityList, strategy]);

    // --- THEME EFFECT ---
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    // --- COMPUTED LOGIC ---
    const t = I18N[lang];
    
    // Separate calculations for different modes to allow quick switching
    const neededAll = useMemo(() => calculateNeeded(equipState, strategy.thLevel, 'all'), [equipState, strategy.thLevel]);
    const neededUnlocked = useMemo(() => calculateNeeded(equipState, strategy.thLevel, 'unlocked'), [equipState, strategy.thLevel]);
    const priorityNeeded = useMemo(() => calculatePriorityNeeded(equipState, strategy.thLevel, priorityList), [equipState, strategy.thLevel, priorityList]);
    
    const income = useMemo(() => calculateIncome(strategy), [strategy]);

    // Determine what to show based on resourceView
    const displayNeeded = useMemo(() => {
        switch (resourceView) {
            case 'priority': return priorityNeeded;
            case 'unlocked': return neededUnlocked;
            default: return neededAll;
        }
    }, [resourceView, neededAll, neededUnlocked, priorityNeeded]);

    // Used for the big time estimates (defaults to what is selected)
    const neededForTime = displayNeeded;

    // --- HELPERS ---
    const getTime = (need: number, inc: number) => {
        if (inc <= 0) return { text: t.never, percent: 100, isError: true };
        const months = need / inc;
        
        if (months < 1) {
            const days = Math.ceil(months * 30);
            const text = `${days} ${days === 1 ? t.day : t.days}`;
            return { text, percent: (months / 36) * 100, isError: false };
        }
        
        const y = Math.floor(months / 12);
        const m = Math.round(months % 12);
        const text = y > 0 ? `${y}${lang === 'en' ? 'y' : 'a'} ${m}${t.month.charAt(0)}` : `${m} ${t.months}`;
        return { text, percent: (months / 36) * 100, isError: false };
    };

    const times = {
        shiny: getTime(neededForTime.shiny, income.netIncome.shiny),
        glowy: getTime(neededForTime.glowy, income.netIncome.glowy),
        starry: getTime(neededForTime.starry, income.netIncome.starry),
    };

    const priorityTimes = {
        shiny: getTime(priorityNeeded.shiny, income.netIncome.shiny),
        glowy: getTime(priorityNeeded.glowy, income.netIncome.glowy),
        starry: getTime(priorityNeeded.starry, income.netIncome.starry),
    };

    // --- ACTIONS ---
    const updateStrategy = <K extends keyof StrategyState>(key: K, value: StrategyState[K]) => {
        setStrategy(prev => ({ ...prev, [key]: value }));
    };

    const setThLevel = (level: number) => {
        setStrategy(s => ({ 
            ...s, 
            thLevel: level, 
            leagueId: MIN_LEAGUE_MAP[level] || s.leagueId 
        }));
    };

    const togglePriority = (key: string) => {
        setPriorityList(prev => {
            const exists = prev.find(p => p.id === key);
            if (exists) return prev.filter(p => p.id !== key);
            
            // Set default target to max for current TH
            const hero = key.split('_')[0] as HeroType;
            const item = EQUIP_DB[hero]?.find(i => i.id === key.replace(`${hero}_`, ''));
            const max = item ? getMaxAllowedLevel(strategy.thLevel, item) : 18;
            
            return [...prev, { id: key, target: max }];
        });
    };

    const updatePriorityTarget = (key: string, newTarget: number) => {
        setPriorityList(prev => prev.map(p => p.id === key ? { ...p, target: newTarget } : p));
    };

    const movePriority = (index: number, direction: 'up' | 'down') => {
        setPriorityList(prev => {
            const newList = [...prev];
            if (direction === 'up' && index > 0) {
                [newList[index], newList[index - 1]] = [newList[index - 1], newList[index]];
            } else if (direction === 'down' && index < newList.length - 1) {
                [newList[index], newList[index + 1]] = [newList[index + 1], newList[index]];
            }
            return newList;
        });
    };

    const copyConfig = () => {
        const payload = { equip: equipState, priority: priorityList };
        navigator.clipboard.writeText(JSON.stringify(payload)).then(() => alert('Copied!'));
    };

    const pasteConfig = () => {
        const str = prompt('Paste config:');
        if(str) {
            try {
                const parsed = JSON.parse(str);
                if (parsed.equip) {
                    setEquipState({...equipState, ...parsed.equip});
                    if (parsed.priority) setPriorityList(parsed.priority);
                } else {
                    setEquipState({...equipState, ...parsed});
                }
            } catch(e) { alert('Invalid data'); }
        }
    };

    const completeOnboarding = (th: number, league: number) => {
        setThLevel(th);
        updateStrategy('leagueId', league);
        setShowOnboarding(false);
    };

    return {
        state: { lang, theme, view, resourceView, activeTab, equipState, priorityList, strategy, showOnboarding },
        computed: { t, income, displayNeeded, times, priorityTimes },
        actions: { 
            setLang, setTheme, setView, setResourceView, setActiveTab, setEquipState, setPriorityList,
            updateStrategy, setThLevel, togglePriority, movePriority, copyConfig, pasteConfig, completeOnboarding, setShowOnboarding, updatePriorityTarget
        }
    };
};