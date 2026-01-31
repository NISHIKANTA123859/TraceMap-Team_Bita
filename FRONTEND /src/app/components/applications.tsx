import { motion } from 'motion/react';
import { Eye, ShieldCheck, BookOpen, Lock } from 'lucide-react';

const applications = [
  {
    icon: Eye,
    title: 'Digital Privacy Awareness',
    description: 'Help individuals understand their online exposure and take control of their digital presence across multiple platforms.',
    color: '#00f5ff',
    stats: 'Raise Awareness',
  },
  {
    icon: ShieldCheck,
    title: 'Cybersecurity Risk Assessment',
    description: 'Enable security professionals to evaluate organizational digital footprints and identify potential attack vectors.',
    color: '#00ff88',
    stats: 'Prevent Attacks',
  },
  {
    icon: BookOpen,
    title: 'Educational Research',
    description: 'Provide academic institutions with tools for teaching OSINT methodologies and cybersecurity best practices.',
    color: '#0066ff',
    stats: 'Academic Use',
  },
  {
    icon: Lock,
    title: 'Personal Security Audit',
    description: 'Allow users to conduct self-assessments of their digital footprint and receive actionable privacy recommendations.',
    color: '#00f5ff',
    stats: 'Self Assessment',
  },
];

export function Applications() {
  return (
    <section className="relative py-24 bg-[#000000] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full">
          <pattern id="hexPattern" x="0" y="0" width="50" height="43.4" patternUnits="userSpaceOnUse">
            <path d="M25 0 L50 14.4 L50 28.9 L25 43.4 L0 28.9 L0 14.4 Z" 
                  fill="none" 
                  stroke="#00f5ff" 
                  strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#hexPattern)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-1 w-20 bg-gradient-to-r from-[#00f5ff] to-[#00ff88]" />
            <span className="text-[#00f5ff] uppercase tracking-wider text-sm">Use Cases</span>
            <div className="h-1 w-20 bg-gradient-to-r from-[#00ff88] to-[#00f5ff]" />
          </div>
          <h2 className="text-5xl text-white mb-4">
            Applications & Impact
          </h2>
          <p className="text-lg text-[#8b949e] max-w-2xl mx-auto">
            Real-world applications for privacy awareness and cybersecurity enhancement
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {applications.map((app, index) => (
            <motion.div
              key={app.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: `0 20px 60px ${app.color}40`,
              }}
              className="relative p-8 rounded-2xl bg-gradient-to-br from-[#1a1f3a] to-[#0a0e27] border-2 transition-all duration-300 cursor-pointer overflow-hidden group"
              style={{ borderColor: `${app.color}40` }}
            >
              {/* Background Gradient */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at top left, ${app.color}15, transparent 60%)`,
                }}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon and Badge */}
                <div className="flex items-start justify-between mb-6">
                  <div 
                    className="w-20 h-20 rounded-xl flex items-center justify-center border-2"
                    style={{ 
                      backgroundColor: `${app.color}15`,
                      borderColor: app.color,
                      boxShadow: `0 0 30px ${app.color}30`,
                    }}
                  >
                    <app.icon 
                      className="w-10 h-10" 
                      style={{ color: app.color }}
                      strokeWidth={1.5}
                    />
                  </div>
                  
                  <span 
                    className="px-3 py-1 rounded-full text-xs border"
                    style={{ 
                      color: app.color,
                      borderColor: `${app.color}50`,
                      backgroundColor: `${app.color}10`,
                    }}
                  >
                    {app.stats}
                  </span>
                </div>

                {/* Title */}
                <h3 
                  className="text-2xl mb-4 transition-colors"
                  style={{ color: app.color }}
                >
                  {app.title}
                </h3>

                {/* Description */}
                <p className="text-[#8b949e] leading-relaxed">
                  {app.description}
                </p>

                {/* Decorative Elements */}
                <div className="mt-6 flex gap-2">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: app.color }}
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Corner Decoration */}
              <div 
                className="absolute bottom-0 right-0 w-32 h-32 opacity-10 group-hover:opacity-20 transition-opacity"
                style={{
                  background: `radial-gradient(circle at bottom right, ${app.color}, transparent 70%)`,
                }}
              />
            </motion.div>
          ))}
        </div>

        {/* Impact Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 p-8 rounded-xl bg-[#1a1f3a] border border-[#00f5ff]/30 text-center max-w-4xl mx-auto"
        >
          <h3 className="text-white text-2xl mb-4">Making a Difference</h3>
          <p className="text-[#c9d1d9] leading-relaxed">
            TraceMap empowers individuals and organizations to understand their digital exposure, 
            promoting a culture of <span className="text-[#00f5ff]">privacy awareness</span> and 
            <span className="text-[#00ff88]"> proactive security</span> in an increasingly connected world.
          </p>
          
          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div>
              <div className="text-3xl text-[#00f5ff] mb-2">Multi-Modal</div>
              <div className="text-[#8b949e] text-sm">Data Sources</div>
            </div>
            <div>
              <div className="text-3xl text-[#00ff88] mb-2">Real-Time</div>
              <div className="text-[#8b949e] text-sm">Analysis</div>
            </div>
            <div>
              <div className="text-3xl text-[#0066ff] mb-2">Ethical</div>
              <div className="text-[#8b949e] text-sm">Practices</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
