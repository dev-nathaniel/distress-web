import React, { useState } from 'react';
// import { analyzeIncidentReport, getSafetyAdvice } from '../services/geminiService';
import { GridCard } from './GridCard';
import { Bot, Send, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';

export const SafetyAI: React.FC = () => {
    const [input, setInput] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);
    const [result, setResult] = useState<any>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        setIsProcessing(true);
        setResult(null);

        // Simulate location for demo
        const location = "Yaba, Lagos";

        try {
            // Parallel execution of analysis and advice
            // const [analysis, advice] = await Promise.all([
            // analyzeIncidentReport(input),
            // getSafetyAdvice(location, input)
            // ]);

            // setResult({ ...analysis, advice });
        } catch (error) {
            console.error(error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <GridCard title="DISTRESS AI INTELLIGENCE" icon={<Bot size={16} />} className="w-full max-w-2xl mx-auto mt-12">
            <div className="space-y-4">
                <p className="text-sm text-zinc-400">
                    Describe an emergency or suspicious activity. The AI will analyze severity, dispatch assets, and provide immediate safety protocols.
                </p>

                <form onSubmit={handleSubmit} className="relative">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="e.g. I see thick black smoke coming from the warehouse behind the school..."
                        className="w-full bg-black/50 border border-zinc-700 p-4 pr-12 text-white placeholder-zinc-600 focus:outline-none focus:border-red-500 transition-colors"
                    />
                    <button
                        type="submit"
                        disabled={isProcessing}
                        className="absolute right-2 top-2 p-2 bg-zinc-800 hover:bg-zinc-700 rounded text-white disabled:opacity-50 transition"
                    >
                        {isProcessing ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
                    </button>
                </form>

                {result && (
                    <div className="mt-6 border-t border-white/10 pt-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="p-3 bg-zinc-900/50 border border-white/5">
                                <span className="text-xs text-zinc-500 block mb-1">SEVERITY</span>
                                <span className={`text-lg font-bold ${result.severity === 'CRITICAL' || result.severity === 'HIGH' ? 'text-red-500' : 'text-yellow-500'}`}>
                                    {result.severity}
                                </span>
                            </div>
                            <div className="p-3 bg-zinc-900/50 border border-white/5">
                                <span className="text-xs text-zinc-500 block mb-1">TYPE</span>
                                <span className="text-lg font-bold text-blue-400">{result.type}</span>
                            </div>
                        </div>

                        <div className="mb-4">
                            <span className="text-xs text-zinc-500 block mb-2 font-mono uppercase">Recommended Assets</span>
                            <div className="flex flex-wrap gap-2">
                                {result.recommendedAssets?.map((asset: string, i: number) => (
                                    <span key={i} className="text-xs border border-emerald-500/30 bg-emerald-900/10 text-emerald-400 px-2 py-1 rounded-sm flex items-center gap-1">
                                        <CheckCircle size={10} /> {asset}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="p-4 bg-red-900/10 border border-red-500/20 rounded-sm">
                            <div className="flex items-start gap-3">
                                <AlertTriangle className="text-red-500 shrink-0 mt-1" size={16} />
                                <div>
                                    <h4 className="text-sm font-bold text-red-200 mb-1">TACTICAL ANALYSIS</h4>
                                    <p className="text-sm text-zinc-300 mb-3">{result.analysis}</p>

                                    <h4 className="text-xs font-bold text-zinc-400 mb-1 mt-3">IMMEDIATE SAFETY ADVICE</h4>
                                    <div className="text-sm text-zinc-300 leading-relaxed whitespace-pre-line">
                                        {result.advice}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </GridCard>
    );
};