import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code, Github, Shield, AlertCircle, Loader2, X, Terminal, GitBranch, Key } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

export function CodeOSINTAnalyzer({ onClose }: { onClose?: () => void }) {
    const [inputValue, setInputValue] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleAnalyze = async () => {
        if (!inputValue.trim()) {
            setError("Please enter a GitHub handle or email.");
            return;
        }
        setIsAnalyzing(true);
        setError(null);
        setResults(null);

        try {
            const response = await fetch('http://localhost:5000/analyze/code-osint', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ input_value: inputValue, authorized: true }),
            });

            if (!response.ok) throw new Error('Code analysis failed');
            const data = await response.json();
            setResults(data);
        } catch (err: any) {
            setError('Failed to connect to TraceMap Code Engine');
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0f1c]/95 backdrop-blur-3xl animate-in fade-in duration-500">
            <div className="max-container py-12 md:py-20">
                <header className="flex justify-between items-center mb-16 px-4">
                    <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.2)]">
                            <Code className="w-7 h-7 text-orange-400" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-white uppercase tracking-tighter tech-font">Code OSINT Engine</h2>
                            <p className="text-orange-400 text-xs font-mono tracking-widest mt-1">DFFE // REPOSITORY & COMMIT FOOTPRINTING</p>
                        </div>
                    </div>
                    {onClose && (
                        <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-full transition-all active:scale-95 group">
                            <X className="w-8 h-8 text-slate-400 group-hover:text-white" />
                        </button>
                    )}
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 px-4">
                    <aside className="lg:col-span-4 space-y-8">
                        <div className="p-8 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-xl shadow-2xl">
                            <h3 className="text-white font-black mb-6 flex items-center gap-3 text-sm tech-font">
                                <Github className="w-5 h-5 text-orange-400" /> TARGET IDENTIFIER
                            </h3>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold ml-1">GitHub Username</Label>
                                    <Input
                                        placeholder="v0id_walker"
                                        className="h-12 bg-slate-950/50 border-white/10 text-white placeholder:text-slate-600 focus:ring-orange-500/50 rounded-xl"
                                        value={inputValue}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                                    />
                                </div>
                                <Button
                                    onClick={handleAnalyze}
                                    disabled={isAnalyzing || !inputValue}
                                    className="w-full h-14 bg-orange-600 hover:bg-orange-500 text-white font-black rounded-xl shadow-[0_0_20px_rgba(249,115,22,0.3)] transition-all active:scale-95"
                                >
                                    {isAnalyzing ? <Loader2 className="animate-spin mr-2" /> : <Terminal className="mr-2 w-5 h-5" />}
                                    AUDIT CODE CLOUD
                                </Button>
                                {error && (
                                    <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium animate-in slide-in-from-top-2">
                                        <AlertCircle className="w-4 h-4" /> {error}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-orange-500/5 border border-orange-500/20">
                            <div className="flex items-center gap-3 mb-4">
                                <Key className="w-4 h-4 text-orange-400" />
                                <h4 className="text-white text-[10px] font-bold uppercase tracking-widest">Secret Detection Scan</h4>
                            </div>
                            <p className="text-slate-400 text-[11px] leading-relaxed">
                                TraceMap audits public commit histories for patterns matching API keys, credentials, and sensitive configurations across the cloud.
                            </p>
                        </div>
                    </aside>

                    <main className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            {results ? (
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                                    <div className="p-10 rounded-[2.5rem] bg-slate-900/40 border-2 border-white/5 backdrop-blur-xl relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
                                            <GitBranch className="w-48 h-48 text-orange-400" />
                                        </div>
                                        <div className="relative z-10">
                                            <h4 className="text-white text-3xl font-black mb-10 tech-font uppercase tracking-tighter">Code Exposure Report</h4>
                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                                                {Object.entries(results.exposure_summary).map(([key, val]: any) => (
                                                    <div key={key} className="p-4 rounded-2xl bg-slate-950/40 border border-white/5">
                                                        <p className="text-[10px] text-orange-400 font-bold uppercase tracking-widest mb-2">{key.replace('_', ' ')}</p>
                                                        <p className="text-xl text-white font-black tech-font">{val}</p>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="space-y-4">
                                                <div className="flex justify-between items-end">
                                                    <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Composite Risk Level: {results.risk_level}</span>
                                                    <span className="text-orange-400 font-black tech-font text-lg">{results.risk_score} / 10.0</span>
                                                </div>
                                                <div className="h-3 w-full bg-slate-950 rounded-full overflow-hidden border border-white/5 p-0.5">
                                                    <motion.div
                                                        className="h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full shadow-[0_0_15px_rgba(249,115,22,0.5)]"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${results.risk_score * 10}%` }}
                                                        transition={{ duration: 1.5, ease: 'circOut' }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-10 rounded-[2.5rem] bg-slate-900/40 border border-white/5 backdrop-blur-xl">
                                        <h5 className="text-white font-black mb-10 uppercase text-lg tracking-widest flex items-center gap-4 tech-font">
                                            <Shield className="w-6 h-6 text-orange-400" /> GEMINI AI ADVISORY
                                        </h5>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                            <div className="space-y-6">
                                                {results.ai_explanation.map((bullet: string, i: number) => (
                                                    <div key={i} className="p-6 rounded-2xl bg-slate-950/40 border border-white/5 text-sm text-slate-300 leading-relaxed italic relative">
                                                        <span className="absolute -top-3 left-4 px-2 py-0.5 bg-orange-500 text-slate-950 text-[8px] font-black rounded-full">TRANSCRIPT 0{i + 1}</span>
                                                        "{bullet}"
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="space-y-8">
                                                <h6 className="text-orange-400 text-xs font-black uppercase tracking-[0.2em] border-b border-orange-500/20 pb-4">Targeted Mitigations</h6>
                                                <ul className="space-y-4">
                                                    {results.recommendations.map((rec: string, i: number) => (
                                                        <li key={i} className="flex items-start gap-4 text-slate-400 text-xs group hover:text-white transition-colors">
                                                            <div className="mt-1">
                                                                <AlertCircle className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform" />
                                                            </div>
                                                            <span className="leading-relaxed">{rec}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="h-full min-h-[600px] flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[2.5rem] bg-slate-900/10">
                                    <Terminal className="w-24 h-24 text-slate-800 animate-pulse mb-8" />
                                    <p className="text-slate-600 font-black text-sm tracking-[0.4em] tech-font uppercase">Audit Engine Standby</p>
                                    <p className="text-slate-700 text-xs mt-4">Connect to cloud repository to initiate scan...</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </main>
                </div>
            </div>
        </div>
    );
}
