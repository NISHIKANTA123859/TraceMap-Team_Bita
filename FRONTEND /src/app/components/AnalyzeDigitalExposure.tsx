import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Shield, AlertCircle, Loader2, CheckCircle2, User, Globe, Code, Info, ChevronDown, X, Activity, Zap } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';

interface ExposureSummary {
    public_presence: string;
    platform_reuse: string;
    developer_exposure: string;
    metadata_visibility: string;
}

interface BackendResponse {
    email: string;
    risk_score: number;
    risk_level: string;
    exposure_summary: ExposureSummary;
    ai_explanation: string[];
    recommendations: string[];
    disclaimer: string;
    error?: string;
}

export function AnalyzeDigitalExposure({ onClose }: { onClose?: () => void }) {
    const [inputType, setInputType] = useState<'Email' | 'Username' | 'Domain'>('Email');
    const [inputValue, setInputValue] = useState('');
    const [isAuthorized, setIsAuthorized] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState<BackendResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleAnalyze = async () => {
        if (!isAuthorized) {
            setError("Authorization required. Please confirm you are authorized to analyze this input.");
            return;
        }
        if (!inputValue.trim()) {
            setError("Please enter a target identifier.");
            return;
        }

        setIsAnalyzing(true);
        setError(null);
        setResults(null);

        try {
            const response = await fetch('http://localhost:5000/analyze', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    input_type: inputType,
                    input_value: inputValue,
                    authorized: isAuthorized
                }),
            });

            // Handle non-JSON responses (like 404 or server crashes returning HTML)
            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                throw new Error("TraceMap Server returned an invalid response. Please ensure the backend is running.");
            }

            const data = await response.json();

            if (data.error) {
                setError(data.error);
            } else {
                setResults(data);
            }
        } catch (err: any) {
            setError(err.message || "Failed to connect to the TraceMap engine.");
        } finally {
            setIsAnalyzing(false);
        }
    };

    const getRiskColor = (score: number) => {
        if (score < 2.5) return { color: '#00ff88', label: 'LOW' };
        if (score < 5.0) return { color: '#ffcc00', label: 'MEDIUM' };
        if (score < 7.5) return { color: '#ff9900', label: 'HIGH' };
        return { color: '#ff0055', label: 'CRITICAL' };
    };

    const riskInfo = results ? getRiskColor(results.risk_score) : { color: '#8b949e', label: 'NONE' };

    return (
        <div className="min-h-screen bg-[#0a0f1c] text-white overflow-y-auto font-sans selection:bg-cyan-500/30 selection:text-white">
            <div className="max-container py-12 px-4">
                {/* Header */}
                <header className="flex justify-between items-center mb-12">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                            <Zap className="w-6 h-6 text-cyan-400" />
                        </div>
                        <div>
                            <h2 className="text-2xl font-black uppercase tracking-tighter tech-font">Digital Exposure Analyzer</h2>
                            <p className="text-cyan-400 text-[10px] font-mono tracking-widest uppercase">TraceMap // Fusion Engine 2.1</p>
                        </div>
                    </div>
                    {onClose && (
                        <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-full transition-all">
                            <X className="w-6 h-6 text-slate-400 hover:text-white" />
                        </button>
                    )}
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Left: Input Sidebar */}
                    <motion.aside
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:col-span-4 space-y-6"
                    >
                        <div className="p-8 rounded-[2rem] bg-slate-900/40 border border-white/5 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl -mr-16 -mt-16" />

                            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-cyan-400 mb-8 flex items-center gap-2 tech-font">
                                <Search className="w-4 h-4" /> Target Parameters
                            </h3>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest ml-1">Input Type</Label>
                                    <div className="relative">
                                        <select
                                            value={inputType}
                                            onChange={(e) => setInputType(e.target.value as any)}
                                            className="w-full bg-slate-950/50 border border-white/10 rounded-xl p-4 text-sm font-bold appearance-none focus:ring-2 focus:ring-cyan-500/50 transition-all tech-font uppercase tracking-widest"
                                        >
                                            <option>Email</option>
                                            <option>Username</option>
                                            <option>Domain</option>
                                        </select>
                                        <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cyan-400 pointer-events-none" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-[10px] text-slate-500 uppercase font-black tracking-widest ml-1">Identifier</Label>
                                    <Input
                                        placeholder="example.user.demo@gmail.com"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        className="h-14 bg-slate-950/50 border-white/10 text-white placeholder:text-slate-700 focus:ring-cyan-500/50 rounded-xl font-mono text-sm"
                                    />
                                </div>

                                <div className="flex items-start gap-3 p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10">
                                    <Checkbox
                                        id="auth"
                                        checked={isAuthorized}
                                        onCheckedChange={(checked) => setIsAuthorized(!!checked)}
                                        className="mt-0.5 border-cyan-500/50 data-[state=checked]:bg-cyan-500"
                                    />
                                    <Label htmlFor="auth" className="text-[10px] text-slate-400 leading-relaxed cursor-pointer font-medium uppercase tracking-wide">
                                        I confirm I am authorized to analyze this input
                                    </Label>
                                </div>

                                <Button
                                    onClick={handleAnalyze}
                                    disabled={isAnalyzing || !inputValue}
                                    className="w-full h-16 bg-cyan-600 hover:bg-cyan-500 text-white font-black rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest text-xs tech-font"
                                >
                                    {isAnalyzing ? (
                                        <>
                                            <Loader2 className="animate-spin w-5 h-5" />
                                            <span>Fusing Signals...</span>
                                        </>
                                    ) : (
                                        <>
                                            <Activity className="w-5 h-5" />
                                            <span>Analyze Digital Exposure</span>
                                        </>
                                    )}
                                </Button>

                                {error && (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-400 text-[10px] font-bold uppercase tracking-wider"
                                    >
                                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                        {error}
                                    </motion.div>
                                )}
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-slate-950/50 border border-white/5 text-center">
                            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-[0.2em] leading-relaxed">
                                TraceMap v2.1.4<br />
                                <span className="text-slate-700">Digital Intelligence Simulation</span>
                            </p>
                        </div>
                    </motion.aside>

                    {/* Right: Results Main */}
                    <main className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            {isAnalyzing ? (
                                <motion.div
                                    key="loading"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="h-[600px] rounded-[3rem] bg-slate-900/20 border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-center space-y-8"
                                >
                                    <div className="relative w-40 h-40">
                                        <motion.div
                                            className="absolute inset-0 border-2 border-cyan-500/20 rounded-full"
                                            animate={{ scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                        />
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" strokeWidth={1.5} />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="text-white font-black text-xl tech-font uppercase tracking-widest animate-pulse">Analyzing digital footprint...</h4>
                                        <p className="text-slate-500 text-[10px] uppercase tracking-[0.4em] font-mono">Synthesizing Public OSINT Signals</p>
                                    </div>
                                </motion.div>
                            ) : results ? (
                                <motion.div
                                    key="results"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-8"
                                >
                                    {/* Score Dashboard */}
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="p-10 rounded-[2.5rem] bg-slate-900/40 border-2 border-white/5 backdrop-blur-3xl flex flex-col items-center justify-center shadow-2xl relative group overflow-hidden">
                                            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-[80px] -mr-16 -mt-16" />

                                            <div className="relative w-48 h-48 mb-8">
                                                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                                                    <circle cx="50" cy="50" r="44" stroke="rgba(255,255,255,0.03)" strokeWidth="8" fill="none" />
                                                    <motion.circle
                                                        cx="50" cy="50" r="44"
                                                        stroke={riskInfo.color}
                                                        strokeWidth="8"
                                                        fill="none"
                                                        strokeDasharray="276.46"
                                                        initial={{ strokeDashoffset: 276.46 }}
                                                        animate={{ strokeDashoffset: 276.46 - (276.46 * results.risk_score) / 10 }}
                                                        transition={{ duration: 1.5, ease: 'circOut' }}
                                                        strokeLinecap="round"
                                                        style={{ filter: `drop-shadow(0 0 15px ${riskInfo.color}44)` }}
                                                    />
                                                </svg>
                                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                    <span className="text-6xl font-black tech-font" style={{ color: riskInfo.color }}>{results.risk_score}</span>
                                                    <span className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em]">Risk Scale</span>
                                                </div>
                                            </div>

                                            <div
                                                className="px-10 py-3 rounded-2xl font-black text-black tracking-[0.2em] text-xs uppercase shadow-xl"
                                                style={{ backgroundColor: riskInfo.color }}
                                            >
                                                {results.risk_level} Classification
                                            </div>
                                        </div>

                                        <div className="p-10 rounded-[2.5rem] bg-slate-900/40 border border-white/5 backdrop-blur-3xl">
                                            <div className="flex items-center gap-4 mb-8">
                                                <Shield className="w-6 h-6 text-cyan-400" />
                                                <h4 className="text-white text-lg font-black uppercase tracking-widest tech-font">Gemini AI Explanation</h4>
                                            </div>
                                            <div className="space-y-4">
                                                {results.ai_explanation.map((bullet, i) => (
                                                    <motion.div
                                                        key={i}
                                                        initial={{ opacity: 0, x: -10 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: i * 0.1 }}
                                                        className="flex items-start gap-4 p-4 rounded-2xl bg-slate-950/40 border border-white/5 hover:border-cyan-500/20 transition-all"
                                                    >
                                                        <div className="w-2 h-2 rounded-full mt-2" style={{ backgroundColor: riskInfo.color }} />
                                                        <p className="text-slate-300 text-sm leading-relaxed font-medium italic">"{bullet}"</p>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Cards Breakdown */}
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                                        {[
                                            { title: 'Public Presence', value: results.exposure_summary.public_presence, icon: Globe },
                                            { title: 'Platform Reuse', value: results.exposure_summary.platform_reuse, icon: User },
                                            { title: 'Code Exposure', value: results.exposure_summary.developer_exposure, icon: Code },
                                            { title: 'Metadata Logic', value: results.exposure_summary.metadata_visibility, icon: Info },
                                        ].map((factor, i) => (
                                            <div key={i} className="p-6 rounded-3xl bg-slate-900/40 border border-white/5 hover:border-cyan-500/30 transition-all group">
                                                <factor.icon className="w-5 h-5 text-cyan-500 mb-4 group-hover:scale-110 transition-transform" />
                                                <h5 className="text-slate-500 text-[10px] uppercase font-black tracking-widest mb-2">{factor.title}</h5>
                                                <p className="text-white text-[11px] font-black tech-font group-hover:text-cyan-400 transition-colors uppercase leading-tight">{factor.value}</p>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Recommendations */}
                                    <div className="p-10 rounded-[2.5rem] bg-gradient-to-br from-cyan-500/10 via-transparent to-transparent border border-cyan-500/20">
                                        <h4 className="text-white font-black mb-8 flex items-center gap-4 tech-font uppercase tracking-widest">
                                            <CheckCircle2 className="w-6 h-6 text-green-400" /> Recommendations
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {results.recommendations.map((rec, i) => (
                                                <div key={i} className="px-6 py-4 rounded-2xl bg-slate-950/60 border border-white/5 text-slate-300 text-[10px] font-black tracking-widest uppercase flex items-center gap-4 hover:border-cyan-500/40 transition-all cursor-default">
                                                    <div className="w-2 h-2 rounded-full bg-cyan-500" />
                                                    {rec}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="h-[600px] rounded-[3rem] bg-slate-900/10 border-2 border-dashed border-white/5 flex flex-col items-center justify-center text-center p-12">
                                    <div className="w-24 h-24 rounded-3xl bg-slate-900 border border-white/5 flex items-center justify-center mb-8">
                                        <Shield className="w-12 h-12 text-slate-700 animate-pulse" strokeWidth={1} />
                                    </div>
                                    <h3 className="text-2xl text-white font-black uppercase tracking-tighter mb-4 tech-font">Forensic Scan Awaiting</h3>
                                    <p className="text-slate-600 max-w-sm uppercase text-[10px] tracking-[0.3em] font-mono leading-relaxed">
                                        Initialize the TraceMap engine by providing target coordinates in the scanner panel.
                                    </p>
                                </div>
                            )}
                        </AnimatePresence>
                    </main>
                </div>

                <footer className="mt-20 pt-10 border-t border-white/5 text-center">
                    <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.4em] italic opacity-60">
                        "This analysis uses simulated public data for educational purposes only."
                    </p>
                </footer>
            </div>
        </div>
    );
}
