import { motion } from 'motion/react';
import { Github, Linkedin, Mail, Twitter, Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative bg-[#060a14] border-t border-white/5 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 h-full w-full"
          style={{
            backgroundImage: `linear-gradient(#00f2ff 1px, transparent 1px), linear-gradient(90deg, #00f2ff 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
            opacity: 0.03
          }}
        />
      </div>

      <div className="relative z-10 max-container py-20 px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-16">
          {/* Left: Brand Identity */}
          <div className="md:col-span-4 space-y-6">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="flex items-center gap-4 cursor-pointer"
            >
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                <Shield className="w-6 h-6 text-cyan-400" />
              </div>
              <span className="text-3xl font-black text-white uppercase tracking-tighter tech-font">
                TraceMap
              </span>
            </motion.div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
              Advanced Digital Exposure Fusion Engine. Mapping public footprints to empower privacy awareness through ethical intelligence simulations.
            </p>
            <div className="flex gap-4">
              {[Github, Linkedin, Twitter, Mail].map((Icon, i) => (
                <motion.a
                  key={i}
                  whileHover={{ y: -4 }}
                  href="#"
                  className="w-10 h-10 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all"
                >
                  <Icon className="w-5 h-5 text-slate-400 hover:text-cyan-400" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Center: System Status */}
          <div className="md:col-span-4">
            <h4 className="text-white text-xs font-black uppercase tracking-[0.3em] mb-8 tech-font">System Metrics</h4>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold tracking-widest uppercase">
                <span>Backend Status</span>
                <span className="flex items-center gap-2 text-green-500">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Operational
                </span>
              </div>
              <div className="h-px bg-white/5 w-full" />
              <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold tracking-widest uppercase">
                <span>Security Protocol</span>
                <span className="text-cyan-400">DFFE v4.0</span>
              </div>
              <div className="h-px bg-white/5 w-full" />
              <div className="flex justify-between items-center text-[10px] text-slate-500 font-bold tracking-widest uppercase">
                <span>Region Scope</span>
                <span className="text-slate-300">Global Cloud</span>
              </div>
            </div>
          </div>

          {/* Right: Academic Disclaimer */}
          <div className="md:col-span-4 p-8 rounded-3xl bg-slate-950/50 border border-white/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Shield className="w-24 h-24" />
            </div>
            <h4 className="text-white text-xs font-black uppercase tracking-[0.3em] mb-4 tech-font">Forensic Notice</h4>
            <p className="text-slate-500 text-[11px] leading-relaxed relative z-10">
              TraceMap is an academic OSINT awareness system for ethical cybersecurity research. It demonstratest how fragmented digital footprints can be fused into a unified intelligence graph. No data is persisted beyond session activity.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <div className="px-3 py-1 rounded bg-cyan-500/10 border border-cyan-500/30 text-[8px] text-cyan-400 font-black uppercase tracking-widest">
                Educational Zero-Retention
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-600 text-[10px] font-black uppercase tracking-[0.2em]">
            © 2025 TraceMap Engine // Refined by <span className="text-slate-400">Nishikanta Sethi</span>
          </p>
          <div className="flex gap-8 text-[10px] text-slate-500 font-black uppercase tracking-widest">
            <a href="#" className="hover:text-cyan-400 transition-colors">Privacy</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Terms</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Ethics</a>
          </div>
        </div>
      </div>

      {/* Footer Edge Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-screen h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
    </footer>
  );
}
