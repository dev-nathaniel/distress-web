'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GridCard } from '../components/GridCard';
import { ChevronRight, HeartPulse, AlertTriangle, Shield, Flame, Lock, Users, Activity, Radio, Smartphone, Globe, CheckCircle, Radar } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '@/components/Footer';

export default function Home() {
  const router = useRouter();
  const [isMobile, setIsMobile] = React.useState(false);
    const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if(email) {
        setSubmitted(true);
        setTimeout(() => {
            setEmail('');
            setSubmitted(false);
        }, 3000);
    }
  };
  return (
    <>
      <Navbar mobileMenuOpen={isMobile} setMobileMenuOpen={setIsMobile} />
      <div className="animate-fade-in mt-24">
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center justify-center border-b border-white/5 overflow-hidden">
          {/* Animated Background Grid */}
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.15] pointer-events-none" style={{ backgroundSize: '40px 40px' }} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-distress-black/50 to-distress-black pointer-events-none" />

          <div className="max-w-[1600px] mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
            <div className="lg:col-span-7 pt-12 lg:pt-0">
              {/* The RED Live Badge */}
              <button
                onClick={() => router.push('/liveIntel')}
                className="inline-flex items-center gap-3 px-4 py-1.5 border border-red-500/30 bg-red-950/20 text-xs font-mono uppercase tracking-widest mb-8 text-red-500 rounded-full hover:bg-red-950/40 transition cursor-pointer"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                Civilian Defense Ecosystem Live
              </button>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.9] mb-8">
                Automated <br />
                Interaction <br />
                <span className="text-zinc-600">That Saves Lives.</span>
              </h1>

              <p className="text-xl text-zinc-400 max-w-lg mb-10 leading-relaxed font-light">
                Democratizing high-grade security for the masses. From the first click to drone deployment, we keep your audience connected and your safety guaranteed.
              </p>

              {/* <div className="flex flex-col sm:flex-row gap-4">
                <button
                  className="px-8 py-4 bg-white text-black font-bold text-lg hover:bg-zinc-200 transition flex items-center justify-center gap-2 group rounded-sm"
                >
                  Join the Network <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => router.push('/enterprise')}
                  className="px-8 py-4 border border-white/20 hover:bg-white/5 transition text-lg font-medium rounded-sm text-zinc-300"
                >
                  For Enterprise
                </button> */}

              <div className="flex flex-col gap-2 max-w-xl w-full">
                <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-3">
                    <input 
                        type="email" 
                        placeholder="Enter your email address..." 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="flex-grow bg-white/5 border border-white/10 px-6 py-4 text-white placeholder-zinc-500 focus:outline-none focus:border-red-500 transition-colors rounded-full min-w-0"
                    />
                    <button 
                        type="submit"
                        className="px-8 py-4 bg-white text-black font-bold hover:bg-zinc-200 transition whitespace-nowrap rounded-full disabled:opacity-70"
                        disabled={submitted}
                    >
                        {submitted ? "YOU'RE ON THE LIST" : "JOIN WAITLIST"}
                    </button>
                </form>
                {submitted && <p className="text-emerald-500 text-xs mt-1 animate-in fade-in pl-4">We'll be in touch when we launch.</p>}
                <p className="text-zinc-600 text-xs pl-4 mt-2">Join the waitlist for early access to the pilot program.</p>
            </div>
              {/* </div> */}

              {/* <div className="mt-12 mb-10 flex items-center gap-6 text-sm text-zinc-600 font-mono">
                <span>TRUSTED BY:</span>
                <div className="flex gap-6 opacity-50 grayscale hover:grayscale-0 transition duration-500">
                  <span>ESTATE·LINK</span>
                  <span>SECURE·LAGOS</span>
                  <span>METRO·POL</span>
                  <span>SAFE·SCHOOLS</span>
                </div>
              </div> */}
            </div>

            {/* Abstract Hero Visual - "The Command Center" */}
            <div className="lg:col-span-5 relative h-[600px] w-full hidden lg:flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-tr from-red-500/10 to-blue-500/10 rounded-full blur-[100px]" />

              {/* Central Node Container */}
              <div className="relative w-[500px] h-[500px] flex items-center justify-center">
                {/* Rings */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full h-full border border-white/5 rounded-full animate-[spin_60s_linear_infinite]" />
                </div>
                <div className="absolute inset-[60px] flex items-center justify-center">
                  <div className="w-full h-full border border-white/10 rounded-full border-dashed animate-[spin_40s_linear_infinite_reverse]" />
                </div>
                <div className="absolute inset-[150px] flex items-center justify-center">
                  <div className="w-full h-full border border-white/5 rounded-full animate-pulse" />
                </div>

                {/* Core */}
                <div className="absolute w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_20px_rgba(239,68,68,0.8)]" />

                {/* Floating Cards - Repositioned for better alignment */}
                <GridCard className="absolute top-[5%] right-[5%] w-60 glass-panel transform hover:scale-105 transition duration-300 z-20" title="Drone Dispatch">
                  <div className="flex justify-between items-center mb-2">
                    <div className="text-xs text-zinc-400">UNIT-X1</div>
                    <div className="text-xs text-red-400 font-mono animate-pulse">EN ROUTE</div>
                  </div>
                  <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-red-500 rounded-full" />
                  </div>
                  <div className="mt-2 text-[10px] text-zinc-500 font-mono flex justify-between">
                    <span>ETA: 2 MINS</span>
                    <span>ALT: 400FT</span>
                  </div>
                </GridCard>

                <GridCard className="absolute bottom-[10%] left-[5%] w-60 glass-panel transform hover:scale-105 transition duration-300 z-20" title="Vital Monitoring">
                  <div className="flex items-center gap-4">
                    <HeartPulse className="text-red-500 animate-pulse" />
                    <div>
                      <div className="text-2xl font-bold">110 <span className="text-xs text-zinc-500 font-normal">BPM</span></div>
                      <div className="text-[10px] text-zinc-400">STRESS ELEVATED</div>
                    </div>
                  </div>
                </GridCard>

                {/* Decorative orbital dot */}
                <div className="absolute top-0 left-1/2 w-2 h-2 bg-white/20 rounded-full -translate-x-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>
        </section>

        {/* Scrolling Ticker */}
        <div className="border-b border-white/5 bg-zinc-900/50 py-4 overflow-hidden flex">
          <div className="animate-marquee whitespace-nowrap flex gap-12 text-zinc-500 font-mono text-sm tracking-widest px-6">
            <span className="flex items-center gap-2"><AlertTriangle size={14} /> MEDICAL EMERGENCY</span>
            <span className="flex items-center gap-2"><Shield size={14} /> ARMED ROBBERY</span>
            <span className="flex items-center gap-2"><Flame size={14} /> FIRE OUTBREAK</span>
            <span className="flex items-center gap-2"><Lock size={14} /> DOMESTIC SECURITY</span>
            <span className="flex items-center gap-2"><Users size={14} /> CROWD CONTROL</span>
            <span className="flex items-center gap-2"><Activity size={14} /> ACCIDENT RESPONSE</span>
            <span className="flex items-center gap-2"><AlertTriangle size={14} /> MEDICAL EMERGENCY</span>
            <span className="flex items-center gap-2"><Shield size={14} /> ARMED ROBBERY</span>
            <span className="flex items-center gap-2"><Flame size={14} /> FIRE OUTBREAK</span>
          </div>
        </div>

        {/* MISSION SECTION */}
        <section className="py-24 bg-zinc-950 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-pattern opacity-[0.05] pointer-events-none" />
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div className="inline-block px-3 py-1 mb-6 border border-white/10 text-xs font-mono text-zinc-400 uppercase tracking-widest">The Concept</div>
            <h2 className="text-3xl md:text-5xl font-bold mb-8">Intelligence Infrastructure for Every Citizen.</h2>
            <p className="text-xl text-zinc-400 leading-relaxed">
              We aim to create a better life for citizens of developing nations facing medical emergencies, insecurity, and more.
              We’re building critical safety infrastructure for the 5 billion people living without reliable emergency systems.
            </p>
          </div>
        </section>

        {/* ECOSYSTEM SECTION */}
        <section className="py-24 bg-black border-y border-white/5 relative">
          <div className="absolute inset-0 bg-grid-small opacity-[0.05] pointer-events-none" />
          <div className="max-w-[1600px] mx-auto px-6">
            <div className="mb-16">
              <h2 className="text-3xl md:text-5xl font-bold mb-6">The Life Product.</h2>
              <p className="text-zinc-400 max-w-2xl text-lg">
                A comprehensive ecosystem designed to balance the scales. We deploy specialized staff and technology to handle every crisis.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6 auto-rows-[minmax(180px,auto)]">

              {/* Feature 1: Automated Air Support - Updated visuals */}
              <GridCard className="md:col-span-6 lg:col-span-8 row-span-2 min-h-[400px] flex flex-col justify-between group overflow-hidden" title="Automated Air Support">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-20 grayscale group-hover:opacity-30 transition duration-700" />

                <div className="relative z-20 mt-auto p-2">
                  <h3 className="text-2xl md:text-3xl font-bold mb-2">Deploy Drones Instantly</h3>
                  <p className="text-zinc-400 max-w-md text-sm md:text-base">
                    Within seconds of a distress signal, our autonomous UAVs dispatch to your location providing live video feeds to responders and a physical deterrent to threats. Minimum one drone per local government.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="px-3 py-1 border border-white/10 bg-white/5 text-[10px] md:text-xs text-zinc-300 whitespace-nowrap">VIDEO SURVEILLANCE</span>
                    <span className="px-3 py-1 border border-white/10 bg-white/5 text-[10px] md:text-xs text-zinc-300 whitespace-nowrap">LOUDSPEAKER</span>
                    <span className="px-3 py-1 border border-white/10 bg-white/5 text-[10px] md:text-xs text-zinc-300 whitespace-nowrap">SPOTLIGHT</span>
                  </div>
                </div>
              </GridCard>

              {/* Feature 2: Private Security */}
              <GridCard className="md:col-span-6 lg:col-span-4 row-span-1" title="Boots on the Ground">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-white">Private Security Access</h3>
                    <p className="text-zinc-400 text-sm">
                      Direct connection to MOPOL (Mobile Police) and private security firms. Our staff includes specialized Drone Operators and Social Workers for dispute resolution.
                    </p>
                  </div>
                  <Shield className="text-zinc-600" size={24} />
                </div>
              </GridCard>

              {/* Feature 3: Community */}
              <GridCard className="md:col-span-3 lg:col-span-4 row-span-1" title="Community Intel">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm font-mono text-red-400">CRIME FEED LIVE</span>
                </div>
                <p className="text-zinc-400 text-sm">
                  Real-time alerts on recent incidents in your immediate vicinity. Know about road robberies or fire breakouts before you arrive.
                </p>
              </GridCard>

              {/* Feature 4: Admin Dashboard Link */}
              <GridCard className="md:col-span-3 lg:col-span-4 row-span-2 min-h-[300px]" title="The Watchtower">
                <div className="flex flex-col h-full cursor-pointer" onClick={() => router.push('/live-intel')}>
                  <p className="text-zinc-400 text-sm mb-4">
                    Enterprise-grade dashboard for estates, schools, and local governments to track escalated distress calls on a map.
                  </p>
                  <div className="flex-grow bg-zinc-900 border border-white/5 p-2 rounded relative overflow-hidden group">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80')] bg-cover bg-center opacity-20 grayscale group-hover:opacity-30 transition" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/80 px-4 py-2 border border-white/20 text-xs font-mono group-hover:bg-red-900/80 group-hover:border-red-500 transition text-white">VIEW LIVE INTEL</div>
                    </div>
                  </div>
                </div>
              </GridCard>

              {/* Feature 5: Hardware */}
              <GridCard className="md:col-span-6 lg:col-span-8 row-span-1 flex items-center justify-between" title="Discreet Hardware">
                <div className="max-w-md">
                  <h3 className="text-xl font-bold mb-1">Physical Distress Buttons</h3>
                  <p className="text-zinc-400 text-sm">
                    Key fobs, car mounts, and uniform patches. Trigger a silent alarm without unlocking your phone.
                  </p>
                </div>
                {/* <div className="hidden sm:flex gap-2">
                  <div className="w-12 h-12 rounded-full border border-white/20 bg-zinc-800 flex items-center justify-center">
                    <div className="w-8 h-8 rounded-full bg-black border border-red-900/50 shadow-[0_0_10px_rgba(220,38,38,0.2)]" />
                  </div>
                </div> */}
              </GridCard>

            </div>
          </div>
        </section>

        {/* HARDWARE SHOWCASE */}
        <section className="py-24 bg-zinc-950 border-b border-white/5">
          <div className="max-w-[1600px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-block px-3 py-1 mb-6 border border-white/10 text-xs font-mono text-zinc-400 uppercase tracking-widest">Physical Interface</div>
              <h2 className="text-4xl font-bold mb-6">Hardware that fits your life.</h2>
              <p className="text-xl text-zinc-400 mb-8">
                Emergency response shouldn't require unlocking a phone. Our hardware ecosystem ensures help is always one physical click away.
              </p>

              <div className="space-y-8">
                <div className="flex gap-4 p-4 border border-white/5 bg-white/[0.02]">
                  <div className="mt-1"><Radio className="text-red-500" /></div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Car Key Fob</h3>
                    <p className="text-zinc-400">Doubles as a tracker. Different shapes and colors to avoid recognition. One tap to deploy help to your vehicle's GPS location.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 border border-white/5 bg-white/[0.02]">
                  <div className="mt-1"><Smartphone className="text-blue-500" /></div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Lock Screen Widget</h3>
                    <p className="text-zinc-400">Immediate access from your phone's lock screen. No need to open an app in high-stress situations.</p>
                  </div>
                </div>
                <div className="flex gap-4 p-4 border border-white/5 bg-white/[0.02]">
                  <div className="mt-1"><Users className="text-orange-500" /></div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Smart Uniforms</h3>
                    <p className="text-zinc-400">Partnerships with schools and logistics companies to embed QR codes and distress chips in clothing.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <GridCard className="aspect-square flex items-center justify-center bg-zinc-950 overflow-hidden border-white/10" noPadding>
                {/* Image-based Key Fob Visual - User provided image */}
                <div className="relative w-full h-full group">
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition duration-500 z-10" />
                  <img
                    src="https://i.ibb.co/cKCBfG2n/Generated-Image-December-02-2025-2-09-PM.png"
                    alt="Silent Sentinel Key Fob - FIG 1.0"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700"
                  />
                  <div className="absolute bottom-6 left-0 right-0 text-center text-xs font-mono text-zinc-400/80 z-20 tracking-widest">
                    FIG 1.0 - THE SILENT SENTINEL
                  </div>
                </div>
              </GridCard>
            </div>
          </div>
        </section>

        {/* PRICING SECTION */}
        <section className="py-24 bg-black">
          <div className="max-w-[1600px] mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Membership Plans</h2>
              <p className="text-zinc-400">Flexible options for every citizen. Safety should not be gated by wealth.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">

              <GridCard className="p-8 flex flex-col items-center text-center hover:border-white/20 transition duration-300">
                <h3 className="text-xl font-mono text-zinc-400 mb-2">SUBSCRIPTION</h3>
                <div className="text-4xl font-bold mb-6 text-white">₦5,000<span className="text-sm font-normal text-zinc-500">/mo</span></div>
                <p className="text-xs text-zinc-500 mb-8 -mt-4">approx £5.00</p>
                <ul className="text-sm text-zinc-400 space-y-3 mb-8 text-left w-full pl-8">
                  <li className="flex items-center gap-2"><CheckCircle size={14} className="text-white" /> Unlimited Alerts</li>
                  <li className="flex items-center gap-2"><CheckCircle size={14} className="text-white" /> 24/7 Monitoring</li>
                  <li className="flex items-center gap-2"><CheckCircle size={14} className="text-white" /> Family Tracking</li>
                  <li className="flex items-center gap-2"><CheckCircle size={14} className="text-white" /> Free Hardware Fob</li>
                </ul>
                <button className="w-full py-3 border border-white text-white font-bold hover:bg-white hover:text-black transition uppercase text-sm tracking-wider">
                  Subscribe
                </button>
              </GridCard>

              <GridCard className="p-8 flex flex-col items-center text-center bg-white/5 hover:border-red-500/30 transition duration-300 relative overflow-hidden">
                {/* Fixed Popoular Badge Placement */}
                {/* <div className="absolute top-3 right-3 bg-red-600 text-white text-[10px] px-3 py-1 font-bold tracking-wider rounded-sm">POPULAR</div> */}

                <h3 className="text-xl font-mono text-red-400 mb-2 mt-4">USAGE-BASED</h3>
                <div className="text-4xl font-bold mb-6 text-white">₦0<span className="text-sm font-normal text-zinc-500">/mo</span></div>
                <p className="text-xs text-zinc-500 mb-4 -mt-4">Pay only when we work.</p>
                <ul className="text-sm text-zinc-400 space-y-3 mb-8 text-left w-full pl-8">
                  <li className="flex items-center gap-2"><CheckCircle size={14} className="text-red-500" /> Pay Per Incident (₦5k)</li>
                  <li className="flex items-center gap-2"><CheckCircle size={14} className="text-red-500" /> SMS Charges Only ($0.40)</li>
                  <li className="flex items-center gap-2"><CheckCircle size={14} className="text-red-500" /> No Monthly Fees</li>
                  <li className="flex items-center gap-2"><CheckCircle size={14} className="text-red-500" /> Hardware Sold Separately</li>
                </ul>
                <button className="w-full py-3 bg-white text-black font-bold hover:bg-red-500 hover:text-white transition uppercase text-sm tracking-wider">
                  Get Started Free
                </button>
              </GridCard>

            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};
