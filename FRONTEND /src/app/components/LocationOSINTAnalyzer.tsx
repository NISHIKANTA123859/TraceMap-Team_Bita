import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Globe, Shield, AlertCircle, Loader2, X, Navigation, Locate, Map } from 'lucide-react';
import { Button } from './ui/button';

export function LocationOSINTAnalyzer({ onClose }: { onClose?: () => void }) {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleAnalyze = async () => {
        setIsAnalyzing(true);
        setError(null);
        setResults(null);

        try {
            const response = await fetch('http://localhost:5000/analyze/location-osint', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ input_value: "Global_Identity", authorized: true }),
            });

            if (!response.ok) throw new Error('Location analysis failed');
            const data = await response.json();
            setResults(data);
        } catch (err: any) {
            setError('Failed to connect to TraceMap Location Engine');
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0f1c]/95 backdrop-blur-3xl animate-in fade-in duration-500">
            <div className="max-container py-12 md:py-20">
                <header className="flex justify-between items-center mb-16 px-4">
                    <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-green-500/10 border border-green-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                            <MapPin className="w-7 h-7 text-green-400" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-white uppercase tracking-tighter tech-font">Location OSINT Engine</h2>
                            <p className="text-green-400 text-xs font-mono tracking-widest mt-1">DFFE // GEOSPATIAL SIGNAL FUSION</p>
                        </div>
                    </div>
                    {onClose && (
                        <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-full transition-all active:scale-95 group">
                            <X className="w-8 h-8 text-slate-400 group-hover:text-white" />
                        </button>
                    )}
                </header>

                <div className="space-y-12 px-4">
                    <div className="relative h-[450px] rounded-[2.5rem] bg-slate-900/40 border-2 border-white/5 overflow-hidden shadow-2xl group">
                        {/* Simulated Map Background */}
                        <div className="absolute inset-0 opacity-10 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v11/static/0,0,1,0/1200x600?access_token=none')] bg-cover grayscale" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a1428] via-transparent to-transparent" />

                        {/* Scanning Effect */}
                        <motion.div
                            className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-transparent via-green-500/5 to-transparent h-[100px] w-full"
                            animate={{ top: ['0%', '100%'] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                        />

                        <div className="absolute inset-0 flex items-center justify-center z-20">
                            {!results && !isAnalyzing && (
                                <div className="text-center p-8 rounded-3xl bg-slate-900/80 border border-white/10 backdrop-blur-xl animate-in zoom-in-95 duration-300">
                                    <Globe className="w-20 h-20 text-green-500/20 mx-auto mb-6 animate-pulse" />
                                    <h4 className="text-white font-black mb-4 tech-font">GEOSPATIAL SUBSYSTEM OFFLINE</h4>
                                    <Button
                                        onClick={handleAnalyze}
                                        className="h-14 px-10 bg-green-500 hover:bg-green-400 text-slate-950 font-black rounded-xl shadow-[0_0_30px_rgba(34,197,94,0.3)] transition-all active:scale-95"
                                    >
                                        FUSE GEOSPATIAL SIGNALS
                                    </Button>
                                    {error && <p className="text-red-400 text-xs mt-6 font-medium tracking-tight animate-bounce">{error}</p>}
                                </div>
                            )}

                            {isAnalyzing && (
                                <div className="text-center p-8">
                                    <div className="relative w-32 h-32 mx-auto mb-8">
                                        <div className="absolute inset-0 border-4 border-green-500/20 rounded-full animate-ping" />
                                        <div className="absolute inset-0 border-2 border-green-500 rounded-full animate-spin border-t-transparent" style={{ animationDuration: '0.5s' }} />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Navigation className="w-12 h-12 text-green-500 animate-pulse" />
                                        </div>
                                    </div>
                                    <p className="text-green-400 font-black text-sm tracking-[0.3em] tech-font">TRIANGULATING SIGNALS...</p>
                                </div>
                            )}

                            {results && (
                                <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', damping: 15 }} className="relative">
                                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-green-500 text-slate-950 px-6 py-2 rounded-full text-xs font-black tracking-widest tech-font whitespace-nowrap shadow-[0_0_40px_rgba(34,197,94,0.5)]">
                                        EXTRACTION SUCCESSFUL
                                    </div>
                                    <div className="w-24 h-24 rounded-full bg-green-500/20 border-4 border-green-500 flex items-center justify-center shadow-[0_0_50px_rgba(34,197,94,0.4)]">
                                        <Locate className="w-12 h-12 text-green-400" />
                                    </div>
                                </motion.div>
                            )}
                        </div>
                    </div>

                    <AnimatePresence>
                        {results && (
                            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                                <div className="lg:col-span-4 p-8 rounded-[2rem] bg-slate-900/40 border border-white/5 backdrop-blur-xl">
                                    <h5 className="text-green-400 font-bold mb-8 uppercase text-xs flex items-center gap-3 tracking-[0.2em] tech-font">
                                        <Map className="w-5 h-5" /> MOBILITY PATTERNS
                                    </h5>
                                    <div className="space-y-4">
                                        {Object.entries(results.exposure_summary).map(([key, val]: any) => (
                                            <div key={key} className="p-4 rounded-2xl bg-slate-950/40 border border-white/5 hover:border-green-500/30 transition-all group">
                                                <span className="text-slate-500 text-[10px] uppercase font-bold tracking-widest block mb-1 group-hover:text-green-500/60 transition-colors">{key.replace('_', ' ')}</span>
                                                <span className="text-white font-medium">{val}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="lg:col-span-8 p-10 rounded-[2rem] bg-gradient-to-br from-green-500/5 to-transparent border border-green-500/10 backdrop-blur-xl flex flex-col justify-between">
                                    <div>
                                        <h5 className="text-white font-black mb-8 flex items-center gap-4 text-xl tech-font">
                                            <Shield className="w-6 h-6 text-green-400" /> GEOSPATIAL RISK INDEX
                                        </h5>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                            <div className="space-y-6">
                                                {results.ai_explanation.slice(0, 3).map((bullet: string, i: number) => (
                                                    <div key={i} className="flex gap-5 p-5 rounded-2xl bg-slate-950/40 border border-white/5 hover:border-green-500/30 transition-all group">
                                                        <div className="w-8 h-8 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0 text-green-400 font-black text-xs">
                                                            {i + 1}
                                                        </div>
                                                        <p className="text-sm text-slate-300 leading-relaxed group-hover:text-white transition-colors">{bullet}</p>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="flex flex-col items-center justify-center p-10 bg-slate-950/60 rounded-[2.5rem] border-2 border-green-500/20 shadow-2xl relative group overflow-hidden">
                                                <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <span className="text-[11px] text-slate-500 uppercase font-black tracking-[0.3em] mb-4 z-10">Geo-Risk Score</span>
                                                <div className="text-7xl font-black text-white tech-font z-10">{results.risk_score}</div>
                                                <div className={`mt-6 px-10 py-2 rounded-full font-black text-[10px] tracking-[0.4em] uppercase z-10 shadow-lg ${results.risk_level === 'LOW' ? 'bg-green-500 text-slate-950' :
                                                    results.risk_level === 'MEDIUM' ? 'bg-yellow-500 text-slate-950' : 'bg-red-500 text-white'
                                                    }`}>
                                                    {results.risk_level}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-12 p-4 rounded-xl bg-green-500/5 border border-green-500/10 text-center">
                                        <p className="text-[10px] text-green-500/60 font-mono tracking-widest uppercase">
                                            Extraction complete // Signal integrity 98.4% // DFFE Layer 3 Active
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
