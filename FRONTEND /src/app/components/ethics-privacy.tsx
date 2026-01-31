import { motion } from 'motion/react';
import { Check, Shield, Lock, Eye, Users, FileText, AlertTriangle, BookOpen } from 'lucide-react';

const ethicsPoints = [
  {
    icon: Eye,
    title: 'Only Publicly Available Data',
    description: 'We exclusively collect information that is openly accessible on the internet without any authentication requirements.',
  },
  {
    icon: Lock,
    title: 'No Private or Restricted Access',
    description: 'Zero attempts to access password-protected content, private profiles, or restricted databases.',
  },
  {
    icon: AlertTriangle,
    title: 'No Hacking or Exploitation',
    description: 'No use of vulnerability exploitation, credential stuffing, or any unauthorized access methods.',
  },
  {
    icon: Users,
    title: 'User Consent and Transparency',
    description: 'Users are informed about data collection methods and results, promoting awareness and control.',
  },
  {
    icon: Shield,
    title: 'Responsible OSINT Practices',
    description: 'Adheres to ethical intelligence gathering standards and respects digital privacy boundaries.',
  },
  {
    icon: BookOpen,
    title: 'Educational Purpose Only',
    description: 'Designed for academic research, privacy awareness education, and personal security assessment.',
  },
];

export function EthicsPrivacy() {
  return (
    <section className="relative py-24 bg-[#0a0f1c] overflow-hidden min-h-screen">
      {/* Background Decorations */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 h-full w-full"
          style={{
            backgroundImage: `linear-gradient(#00f2ff 1px, transparent 1px), linear-gradient(90deg, #00f2ff 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            opacity: 0.05
          }}
        />
      </div>

      <div className="relative z-10 max-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter tech-font">
            Ethical Framework
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto font-mono tracking-widest uppercase text-xs">
            DFFE // TRUST & PRIVACY PROTOCOLS
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center px-4">
          {/* Left: Shield Graphic */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              <motion.div
                animate={{
                  scale: [1, 1.02, 1],
                  filter: ['brightness(1)', 'brightness(1.2)', 'brightness(1)']
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="relative z-10"
              >
                <div className="w-72 h-80 mx-auto relative flex items-center justify-center">
                  <div className="absolute inset-0 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" />
                  <Shield className="w-56 h-56 text-cyan-400 drop-shadow-[0_0_30px_rgba(6,182,212,0.5)]" strokeWidth={1} />
                </div>
              </motion.div>

              {/* Orbiting Elements */}
              {[Lock, Eye, Shield].map((Icon, i) => {
                const angle = (i * 120) - 90;
                const radius = 160;
                const x = Math.cos((angle * Math.PI) / 180) * radius;
                const y = Math.sin((angle * Math.PI) / 180) * radius;

                return (
                  <motion.div
                    key={i}
                    className="absolute left-1/2 top-1/2 scale-75 md:scale-100"
                    style={{
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                    animate={{
                      rotate: [0, 360],
                    }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  >
                    <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-cyan-500/50 flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                      <Icon className="w-6 h-6 text-cyan-400" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* Right: Ethics Points */}
          <div className="space-y-4">
            {ethicsPoints.map((point, index) => (
              <motion.div
                key={point.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-slate-900/40 border border-white/5 backdrop-blur-xl group hover:border-cyan-500/30 transition-all"
              >
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-cyan-500/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <point.icon className="w-4 h-4 text-cyan-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-white font-black uppercase tracking-wider text-sm mb-2 tech-font group-hover:text-cyan-400 transition-colors">{point.title}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                  <Check className="w-4 h-4 text-green-500 opacity-0 group-hover:opacity-100 transition-opacity mt-1" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Commitment Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-24 p-12 rounded-[2.5rem] bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-2 border-white/5 backdrop-blur-3xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-12 opacity-5">
            <Shield className="w-48 h-48" />
          </div>
          <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
            <div className="w-20 h-20 rounded-2xl bg-cyan-500/20 flex items-center justify-center flex-shrink-0 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
              <FileText className="w-10 h-10 text-cyan-400" />
            </div>
            <div>
              <h3 className="text-white text-3xl font-black mb-4 tech-font uppercase tracking-tighter">Forensic Accountability</h3>
              <p className="text-slate-300 leading-relaxed mb-6 max-w-3xl">
                TraceMap operates within the strict legal and ethical boundaries of Open Source Intelligence.
                Our simulation maps educational awareness of digital footprints without persisting private PII.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="px-4 py-2 rounded-full bg-slate-950/50 border border-white/10 text-[10px] text-cyan-400 font-black uppercase tracking-widest">
                  Academic Research Only
                </div>
                <div className="px-4 py-2 rounded-full bg-slate-950/50 border border-white/10 text-[10px] text-green-400 font-black uppercase tracking-widest">
                  Ethical Hacking Standard
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
