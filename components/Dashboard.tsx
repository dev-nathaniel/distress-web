import React, { useState, useEffect } from 'react';
import { Map, ShieldAlert, Drone, Radio, Activity, Navigation, Siren, Eye } from 'lucide-react';
import { GridCard } from './GridCard';
import { Incident, IncidentType } from '../types';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';

const MOCK_DATA = [
    { time: '00:00', incidents: 12 },
    { time: '04:00', incidents: 8 },
    { time: '08:00', incidents: 24 },
    { time: '12:00', incidents: 35 },
    { time: '16:00', incidents: 42 },
    { time: '20:00', incidents: 28 },
];

const RECENT_INCIDENTS: Incident[] = [
    { id: 'INC-2024-001', type: IncidentType.MEDICAL, location: { lat: 0, lng: 0, address: 'Lekki Phase 1, Zone A' }, timestamp: '2 mins ago', status: 'DISPATCHED', severity: 'HIGH', description: 'Cardiac arrest reported.', assetsDeployed: ['Amb-02', 'Drone-Med-1'] },
    { id: 'INC-2024-002', type: IncidentType.SECURITY, location: { lat: 0, lng: 0, address: 'Mainland Bridge' }, timestamp: '5 mins ago', status: 'ANALYZING', severity: 'MEDIUM', description: 'Vehicle breakdown, potential risk.', assetsDeployed: ['Drone-Surv-4'] },
    { id: 'INC-2024-003', type: IncidentType.FIRE, location: { lat: 0, lng: 0, address: 'Industrial Estate B' }, timestamp: '12 mins ago', status: 'RESOLVED', severity: 'LOW', description: 'Small refuse fire.', assetsDeployed: [] },
];

export const Dashboard: React.FC = () => {
    const [activeDrones, setActiveDrones] = useState(14);
    const [systemStatus, setSystemStatus] = useState('OPERATIONAL');

    return (
        <div className="w-full min-h-screen pt-20 px-4 md:px-8 pb-8 flex flex-col gap-6">

            {/* Top Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <GridCard title="System Status" icon={<Activity size={16} />}>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-xl font-bold tracking-tight">{systemStatus}</span>
                    </div>
                    <p className="text-xs text-zinc-500 mt-2 font-mono">LATENCY: 12ms</p>
                </GridCard>

                <GridCard title="Active Assets" icon={<Drone size={16} />}>
                    <div className="flex justify-between items-end">
                        <span className="text-4xl font-bold">{activeDrones}</span>
                        <span className="text-sm text-zinc-400 mb-1">UNITS AIRBORNE</span>
                    </div>
                    <div className="w-full bg-zinc-800 h-1 mt-4">
                        <div className="bg-blue-500 h-1 w-[70%]" />
                    </div>
                </GridCard>

                <GridCard title="Threat Level" icon={<ShieldAlert size={16} />}>
                    <div className="flex justify-between items-end">
                        <span className="text-4xl font-bold text-yellow-500">MOD</span>
                        <span className="text-sm text-zinc-400 mb-1">ELEVATED SECTOR 4</span>
                    </div>
                </GridCard>

                <GridCard title="Response Time" icon={<Navigation size={16} />}>
                    <div className="flex justify-between items-end">
                        <span className="text-4xl font-bold">4m 12s</span>
                        <span className="text-sm text-zinc-400 mb-1">AVG. ARRIVAL</span>
                    </div>
                </GridCard>
            </div>

            {/* Main Command Center */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-grow">

                {/* Left: Map Visualization (Abstract) */}
                <GridCard className="lg:col-span-2 min-h-[500px] flex flex-col" title="Live Tactical Map" icon={<Map size={16} />}>
                    <div className="relative flex-grow bg-zinc-900/50 border border-white/5 rounded overflow-hidden group">
                        {/* Abstract Map Grid */}
                        <div className="absolute inset-0 opacity-20"
                            style={{
                                backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)',
                                backgroundSize: '20px 20px'
                            }}>
                        </div>

                        {/* Animated Radar Effect */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-[400px] h-[400px] border border-blue-500/20 rounded-full animate-[spin_10s_linear_infinite]" />
                            <div className="absolute w-[300px] h-[300px] border border-blue-500/30 rounded-full" />
                            <div className="absolute w-[100px] h-[100px] bg-blue-500/10 rounded-full animate-pulse" />
                        </div>

                        {/* Random Points */}
                        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-red-500 rounded-full animate-ping" />
                        <div className="absolute top-1/2 left-2/3 w-2 h-2 bg-blue-500 rounded-full" />
                        <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-emerald-500 rounded-full" />

                        {/* Map Controls */}
                        <div className="absolute bottom-4 left-4 flex gap-2">
                            <button className="bg-black/80 border border-white/20 p-2 text-xs hover:bg-white/10 transition">SATELLITE</button>
                            <button className="bg-blue-900/20 border border-blue-500/50 text-blue-400 p-2 text-xs">INFRARED</button>
                        </div>

                        <div className="absolute top-4 right-4 bg-black/80 border border-red-500/30 p-2 flex items-center gap-2">
                            <div className="w-2 h-2 bg-red-500 animate-pulse rounded-full" />
                            <span className="text-xs font-mono text-red-400">LIVE FEED ACTIVE</span>
                        </div>
                    </div>
                </GridCard>

                {/* Right: Feed & Analytics */}
                <div className="flex flex-col gap-6">
                    <GridCard className="flex-grow" title="Incident Feed" icon={<Radio size={16} />}>
                        <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto">
                            {RECENT_INCIDENTS.map((inc) => (
                                <div key={inc.id} className="p-3 bg-white/5 border-l-2 border-l-white/20 hover:bg-white/10 transition cursor-pointer">
                                    <div className="flex justify-between mb-1">
                                        <span className={`text-[10px] px-1 rounded font-bold ${inc.type === 'MEDICAL' ? 'bg-blue-900 text-blue-200' :
                                                inc.type === 'FIRE' ? 'bg-orange-900 text-orange-200' :
                                                    'bg-red-900 text-red-200'
                                            }`}>{inc.type}</span>
                                        <span className="text-xs text-zinc-500 font-mono">{inc.timestamp}</span>
                                    </div>
                                    <h4 className="text-sm font-semibold text-zinc-200">{inc.location.address}</h4>
                                    <p className="text-xs text-zinc-400 mt-1">{inc.description}</p>
                                    {inc.assetsDeployed && (
                                        <div className="flex gap-2 mt-2">
                                            {inc.assetsDeployed.map(asset => (
                                                <span key={asset} className="text-[9px] border border-white/10 px-1 text-zinc-500">{asset}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </GridCard>

                    <GridCard className="h-48" title="Incident Velocity" icon={<Activity size={16} />}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={MOCK_DATA}>
                                <XAxis dataKey="time" hide />
                                <YAxis hide />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#000', borderColor: '#333' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Line type="monotone" dataKey="incidents" stroke="#e11d48" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </GridCard>
                </div>

            </div>
        </div>
    );
};