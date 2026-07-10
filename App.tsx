import React, { useState, useEffect } from 'react';
import { EQUIP_DB, LEAGUES, MIN_LEAGUE_MAP, RAID_SHOP, HERO_META } from './constants';
import { HeroType } from './types';
import { generateShareUrl } from './utils';
import { useClashCalculator } from './app-hooks';
import { Modal } from './components/ui/common';
import { Navbar } from './components/layout/Navbar';
import { DashboardView } from './components/views/DashboardView';
import { EquipmentView } from './components/views/EquipmentView';
import { StrategyView } from './components/views/StrategyView';

function App() {
    const { state, computed, actions } = useClashCalculator();
    const { lang, theme, view, resourceView, activeTab, equipState, priorityList, strategy, showOnboarding } = state;
    const { t, income, displayNeeded, times, priorityTimes } = computed;
    const { gemData } = income;

    const [onboardingTh, setOnboardingTh] = useState(16);
    // Filter leagues for Onboarding (based on selected onboarding TH)
    const onboardingMinLeague = MIN_LEAGUE_MAP[onboardingTh] || 1;
    const onboardingLeagues = LEAGUES.filter(l => l.id >= onboardingMinLeague);
    const [onboardingLeague, setOnboardingLeague] = useState(28); // Default Legend

    // Filter leagues based on TH level for main app
    const minLeagueId = MIN_LEAGUE_MAP[strategy.thLevel] || 1;
    const availableLeagues = LEAGUES.filter(l => l.id >= minLeagueId);

    // SAFETY CHECK: Ensure activeTab exists in DB
    useEffect(() => {
        if (!EQUIP_DB[activeTab]) {
            actions.setActiveTab('BK');
        }
    }, [activeTab, actions]);

    return (
        <div className="min-h-screen pb-safe transition-colors duration-300 font-sans text-[var(--text-main)]">
            
            {/* ONBOARDING MODAL */}
            <Modal isOpen={showOnboarding} title="Welcome Chief!">
                <div className="space-y-6">
                    <div className="text-center">
                        <img src="https://m.media-amazon.com/images/I/81Z+V7GJIEL.png" alt="Clash" className="w-20 h-20 mx-auto rounded-2xl shadow-lg mb-4" />
                        <p className="text-[var(--text-muted)] font-bold">Let's set up your profile to calculate your ore income accurately.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-heavy text-[var(--text-main)] mb-2">Town Hall Level</label>
                        <select 
                            value={onboardingTh} 
                            onChange={(e) => {
                                const newTh = parseInt(e.target.value);
                                setOnboardingTh(newTh);
                                // Reset league if it's below min for new TH
                                const min = MIN_LEAGUE_MAP[newTh] || 1;
                                if (onboardingLeague < min) setOnboardingLeague(min);
                            }}
                            className="w-full bg-[var(--bg-input)] p-3 rounded-xl font-bold focus:outline-none border-2 border-transparent focus:border-[var(--accent-primary)]"
                        >
                             {[18,17,16,15,14,13,12,11,10,9,8,7].map(th => <option key={th} value={th}>Town Hall {th}</option>)}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-heavy text-[var(--text-main)] mb-2">Current League</label>
                        <select 
                            value={onboardingLeague} 
                            onChange={(e) => setOnboardingLeague(parseInt(e.target.value))}
                            className="w-full bg-[var(--bg-input)] p-3 rounded-xl font-bold focus:outline-none border-2 border-transparent focus:border-[var(--accent-primary)]"
                        >
                            {onboardingLeagues.slice().reverse().map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                        </select>
                    </div>

                    <button 
                        onClick={() => actions.completeOnboarding(onboardingTh, onboardingLeague)}
                        className="w-full py-4 bg-[var(--accent-primary)] text-white font-heavy rounded-xl text-lg hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-blue-500/20"
                    >
                        Start Planning
                    </button>
                </div>
            </Modal>

            {/* NAVBAR */}
            <Navbar 
                t={t}
                view={view}
                setView={actions.setView}
                thLevel={strategy.thLevel}
                setThLevel={actions.setThLevel}
                leagueId={strategy.leagueId}
                setLeagueId={(id) => actions.updateStrategy('leagueId', id)}
                availableLeagues={availableLeagues}
                theme={theme}
                setTheme={actions.setTheme}
                lang={lang}
                setLang={actions.setLang}
            />

            {/* VIEWS */}
            {view === 'dashboard' && (
                <DashboardView 
                    t={t}
                    strategy={strategy}
                    updateStrategy={actions.updateStrategy}
                    setView={actions.setView}
                    resourceView={resourceView}
                    setResourceView={actions.setResourceView}
                    displayNeeded={displayNeeded}
                    times={times}
                    income={income}
                />
            )}

            {view === 'equipment' && (
                <EquipmentView 
                    t={t}
                    lang={lang}
                    activeTab={activeTab}
                    setActiveTab={actions.setActiveTab}
                    equipState={equipState}
                    setEquipState={actions.setEquipState}
                    priorityList={priorityList}
                    togglePriority={actions.togglePriority}
                    movePriority={actions.movePriority}
                    strategy={strategy}
                    priorityTimes={priorityTimes}
                    copyConfig={actions.copyConfig}
                    pasteConfig={actions.pasteConfig}
                    updatePriorityTarget={actions.updatePriorityTarget}
                />
            )}

            {view === 'strategy' && (
                <StrategyView 
                    t={t}
                    strategy={strategy}
                    updateStrategy={actions.updateStrategy}
                    gemData={gemData}
                />
            )}

            {/* FOOTER */}
            <footer className="w-full mt-12 py-8 px-6 border-t border-[var(--border-color)] bg-[var(--bg-nav)] text-center text-xs text-[var(--text-muted)] animate-in fade-in duration-500">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="font-bold flex items-center gap-1.5 justify-center">
                        <span>🛡️</span>
                        {lang === 'it' 
                            ? 'Realizzato da Filippo Pistaffa' 
                            : 'Made by Filippo Pistaffa'}
                    </p>
                    <div className="flex items-center gap-3">
                        <span className="px-3 py-1 rounded-full bg-[var(--bg-input)] font-heavy text-[var(--ore-starry)] uppercase tracking-wider text-[10px]">
                            {lang === 'it' 
                                ? 'Aggiornato a: Giugno 2025' 
                                : 'Updated to: June 2025'}
                        </span>
                        <span className="px-3 py-1 rounded-full bg-blue-500/10 text-[var(--ore-shiny)] border border-blue-500/20 font-heavy tracking-wider text-[10px]">
                            v2.1.0
                        </span>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default App;