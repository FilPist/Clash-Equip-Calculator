import React, { useState } from 'react';
import { LayoutDashboard, Backpack, Settings, ChevronDown, Moon, Sun, SlidersHorizontal, X } from 'lucide-react';
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
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <nav className="border-b sticky top-0 z-50 transition-colors duration-300 backdrop-blur-md bg-[var(--bg-nav)]/95 shadow-sm" style={{ borderColor: 'var(--border-color)', paddingTop: 'env(safe-area-inset-top)' }}>
            <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto justify-between md:justify-start">
                    {/* Logo */}
                    <div className="flex items-center gap-3 cursor-pointer shrink-0" onClick={() => setView('dashboard')}>
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl overflow-hidden shadow-md border border-[var(--border-color)] bg-black/20">
                            <img src="https://m.media-amazon.com/images/I/81Z+V7GJIEL.png" alt="Clash Icon" className="w-full h-full object-cover" />
                        </div>
                        <div className="hidden sm:block">
                            <h1 className="font-heavy text-lg md:text-xl leading-none tracking-tight">{t.app_title}</h1>
                        </div>
                    </div>

                    {/* Navigation Icons */}
                    <div className="flex items-center bg-[var(--bg-input-nav)] rounded-xl p-1 gap-1 sm:gap-2">
                        <button onClick={() => setView('dashboard')} className={`flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-lg transition-all min-w-[52px] sm:min-w-[60px] ${view === 'dashboard' ? 'bg-[var(--accent-primary)] text-white shadow-md' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`} title="Dashboard">
                            <LayoutDashboard className="w-4.5 h-4.5 sm:w-5 sm:h-5 mb-0.5" />
                            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wide">Dash</span>
                        </button>
                        <button onClick={() => setView('equipment')} className={`flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-lg transition-all min-w-[52px] sm:min-w-[60px] ${view === 'equipment' ? 'bg-[var(--accent-primary)] text-white shadow-md' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`} title="Equipment">
                            <Backpack className="w-4.5 h-4.5 sm:w-5 sm:h-5 mb-0.5" />
                            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wide">Equip</span>
                        </button>
                        <button onClick={() => setView('strategy')} className={`flex flex-col items-center justify-center p-1.5 sm:p-2 rounded-lg transition-all min-w-[52px] sm:min-w-[60px] ${view === 'strategy' ? 'bg-[var(--accent-primary)] text-white shadow-md' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`} title="Strategy">
                            <Settings className="w-4.5 h-4.5 sm:w-5 sm:h-5 mb-0.5" />
                            <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wide">Strat</span>
                        </button>
                    </div>

                    {/* Settings Trigger for Mobile */}
                    <button 
                        onClick={() => setMobileMenuOpen(true)}
                        className="md:hidden p-2 rounded-xl bg-[var(--bg-input-nav)] hover:bg-[var(--bg-input)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-all border border-transparent active:scale-95 flex items-center justify-center"
                        title="Settings"
                    >
                        <SlidersHorizontal className="w-5 h-5" />
                    </button>
                </div>
                
                {/* Desktop Settings Section */}
                <div className="hidden md:flex items-center gap-4 w-full md:w-auto justify-end">
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

                    <div className="h-10 w-px bg-[var(--border-color)] mx-1"></div>

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

            {/* Mobile Settings Centered Modal */}
            {mobileMenuOpen && (
                <>
                    {/* Backdrop */}
                    <div 
                        className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm md:hidden transition-opacity duration-300 animate-in fade-in"
                        onClick={() => setMobileMenuOpen(false)}
                    />
                    
                    {/* Centered Dialog Content */}
                    <div className="fixed inset-0 z-[70] md:hidden flex items-center justify-center p-4">
                        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[28px] p-6 space-y-5 shadow-2xl w-full max-w-sm max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
                            {/* Drawer Header */}
                            <div className="flex items-center justify-between pb-3 border-b border-[var(--border-color)]">
                                <div className="flex items-center gap-2">
                                    <SlidersHorizontal className="w-5 h-5 text-[var(--accent-primary)]" />
                                    <h3 className="font-heavy text-base text-[var(--text-main)] uppercase tracking-wider">
                                        {lang === 'it' ? 'Impostazioni' : 'Settings'}
                                    </h3>
                                </div>
                                <button 
                                    onClick={() => setMobileMenuOpen(false)} 
                                    className="p-2 rounded-xl bg-[var(--bg-input)] hover:bg-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-all"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Town Hall Select */}
                            <div className="space-y-2">
                                <label className="block text-xs font-heavy text-[var(--text-muted)] uppercase tracking-wider">
                                    {lang === 'it' ? 'Livello Municipio' : 'Town Hall Level'}
                                </label>
                                <div className="relative">
                                    <select 
                                        value={thLevel} 
                                        onChange={(e) => setThLevel(parseInt(e.target.value))}
                                        className="w-full appearance-none bg-[var(--bg-input)] pl-4 pr-10 py-3 rounded-xl text-sm font-bold text-[var(--text-main)] focus:outline-none border border-[var(--border-color)] cursor-pointer hover:bg-[var(--bg-input-nav)] transition-colors"
                                    >
                                        {[18,17,16,15,14,13,12,11,10,9,8,7].map(th => <option key={th} value={th}>Town Hall {th}</option>)}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-4 w-4 h-4 pointer-events-none text-[var(--text-muted)]" />
                                </div>
                            </div>

                            {/* League Select */}
                            <div className="space-y-2">
                                <label className="block text-xs font-heavy text-[var(--text-muted)] uppercase tracking-wider">
                                    {lang === 'it' ? 'Lega' : 'League'}
                                </label>
                                <div className="relative">
                                    <select 
                                        value={leagueId} 
                                        onChange={(e) => setLeagueId(parseInt(e.target.value))}
                                        className="w-full appearance-none bg-[var(--bg-input)] pl-4 pr-10 py-3 rounded-xl text-sm font-bold text-[var(--ore-starry)] focus:outline-none border border-[var(--border-color)] cursor-pointer hover:bg-[var(--bg-input-nav)] transition-colors"
                                    >
                                        {availableLeagues.slice().reverse().map(l => <option key={l.id} value={l.id}>{l.name}</option>)}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-4 w-4 h-4 pointer-events-none text-[var(--ore-starry)]" />
                                </div>
                            </div>

                            {/* Theme & Language side-by-side */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="block text-xs font-heavy text-[var(--text-muted)] uppercase tracking-wider">
                                        {lang === 'it' ? 'Tema' : 'Theme'}
                                    </label>
                                    <SegmentedControl 
                                        options={[
                                            { value: 'dark', label: <div className="flex items-center gap-1.5 justify-center py-1"><Moon className="w-4 h-4" /> <span className="text-[10px] font-heavy uppercase tracking-wider">Dark</span></div> },
                                            { value: 'light', label: <div className="flex items-center gap-1.5 justify-center py-1"><Sun className="w-4 h-4" /> <span className="text-[10px] font-heavy uppercase tracking-wider">Light</span></div> }
                                        ]}
                                        value={theme}
                                        onChange={(val) => setTheme(val as any)}
                                        className="w-full"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="block text-xs font-heavy text-[var(--text-muted)] uppercase tracking-wider">
                                        {lang === 'it' ? 'Lingua' : 'Language'}
                                    </label>
                                    <SegmentedControl 
                                        options={[
                                            { value: 'it', label: <div className="font-heavy text-[10px] uppercase tracking-wider py-1 text-center">ITA</div> },
                                            { value: 'en', label: <div className="font-heavy text-[10px] uppercase tracking-wider py-1 text-center">ENG</div> }
                                        ]}
                                        value={lang}
                                        onChange={(val) => setLang(val as any)}
                                        className="w-full"
                                    />
                                </div>
                            </div>

                            {/* Close Button */}
                            <button 
                                onClick={() => setMobileMenuOpen(false)}
                                className="w-full py-3.5 mt-2 rounded-xl bg-[var(--accent-primary)] hover:bg-blue-600 text-white font-heavy uppercase tracking-widest text-xs shadow-lg transition-colors active:scale-98"
                            >
                                {lang === 'it' ? 'Chiudi' : 'Close'}
                            </button>
                        </div>
                    </div>
                </>
            )}
        </nav>
    );
};
