'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Crosshair, Menu, X, Activity, Building2 } from 'lucide-react';

interface NavbarProps {
    mobileMenuOpen: boolean;
    setMobileMenuOpen: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ mobileMenuOpen, setMobileMenuOpen }) => {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    const navLinkClass = (path: string) =>
        `cursor-pointer transition hover:text-white flex items-center gap-2 ${isActive(path) ? 'text-white font-semibold' : 'text-zinc-400'}`;

    return (
        <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/5 bg-distress-black/80 backdrop-blur-md">
            <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
                <Link
                    href="/"
                    className="flex items-center gap-2 cursor-pointer group"
                >
                    <div className="w-8 h-8 bg-white text-black flex items-center justify-center font-bold text-xl rounded-sm group-hover:bg-red-600 group-hover:text-white transition-colors duration-300">
                        <Crosshair size={20} />
                    </div>
                    <span className="font-mono font-bold text-xl tracking-wider group-hover:text-red-500 transition-colors">DISTRESS</span>
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium">
                    <Link href="/" className={navLinkClass('/')}>Overview</Link>

                    <Link href="/liveIntel" className={navLinkClass('/liveIntel')}>
                        <Activity size={14} className={isActive('/liveIntel') ? 'text-red-500' : ''} />
                        Live Intel
                    </Link>

                    <Link href="/enterprise" className={navLinkClass('/enterprise')}>
                        <Building2 size={14} />
                        Enterprise
                    </Link>

                    <button
                        className="px-6 py-2 bg-white text-black hover:bg-zinc-200 transition font-semibold rounded-sm"
                    >
                        Get Protected
                    </button>
                </div>

                <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>
            </div>

            {mobileMenuOpen && (
                <div className="md:hidden bg-zinc-900 border-b border-white/10 p-6 flex flex-col gap-4 animate-in slide-in-from-top-2">
                    <Link href="/" onClick={() => setMobileMenuOpen(false)} className="text-left text-zinc-400 hover:text-white">Overview</Link>
                    <Link href="/liveIntel" onClick={() => setMobileMenuOpen(false)} className="text-left text-zinc-400 hover:text-white flex items-center gap-2"><Activity size={14} /> Live Intel</Link>
                    <Link href="/enterprise" onClick={() => setMobileMenuOpen(false)} className="text-left text-zinc-400 hover:text-white flex items-center gap-2"><Building2 size={14} /> Enterprise</Link>
                    <button onClick={() => { setMobileMenuOpen(false); }} className="bg-white text-black py-3 font-bold text-center mt-4">
                        Get Protected
                    </button>
                </div>
            )}
        </nav>
    );
};