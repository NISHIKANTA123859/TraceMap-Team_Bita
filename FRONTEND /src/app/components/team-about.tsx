import { motion } from 'motion/react';
import { Github, Linkedin, Mail, Award, Target } from 'lucide-react';

export function TeamAbout() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-[#0a0e27] to-[#0d1117] overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-[#00f5ff] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-[#00ff88] rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-1 w-20 bg-gradient-to-r from-[#00f5ff] to-[#00ff88]" />
            <span className="text-[#00f5ff] uppercase tracking-wider text-sm">About</span>
            <div className="h-1 w-20 bg-gradient-to-r from-[#00ff88] to-[#00f5ff]" />
          </div>
          <h2 className="text-5xl text-white mb-4">
            Team & Project
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative p-10 rounded-2xl bg-gradient-to-br from-[#1a1f3a] to-[#0a0e27] border-2 border-[#00f5ff]"
          style={{ boxShadow: '0 0 60px rgba(0, 245, 255, 0.3)' }}
        >
          {/* Logo/Icon */}
          <div className="flex justify-center mb-8">
            <motion.div
              animate={{
                rotate: [0, 360],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="relative w-24 h-24"
            >
              <div className="absolute inset-0 border-4 border-[#00f5ff] rounded-full opacity-50" />
              <div className="absolute inset-2 border-2 border-[#00ff88] rounded-full opacity-70" />
              <div className="absolute inset-4 bg-gradient-to-br from-[#00f5ff] to-[#00ff88] rounded-full" 
                   style={{ boxShadow: '0 0 40px rgba(0, 245, 255, 0.6)' }} />
            </motion.div>
          </div>

          {/* Project Name */}
          <h3 
            className="text-4xl text-center mb-3"
            style={{
              background: 'linear-gradient(to right, #00f5ff, #00ff88)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            TraceMap – DFFE
          </h3>
          <p className="text-center text-[#c9d1d9] text-lg mb-8">
            Digital Footprint Fusion Engine
          </p>

          {/* Hackathon Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 rounded-xl bg-[#0a0e27] border border-[#00f5ff]/30">
              <div className="flex items-center gap-3 mb-3">
                <Award className="w-6 h-6 text-[#00f5ff]" />
                <h4 className="text-white">Hackathon</h4>
              </div>
              <p className="text-[#8b949e]">CHAKRAVYUH 1.0</p>
              <p className="text-[#00f5ff] text-sm mt-1">National Cybersecurity Challenge</p>
            </div>

            <div className="p-6 rounded-xl bg-[#0a0e27] border border-[#00ff88]/30">
              <div className="flex items-center gap-3 mb-3">
                <Target className="w-6 h-6 text-[#00ff88]" />
                <h4 className="text-white">Problem Statement</h4>
              </div>
              <p className="text-[#8b949e]">GITACVPS001</p>
              <p className="text-[#00ff88] text-sm mt-1">OSINT & Digital Footprint Analysis</p>
            </div>
          </div>

          {/* Developer Section */}
          <div className="p-8 rounded-xl bg-gradient-to-br from-[#0a0e27] to-[#1a1f3a] border border-[#00f5ff]/50">
            <div className="text-center mb-6">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#00f5ff] to-[#00ff88] flex items-center justify-center"
                   style={{ boxShadow: '0 0 40px rgba(0, 245, 255, 0.5)' }}>
                <span className="text-3xl text-black">NS</span>
              </div>
              <h4 className="text-white text-2xl mb-2">Nishikanta Sethi</h4>
              <p className="text-[#8b949e]">Developer & Security Researcher</p>
            </div>

            {/* Social Links */}
            <div className="flex justify-center gap-4">
              <motion.a
                whileHover={{ scale: 1.1, y: -5 }}
                href="#"
                className="w-12 h-12 rounded-full bg-[#1a1f3a] border border-[#00f5ff]/50 flex items-center justify-center hover:border-[#00f5ff] transition-colors"
                style={{ boxShadow: '0 0 20px rgba(0, 245, 255, 0.2)' }}
              >
                <Github className="w-5 h-5 text-[#00f5ff]" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -5 }}
                href="#"
                className="w-12 h-12 rounded-full bg-[#1a1f3a] border border-[#00f5ff]/50 flex items-center justify-center hover:border-[#00f5ff] transition-colors"
                style={{ boxShadow: '0 0 20px rgba(0, 245, 255, 0.2)' }}
              >
                <Linkedin className="w-5 h-5 text-[#00f5ff]" />
              </motion.a>
              <motion.a
                whileHover={{ scale: 1.1, y: -5 }}
                href="#"
                className="w-12 h-12 rounded-full bg-[#1a1f3a] border border-[#00f5ff]/50 flex items-center justify-center hover:border-[#00f5ff] transition-colors"
                style={{ boxShadow: '0 0 20px rgba(0, 245, 255, 0.2)' }}
              >
                <Mail className="w-5 h-5 text-[#00f5ff]" />
              </motion.a>
            </div>
          </div>

          {/* Project Description */}
          <div className="mt-8 p-6 rounded-xl bg-[#0a0e27] border border-[#00ff88]/30">
            <p className="text-[#c9d1d9] leading-relaxed text-center">
              An innovative OSINT solution that aggregates and analyzes digital footprints across multiple 
              platforms to provide comprehensive exposure assessment and risk classification. Built with 
              ethical practices at its core, TraceMap serves as an educational tool for cybersecurity 
              awareness and personal privacy management.
            </p>
          </div>

          {/* Tech Stack Tags */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {['React', 'Node.js', 'Python', 'MongoDB', 'Express', 'OSINT APIs'].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 rounded-full bg-[#0a0e27] border border-[#00f5ff]/30 text-[#00f5ff] text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 text-center"
        >
          <p className="text-[#8b949e] text-sm">
            Developed with ❤️ for ethical cybersecurity education and privacy awareness
          </p>
        </motion.div>
      </div>
    </section>
  );
}
