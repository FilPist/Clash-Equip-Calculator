import React, { useEffect } from 'react';
import { X, Star, Lock } from 'lucide-react';
import { EquipmentItem } from '../../types';
import { getMaxAllowedLevel, getRemainingCost, formatNumber } from '../../utils';
import { COMMON_UPGRADE_COSTS, EPIC_UPGRADE_COSTS, ORE_IMAGES } from '../../constants';

export const Toggle = ({ checked, onChange, id, colorClass = "bg-white" }: { checked: boolean, onChange: (val: boolean) => void, id: string, colorClass?: string }) => (
    <div className="relative inline-block w-14 h-8 shrink-0">
        <input 
            type="checkbox" 
            id={id} 
            checked={checked} 
            onChange={(e) => onChange(e.target.checked)}
            className={`absolute block w-6 h-6 m-1 rounded-full border-2 appearance-none cursor-pointer transition-all duration-300 z-10 ${checked ? 'right-0 border-[var(--ore-starry)]' : 'left-0 border-gray-300'} ${checked && colorClass.includes('red') ? '!border-red-500' : ''} ${colorClass}`}
            style={{ backgroundColor: checked ? (colorClass.includes('red') ? '#ef4444' : 'var(--ore-starry)') : '#ffffff' }}
            aria-label={id}
        />
        <label htmlFor={id} className={`block overflow-hidden h-8 rounded-full cursor-pointer border-2 transition-colors ${checked ? 'bg-[var(--ore-starry)]' : 'bg-[var(--bg-input)]'}`} style={{ borderColor: 'var(--border-color)', backgroundColor: checked ? (colorClass.includes('red') ? 'rgba(239, 68, 68, 0.5)' : 'var(--ore-starry)') : 'var(--bg-input)' }}></label>
    </div>
);

export const ProgressBar = ({ progress, color }: { progress: number, color: string }) => (
    <div className="w-full rounded-full h-3 md:h-4 overflow-hidden bg-[var(--bg-input)]" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
        <div 
            className="h-full rounded-full transition-all duration-1000" 
            style={{ width: `${Math.min(100, Math.max(0, progress))}%`, backgroundColor: color }}
        />
    </div>
);

export interface SegmentOption<T> {
    value: T;
    label: React.ReactNode;
}

interface SegmentedControlProps<T> {
    options: SegmentOption<T>[];
    value: T;
    onChange: (val: T) => void;
    className?: string;
}

