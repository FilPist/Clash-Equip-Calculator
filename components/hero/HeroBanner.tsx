import React from 'react';
import { HERO_META } from '../../constants';
import { HeroType } from '../../types';

interface HeroBannerProps {
    activeTab: HeroType;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ activeTab }) => {
    const meta = HERO_META[activeTab];

    return (
        <div className="relative mt-24 mb-8 h-48 sm:h-56 select-none">
            {/* Background Card */}
            {/* We use key here to force re-render of the background animation when hero changes */}
            <div 
                key={`bg-${activeTab}`}
                className={`absolute inset-0 rounded-3xl overflow-hidden bg-gradient-to-r ${meta.colorFrom} ${meta.colorTo} border border-[var(--border-color)] shadow-lg animate-fade-in`}
            >
                {/* Decorative Circles */}
                <div className="absolute top-[-50%] right-[-10%] w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-60 h-60 bg-black/10 rounded-full blur-2xl"></div>
            </div>

            {/* Content Container */}
            <div className="relative h-full flex items-center justify-between px-6 sm:px-10">
                
                {/* Character Image (Popping out) */}
                <div className="relative h-full w-1/3 sm:w-1/2 flex items-end justify-start">
                    <img 
                        key={`img-${activeTab}`} // Force animation restart
                        src={meta.image} 
                        alt={meta.name}
                        className={`absolute w-auto max-w-none object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)] animate-slide-up ${meta.imgClass || 'h-[135%] bottom-0 -left-4'}`}
                        style={{ animationDelay: '50ms', ...meta.imgStyle }}
                        loading="eager"
                    />
                </div>

                {/* Text Info */}
                <div className="flex-1 text-right z-10 pl-4">
                    <h2 
                        key={`title-${activeTab}`}
                        className={`text-3xl sm:text-5xl font-heavy uppercase tracking-tighter drop-shadow-md ${meta.accent} animate-slide-up`} 
                        style={{ animationDelay: '150ms' }}
                    >
                        {meta.name}
                    </h2>
                    <p 
                        key={`subtitle-${activeTab}`}
                        className="text-[var(--text-muted)] font-bold text-xs sm:text-base mt-1 animate-slide-up" 
                        style={{ animationDelay: '250ms' }}
                    >
                        Equipment Manager
                    </p>
                </div>
            </div>
        </div>
    );
};
