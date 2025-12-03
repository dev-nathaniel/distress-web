'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ShieldAlert, Drone, Radio, Activity, Navigation, Globe as GlobeIcon, Loader2, X, MapPin, Siren, Clock } from 'lucide-react';
import { GridCard } from '../../components/GridCard';
import { Incident, IncidentType } from '../../types';
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

// --- DATA ---

const MOCK_DATA = [
    { time: '00:00', incidents: 12 },
    { time: '04:00', incidents: 8 },
    { time: '08:00', incidents: 24 },
    { time: '12:00', incidents: 35 },
    { time: '16:00', incidents: 42 },
    { time: '20:00', incidents: 28 },
];

const RECENT_INCIDENTS: Incident[] = [
    { id: 'INC-2024-001', type: IncidentType.MEDICAL, location: { lat: 6.4698, lng: 3.5852, address: 'Lekki Phase 1, Zone A' }, timestamp: '2 mins ago', status: 'DISPATCHED', severity: 'HIGH', description: 'Cardiac arrest reported.', assetsDeployed: ['Amb-02', 'Drone-Med-1'] },
    { id: 'INC-2024-002', type: IncidentType.SECURITY, location: { lat: 6.5000, lng: 3.3833, address: 'Mainland Bridge' }, timestamp: '5 mins ago', status: 'ANALYZING', severity: 'MEDIUM', description: 'Vehicle breakdown, potential risk.', assetsDeployed: ['Drone-Surv-4'] },
    { id: 'INC-2024-003', type: IncidentType.FIRE, location: { lat: 6.6018, lng: 3.3515, address: 'Industrial Estate B' }, timestamp: '12 mins ago', status: 'RESOLVED', severity: 'LOW', description: 'Small refuse fire.', assetsDeployed: [] },
    { id: 'INC-2024-004', type: IncidentType.DOMESTIC, location: { lat: 6.4281, lng: 3.4219, address: 'Victoria Island, Plot 4' }, timestamp: '15 mins ago', status: 'DISPATCHED', severity: 'HIGH', description: 'Distress signal from fob.', assetsDeployed: ['MOPOL-Unit-2'] },
    { id: 'INC-2024-005', type: IncidentType.SECURITY, location: { lat: 9.0765, lng: 7.3986, address: 'Abuja Central District' }, timestamp: '22 mins ago', status: 'PENDING', severity: 'CRITICAL', description: 'Perimeter breach reported.', assetsDeployed: ['MOPOL-Alpha'] },
    { id: 'INC-2024-006', type: IncidentType.ACCIDENT, location: { lat: 4.8156, lng: 7.0498, address: 'Port Harcourt Rd' }, timestamp: '30 mins ago', status: 'RESOLVED', severity: 'MEDIUM', description: 'Minor collision.', assetsDeployed: [] },
    // Adding international points to show globe scale
    { id: 'INC-2024-007', type: IncidentType.SECURITY, location: { lat: 51.5074, lng: -0.1278, address: 'London Branch HQ' }, timestamp: '1 hr ago', status: 'RESOLVED', severity: 'LOW', description: 'System check routine.', assetsDeployed: [] },
];

// --- 3D UTILS ---

const latLonToVector3 = (lat: number, lon: number, radius: number) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const x = -(radius * Math.sin(phi) * Math.cos(theta));
    const z = (radius * Math.sin(phi) * Math.sin(theta));
    const y = (radius * Math.cos(phi));
    return new THREE.Vector3(x, y, z);
};

// --- 3D GLOBE COMPONENT ---

interface Globe3DProps {
    onIncidentSelect: (id: string | null) => void;
    selectedIncidentId: string | null;
}

