import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, Image as ImageIcon, Shield, AlertCircle, Loader2, X, Download, Eye, Scan } from 'lucide-react';
import { Button } from './ui/button';

export function ImageOSINTAnalyzer({ onClose }: { onClose?: () => void }) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [results, setResults] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                setError("File size exceeds 10MB limit.");
                setSelectedFile(null);
                return;
            }
            setSelectedFile(file);
            setError(null);
        }
    };

    const handleAnalyze = async () => {
        if (!selectedFile) {
            setError("Please upload an image for analysis.");
            return;
        }

        setIsAnalyzing(true);
        setError(null);
        setResults(null);

        try {
            const response = await fetch('http://localhost:5000/analyze/image-osint', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    authorized: true,
                    input_value: selectedFile.name
                }),
            });

            if (!response.ok) throw new Error('Image analysis failed');
            const data = await response.json();
            setResults(data);
        } catch (err: any) {
            setError('Failed to connect to TraceMap Image Engine');
        } finally {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0f1c]/95 backdrop-blur-3xl animate-in fade-in duration-500">
            <div className="max-container py-12 md:py-20">
                <header className="flex justify-between items-center mb-16 px-4">
                    <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                            <Camera className="w-7 h-7 text-purple-400" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-white uppercase tracking-tighter tech-font">Image OSINT Engine</h2>
                            <p className="text-purple-400 text-xs font-mono tracking-widest mt-1">DFFE // VISUAL INTELLIGENCE LAYER</p>
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
                        <div className="p-10 rounded-3xl bg-slate-900/40 border-2 border-dashed border-purple-500/20 backdrop-blur-xl flex flex-col items-center justify-center text-center group hover:border-purple-500/50 transition-all">
                            <ImageIcon className="w-16 h-16 text-purple-500/20 mb-6 group-hover:text-purple-400/40 transition-colors" />
                            <p className="text-sm text-slate-400 mb-8 max-w-[200px] leading-relaxed">
                                {selectedFile ? (
                                    <span className="text-purple-400 font-bold">{selectedFile.name}</span>
                                ) : (
                                    "Drop forensic image here or click to upload (Max 10MB)"
                                )}
                            </p>

                            <input
                                type="file"
                                id="image-upload"
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                            />

                            <div className="w-full space-y-4">
                                <Button
                                    onClick={() => document.getElementById('image-upload')?.click()}
                                    disabled={isAnalyzing}
                                    className="w-full h-12 bg-purple-600/10 border border-purple-500/50 text-purple-400 hover:bg-purple-600 hover:text-white font-bold rounded-xl transition-all"
                                >
                                    <ImageIcon className="mr-2 w-4 h-4" />
                                    {selectedFile ? "CHANGE IMAGE" : "SELECT IMAGE"}
                                </Button>

                                <Button
                                    onClick={handleAnalyze}
                                    disabled={isAnalyzing || !selectedFile}
                                    className="w-full h-14 bg-purple-600 hover:bg-purple-500 text-white font-black rounded-xl shadow-lg shadow-purple-600/20 transition-all active:scale-95"
                                >
                                    {isAnalyzing ? <Loader2 className="animate-spin mr-2" /> : <Download className="mr-2 w-5 h-5" />}
                                    INITIATE IMAGE SCAN
                                </Button>
                            </div>

                            {error && (
                                <div className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-medium animate-in slide-in-from-top-2">
                                    <AlertCircle className="w-4 h-4 mx-auto mb-2" /> {error}
                                </div>
                            )}
                        </div>

                        <div className="p-6 rounded-2xl bg-slate-950/30 border border-white/5">
                            <h4 className="flex items-center gap-2 text-[10px] text-purple-400 font-bold uppercase tracking-widest mb-4">
                                <Shield className="w-3 h-3" /> Visual Security Specs
                            </h4>
                            <ul className="space-y-2">
                                <li className="text-[11px] text-slate-500 flex justify-between">
                                    <span>Resolution Limit:</span>
                                    <span className="text-slate-300">4K (UHD)</span>
                                </li>
                                <li className="text-[11px] text-slate-500 flex justify-between">
                                    <span>Metadata Parsing:</span>
                                    <span className="text-slate-300">EXIF / IPTC</span>
                                </li>
                            </ul>
                        </div>
                    </aside>

                    <main className="lg:col-span-8">
                        <AnimatePresence mode="wait">
                            {results ? (
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {Object.entries(results.exposure_summary).map(([key, val]: any) => (
                                            <div key={key} className="p-5 rounded-2xl bg-slate-900/40 border border-white/5 backdrop-blur-xl group hover:bg-slate-800/60 transition-colors">
                                                <p className="text-[10px] text-purple-400 font-bold uppercase tracking-widest mb-1">{key.replace('_', ' ')}</p>
                                                <p className="text-sm text-white font-medium">{val}</p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="p-10 rounded-3xl bg-gradient-to-br from-purple-900/10 to-transparent border border-purple-500/20 backdrop-blur-xl relative overflow-hidden group">
                                        <div className="flex items-center gap-4 mb-8">
                                            <Eye className="w-8 h-8 text-purple-400" />
                                            <div>
                                                <h4 className="text-white font-black uppercase tracking-wider text-xl tech-font">Visual Forensics Report</h4>
                                                <p className="text-[10px] text-purple-400 font-mono tracking-widest">GEMINI-1.5-FLASH AI SUBSYSTEM</p>
                                            </div>
                                        </div>

                                        <div className="space-y-6">
                                            {results.ai_explanation.map((bullet: string, i: number) => (
                                                <div key={i} className="flex gap-6 p-6 rounded-2xl bg-black/40 border border-white/5 group hover:border-purple-500/30 transition-all">
                                                    <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0 text-purple-400 font-black text-sm">
                                                        0{i + 1}
                                                    </div>
                                                    <p className="text-sm text-slate-300 leading-relaxed group-hover:text-white transition-colors">{bullet}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-6 rounded-2xl bg-red-500/5 border border-red-500/20 shadow-lg">
                                        <div className="flex items-center gap-3">
                                            <AlertCircle className="w-5 h-5 text-red-400" />
                                            <span className="text-red-400 text-xs font-black uppercase tracking-[0.2em]">Composite Risk Index</span>
                                        </div>
                                        <div className="flex items-baseline gap-1">
                                            <span className="text-3xl font-black text-white tech-font">{results.risk_score}</span>
                                            <span className="text-slate-500 text-xs font-bold">/ 10.0</span>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="h-full min-h-[500px] flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-3xl bg-slate-900/10">
                                    <Scan className="w-20 h-20 text-slate-800 animate-pulse mb-6" />
                                    <p className="text-slate-600 font-bold uppercase tracking-widest tech-font">System Ready for Injection</p>
                                    <p className="text-slate-700 text-xs mt-4">Waiting for visual forensic stream...</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </main>
                </div>
            </div>
        </div>
    );
}
