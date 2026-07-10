import React from 'react';
import { Settings, ChevronDown, LayoutList, LockOpen, Star } from 'lucide-react';
import { ORE_IMAGES, LEAGUES } from '../../constants';
import { Toggle, SegmentedControl, ProgressBar } from '../ui/common';
import { formatNumber } from '../../utils';
import { Translations, StrategyState, Cost, ResourceViewMode } from '../../types';

interface DashboardViewProps {
    t: Translations;
    strategy: StrategyState;
    updateStrategy: (k: keyof StrategyState, v: any) => void;
    setView: (v: 'strategy') => void;
    resourceView: ResourceViewMode;
    setResourceView: (v: ResourceViewMode) => void;
    displayNeeded: Cost;
    times: any;
    income: any;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ 
    t, strategy, updateStrategy, setView, resourceView, setResourceView, displayNeeded, times, income 
}) => {
    return (
        <div className="max-w-7xl mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-8 mt-4 animate-in fade-in duration-500">
            
            {/* LEFT COLUMN */}
            <div className="lg:col-span-4 space-y-6 order-2 lg:order-1">
                
                {/* QUICK STRATEGY CARD */}
                <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 shadow-[var(--shadow-card)]">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xs font-heavy uppercase tracking-widest text-[var(--text-muted)]">{t.section_strategy}</h3>
                        <button onClick={() => setView('strategy')} className="text-[var(--accent-primary)] hover:underline text-xs font-bold flex items-center gap-1 transition-colors">
                            <Settings className="w-3 h-3" /> Advanced
                        </button>
                    </div>
                    
                    <div className="space-y-4">
                        {/* WAR FREQ */}
                        <div>
                            <label className="block text-xs font-bold text-[var(--text-muted)] mb-1">{t.label_war}</label>
                            <div className="relative">
                                <select 
                                    value={strategy.warFreq} 
                                    onChange={(e) => updateStrategy('warFreq', e.target.value as any)}
                                    className="w-full appearance-none bg-[var(--bg-input)] text-sm text-[var(--text-main)] font-bold py-2.5 pl-3 pr-8 rounded-xl focus:outline-none cursor-pointer hover:bg-[var(--bg-input-nav)] transition-colors"
                                >
                                    <option value="nonstop">{t.opt_war_nonstop}</option>
                                    <option value="casual">{t.opt_war_casual}</option>
                                    <option value="rare">{t.opt_war_rare}</option>
                                    <option value="never">{t.opt_war_never}</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-3 w-4 h-4 pointer-events-none text-[var(--text-muted)]" />
                            </div>
                        </div>

                        {/* WAR WIN RATE */}
                        <div>
                            <label className="block text-xs font-bold text-[var(--text-muted)] mb-1">{t.label_winrate}</label>
                            <div className="relative">
                                <select 
                                    value={strategy.warWinRate} 
                                    onChange={(e) => updateStrategy('warWinRate', parseInt(e.target.value))}
                                    className="w-full appearance-none bg-[var(--bg-input)] text-sm text-[var(--text-main)] font-bold py-2.5 pl-3 pr-8 rounded-xl focus:outline-none cursor-pointer hover:bg-[var(--bg-input-nav)] transition-colors"
                                >
                                    <option value={100}>{t.opt_win_100}</option>
                                    <option value={50}>{t.opt_win_50}</option>
                                    <option value={0}>{t.opt_win_0}</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-3 w-4 h-4 pointer-events-none text-[var(--text-muted)]" />
                            </div>
                        </div>

                        {/* CWL */}
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-[var(--text-main)]">{t.label_cwl}</span>
                            <Toggle checked={strategy.cwlActive} onChange={(v) => updateStrategy('cwlActive', v)} id="quick_cwl" />
                        </div>

                        {/* PASS */}
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-[var(--text-main)]">{t.label_pass}</span>
                            <Toggle checked={strategy.eventPass} onChange={(v) => updateStrategy('eventPass', v)} id="quick_pass" />
                        </div>
                        
                        {/* MEDALS (Simple Input) */}
                        <div>
                            <label className="block text-xs font-bold text-[var(--text-muted)] mb-1">{t.label_medals}</label>
                                <div className="relative">
                                <input 
                                    type="number"
                                    value={strategy.raidMedals}
                                    onChange={(e) => updateStrategy('raidMedals', Math.max(0, parseInt(e.target.value) || 0))}
                                    className="w-full bg-[var(--bg-input)] text-[var(--text-main)] text-sm font-bold py-2.5 px-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--accent-primary)] transition-all"
                                />
                                </div>
                        </div>
                    </div>
                </div>
                
                {/* RESOURCES SUMMARY CARD */}
                <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 md:p-8 shadow-[var(--shadow-card)]">
                    <div className="flex flex-col gap-4 mb-6">
                        <h3 className="text-xs font-heavy uppercase tracking-widest text-[var(--text-muted)]">{t.section_resources}</h3>
                        
                        {/* Resource View Toggle */}
                        <div className="w-full">
                            <SegmentedControl 
                                options={[
                                    { value: 'all', label: <div className="flex items-center gap-1"><LayoutList className="w-3 h-3" /> {t.res_view_all}</div> },
                                    { value: 'unlocked', label: <div className="flex items-center gap-1"><LockOpen className="w-3 h-3" /> {t.res_view_unlocked}</div> },
                                    { value: 'priority', label: <div className="flex items-center gap-1"><Star className="w-3 h-3" /> {t.res_view_priority}</div> }
                                ]}
                                value={resourceView}
                                onChange={(val) => setResourceView(val as any)}
                                className="w-full"
                            />
                        </div>
                    </div>
                    
                    <div className="space-y-8">
                        {[
                            { label: 'Shiny', val: displayNeeded.shiny, max: 1500000, color: 'var(--ore-shiny)', img: ORE_IMAGES.shiny },
                            { label: 'Glowy', val: displayNeeded.glowy, max: 100000, color: 'var(--ore-glowy)', img: ORE_IMAGES.glowy },
                            { label: 'Starry', val: displayNeeded.starry, max: 5000, color: 'var(--ore-starry)', img: ORE_IMAGES.starry }
                        ].map((r) => (
                            <div key={r.label}>
                                <div className="flex justify-between items-end mb-3">
                                    <span className="font-heavy text-xs uppercase tracking-widest flex items-center gap-1.5" style={{ color: r.color }}>
                                        <img src={r.img} alt={r.label} className="w-4 h-4 object-contain" />
                                        {r.label}
                                    </span>
                                    <span className="text-xl font-heavy text-[var(--text-main)]">{formatNumber(r.val)}</span>
                                </div>
                                <ProgressBar progress={(r.val / r.max) * 100} color={r.color} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="lg:col-span-8 space-y-6 order-1 lg:order-2">
                
                {/* RESULT CARD */}
                <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-5 md:p-10 relative overflow-hidden shadow-[var(--shadow-card)] ring-2 ring-[var(--ore-starry)]/20">
                    <div className="absolute right-0 top-0 w-96 h-96 rounded-full blur-[120px] opacity-10 pointer-events-none bg-[var(--ore-starry)]"></div>
                    <div className="flex flex-col md:flex-row justify-between items-start mb-6 md:mb-12 relative z-10 gap-4">
                        <div>
                            <h2 className="text-3xl md:text-5xl font-heavy text-[var(--text-main)] mb-1.5 tracking-tight">{t.result_title}</h2>
                            <p className="text-[var(--text-muted)] font-bold text-xs md:text-sm">{t.result_subtitle}</p>
                        </div>
                        <div className="flex items-center gap-3 px-4 py-2.5 rounded-2xl border border-red-500/30 bg-red-500/5 backdrop-blur-sm shrink-0">
                            <span className="text-[10px] md:text-xs font-heavy text-red-400 uppercase tracking-widest">{t.label_new_releases}</span>
                            <Toggle checked={strategy.newReleases} onChange={(v) => updateStrategy('newReleases', v)} id="newRel" colorClass="bg-red-500" />
                        </div>
                    </div>

                    {/* MAIN ESTIMATE (STARRY) */}
                    <div className="mb-8 md:mb-16 relative z-10">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-4 gap-2">
                            <span className="text-[var(--ore-starry)] font-heavy text-xs md:text-sm uppercase tracking-widest flex items-center gap-2">
                                <img src={ORE_IMAGES.starry} alt="Starry" className="w-5 h-5 object-contain" />
                                Starry Ore
                            </span>
                            <span className={`font-heavy tracking-tighter leading-none ${times.starry.isError ? 'text-red-500 text-3xl md:text-4xl' : 'text-5xl md:text-7xl text-[var(--text-main)]'}`}>{times.starry.text}</span>
                        </div>
                        <div className="w-full rounded-full h-5 md:h-6 overflow-hidden bg-[var(--bg-input)]">
                            <div 
                                className="h-full rounded-full transition-all duration-1000 shadow-[0_0_20px_rgba(255,213,79,0.3)]" 
                                style={{ width: `${Math.min(100, times.starry.percent)}%`, backgroundColor: times.starry.isError ? 'red' : 'var(--ore-starry)' }}
                            ></div>
                        </div>
                        <p className="mt-4 text-xs md:text-sm font-bold text-[var(--text-muted)]">
                            {times.starry.isError && strategy.newReleases ? <span className="text-red-400">{t.msg_deficit}</span> : t.msg_ok}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 relative z-10">
                        <div>
                            <div className="flex justify-between items-end mb-3">
                                <span className="text-[var(--ore-glowy)] font-heavy text-xs uppercase tracking-widest flex items-center gap-1.5">
                                    <img src={ORE_IMAGES.glowy} alt="Glowy" className="w-4 h-4 object-contain" />
                                    Glowy Ore
                                </span>
                                <span className={`text-3xl font-heavy ${times.glowy.isError ? 'text-red-500' : 'text-[var(--text-main)]'}`}>{times.glowy.text}</span>
                            </div>
                            <ProgressBar progress={times.glowy.percent} color={times.glowy.isError ? 'red' : 'var(--ore-glowy)'} />
                        </div>
                        <div>
                            <div className="flex justify-between items-end mb-3">
                                <span className="text-[var(--ore-shiny)] font-heavy text-xs uppercase tracking-widest flex items-center gap-1.5">
                                    <img src={ORE_IMAGES.shiny} alt="Shiny" className="w-4 h-4 object-contain" />
                                    Shiny Ore
                                </span>
                                <span className={`text-3xl font-heavy ${times.shiny.isError ? 'text-red-500' : 'text-[var(--text-main)]'}`}>{times.shiny.text}</span>
                            </div>
                            <ProgressBar progress={times.shiny.percent} color={times.shiny.isError ? 'red' : 'var(--ore-shiny)'} />
                        </div>
                    </div>
                </div>

                {/* TABLE */}
                <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl overflow-hidden shadow-[var(--shadow-card)]">
                    <div className="px-6 py-5 border-b border-[var(--border-color)] bg-[var(--bg-nav)] flex justify-between items-center">
                        <h3 className="font-heavy text-[var(--text-main)] uppercase tracking-wide text-sm">{t.table_title}</h3>
                        <span className="text-[10px] font-heavy uppercase px-2 py-1 rounded bg-[var(--bg-input)] text-[var(--ore-starry)]">
                            {LEAGUES.find(l => l.id === strategy.leagueId)?.name}
                        </span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm text-[var(--text-muted)]">
                            <thead className="text-xs uppercase tracking-widest font-heavy bg-[var(--bg-input)]">
                                <tr>
                                    <th className="px-3 py-3 md:px-6 md:py-4">{t.col_source}</th>
                                    <th className="px-3 py-3 md:px-6 md:py-4 text-[var(--ore-shiny)]">Shiny</th>
                                    <th className="px-3 py-3 md:px-6 md:py-4 text-[var(--ore-glowy)]">Glowy</th>
                                    <th className="px-3 py-3 md:px-6 md:py-4 text-[var(--ore-starry)]">Starry</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[var(--border-color)] font-bold text-xs md:text-sm">
                                <tr>
                                    <td className="px-3 py-3 md:px-6 md:py-4">{t.row_bonus}</td>
                                    <td className="px-3 py-3 md:px-6 md:py-4">{Math.round(income.monthlyStarBonus.shiny).toLocaleString()}</td>
                                    <td className="px-3 py-3 md:px-6 md:py-4">{Math.round(income.monthlyStarBonus.glowy).toLocaleString()}</td>
                                    <td className="px-3 py-3 md:px-6 md:py-4">{Math.round(income.monthlyStarBonus.starry).toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-3 md:px-6 md:py-4">Clan War + CWL</td>
                                    <td className="px-3 py-3 md:px-6 md:py-4">{Math.round(income.warLoot.shiny).toLocaleString()}</td>
                                    <td className="px-3 py-3 md:px-6 md:py-4">{Math.round(income.warLoot.glowy).toLocaleString()}</td>
                                    <td className="px-3 py-3 md:px-6 md:py-4">{Math.round(income.warLoot.starry).toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-3 md:px-6 md:py-4">Raid Medals</td>
                                    <td className="px-3 py-3 md:px-6 md:py-4 text-[var(--ore-shiny)]">{income.raidLoot.shiny.toLocaleString()}</td>
                                    <td className="px-3 py-3 md:px-6 md:py-4 text-[var(--ore-glowy)]">{income.raidLoot.glowy.toLocaleString()}</td>
                                    <td className="px-3 py-3 md:px-6 md:py-4 text-[var(--ore-starry)]">{income.raidLoot.starry.toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td className="px-3 py-3 md:px-6 md:py-4 text-purple-400">Trader</td>
                                    <td className="px-3 py-3 md:px-6 md:py-4 text-purple-400">{income.traderLoot.shiny > 0 ? income.traderLoot.shiny.toLocaleString() : '-'}</td>
                                    <td className="px-3 py-3 md:px-6 md:py-4 text-purple-400">{income.traderLoot.glowy > 0 ? income.traderLoot.glowy.toLocaleString() : '-'}</td>
                                    <td className="px-3 py-3 md:px-6 md:py-4 text-purple-400">{income.traderLoot.starry > 0 ? income.traderLoot.starry.toLocaleString() : '-'}</td>
                                </tr>
                                <tr className="bg-blue-500/5">
                                    <td className="px-3 py-3 md:px-6 md:py-4 flex flex-col">
                                        <span>{t.row_event}</span>
                                        <span className="text-[9px] font-normal opacity-70">{strategy.eventPass ? "Pass Gold + " : "F2P + "}{t.label_shop.split(' ')[0]}</span>
                                    </td>
                                    <td className="px-3 py-3 md:px-6 md:py-4 text-[var(--ore-shiny)]">{income.eventLoot.shiny.toLocaleString()}</td>
                                    <td className="px-3 py-3 md:px-6 md:py-4 text-[var(--ore-glowy)]">{income.eventLoot.glowy.toLocaleString()}</td>
                                    <td className="px-3 py-3 md:px-6 md:py-4 text-[var(--ore-starry)]">{income.eventLoot.starry.toLocaleString()}</td>
                                </tr>
                                {strategy.newReleases && (
                                    <tr className="bg-red-500/10 text-red-400">
                                        <td className="px-3 py-3 md:px-6 md:py-4">{t.row_cost}</td>
                                        <td className="px-3 py-3 md:px-6 md:py-4">-28,000</td>
                                        <td className="px-3 py-3 md:px-6 md:py-4">-1,860</td>
                                        <td className="px-3 py-3 md:px-6 md:py-4">-240</td>
                                    </tr>
                                )}
                                <tr className="bg-[var(--bg-input)] text-[var(--text-main)] text-sm md:text-base">
                                    <td className="px-3 py-4 md:px-6 md:py-5 font-heavy">{t.row_net}</td>
                                    <td className="px-3 py-4 md:px-6 md:py-5 font-heavy">{Math.round(income.netIncome.shiny).toLocaleString()}</td>
                                    <td className="px-3 py-4 md:px-6 md:py-5 font-heavy">{Math.round(income.netIncome.glowy).toLocaleString()}</td>
                                    <td className="px-3 py-4 md:px-6 md:py-5 font-heavy">{Math.round(income.netIncome.starry).toLocaleString()}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};