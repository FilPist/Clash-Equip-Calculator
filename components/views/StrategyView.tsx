import React from 'react';
import { Coins, Gem, Shield, Star, ShoppingBag, Pickaxe, Zap } from 'lucide-react';
import { Toggle, SegmentedControl } from '../ui/common';
import { ORE_IMAGES, RAID_SHOP } from '../../constants';
import { Translations, StrategyState } from '../../types';

interface StrategyViewProps {
    t: Translations;
    strategy: StrategyState;
    updateStrategy: (k: keyof StrategyState, v: any) => void;
    gemData: any;
}

export const StrategyView: React.FC<StrategyViewProps> = ({ t, strategy, updateStrategy, gemData }) => {
    
    const currentRaidCost = 
        (strategy.raidBuyStarry * RAID_SHOP.starry.cost) +
        (strategy.raidBuyGlowy * RAID_SHOP.glowy.cost) +
        (strategy.raidBuyShiny * RAID_SHOP.shiny.cost);
    
    const remainingMedals = strategy.raidMedals - currentRaidCost;

    return (
        <div className="max-w-4xl mx-auto p-4 md:p-6 mt-4 animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
            
            {/* 1. RAID MEDALS STRATEGY */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 md:p-8 shadow-[var(--shadow-card)]">
                <div className="flex items-center gap-3 mb-6 border-b border-[var(--border-color)] pb-4">
                    <div className="p-3 rounded-xl bg-[var(--ore-starry)]/10 text-[var(--ore-starry)]">
                        <Shield className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-heavy text-[var(--text-main)]">{t.raid_title}</h2>
                        <p className="text-sm text-[var(--text-muted)] font-bold">{t.raid_desc}</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* INPUTS */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-[var(--text-muted)] mb-2">{t.raid_income}</label>
                            <input 
                                type="number" 
                                value={strategy.raidMedals}
                                onChange={(e) => updateStrategy('raidMedals', Math.max(0, parseInt(e.target.value) || 0))}
                                className="w-full bg-[var(--bg-input)] text-[var(--text-main)] p-3 rounded-xl font-bold focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)]"
                            />
                        </div>

                        <div className="bg-[var(--bg-input)] p-4 rounded-xl border border-[var(--border-color)]">
                            <h4 className="text-sm font-heavy text-[var(--text-main)] mb-4 uppercase tracking-wide">Weekly Shop Priority</h4>
                            
                            {/* Starry Slider */}
                            <div className="mb-4">
                                <div className="flex justify-between text-sm font-bold mb-1">
                                    <span className="flex items-center gap-2"><img src={ORE_IMAGES.starry} className="w-4 h-4" /> Starry Ore</span>
                                    <span>{strategy.raidBuyStarry} / 5</span>
                                </div>
                                <input 
                                    type="range" min="0" max="5" step="1"
                                    value={strategy.raidBuyStarry}
                                    onChange={(e) => updateStrategy('raidBuyStarry', parseInt(e.target.value))}
                                />
                            </div>

                             {/* Glowy Slider */}
                             <div className="mb-4">
                                <div className="flex justify-between text-sm font-bold mb-1">
                                    <span className="flex items-center gap-2"><img src={ORE_IMAGES.glowy} className="w-4 h-4" /> Glowy Ore</span>
                                    <span>{strategy.raidBuyGlowy} / 5</span>
                                </div>
                                <input 
                                    type="range" min="0" max="5" step="1"
                                    value={strategy.raidBuyGlowy}
                                    onChange={(e) => updateStrategy('raidBuyGlowy', parseInt(e.target.value))}
                                />
                            </div>

                            {/* Shiny Slider */}
                            <div>
                                <div className="flex justify-between text-sm font-bold mb-1">
                                    <span className="flex items-center gap-2"><img src={ORE_IMAGES.shiny} className="w-4 h-4" /> Shiny Ore</span>
                                    <span>{strategy.raidBuyShiny} / 5</span>
                                </div>
                                <input 
                                    type="range" min="0" max="5" step="1"
                                    value={strategy.raidBuyShiny}
                                    onChange={(e) => updateStrategy('raidBuyShiny', parseInt(e.target.value))}
                                />
                            </div>
                        </div>
                    </div>

                    {/* SUMMARY */}
                    <div className="flex flex-col justify-center">
                        <div className="bg-[var(--bg-nav)] rounded-2xl p-6 border border-[var(--border-color)]">
                            <h3 className="text-xs font-heavy text-[var(--text-muted)] uppercase tracking-widest mb-4">Weekly Summary</h3>
                            
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-bold">{t.raid_budget}</span>
                                <span className="text-sm font-bold text-red-400">-{currentRaidCost}</span>
                            </div>
                            
                            <div className="flex justify-between items-center pt-4 border-t border-[var(--border-color)]">
                                <span className="text-base font-heavy">{t.raid_remaining}</span>
                                <span className={`text-xl font-heavy ${remainingMedals < 0 ? 'text-red-500' : 'text-green-500'}`}>{remainingMedals}</span>
                            </div>
                            {remainingMedals < 0 && <p className="text-xs font-bold text-red-500 mt-2 text-right">{t.raid_over_budget}</p>}
                            
                            <div className="mt-6 pt-6 border-t border-[var(--border-color)]">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-bold flex items-center gap-2">
                                        <Coins className="w-4 h-4 text-yellow-500" /> 
                                        {t.raid_convert}
                                    </span>
                                    <Toggle checked={strategy.raidConvertExcess} onChange={(v) => updateStrategy('raidConvertExcess', v)} id="convert" />
                                </div>
                                <p className="text-xs text-[var(--text-muted)]">{t.raid_convert_desc}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. GEMS & TRADER */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 md:p-8 shadow-[var(--shadow-card)]">
                <div className="flex items-center gap-3 mb-6 border-b border-[var(--border-color)] pb-4">
                    <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500">
                        <Gem className="w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-xl font-heavy text-[var(--text-main)]">{t.gems_title}</h2>
                        <p className="text-sm text-[var(--text-muted)] font-bold">Manage gem income to buy more Ores.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    
                    <div className="space-y-4">
                        {/* Gem Mine */}
                        <div className="flex items-center justify-between bg-[var(--bg-input)] p-3 rounded-xl">
                            <div className="flex items-center gap-3">
                                <Pickaxe className="w-5 h-5 text-[var(--text-muted)]" />
                                <span className="text-sm font-bold">{t.label_gem_mine}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-heavy">Lv.{strategy.gemMineLevel}</span>
                                <input 
                                    type="range" min="1" max="10" 
                                    value={strategy.gemMineLevel} 
                                    onChange={(e) => updateStrategy('gemMineLevel', parseInt(e.target.value))}
                                    className="w-24 !mt-0"
                                />
                            </div>
                        </div>

                        {/* Obstacles */}
                        <div className="flex items-center justify-between bg-[var(--bg-input)] p-3 rounded-xl">
                            <span className="text-sm font-bold">{t.label_obstacles}</span>
                            <Toggle checked={strategy.clearObstacles} onChange={(v) => updateStrategy('clearObstacles', v)} id="obs" />
                        </div>

                         {/* Clan Games */}
                         <div className="flex items-center justify-between bg-[var(--bg-input)] p-3 rounded-xl">
                            <span className="text-sm font-bold">{t.label_clan_games}</span>
                            <Toggle checked={strategy.clanGames} onChange={(v) => updateStrategy('clanGames', v)} id="cg" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-xs font-heavy text-[var(--text-muted)] uppercase tracking-widest mb-2">{t.label_trader}</h4>
                        
                        <div className={`p-4 rounded-xl border-2 transition-colors cursor-pointer flex justify-between items-center ${strategy.traderBuyGlowy ? 'border-purple-500 bg-purple-500/5' : 'border-[var(--bg-input)] bg-[var(--bg-input)]'}`} onClick={() => updateStrategy('traderBuyGlowy', !strategy.traderBuyGlowy)}>
                            <div className="flex items-center gap-3">
                                <img src={ORE_IMAGES.glowy} className="w-8 h-8" />
                                <div>
                                    <div className="font-heavy text-sm">600 Glowy Ore</div>
                                    <div className="text-xs font-bold text-purple-400">275 Gems</div>
                                </div>
                            </div>
                            {strategy.traderBuyGlowy && <div className="w-4 h-4 rounded-full bg-purple-500"></div>}
                        </div>

                        <div className={`p-4 rounded-xl border-2 transition-colors cursor-pointer flex justify-between items-center ${strategy.traderBuyStarry ? 'border-[var(--ore-starry)] bg-[var(--ore-starry)]/5' : 'border-[var(--bg-input)] bg-[var(--bg-input)]'}`} onClick={() => updateStrategy('traderBuyStarry', !strategy.traderBuyStarry)}>
                            <div className="flex items-center gap-3">
                                <img src={ORE_IMAGES.starry} className="w-8 h-8" />
                                <div>
                                    <div className="font-heavy text-sm">10 Starry Ore</div>
                                    <div className="text-xs font-bold text-[var(--ore-starry)]">275 Gems</div>
                                </div>
                            </div>
                            {strategy.traderBuyStarry && <div className="w-4 h-4 rounded-full bg-[var(--ore-starry)]"></div>}
                        </div>
                    </div>

                </div>

                {/* GEM BALANCE */}
                <div className="mt-8 pt-6 border-t border-[var(--border-color)] grid grid-cols-3 gap-4 text-center">
                    <div>
                        <div className="text-[10px] font-heavy text-[var(--text-muted)] uppercase mb-1">{t.gems_income}</div>
                        <div className="text-xl font-heavy text-green-500">+{gemData.totalIncome}</div>
                    </div>
                    <div>
                        <div className="text-[10px] font-heavy text-[var(--text-muted)] uppercase mb-1">{t.gems_expense}</div>
                        <div className="text-xl font-heavy text-red-500">-{gemData.totalExpense}</div>
                    </div>
                    <div>
                        <div className="text-[10px] font-heavy text-[var(--text-muted)] uppercase mb-1">{t.gems_balance}</div>
                        <div className={`text-xl font-heavy ${gemData.balance >= 0 ? 'text-[var(--text-main)]' : 'text-red-500'}`}>
                            {gemData.balance > 0 ? '+' : ''}{gemData.balance}
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. EVENT PASS & SHOP */}
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 md:p-8 shadow-[var(--shadow-card)] space-y-6">
                
                {/* Pass Toggle */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-yellow-500/10 text-yellow-500">
                            <ShoppingBag className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-lg font-heavy text-[var(--text-main)]">{t.label_pass}</h2>
                            <p className="text-sm text-[var(--text-muted)] font-bold">{t.desc_pass}</p>
                        </div>
                    </div>
                    <Toggle checked={strategy.eventPass} onChange={(v) => updateStrategy('eventPass', v)} id="ev_pass" />
                </div>

                {/* Shop Strategy */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-[var(--border-color)]">
                     <div className="flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-[var(--bg-input)] text-[var(--text-main)] shrink-0">
                            <Zap className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-lg font-heavy text-[var(--text-main)]">{t.label_shop}</h2>
                            <p className="text-sm text-[var(--text-muted)] font-bold">Choose how to spend bonus medals.</p>
                        </div>
                    </div>
                    <div className="w-full sm:w-48 shrink-0">
                        <SegmentedControl 
                            options={[
                                { value: 'ores', label: t.opt_shop_ores.split(' ')[0] },
                                { value: 'skin', label: 'Skin/Deco' }
                            ]}
                            value={strategy.eventShopStrat}
                            onChange={(val) => updateStrategy('eventShopStrat', val as any)}
                            className="w-full"
                        />
                    </div>
                </div>
            </div>

        </div>
    );
};