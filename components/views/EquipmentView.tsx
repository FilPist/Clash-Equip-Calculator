import React from 'react';
import { Star, ArrowUp, ArrowDown, Trash2, Image as ImageIcon, Upload, Download } from 'lucide-react';
import { EQUIP_DB, HERO_META, ORE_IMAGES } from '../../constants';
import { EquipCard } from '../ui/common';
import { HeroBanner } from '../hero/HeroBanner';
import { Translations, HeroType, EquipmentState, EquipmentItem, StrategyState, PriorityItem } from '../../types';
import { getMaxAllowedLevel, getRemainingCost, formatNumber } from '../../utils';

interface EquipmentViewProps {
    t: Translations;
    activeTab: HeroType;
    setActiveTab: (v: HeroType) => void;
    equipState: EquipmentState;
    setEquipState: React.Dispatch<React.SetStateAction<EquipmentState>>;
    priorityList: PriorityItem[];
    togglePriority: (k: string) => void;
    movePriority: (index: number, dir: 'up' | 'down') => void;
    strategy: StrategyState;
    priorityTimes: any; 
    copyConfig: () => void;
    pasteConfig: () => void;
    updatePriorityTarget?: (key: string, target: number) => void; // Added prop
}

// Add this prop to component definition inside the file if not already imported by generic props
export const EquipmentView: React.FC<EquipmentViewProps & { updatePriorityTarget: (k: string, v: number) => void }> = ({
    t, activeTab, setActiveTab, equipState, setEquipState, priorityList,
    togglePriority, movePriority, strategy, priorityTimes, copyConfig, pasteConfig, updatePriorityTarget
}) => {
    
    const getEquipName = (key: string) => {
        const hero = key.split('_')[0] as HeroType;
        const id = key.substring(hero.length + 1);
        return EQUIP_DB[hero]?.find(i => i.id === id)?.name || key;
    };

    const handleLevelChange = (key: string, newLevel: number) => {
        setEquipState(prev => ({...prev, [key]: newLevel}));
    };

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-6 mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
            
            {/* PRIORITY QUEUE SECTION */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 md:p-8 shadow-[var(--shadow-card)]">
                <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
                    <div>
                        <h2 className="text-xl font-heavy text-[var(--text-main)] flex items-center gap-2">
                            <Star className="w-5 h-5 fill-[var(--ore-starry)] text-[var(--ore-starry)]" />
                            {t.title_priority}
                        </h2>
                        <p className="text-sm text-[var(--text-muted)] font-bold">{t.desc_priority}</p>
                    </div>
                    
                    {/* PRIORITY TIME ESTIMATE */}
                    {priorityList.length > 0 && (
                        <div className="bg-[var(--bg-input)] rounded-xl px-4 py-3 flex items-center gap-4 border border-[var(--border-color)]">
                            <div className="text-right">
                                <div className="text-[10px] font-heavy text-[var(--text-muted)] uppercase tracking-wide">Time to Target</div>
                                <div className="text-lg font-heavy text-[var(--ore-starry)] leading-none">{priorityTimes.starry.text}</div>
                            </div>
                        </div>
                    )}
                </div>

                {priorityList.length === 0 ? (
                    <div className="text-center py-8 border-2 border-dashed border-[var(--border-color)] rounded-xl text-[var(--text-muted)] font-bold">
                        {t.empty_priority}
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {priorityList.map((pItem, index) => {
                            const key = pItem.id;
                            const hero = key.split('_')[0] as HeroType;
                            const realId = key.substring(hero.length + 1);
                            const itemDef = EQUIP_DB[hero]?.find(i => i.id === realId);
                            const currentLvl = equipState[key] || 1;
                            
                            // Use TH specific caps
                            const thCap = itemDef ? getMaxAllowedLevel(strategy.thLevel, itemDef) : 18;
                            
                            // Target Logic
                            const targetLvl = pItem.target || thCap;
                            
                            // Calculate Remaining Cost for this specific item relative to Target
                            // Ensure target doesn't exceed cap for calculation visual
                            const effectiveTarget = Math.min(targetLvl, thCap);
                            const remaining = itemDef ? getRemainingCost(itemDef.type, currentLvl, effectiveTarget) : { shiny: 0, glowy: 0, starry: 0 };
                            
                            const isMaxed = currentLvl >= effectiveTarget;

                            return (
                                <div key={key} className="relative group bg-[var(--bg-input)] rounded-xl p-2 md:p-3 border border-[var(--border-color)] flex flex-wrap md:flex-nowrap items-center gap-4 transition-all hover:bg-[var(--bg-app)]">
                                    
                                    {/* Index & Drag Handle Visual */}
                                    <div className="pl-2 font-heavy text-[var(--text-muted)] opacity-50 text-sm w-6">#{index + 1}</div>

                                    {/* Icon */}
                                    <div className={`w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-xl flex items-center justify-center relative overflow-hidden border-2 ${itemDef?.type === 'epic' ? 'bg-[#d48ae0]/10 border-[#d48ae0]/30' : 'bg-[#4fc3f7]/10 border-[#4fc3f7]/30'}`}>
                                        {itemDef?.imageUrl ? (
                                                <img src={itemDef.imageUrl} alt={itemDef.name} className="w-full h-full object-contain p-1" />
                                        ) : (
                                            <ImageIcon className="w-5 h-5 text-[var(--text-muted)] opacity-50" />
                                        )}
                                    </div>

                                    {/* Details */}
                                    <div className="grow min-w-[120px]">
                                        <div className="font-bold text-sm md:text-base leading-tight truncate text-[var(--text-main)] mb-1">{itemDef?.name || getEquipName(key)}</div>
                                        
                                        {/* Cost Remaining Display */}
                                        <div className="flex items-center gap-3 text-xs">
                                             {!isMaxed && (remaining.shiny > 0 || remaining.glowy > 0 || remaining.starry > 0) ? (
                                                <div className="flex items-center gap-2 bg-[var(--bg-card)] px-2 py-1 rounded-md border border-[var(--border-color)]">
                                                    {remaining.shiny > 0 && <span className="text-[var(--ore-shiny)] flex items-center gap-1 font-bold"><img src={ORE_IMAGES.shiny} className="w-3 h-3" />{formatNumber(remaining.shiny)}</span>}
                                                    {remaining.glowy > 0 && <span className="text-[var(--ore-glowy)] flex items-center gap-1 font-bold"><img src={ORE_IMAGES.glowy} className="w-3 h-3" />{formatNumber(remaining.glowy)}</span>}
                                                    {remaining.starry > 0 && <span className="text-[var(--ore-starry)] flex items-center gap-1 font-bold"><img src={ORE_IMAGES.starry} className="w-3 h-3" />{remaining.starry}</span>}
                                                </div>
                                             ) : (
                                                <div className="text-[var(--text-muted)] font-bold text-[10px] uppercase tracking-wider bg-[var(--bg-card)] px-2 py-1 rounded-md">Done</div>
                                             )}
                                        </div>
                                    </div>

                                    {/* CONTROLS CONTAINER */}
                                    <div className="flex flex-col sm:flex-row gap-2 mr-2">
                                        
                                        {/* Level Edit Controls (Current) */}
                                        <div className="flex flex-col items-center">
                                            <span className="text-[9px] font-bold text-[var(--text-muted)] uppercase mb-0.5">Current</span>
                                            <div className="flex items-center gap-1 bg-[var(--bg-card)] rounded-lg p-1 border border-[var(--border-color)]">
                                                <button 
                                                    onClick={() => handleLevelChange(key, Math.max(0, currentLvl - 1))}
                                                    disabled={currentLvl <= 0}
                                                    className="w-6 h-6 flex items-center justify-center rounded hover:bg-[var(--accent-primary)] hover:text-white transition-colors disabled:opacity-30 font-bold text-sm"
                                                >-</button>
                                                <div className="w-6 text-center font-heavy text-sm">{currentLvl}</div>
                                                <button 
                                                    onClick={() => handleLevelChange(key, Math.min(thCap, currentLvl + 1))}
                                                    disabled={currentLvl >= thCap}
                                                    className="w-6 h-6 flex items-center justify-center rounded hover:bg-[var(--accent-primary)] hover:text-white transition-colors disabled:opacity-30 font-bold text-sm"
                                                >+</button>
                                                <button 
                                                    onClick={() => handleLevelChange(key, thCap)}
                                                    disabled={currentLvl >= thCap}
                                                    className="text-[9px] font-heavy bg-[var(--accent-primary)] text-white px-1 h-6 rounded hover:bg-blue-600 disabled:opacity-30 disabled:bg-[var(--bg-card)] disabled:text-[var(--text-muted)] transition-colors ml-0.5"
                                                    title="Set to Max"
                                                >
                                                    M
                                                </button>
                                            </div>
                                        </div>

                                        {/* Target Level Controls */}
                                        <div className="flex flex-col items-center">
                                            <span className="text-[9px] font-bold text-[var(--ore-starry)] uppercase mb-0.5">Target</span>
                                            <div className="flex items-center gap-1 bg-[var(--bg-card)] rounded-lg p-1 border border-[var(--ore-starry)]/30">
                                                <button 
                                                    onClick={() => updatePriorityTarget(key, Math.max(currentLvl, targetLvl - 1))}
                                                    disabled={targetLvl <= currentLvl}
                                                    className="w-6 h-6 flex items-center justify-center rounded hover:bg-[var(--ore-starry)] hover:text-black transition-colors disabled:opacity-30 font-bold text-sm"
                                                >-</button>
                                                <div className="w-6 text-center font-heavy text-sm text-[var(--ore-starry)]">{targetLvl}</div>
                                                <button 
                                                    onClick={() => updatePriorityTarget(key, Math.min(thCap, targetLvl + 1))}
                                                    disabled={targetLvl >= thCap}
                                                    className="w-6 h-6 flex items-center justify-center rounded hover:bg-[var(--ore-starry)] hover:text-black transition-colors disabled:opacity-30 font-bold text-sm"
                                                >+</button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Actions Group */}
                                    <div className="flex items-center gap-1 md:gap-2 ml-auto md:ml-0">
                                        <div className="flex flex-col gap-1">
                                            <button 
                                                onClick={() => movePriority(index, 'up')} 
                                                disabled={index === 0}
                                                className="p-1 rounded bg-[var(--bg-card)] hover:bg-[var(--accent-primary)] hover:text-white disabled:opacity-20 transition-colors"
                                            >
                                                <ArrowUp className="w-3 h-3" />
                                            </button>
                                            <button 
                                                onClick={() => movePriority(index, 'down')} 
                                                disabled={index === priorityList.length - 1}
                                                className="p-1 rounded bg-[var(--bg-card)] hover:bg-[var(--accent-primary)] hover:text-white disabled:opacity-20 transition-colors"
                                            >
                                                <ArrowDown className="w-3 h-3" />
                                            </button>
                                        </div>

                                        <button 
                                            onClick={() => togglePriority(key)} 
                                            className="p-2 ml-2 text-[var(--text-muted)] hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                                            title="Remove"
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 md:p-8 shadow-[var(--shadow-card)]">
                {/* TABS */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2 border-b border-[var(--border-color)] no-scrollbar">
                    {(Object.keys(EQUIP_DB) as HeroType[]).map(hero => (
                        <button
                            key={hero}
                            onClick={() => setActiveTab(hero)}
                            className={`px-6 py-3 rounded-t-xl font-heavy text-sm uppercase tracking-wider transition-colors shrink-0 ${activeTab === hero ? 'bg-[var(--accent-primary)] text-white' : 'bg-[var(--bg-input)] text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}
                        >
                            {hero === 'GW' ? 'Warden' : hero === 'RC' ? 'Royal Champ' : hero === 'BK' ? 'King' : hero === 'AQ' ? 'Queen' : hero === 'MP' ? 'Minion Prince' : 'Dragon Duke'}
                        </button>
                    ))}
                </div>

                {/* HERO HEADER IMAGE BANNER */}
                <HeroBanner activeTab={activeTab} />

                {/* GRID */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                    {EQUIP_DB[activeTab]?.map(item => {
                        const key = `${activeTab}_${item.id}`;
                        const lvl = typeof equipState[key] !== 'undefined' ? equipState[key] : 1;
                        return (
                            <EquipCard 
                                key={item.id} 
                                item={item} 
                                level={lvl}
                                thLevel={strategy.thLevel}
                                onChange={(val) => setEquipState(prev => ({...prev, [key]: val}))}
                                isPriority={priorityList.some(p => p.id === key)}
                                onTogglePriority={() => togglePriority(key)}
                            />
                        );
                    })}
                </div>

                {/* ACTIONS */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-[var(--border-color)]">
                    <button onClick={copyConfig} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase transition-colors">
                        <Upload className="w-5 h-5" />
                        <span>{t.btn_copy}</span>
                    </button>
                    <button onClick={pasteConfig} className="flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--bg-input)] hover:bg-[var(--border-color)] text-[var(--text-muted)] hover:text-white font-bold uppercase transition-colors">
                        <Download className="w-5 h-5" />
                        <span>{t.btn_import}</span>
                    </button>
                </div>
            </div>
        </div>
    );
};