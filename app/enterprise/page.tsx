"use client";
import React from 'react';
import { GridCard } from '../../components/GridCard';
import { Building2, School, Truck, Lock, ShieldCheck, Eye } from 'lucide-react';
import { Navbar } from '../../components/Navbar';
import { Footer } from '@/components/Footer';

export default function Enterprise() {
    const [isMobile, setIsMobile] = React.useState(false);

    return (
        <>
            <Navbar mobileMenuOpen={isMobile} setMobileMenuOpen={setIsMobile} />
            <div className="animate-fade-in pb-20 mt-24">
                <section className="py-24 bg-black border-b border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-zinc-900 to-transparent pointer-events-none" />
                    <div className="max-w-[1600px] mx-auto px-6 relative z-10">
                        <h1 className="text-5xl md:text-7xl font-bold mb-8">Secure Your<br />Community.</h1>
                        <p className="text-xl text-zinc-400 max-w-2xl leading-relaxed">
                            DISTRESS offers specialized enterprise infrastructure for Gated Estates, Educational Institutions, and Logistics Fleets.
                            We provide the "Military Palantir" capability to local administrators.
                        </p>
                    </div>
                </section>

                <section className="py-20 max-w-[1600px] mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                        {/* Estate Card */}
                        <GridCard className="min-h-[400px] flex flex-col" title="Gated Estates">
                            <div className="bg-zinc-900/50 p-6 mb-6 rounded border border-white/5 flex items-center justify-center">
                                <Building2 size={64} className="text-zinc-700" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Residential Security</h3>
                            <ul className="space-y-4 mb-8 flex-grow">
                                <li className="flex items-start gap-3 text-zinc-400 text-sm">
                                    <Lock className="shrink-0 text-white mt-1" size={16} />
                                    <span>Visitor Entry Code System integrated with background checks for past offenders.</span>
                                </li>
                                <li className="flex items-start gap-3 text-zinc-400 text-sm">
                                    <ShieldCheck className="shrink-0 text-white mt-1" size={16} />
                                    <span>Rapid Response for domestic disputes or medical emergencies within the estate.</span>
                                </li>
                            </ul>
                            <button className="w-full py-3 border border-white/20 hover:bg-white hover:text-black transition">Request Demo</button>
                        </GridCard>

                        {/* School Card */}
                        <GridCard className="min-h-[400px] flex flex-col" title="Educational">
                            <div className="bg-zinc-900/50 p-6 mb-6 rounded border border-white/5 flex items-center justify-center">
                                <School size={64} className="text-zinc-700" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Safe Schools</h3>
                            <ul className="space-y-4 mb-8 flex-grow">
                                <li className="flex items-start gap-3 text-zinc-400 text-sm">
                                    <Eye className="shrink-0 text-white mt-1" size={16} />
                                    <span>Smart Uniforms with embedded distress chips for kidnapping prevention.</span>
                                </li>
                                <li className="flex items-start gap-3 text-zinc-400 text-sm">
                                    <Lock className="shrink-0 text-white mt-1" size={16} />
                                    <span>Automated Lockdown protocols triggered by staff or perimeter breaches.</span>
                                </li>
                            </ul>
                            <button className="w-full py-3 border border-white/20 hover:bg-white hover:text-black transition">Contact Sales</button>
                        </GridCard>

                        {/* Logistics Card */}
                        <GridCard className="min-h-[400px] flex flex-col" title="Logistics">
                            <div className="bg-zinc-900/50 p-6 mb-6 rounded border border-white/5 flex items-center justify-center">
                                <Truck size={64} className="text-zinc-700" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Fleet Protection</h3>
                            <ul className="space-y-4 mb-8 flex-grow">
                                <li className="flex items-start gap-3 text-zinc-400 text-sm">
                                    <ShieldCheck className="shrink-0 text-white mt-1" size={16} />
                                    <span>Anti-hijack monitoring for goods in transit across insecure zones.</span>
                                </li>
                                <li className="flex items-start gap-3 text-zinc-400 text-sm">
                                    <Eye className="shrink-0 text-white mt-1" size={16} />
                                    <span>Drone escort capability for high-value assets in red zones.</span>
                                </li>
                            </ul>
                            <button className="w-full py-3 border border-white/20 hover:bg-white hover:text-black transition">Contact Sales</button>
                        </GridCard>

                    </div>
                </section>
            </div>
            <Footer />
        </>
    );
};
