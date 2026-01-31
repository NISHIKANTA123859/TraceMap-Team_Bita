import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Shield, User, Mail, Lock, LogIn, Cpu } from 'lucide-react';

interface LoginViewProps {
    onLogin: (userData: { name: string; email: string }) => void;
}

export function LoginView({ onLogin }: LoginViewProps) {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [isHovered, setIsHovered] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        setMousePos({ x, y });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.name && formData.email) {
            onLogin({ name: formData.name, email: formData.email });
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[#060a14] relative overflow-hidden font-sans">
            {/* Animated Cyber Grid Background */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: `linear-gradient(#00f2ff 1px, transparent 1px), linear-gradient(90deg, #00f2ff 1px, transparent 1px)`,
                        backgroundSize: '50px 50px',
                        perspective: '1000px',
                        transform: 'rotateX(60deg) translateY(-20%)',
                    }}
                />
            </div>

            {/* Glowing Orbs */}
            <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full animate-pulse" />

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-10 w-full max-w-md px-4"
            >
                {/* 3D Card Container */}
                <div
                    ref={cardRef}
                    onMouseMove={handleMouseMove}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => {
                        setIsHovered(false);
                        setMousePos({ x: 0, y: 0 });
                    }}
                    style={{
                        transform: isHovered
                            ? `perspective(1000px) rotateY(${mousePos.x * 20}deg) rotateX(${mousePos.y * -20}deg)`
                            : 'perspective(1000px) rotateY(0deg) rotateX(0deg)',
                        transition: isHovered ? 'none' : 'transform 0.5s ease-out'
                    }}
                    className="relative p-8 rounded-[2.5rem] bg-slate-900/40 border border-white/10 backdrop-blur-2xl shadow-2xl transition-all"
                >
                    {/* Interior Glows */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

                    {/* Logo & Header */}
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-slate-950 border border-cyan-500/30 shadow-[0_0_30px_rgba(6,182,212,0.2)] mb-6 overflow-hidden relative group">
                            <div className="absolute inset-0 bg-cyan-500/10 animate-pulse" />
                            <Shield className="w-10 h-10 text-cyan-400 relative z-10" />
                        </div>
                        <h1 className="text-3xl font-black text-white uppercase tracking-tighter tech-font mb-2">
                            TraceMap
                        </h1>
                        <p className="text-cyan-400/60 text-[10px] font-mono tracking-[0.4em] uppercase">
                            Secure Entry // DFFE v4.0.2
                        </p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest ml-1">Operator Name</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                                <input
                                    type="text"
                                    required
                                    placeholder="Enter your name"
                                    className="w-full h-14 bg-slate-950/50 border border-white/10 rounded-2xl pl-12 pr-4 text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all font-medium"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest ml-1">Gmail Identifier</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                                <input
                                    type="email"
                                    required
                                    placeholder="example.user@gmail.com"
                                    className="w-full h-14 bg-slate-950/50 border border-white/10 rounded-2xl pl-12 pr-4 text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all font-medium"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest ml-1">Pass-Key</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
                                <input
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    className="w-full h-14 bg-slate-950/50 border border-white/10 rounded-2xl pl-12 pr-4 text-white placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all font-medium"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full h-16 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-black rounded-2xl shadow-[0_0_30px_rgba(6,182,212,0.3)] transition-all active:scale-[0.98] active:shadow-inner flex items-center justify-center gap-3 group overflow-hidden relative"
                        >
                            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
                            <LogIn className="w-5 h-5" />
                            <span className="tracking-[0.2em] uppercase text-sm">Initialize Session</span>
                        </button>
                    </form>

                    {/* Footer Note */}
                    <div className="mt-10 pt-6 border-t border-white/5 text-center">
                        <p className="text-[9px] text-slate-600 font-black uppercase tracking-[0.3em] flex items-center justify-center gap-2">
                            <Cpu className="w-3 h-3" /> System Restricted // Authorize Only
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
