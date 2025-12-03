import React from 'react';

interface GridCardProps {
    children: React.ReactNode;
    className?: string;
    title?: string;
    icon?: React.ReactNode;
    noPadding?: boolean;
}

export const GridCard: React.FC<GridCardProps> = ({ children, className = '', title, icon, noPadding = false }) => {
    return (
        <div className={`relative group border border-white/10 bg-distress-panel/50 backdrop-blur-sm flex flex-col ${noPadding ? 'p-0' : 'p-6'} ${className}`}>
            {/* Corner Dots - The signature design element from the screenshot */}
            <div className="absolute -top-[3px] -left-[3px] w-[5px] h-[5px] bg-white/40 rounded-full" />
            <div className="absolute -top-[3px] -right-[3px] w-[5px] h-[5px] bg-white/40 rounded-full" />
            <div className="absolute -bottom-[3px] -left-[3px] w-[5px] h-[5px] bg-white/40 rounded-full" />
            <div className="absolute -bottom-[3px] -right-[3px] w-[5px] h-[5px] bg-white/40 rounded-full" />

            {/* Header */}
            {(title || icon) && (
                <div className={`flex items-center gap-3 flex-shrink-0 relative z-20 ${noPadding ? 'p-6 pb-0 mb-4' : 'mb-4'}`}>
                    {icon && <div className="text-white/80">{icon}</div>}
                    {title && <h3 className="text-sm font-mono uppercase tracking-widest text-white/60">{title}</h3>}
                </div>
            )}

            {/* Content - Added h-full and flex-grow to ensure children fill the space */}
            <div className="relative z-10 h-full w-full flex-grow flex flex-col">
                {children}
            </div>
        </div>
    );
};