const Globe3D: React.FC<Globe3DProps> = ({ onIncidentSelect, selectedIncidentId }) => {
    const mountRef = useRef<HTMLDivElement>(null);
    const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
    const sceneRef = useRef<THREE.Scene | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
    const controlsRef = useRef<OrbitControls | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Animation State Refs
    const targetCameraPos = useRef<THREE.Vector3 | null>(null);
    const targetLookAt = useRef<THREE.Vector3 | null>(null);
    const isTransitioning = useRef(false);

    // Update target when selected incident changes
    useEffect(() => {
        if (!sceneRef.current || !controlsRef.current) return;

        const R = 7;

        if (selectedIncidentId) {
            const incident = RECENT_INCIDENTS.find(i => i.id === selectedIncidentId);
            if (incident) {
                const pos = latLonToVector3(incident.location.lat, incident.location.lng, R);

                // Calculate a camera position slightly offset from the target so we look "down" at it
                // We multiply by 1.6 to zoom in close (R is surface, 1.6*R is altitude)
                const camPos = pos.clone().normalize().multiplyScalar(R + 5);

                targetCameraPos.current = camPos;
                targetLookAt.current = pos;
                isTransitioning.current = true;
                controlsRef.current.autoRotate = false; // Stop rotation when focused
            }
        } else {
            // Reset to orbit view - Looking at West Africa from distance
            targetCameraPos.current = new THREE.Vector3(25, 5, 5);
            targetLookAt.current = new THREE.Vector3(0, 0, 0);
            isTransitioning.current = true;
            controlsRef.current.autoRotate = true; // Resume rotation
        }

    }, [selectedIncidentId]);

    useEffect(() => {
        if (!mountRef.current) return;

        // SCENE SETUP
        const scene = new THREE.Scene();
        sceneRef.current = scene;
        scene.background = null;

        const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
        // Initial Position: Looking at West Africa (approx Lat 0, Lon 0 area which is +x axis in our math)
        camera.position.set(25, 5, 5);
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        mountRef.current.appendChild(renderer.domElement);
        rendererRef.current = renderer;

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableZoom = true;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5;
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.minDistance = 9;
        controls.maxDistance = 40;
        controlsRef.current = controls;

        // IMPORTANT: Stop any auto-transition if the user manually interacts with the globe
        const onControlsStart = () => {
            isTransitioning.current = false;
            // Clearing targets ensures the animation loop doesn't fight the user
            targetCameraPos.current = null;
            targetLookAt.current = null;
        };
        controls.addEventListener('start', onControlsStart);

        // GLOBE RADIUS
        const R = 7;

        // 1. GENERATE POINTS BASED ON IMAGE DATA (LAND MASSES ONLY)
        const generateGlobePoints = () => {
            const img = new Image();
            img.crossOrigin = "Anonymous";
            img.onload = () => {
                const canvas = document.createElement('canvas');
                canvas.width = img.width;
                canvas.height = img.height;
                const ctx = canvas.getContext('2d');
                if (!ctx) return;

                ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;

                const vertices: number[] = [];

                // Scan logic
                const step = 4; // Skip pixels to reduce density (higher = fewer points)

                for (let y = 0; y < canvas.height; y += step) {
                    for (let x = 0; x < canvas.width; x += step) {
                        const i = (y * canvas.width + x) * 4;
                        const r = data[i];

                        // Specular map: Water is white (255), Land is black (0)
                        // We want points on Land (black)
                        if (r < 50) {
                            const lat = 90 - (y / canvas.height) * 180;
                            const lon = (x / canvas.width) * 360 - 180;
                            const pos = latLonToVector3(lat, lon, R);
                            vertices.push(pos.x, pos.y, pos.z);
                        }
                    }
                }

                const geometry = new THREE.BufferGeometry();
                geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

                const material = new THREE.PointsMaterial({
                    color: 0x555555,
                    size: 0.08,
                    sizeAttenuation: true,
                    transparent: true,
                    opacity: 0.8,
                });

                const points = new THREE.Points(geometry, material);
                scene.add(points);
                setIsLoading(false);
            };
            img.src = 'https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_specular_2048.jpg';
        };

        generateGlobePoints();

        // Inner black sphere (Occlusion)
        const blocker = new THREE.Mesh(
            new THREE.SphereGeometry(R * 0.98, 32, 32),
            new THREE.MeshBasicMaterial({ color: 0x050505 })
        );
        scene.add(blocker);

        // Atmosphere Glow
        const atmosphere = new THREE.Mesh(
            new THREE.SphereGeometry(R + 0.5, 64, 64),
            new THREE.MeshBasicMaterial({
                color: 0x111111,
                transparent: true,
                opacity: 0.1,
                side: THREE.BackSide,
                blending: THREE.AdditiveBlending
            })
        );
        scene.add(atmosphere);

        // 2. INCIDENT MARKERS
        const markers: THREE.Mesh[] = [];

        RECENT_INCIDENTS.forEach(incident => {
            const pos = latLonToVector3(incident.location.lat, incident.location.lng, R);

            // Red Dot (Clickable)
            const dotGeometry = new THREE.SphereGeometry(0.15, 16, 16);
            const dotMaterial = new THREE.MeshBasicMaterial({ color: 0xe11d48 });
            const dot = new THREE.Mesh(dotGeometry, dotMaterial);
            dot.position.copy(pos);
            dot.userData = { id: incident.id, isMarker: true };
            scene.add(dot);
            markers.push(dot);

            // Tall line indicator (Laser style)
            const lineGeo = new THREE.BufferGeometry().setFromPoints([
                pos,
                pos.clone().multiplyScalar(1.2)
            ]);
            const lineMat = new THREE.LineBasicMaterial({ color: 0xe11d48, transparent: true, opacity: 0.4 });
            const line = new THREE.Line(lineGeo, lineMat);
            scene.add(line);

            // Pulse Ring
            const ringGeometry = new THREE.RingGeometry(0.2, 0.25, 32);
            const ringMaterial = new THREE.MeshBasicMaterial({
                color: 0xe11d48,
                transparent: true,
                opacity: 0.6,
                side: THREE.DoubleSide
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.position.copy(pos.clone().multiplyScalar(1.02));
            ring.lookAt(new THREE.Vector3(0, 0, 0));
            scene.add(ring);
        });

        // INTERACTION
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();

        const onMouseClick = (event: MouseEvent) => {
            if (!rendererRef.current) return;
            const rect = rendererRef.current.domElement.getBoundingClientRect();

            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            if (cameraRef.current) {
                raycaster.setFromCamera(mouse, cameraRef.current);
                const intersects = raycaster.intersectObjects(markers);
                if (intersects.length > 0) {
                    const id = intersects[0].object.userData.id;
                    if (id) onIncidentSelect(id);
                } else {
                    // Clicking empty space deselects
                    onIncidentSelect(null);
                }
            }
        };

        mountRef.current.addEventListener('click', onMouseClick);

        // RESIZE
        const handleResize = () => {
            if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
            const width = mountRef.current.clientWidth;
            const height = mountRef.current.clientHeight;
            if (width === 0 || height === 0) return;
            cameraRef.current.aspect = width / height;
            cameraRef.current.updateProjectionMatrix();
            rendererRef.current.setSize(width, height);
        };
        const resizeObserver = new ResizeObserver(() => handleResize());
        resizeObserver.observe(mountRef.current);

        // ANIMATION LOOP
        let animationId: number;
        const animate = () => {
            animationId = requestAnimationFrame(animate);

            // Smooth Camera Transitions
            if (isTransitioning.current && targetCameraPos.current && targetLookAt.current) {
                // Interpolate controls target
                controls.target.lerp(targetLookAt.current, 0.05);
                // Interpolate camera position
                camera.position.lerp(targetCameraPos.current, 0.05);


                // Check if we are "close enough" to stop force-updating
                if (camera.position.distanceTo(targetCameraPos.current) < 0.1) {
                    isTransitioning.current = false;
                    // We do NOT clear targets here if we want to hold the focus,
                    // but since controls.target is updated, orbit controls will stay there.
                }
            }

            controls.update();

            if (rendererRef.current && sceneRef.current && cameraRef.current) {
                rendererRef.current.render(sceneRef.current, cameraRef.current);
            }
        };
        animate();

        return () => {
            cancelAnimationFrame(animationId);
            resizeObserver.disconnect();
            if (mountRef.current) {
                mountRef.current.removeEventListener('click', onMouseClick);
                // Robust cleanup: remove all children (canvases)
                while (mountRef.current.firstChild) {
                    mountRef.current.removeChild(mountRef.current.firstChild);
                }
            }
            controls.removeEventListener('start', onControlsStart);
            controls.dispose();
            renderer.dispose();
            scene.clear();
        };
    }, []);

    return (
        <div ref={mountRef} className="w-full h-full cursor-crosshair min-h-[500px] relative overflow-hidden">
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <Loader2 className="animate-spin text-zinc-600" size={32} />
                </div>
            )}
        </div>
    );
};


