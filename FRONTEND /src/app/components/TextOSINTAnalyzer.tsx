import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Shield, AlertCircle, Loader2, CheckCircle2, User, Mail, X, History, Globe } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';

export function TextOSINTAnalyzer({ onClose }: { onClose?: () => void }) {
    const [inputType, setInputType] = useState<'Email' | 'Username'>('Email');
    const [inputValue, setInputValue] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [isAuthorized, setIsAuthorized] = useState(false);

    const handleAnalyze = async () => {
        if (!isAuthorized) {
            setError("You must authorize analysis to proceed.");
            return;
        }
        if (!inputValue) return;

        setIsAnalyzing(true);
        setError(null);
        setResults(null);

        try {
            const response = await fetch('http://localhost:5000/analyze/text-osint', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    input_value: inputValue,
                    input_type: inputType,
                    authorized: true
                }),
            });

            if (!response.ok) throw new Error('Analysis failed');
            const data = await response.json();
            setResults(data);
        } catch (err: any) {
            setError('TraceMap Identity Engine is currently unresponsive.');
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0f1c]/95 backdrop-blur-3xl animate-in fade-in duration-500">
            <div className="max-container py-12 md:py-20">
                <header className="flex justify-between items-center mb-16 px-4">
                    <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                            <Search className="w-7 h-7 text-cyan-400" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-white uppercase tracking-tighter tech-font">Text OSINT Engine</h2>
                            <p className="text-cyan-400 text-xs font-mono tracking-widest mt-1">DFFE // IDENTITY CORRELATION LAYER</p>
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
                            <div className="flex bg-slate-800/50 p-1.5 rounded-2xl mb-8 border border-white/5">
                                <button
                                    onClick={() => setInputType('Email')}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${inputType === 'Email' ? 'bg-cyan-500 text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}
                                >
                                    <Mail className="w-4 h-4" /> EMAIL
                                </button>
                                <button
                                    onClick={() => setInputType('Username')}
                                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${inputType === 'Username' ? 'bg-cyan-500 text-slate-900 shadow-lg' : 'text-slate-400 hover:text-white'}`}
                                >
                                    <User className="w-4 h-4" /> USERNAME
                                </button>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-[10px] text-slate-500 uppercase tracking-widest font-bold ml-1">Target Identifier</Label>
                                    <Input
                                        placeholder={inputType === 'Email' ? 'hacker@example.com' : 'v0id_walker'}
                                        className="h-12 bg-slate-950/50 border-white/10 text-white placeholder:text-slate-600 focus:ring-cyan-500/50 rounded-xl"
                                        value={inputValue}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                                    />
                                </div>

                                <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/10 flex items-start gap-3">
                                    <Checkbox
                                        id="authorize"
                                        checked={isAuthorized}
                                        onCheckedChange={(checked) => setIsAuthorized(checked as boolean)}
                                        className="mt-1 border-cyan-500/50 data-[state=checked]:bg-cyan-500"
                                    />
                                    <div className="grid gap-1.5 leading-none">
                                        <label htmlFor="authorize" className="text-xs text-slate-400 font-medium cursor-pointer select-none">
                                            I authorize the fusion engine to map publicly available digital signals for this target.
                                        </label>
                                    </div>
                                </div>

                                <Button
                                    onClick={handleAnalyze}
                                    disabled={isAnalyzing || !inputValue}
                                    className="w-full h-14 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-black rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all active:scale-95"
                                >
                                    {isAnalyzing ? <Loader2 className="animate-spin mr-2" /> : <Shield className="mr-2 w-5 h-5" />}
                                    INITIATE FUSION SCAN
                                </Button>

                                {error && (
                                    <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium animate-in slide-in-from-top-2">
                                        <AlertCircle className="w-4 h-4" /> {error}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="p-6 rounded-2xl bg-slate-950/30 border border-white/5">
                            <h4 className="flex items-center gap-2 text-[10px] text-cyan-400 font-bold uppercase tracking-widest mb-4">
                                <History className="w-3 h-3" /> Recent Extractions
                            </h4>
                            <div className="space-y-3 opacity-40">
                                <div className="flex justify-between text-[11px] text-slate-400 border-b border-white/5 pb-2">
                                    <span>user_x_alpha</span>
                                    <span>3.4 MEDIUM</span>
                                </div>
                                <div className="flex justify-between text-[11px] text-slate-400">
                                    <span>secure_dev_99</span>
                                    <span>1.2 LOW</span>
                                </div>
                            </div>
                        </div>
                    </aside>

                    <main className="lg:col-span-8 space-y-8">
                        <AnimatePresence mode="wait">
                            {results ? (
                                <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="p-8 rounded-3xl bg-slate-900/40 border border-white/5 backdrop-blur-xl flex flex-col items-center justify-center text-center">
                                            <div className="relative w-40 h-40 mb-6 flex items-center justify-center">
                                                <svg className="w-full h-full -rotate-90">
                                                    <circle cx="80" cy="80" r="70" fill="none" stroke="currentColor" strokeWidth="8" className="text-slate-800" />
                                                    <circle cx="80" cy="80" r="70" fill="none" stroke="currentColor" strokeWidth="8" className="text-cyan-500 transition-all duration-1000"
                                                        strokeDasharray={440} strokeDashoffset={440 - (results.risk_score / 10) * 440} strokeLinecap="round" />
                                                </svg>
                                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                                    <span className="text-4xl font-black text-white tech-font">{results.risk_score}</span>
                                                    <span className="text-[10px] text-slate-500 font-bold uppercase">Exposure</span>
                                                </div>
                                            </div>
                                            <div className={`px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.2em] mb-2 ${results.risk_level === 'CRITICAL' ? 'bg-red-500 text-white' :
                                                    results.risk_level === 'HIGH' ? 'bg-orange-500 text-white' :
                                                        results.risk_level === 'MEDIUM' ? 'bg-yellow-500 text-black' : 'bg-green-500 text-white'
                                                }`}>
                                                {results.risk_level}
                                            </div>
                                            <p className="text-xs text-slate-500 max-w-[200px]">Composite normalized risk score extracted from fused signal layers.</p>
                                        </div>

                                        <div className="grid grid-cols-1 gap-4">
                                            {Object.entries(results.exposure_summary).map(([key, val]: any) => (
                                                <div key={key} className="p-5 rounded-2xl bg-slate-900/40 border border-white/5 backdrop-blur-xl group hover:bg-slate-800/60 transition-colors">
                                                    <p className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest mb-1">{key.replace('_', ' ')}</p>
                                                    <p className="text-white font-medium">{val}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="p-8 rounded-3xl bg-gradient-to-br from-cyan-500/5 to-purple-500/5 border border-white/10 backdrop-blur-xl relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                            <Shield className="w-32 h-32" />
                                        </div>
                                        <h4 className="text-white font-black uppercase tracking-wider mb-8 flex items-center gap-3 text-lg tech-font">
                                            <Globe className="w-5 h-5 text-cyan-400" /> AI-Generated Forensic Log
                                        </h4>
                                        <div className="space-y-6 relative z-10">
                                            {results.ai_explanation.map((bullet: string, i: number) => (
                                                <div key={i} className="flex gap-5 items-start p-5 rounded-2xl bg-slate-950/40 border border-white/5 group hover:border-cyan-500/30 transition-all">
                                                    <div className="w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0 text-cyan-400 font-black text-xs">
                                                        {i + 1}
                                                    </div>
                                                    <p className="text-sm text-slate-300 leading-relaxed group-hover:text-white transition-colors">{bullet}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400/60 text-[10px] uppercase font-mono tracking-tighter justify-center">
                                        <AlertCircle className="w-3 h-3" /> {results.disclaimer}
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="h-full min-h-[500px] flex flex-col items-center justify-center rounded-3xl border-2 border-dashed border-white/5 bg-slate-900/10">
                                    <div className="relative mb-8">
                                        <Globe className="w-24 h-24 text-slate-800 animate-pulse" />
                                        <div className="absolute inset-0 border-2 border-cyan-500 animate-ping rounded-full opacity-20" />
                                    </div>
                                    <p className="text-slate-600 font-bold uppercase tracking-widest tech-font">Awaiting System Input...</p>
                                    <p className="text-slate-700 text-xs mt-4">TraceMap identity correlation layers are idling.</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </main>
                </div>
            </div>
        </div>
    );
}
