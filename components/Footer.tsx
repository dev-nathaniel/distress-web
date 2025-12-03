import React from 'react';
import { Crosshair } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const Footer: React.FC = () => {
    const router = useRouter();
    return (
        <footer className="border-t border-white/10 bg-zinc-950 pt-20 pb-10">
            <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div className="col-span-1 md:col-span-2">
                    <div className="flex items-center gap-2 mb-6 cursor-pointer" onClick={() => router.push('/')}>
                        <Crosshair size={24} className="text-white" />
                        <span className="font-bold text-2xl tracking-wider">DISTRESS</span>
                    </div>
                    <p className="text-zinc-500 max-w-sm">
                        The civilian defense ecosystem. Transforming emergency response for the developing world through automation and community intelligence.
                    </p>
                </div>
                <div>
                    <h4 className="font-bold mb-6">Platform</h4>
                    <ul className="space-y-4 text-zinc-500 text-sm">
                        <li><button onClick={() => router.push('/ecosystem')} className="hover:text-white transition">Drone Network</button></li>
                        <li><button onClick={() => router.push('/ecosystem')} className="hover:text-white transition">Private Security</button></li>
                        <li><button onClick={() => router.push('/hardware')} className="hover:text-white transition">Hardware</button></li>
                        <li><button onClick={() => router.push('/pricing')} className="hover:text-white transition">Coverage Plans</button></li>
                    </ul>
                </div>
                <div>
                    <h4 className="font-bold mb-6">Company</h4>
                    <ul className="space-y-4 text-zinc-500 text-sm">
                        <li><button onClick={() => router.push('/mission')} className="hover:text-white transition">Mission</button></li>
                        <li><button className="hover:text-white transition">Careers</button></li>
                        <li><button className="hover:text-white transition">Partners</button></li>
                        <li><button className="hover:text-white transition">Contact</button></li>
                    </ul>
                </div>
            </div>
            <div className="max-w-[1600px] mx-auto px-6 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-zinc-600 text-xs font-mono">
                <p>© 2024 DISTRESS INC. ALL RIGHTS RESERVED.</p>
                <div className="flex gap-6 mt-4 md:mt-0">
                    <button className="hover:text-white">PRIVACY POLICY</button>
                    <button className="hover:text-white">TERMS OF SERVICE</button>
                </div>
            </div>
        </footer>
    );
};