// --- MAIN COMPONENT ---

export default function LiveIntel() {
    const [activeDrones, setActiveDrones] = useState(14);
    const [selectedIncidentId, setSelectedIncidentId] = useState<string | null>(null);
    const [systemStatus, setSystemStatus] = useState('OPERATIONAL');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const selectedIncident = RECENT_INCIDENTS.find(inc => inc.id === selectedIncidentId);

    return (
        <>
            <Navbar mobileMenuOpen={isSidebarOpen} setMobileMenuOpen={setIsSidebarOpen} />
            <div className="w-full min-h-screen px-4 md:px-8 pb-8 flex flex-col gap-6 animate-fade-in mt-24">
                <div className="py-8 border-b border-white/5 mb-4">
                    <h1 className="text-3xl font-bold font-mono tracking-tight flex items-center gap-3">
                        <span className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></span>
                        COMMAND CENTER <span className="text-zinc-600">LIVE FEED</span>
                    </h1>
                    <p className="text-zinc-500 text-sm mt-2 font-mono">
                        SECURE CONNECTION ESTABLISHED • NODE GLOBAL-WATCH
                    </p>
                </div>

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
                            {selectedIncident ? (
                                <span className={`text-4xl font-bold ${selectedIncident.severity === 'CRITICAL' ? 'text-red-500' : 'text-yellow-500'}`}>
                                    {selectedIncident.severity}
                                </span>
                            ) : (
                                <span className="text-4xl font-bold text-zinc-500">AVG</span>
                            )}
                            <span className="text-sm text-zinc-400 mb-1">
                                {selectedIncident ? `SECTOR ${selectedIncident.id.split('-')[2]}` : 'GLOBAL MONITOR'}
                            </span>
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

                    {/* Left: 3D Globe Map */}
                    <GridCard className="lg:col-span-2 min-h-[500px] flex flex-col relative" noPadding title="Global Tactical Map" icon={<GlobeIcon size={16} />}>
                        <div className="absolute top-0 left-0 w-full p-4 z-10 flex justify-between pointer-events-none">
                            <div className="flex gap-2 pointer-events-auto">
                                <button className="bg-black/80 border border-white/20 p-2 text-[10px] font-mono hover:bg-white/10 transition uppercase">Satellite</button>
                                <button className="bg-red-900/20 border border-red-500/50 text-red-400 p-2 text-[10px] font-mono uppercase">Heatmap</button>
                            </div>
                            <div className="bg-black/80 border border-red-500/30 px-3 py-1 flex items-center gap-2">
                                <div className="w-2 h-2 bg-red-500 animate-pulse rounded-full" />
                                <span className="text-xs font-mono text-red-400">LIVE UPLINK</span>
                            </div>
                        </div>

                        <div className="w-full h-full min-h-[500px] bg-gradient-to-b from-black via-zinc-900/50 to-black relative">
                            <Globe3D
                                onIncidentSelect={setSelectedIncidentId}
                                selectedIncidentId={selectedIncidentId}
                            />
                        </div>

                        <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
                            <p className="text-[10px] font-mono text-zinc-500">
                                CLICK RED NODES TO INSPECT<br />
                                DRAG TO ROTATE
                            </p>
                        </div>

                        {/* Incident Detail Popup Overlay */}
                        {selectedIncident && (
                            <div className="absolute top-16 right-4 w-80 bg-black/90 border border-white/10 backdrop-blur-xl p-0 animate-in slide-in-from-right-4 shadow-2xl z-20">
                                <div className="flex items-center justify-between p-4 border-b border-white/10 bg-white/5">
                                    <div className="flex items-center gap-2">
                                        <Siren className="text-red-500 animate-pulse" size={18} />
                                        <span className="font-bold text-sm tracking-wider">INCIDENT DETAILS</span>
                                    </div>
                                    <button onClick={() => setSelectedIncidentId(null)} className="text-zinc-400 hover:text-white transition">
                                        <X size={18} />
                                    </button>
                                </div>

                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h2 className="text-xl font-bold text-white leading-tight mb-1">{selectedIncident.type}</h2>
                                            <div className="flex items-center gap-1 text-xs text-zinc-400">
                                                <Clock size={12} /> {selectedIncident.timestamp}
                                            </div>
                                        </div>
                                        <div className={`px-2 py-1 text-[10px] font-bold border rounded ${selectedIncident.severity === 'CRITICAL' ? 'border-red-500 text-red-500 bg-red-950/30' :
                                            selectedIncident.severity === 'HIGH' ? 'border-orange-500 text-orange-500 bg-orange-950/30' : 'border-blue-500 text-blue-500 bg-blue-950/30'
                                            }`}>
                                            {selectedIncident.severity} PRIORITY
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3">
                                            <MapPin className="text-zinc-600 mt-0.5" size={16} />
                                            <p className="text-sm text-zinc-300">{selectedIncident.location.address}</p>
                                        </div>

                                        <div className="p-3 bg-white/5 border border-white/5 rounded text-sm text-zinc-400 italic">
                                            "{selectedIncident.description}"
                                        </div>

                                        <div>
                                            <h4 className="text-xs font-mono text-zinc-500 uppercase mb-2">Deployed Assets</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {selectedIncident.assetsDeployed?.map(asset => (
                                                    <span key={asset} className="px-2 py-1 bg-emerald-950/30 border border-emerald-500/30 text-emerald-400 text-xs rounded-sm flex items-center gap-1">
                                                        <Drone size={10} /> {asset}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/*<div className="mt-6 pt-4 border-t border-white/10 flex gap-2">
                         <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 text-xs font-bold uppercase transition">Escalate</button>
                         <button className="flex-1 border border-white/20 hover:bg-white/5 py-2 text-xs font-bold uppercase transition">Report</button>
                     </div>*/}
                                </div>
                            </div>
                        )}
                    </GridCard>

                    {/* Right: Feed & Analytics */}
                    <div className="flex flex-col gap-6">
                        <GridCard className="flex-grow min-h-[300px]" title="Incident Feed" icon={<Radio size={16} />}>
                            <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {RECENT_INCIDENTS.map((inc) => (
                                    <div
                                        key={inc.id}
                                        onClick={() => setSelectedIncidentId(inc.id)}
                                        className={`p-3 border-l-2 transition cursor-pointer ${selectedIncidentId === inc.id ? 'bg-white/10 border-l-red-500' : 'bg-white/5 border-l-white/20 hover:bg-white/10'}`}
                                    >
                                        <div className="flex justify-between mb-1">
                                            <span className={`text-[10px] px-1 rounded font-bold ${inc.type === 'MEDICAL' ? 'bg-blue-900 text-blue-200' :
                                                inc.type === 'FIRE' ? 'bg-orange-900 text-orange-200' :
                                                    'bg-red-900 text-red-200'
                                                }`}>{inc.type}</span>
                                            <span className="text-xs text-zinc-500 font-mono">{inc.timestamp}</span>
                                        </div>
                                        <h4 className="text-sm font-semibold text-zinc-200">{inc.location.address}</h4>
                                        <p className="text-xs text-zinc-400 mt-1 truncate">{inc.description}</p>
                                        {inc.assetsDeployed && (
                                            <div className="flex gap-2 mt-2">
                                                {inc.assetsDeployed.slice(0, 2).map(asset => (
                                                    <span key={asset} className="text-[9px] border border-white/10 px-1 text-zinc-500">{asset}</span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </GridCard>

                        <GridCard className="h-48 flex-shrink-0" title="Incident Velocity" icon={<Activity size={16} />}>
                            <div className="h-[120px] w-full">
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
                            </div>
                        </GridCard>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
};
