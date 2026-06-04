import React from 'react';
import { LayoutDashboard, Backpack, Settings, ChevronDown, Moon, Sun } from 'lucide-react';
import { SegmentedControl } from '../ui/common';
import { LEAGUES } from '../../constants';
import { Translations, League } from '../../types';

interface NavbarProps {
    t: Translations;
    view: 'dashboard' | 'equipment' | 'strategy';
    setView: (v: 'dashboard' | 'equipment' | 'strategy') => void;
    thLevel: number;
    setThLevel: (v: number) => void;
    leagueId: number;
    setLeagueId: (v: number) => void;
    availableLeagues: League[];
    theme: 'dark' | 'light';
    setTheme: (v: 'dark' | 'light') => void;
    lang: 'it' | 'en';
    setLang: (v: 'it' | 'en') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
    t, view, setView, thLevel, setThLevel, leagueId, setLeagueId, 
    availableLeagues, theme, setTheme, lang, setLang 
}) => {
    return (
        <nav className="border-b sticky top-0 z-50 transition-colors duration-300 backdrop-blur-md bg-[var(--bg-nav)]/95 shadow-sm" style={{ borderColor: 'var(--border-color)', paddingTop: 'env(safe-area-inset-top)' }}>
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-start">
                    {/* Logo */}
                    <div className="flex items-center gap-4 cursor-pointer" onClick={() => setView('dashboard')}>
                        <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-lg border border-[var(--border-color)] bg-black/20">
                            <img src="https://m.media-amazon.com/images/I/81Z+V7GJIEL.png" alt="Clash Icon" className="w-full h-full object-cover" />
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="font-heavy text-xl leading-none tracking-tight">{t.app_title}</h1>
                        </div>
                    </div>

                    {/* Navigation Icons */}
                    <div className="flex items-center bg-[var(--bg-input-nav)] rounded-xl p-1.5 gap-2">
                        <button onClick={() => setView('dashboard')} className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all min-w-[60px] ${view === 'dashboard' ? 'bg-[var(--accent-primary)] text-white shadow-md' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`} title="Dashboard">
                            <LayoutDashboard className="w-5 h-5 mb-0.5" />
                            <span className="text-[10px] font-bold uppercase tracking-wide">Dash</span>
                        </button>
                        <button onClick={() => setView('equipment')} className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all min-w-[60px] ${view === 'equipment' ? 'bg-[var(--accent-primary)] text-white shadow-md' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`} title="Equipment">
                            <Backpack className="w-5 h-5 mb-0.5" />
                            <span className="text-[10px] font-bold uppercase tracking-wide">Equip</span>
                        </button>
                        <button onClick={() => setView('strategy')} className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all min-w-[60px] ${view === 'strategy' ? 'bg-[var(--accent-primary)] text-white shadow-md' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`} title="Strategy">
                            <Settings className="w-5 h-5 mb-0.5" />
                            <span className="text-[10px] font-bold uppercase tracking-wide">Strat</span>
                        </button>
                    </div>
                </div>
                
                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                    
                    <div className="flex items-center gap-3">
                            {/* TH SELECT */}
                            <div className="relative">
                            <select 
                                value={thLevel} 
                                onChange={(e) => setThLevel(parseInt(e.target.value))}
                                className="appearance-none bg-[var(--bg-input-nav)] pl-4 pr-10 py-2.5 rounded-xl text-sm font-bold focus:outline-none border-r-[8px] border-transparent cursor-pointer hover:bg-[var(--bg-input)] transition-colors"
                            >
                                {[18,17,16,15,14,13,12,11,10,9,8,7].map(th => <option key={th} value={th}>TH {th}</option>)}
                            </select>
                            <ChevronDown className="absolute right-3 top-3 w-4 h-4 pointer-events-none text-[var(--text-muted)]" />
                            </div>

                        {/* LEAGUE SELECT */}
                        <div className="relative">
                            <select 
                                value={leagueId} 
                                onChange={(e) => setLeagueId(parseInt(e.target.value))}
                                className="appearance-none bg-[var(--bg-input-nav)] pl-4 pr-10 py-2.5 rounded-xl text-sm font-bold text-[var(--ore-starry)] max-w-[150px] truncate focus:outline-none border-r-[8px] border-transparent cursor-pointer hover:bg-[var(--bg-input)] transition-colors"
                            >
                                {availableLeagues.slice().reverse().map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                            </select>
                            <ChevronDown className="absolute right-3 top-3 w-4 h-4 pointer-events-none text-[var(--ore-starry)]" />
                        </div>
                    </div>

                    <div className="h-10 w-px bg-[var(--border-color)] mx-1 hidden md:block"></div>

                    <div className="flex items-center gap-3">
                        <SegmentedControl 
                            options={[
                                { value: 'dark', label: <Moon className="w-4 h-4" /> },
                                { value: 'light', label: <Sun className="w-4 h-4" /> }
                            ]}
                            value={theme}
                            onChange={(val) => setTheme(val as any)}
                        />

                        <SegmentedControl 
                            options={[
                                { value: 'it', label: 'IT' },
                                { value: 'en', label: 'EN' }
                            ]}
                            value={lang}
                            onChange={(val) => setLang(val as any)}
                        />
                    </div>
                </div>
            </div>
        </nav>
    );
};
