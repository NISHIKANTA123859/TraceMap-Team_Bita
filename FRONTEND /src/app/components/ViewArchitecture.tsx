import { motion } from 'motion/react';
import { User, Layers, Database, Cpu, Shield, Layout, X, ArrowRight } from 'lucide-react';

const architectureSteps = [
    {
        id: 'input',
        title: 'User Input',
        icon: User,
        description: 'Identifier ingestion (Email, Username, or Domain).',
        details: ['Format Validation', 'Consent Verification', 'Target Normalization'],
        color: '#00f5ff'
    },
    {
        id: 'osint',
        title: 'OSINT Collection Layer',
        icon: Layers,
        description: 'Multi-modal data harvesting from public repositories.',
        details: ['Text OSINT', 'Metadata Extraction', 'Commit Analysis', 'Geospatial Signals'],
        color: '#00ff88'
    },
    {
        id: 'normalization',
        title: 'Data Normalization',
        icon: Database,
        description: 'Cleaning and structuring harvested data.',
        details: ['Noise Removal', 'Tokenization', 'Deduplication', 'Entity Resolution'],
        color: '#4cc9f0'
    },
    {
        id: 'fusion',
        title: 'Fusion Engine',
        icon: Cpu,
        description: 'Correlation of cross-platform signals.',
        details: ['Identity Linking', 'Relationship Mapping', 'Graph Construction'],
        color: '#7209b7'
    },
    {
        id: 'scoring',
        title: 'Risk Scoring Engine',
        icon: Shield,
        description: 'Rule-based quantitative assessment.',
        details: ['CVSS 0-10 Scale', 'Weighted Factors', 'Classification Engine'],
        color: '#f72585'
    },
    {
        id: 'ai',
        title: 'Gemini AI Layer',
        icon: Cpu,
        description: 'Natural language risk interpretation.',
        details: ['Explainable Context', 'Awareness Tone', 'Actionable Insights'],
        color: '#3a0ca3'
    },
    {
        id: 'viz',
        title: 'Visualization Dashboard',
        icon: Layout,
        description: 'Real-time reporting and interactive insights.',
        details: ['Risk Dial', 'Exposure Cards', 'Privacy Audit'],
        color: '#4361ee'
    }
];

export function ViewArchitecture({ onClose }: { onClose?: () => void }) {
    return (
        <div className="min-h-screen bg-[#0a0f1c]/95 backdrop-blur-3xl animate-in fade-in duration-500 overflow-y-auto">
            <div className="max-container py-12 md:py-20">
                {/* Header */}
                <header className="flex justify-between items-center mb-16 px-4">
                    <div className="flex items-center gap-6">
                        <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                            <Cpu className="w-7 h-7 text-indigo-400" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-black text-white uppercase tracking-tighter tech-font">System Blueprint</h2>
                            <p className="text-indigo-400 text-xs font-mono tracking-widest mt-1">DFFE // CORE INFRASTRUCTURE & DATA FUSION</p>
                        </div>
                    </div>
                    {onClose && (
                        <button onClick={onClose} className="p-3 hover:bg-white/10 rounded-full transition-all active:scale-95 group">
                            <X className="w-8 h-8 text-slate-400 group-hover:text-white" />
                        </button>
                    )}
                </header>

                {/* Architecture Flow */}
                <div className="relative px-4">
                    {/* Connecting Line */}
                    <div className="absolute left-[59px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-500 via-indigo-600 to-purple-500 opacity-20 hidden md:block" />

                    <div className="space-y-12">
                        {architectureSteps.map((step, index) => (
                            <motion.div
                                key={step.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`relative flex flex-col md:flex-row items-start md:items-center gap-12 ${index % 2 === 0 ? '' : 'md:flex-row-reverse'}`}
                            >
                                {/* Step Marker */}
                                <div className="relative z-10 flex-shrink-0 w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center shadow-2xl group overflow-hidden">
                                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <step.icon className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-500 group-hover:scale-110" style={{ color: step.color }} />
                                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-slate-950 border border-white/10 rounded-tl-lg flex items-center justify-center text-[10px] text-white font-black font-mono">
                                        0{index + 1}
                                    </div>
                                </div>

                                {/* Content Card */}
                                <div className="flex-1 p-8 rounded-[2rem] bg-slate-900/40 border border-white/5 backdrop-blur-xl group hover:border-white/10 transition-all relative">
                                    <div className="absolute top-0 left-0 w-2 h-full rounded-l-[2rem]" style={{ backgroundColor: step.color }} />
                                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                                        <div className="max-w-xl">
                                            <h3 className="text-white text-2xl font-black mb-3 tech-font uppercase tracking-tighter group-hover:text-indigo-400 transition-colors">{step.title}</h3>
                                            <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
                                        </div>
                                        <div className="flex flex-wrap gap-3">
                                            {step.details.map((detail, i) => (
                                                <span key={i} className="px-4 py-2 rounded-xl bg-slate-950 border border-white/5 text-[10px] text-slate-300 font-bold tracking-widest uppercase">
                                                    {detail}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Order Indicator */}
                                {index < architectureSteps.length - 1 && (
                                    <div className="absolute -bottom-12 left-8 md:left-1/2 md:-translate-x-1/2 opacity-20">
                                        <ArrowRight className="w-6 h-6 rotate-90" />
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Safeguards Grid */}
                <div className="mt-28 grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
                    <div className="p-8 rounded-3xl bg-red-500/5 border border-red-500/20 group hover:bg-red-500/10 transition-colors">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                                <Shield className="w-5 h-5 text-red-500" />
                            </div>
                            <h4 className="text-red-400 font-black text-xs uppercase tracking-[0.2em] tech-font">Ethical Safeguards</h4>
                        </div>
                        <p className="text-slate-500 text-xs leading-relaxed font-medium">
                            TraceMap strictly adheres to a "No-Exploitation" policy. Every layer of the DFFE is designed for passive data collection and awareness simulation. No unauthorized access attempts or brute-force activities are performed.
                        </p>
                    </div>
                    <div className="p-8 rounded-3xl bg-cyan-500/5 border border-cyan-500/20 group hover:bg-cyan-500/10 transition-colors">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center">
                                <Cpu className="w-5 h-5 text-cyan-400" />
                            </div>
                            <h4 className="text-cyan-400 font-black text-xs uppercase tracking-[0.2em] tech-font">Academic Scope</h4>
                        </div>
                        <p className="text-slate-500 text-xs leading-relaxed font-medium">
                            TraceMap is an academic OSINT awareness system designed for ethical cybersecurity research. It demonstrates how fragmented digital footprints can be fused into a unified intelligence graph.
                        </p>
                    </div>
                </div>

                {/* Footer Note */}
                <div className="mt-20 pt-10 border-t border-white/5 text-center">
                    <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.4em] italic opacity-60">
                        // DFFE SYSTEM ARCHITECTURE REV 4.0 // SECURE BLUEPRINT //
                    </p>
                </div>
            </div>
        </div>
    );
}