export const SegmentedControl = <T extends string | number>({ options, value, onChange, className = "" }: SegmentedControlProps<T>) => {
    return (
        <div className={`bg-[var(--bg-input-nav)] p-1 rounded-xl flex items-center relative ${className}`} role="group">
            {options.map((opt) => (
                <button
                    key={String(opt.value)}
                    onClick={() => onChange(opt.value)}
                    aria-pressed={value === opt.value}
                    className={`relative z-10 flex-1 px-3 py-1.5 text-xs font-heavy rounded-lg transition-all duration-300 ${value === opt.value ? 'text-white shadow-sm bg-[var(--accent-primary)]' : 'text-[var(--text-muted)] hover:text-[var(--text-main)]'}`}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    );
};

export interface ModalProps {
    isOpen: boolean;
    onClose?: () => void;
    children?: React.ReactNode;
    title?: string;
}

export const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
    useEffect(() => {
        if (isOpen) document.body.style.overflow = 'hidden';
        else document.body.style.overflow = 'unset';
        return () => { document.body.style.overflow = 'unset'; }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative bg-[var(--bg-card)] w-full max-w-lg rounded-3xl shadow-2xl border border-[var(--border-color)] overflow-hidden animate-slide-up flex flex-col max-h-[90vh]">
                <div className="p-6 border-b border-[var(--border-color)] flex justify-between items-center bg-[var(--bg-nav)]">
                    <h2 className="text-xl font-heavy text-[var(--text-main)]">{title}</h2>
                    {onClose && (
                        <button onClick={onClose} className="p-2 rounded-full hover:bg-[var(--bg-input)] text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    )}
                </div>
                <div className="p-6 overflow-y-auto">
                    {children}
                </div>
            </div>
        </div>
    );
}

export interface EquipCardProps {
    item: EquipmentItem;
    level: number;
    thLevel: number;
    onChange: (val: number) => void;
    isPriority: boolean;
    onTogglePriority: () => void;
}

export const EquipCard: React.FC<EquipCardProps> = ({ item, level, thLevel, onChange, isPriority, onTogglePriority }) => {
    const maxLevel = getMaxAllowedLevel(thLevel, item);
    const isLocked = maxLevel === 0;
    const isNotOwned = !isLocked && level === 0;

    // Cost Calculation
    const costsArray = item.type === 'common' ? COMMON_UPGRADE_COSTS : EPIC_UPGRADE_COSTS;
    // Next cost is null if locked/not owned or maxed
    const nextCost = (!isLocked && !isNotOwned && level < maxLevel) ? costsArray[level - 1] : null;
    
    // Remaining to Max
    const remaining = getRemainingCost(item.type, level, maxLevel);
    const isMaxed = level >= maxLevel && !isLocked;

    return (
        <div className={`relative bg-[var(--bg-input)] rounded-2xl p-4 border-2 transition-all duration-300 group hover:border-[var(--accent-primary)] ${isPriority ? 'border-[var(--ore-starry)] shadow-[0_0_15px_rgba(255,213,79,0.15)]' : 'border-transparent'}`}>
            <button 
                onClick={onTogglePriority}
                className={`absolute top-3 right-3 p-1.5 rounded-full transition-all z-10 ${isPriority ? 'bg-[var(--ore-starry)] text-black' : 'bg-black/20 text-[var(--text-muted)] hover:text-[var(--ore-starry)]'}`}
            >
                <Star className={`w-4 h-4 ${isPriority ? 'fill-current' : ''}`} />
            </button>

            <div className={`aspect-square rounded-xl mb-4 relative overflow-hidden flex items-center justify-center ${item.type === 'epic' ? 'bg-[#d48ae0]/10' : 'bg-[#4fc3f7]/10'}`}>
                {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.name} className={`w-[80%] h-[80%] object-contain drop-shadow-lg transition-transform duration-500 group-hover:scale-110 ${isLocked || isNotOwned ? 'grayscale opacity-50' : ''}`} />
                ) : (
                    <div className="w-12 h-12 bg-white/10 rounded-full" />
                )}
                <div className={`absolute bottom-2 left-2 px-2 py-0.5 rounded text-[10px] font-heavy uppercase tracking-wide ${item.type === 'epic' ? 'bg-[#d48ae0] text-black' : 'bg-[#4fc3f7] text-black'}`}>
                    {item.type}
                </div>
            </div>

            <div className="mb-2">
                <h3 className="font-heavy text-[var(--text-main)] leading-tight mb-1 truncate" title={item.name}>{item.name}</h3>
                <p className="text-xs font-bold text-[var(--text-muted)]">
                    {isLocked 
                        ? (item.unlockTh ? `Unlock at TH${item.unlockTh}` : 'Locked') 
                        : (isNotOwned ? 'Not Owned' : `Max Level: ${maxLevel}`)
                    }
                </p>
            </div>

            {/* Next Cost Indicator */}
            <div className="h-8 mb-1 flex items-center justify-center">
                {nextCost ? (
                    <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-[var(--bg-card)] border border-[var(--border-color)] text-[10px] font-bold">
                        <span className="text-[var(--text-muted)] uppercase text-[9px]">Next:</span>
                        {nextCost.shiny > 0 && <div className="flex items-center gap-1 text-[var(--ore-shiny)]"><img src={ORE_IMAGES.shiny} className="w-3 h-3" />{formatNumber(nextCost.shiny)}</div>}
                        {nextCost.glowy > 0 && <div className="flex items-center gap-1 text-[var(--ore-glowy)]"><img src={ORE_IMAGES.glowy} className="w-3 h-3" />{formatNumber(nextCost.glowy)}</div>}
                        {nextCost.starry > 0 && <div className="flex items-center gap-1 text-[var(--ore-starry)]"><img src={ORE_IMAGES.starry} className="w-3 h-3" />{nextCost.starry}</div>}
                    </div>
                ) : (
                    !isLocked && !isNotOwned && <div className="text-[10px] font-bold text-[var(--text-muted)] opacity-50 uppercase tracking-widest">Maxed</div>
                )}
                 {isNotOwned && <div className="text-[10px] font-bold text-[var(--text-muted)] opacity-50 uppercase tracking-widest">Equip to Unlock</div>}
            </div>

             {/* Remaining Cost Summary */}
             <div className="h-6 mb-2 flex items-center justify-center">
                {!isMaxed && !isLocked && !isNotOwned && (remaining.shiny > 0 || remaining.glowy > 0 || remaining.starry > 0) && (
                    <div className="flex items-center gap-1.5 text-[9px] font-bold text-[var(--text-muted)] opacity-80">
                         <span className="uppercase tracking-widest mr-1">Left:</span>
                        {remaining.shiny > 0 && <span className="text-[var(--ore-shiny)] flex items-center gap-0.5"><img src={ORE_IMAGES.shiny} className="w-2.5 h-2.5" />{formatNumber(remaining.shiny)}</span>}
                        {remaining.glowy > 0 && <span className="text-[var(--ore-glowy)] flex items-center gap-0.5"><img src={ORE_IMAGES.glowy} className="w-2.5 h-2.5" />{formatNumber(remaining.glowy)}</span>}
                        {remaining.starry > 0 && <span className="text-[var(--ore-starry)] flex items-center gap-0.5"><img src={ORE_IMAGES.starry} className="w-2.5 h-2.5" />{remaining.starry}</span>}
                    </div>
                )}
            </div>

            {isNotOwned ? (
                 <button 
                    onClick={() => onChange(1)}
                    className="w-full h-10 rounded-xl bg-[var(--accent-primary)] text-white font-heavy uppercase tracking-widest text-sm shadow-lg hover:bg-blue-600 transition-all flex items-center justify-center gap-2"
                >
                    <Lock className="w-3.5 h-3.5" />
                    Unlock
                </button>
            ) : (
                <div className="flex items-center gap-2">
                     <button 
                        onClick={() => onChange(Math.max(0, level - 1))}
                        disabled={level <= 0 || isLocked}
                        className="w-8 h-8 rounded-lg bg-[var(--bg-card)] flex items-center justify-center text-[var(--text-main)] hover:bg-[var(--accent-primary)] hover:text-white transition-colors disabled:opacity-30 font-bold"
                    >
                        -
                    </button>
                    <div className="flex-1 text-center">
                        <div className="text-xl font-heavy text-[var(--text-main)]">{isLocked ? 'Lk' : level}</div>
                    </div>
                    <button 
                        onClick={() => onChange(Math.min(maxLevel, level + 1))}
                        disabled={level >= maxLevel || isLocked}
                        className="w-8 h-8 rounded-lg bg-[var(--bg-card)] flex items-center justify-center text-[var(--text-main)] hover:bg-[var(--accent-primary)] hover:text-white transition-colors disabled:opacity-30 font-bold"
                    >
                        +
                    </button>
                    <button 
                        onClick={() => onChange(maxLevel)}
                        disabled={level >= maxLevel || isLocked}
                        className="text-[10px] font-heavy bg-[var(--accent-primary)] text-white px-2 rounded-md h-8 hover:bg-blue-600 disabled:opacity-30 disabled:bg-[var(--bg-card)] disabled:text-[var(--text-muted)] transition-colors ml-1"
                    >
                        MAX
                    </button>
                </div>
            )}
        </div>
    );
};