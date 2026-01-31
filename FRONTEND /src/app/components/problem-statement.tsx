import { motion } from 'motion/react';
import { Shield, AlertTriangle, Globe, Users } from 'lucide-react';

const problems = [
  {
    icon: Globe,
    title: 'Scattered Digital Presence',
    description: 'Personal information is dispersed across multiple platforms - social media, code repositories, forums, and websites, making it difficult to understand total exposure.',
  },
  {
    icon: Users,
    title: 'Lack of Awareness',
    description: 'Most individuals are unaware of their digital footprint size and the potential risks associated with publicly available information.',
  },
  {
    icon: AlertTriangle,
    title: 'Manual Analysis Challenges',
    description: 'Collecting and correlating data from various sources manually is time-consuming, error-prone, and often incomplete.',
  },
  {
    icon: Shield,
    title: 'Privacy & Security Risks',
    description: 'Exposed information can be exploited for social engineering, identity theft, or targeted attacks without proper risk assessment.',
  },
];

export function ProblemStatement() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-[#0d1117] to-[#0a0e27] overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-10 w-64 h-64 bg-[#00f5ff] rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-[#00ff88] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="h-1 w-20 bg-gradient-to-r from-[#00f5ff] to-[#00ff88]" />
                <span className="text-[#00f5ff] uppercase tracking-wider text-sm">The Challenge</span>
              </div>
              
              <h2 className="text-5xl mb-6 text-white">
                Problem Statement
              </h2>
              
              <p className="text-lg text-[#c9d1d9] mb-8 leading-relaxed">
                In today's interconnected digital landscape, individuals leave extensive traces across the internet. 
                <span className="text-[#00f5ff]"> OSINT (Open Source Intelligence) </span> 
                techniques can map these footprints, but current solutions lack comprehensive fusion and risk assessment capabilities.
              </p>

              <div className="space-y-6">
                {problems.map((problem, index) => (
                  <motion.div
                    key={problem.title}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex gap-4 items-start group"
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#1a1f3a] border border-[#00f5ff]/30 flex items-center justify-center group-hover:border-[#00f5ff] transition-colors">
                      <problem.icon className="w-6 h-6 text-[#00f5ff]" />
                    </div>
                    <div>
                      <h4 className="text-white mb-1">{problem.title}</h4>
                      <p className="text-[#8b949e] text-sm">{problem.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Visual Representation */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative h-[500px] flex items-center justify-center">
              {/* Center Node */}
              <div className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-[#00f5ff] to-[#00ff88] flex items-center justify-center z-10"
                   style={{ boxShadow: '0 0 60px rgba(0, 245, 255, 0.6)' }}>
                <Users className="w-12 h-12 text-black" />
              </div>

              {/* Orbiting Platforms */}
              {[
                { label: 'Social Media', angle: 0, color: '#00f5ff' },
                { label: 'Code Repos', angle: 60, color: '#00ff88' },
                { label: 'Forums', angle: 120, color: '#0066ff' },
                { label: 'Websites', angle: 180, color: '#00f5ff' },
                { label: 'Images', angle: 240, color: '#00ff88' },
                { label: 'Location', angle: 300, color: '#0066ff' },
              ].map((platform, index) => {
                const radius = 180;
                const x = Math.cos((platform.angle * Math.PI) / 180) * radius;
                const y = Math.sin((platform.angle * Math.PI) / 180) * radius;

                return (
                  <motion.div
                    key={platform.label}
                    className="absolute"
                    style={{
                      left: '50%',
                      top: '50%',
                      transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                    }}
                    animate={{
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  >
                    {/* Connection Line */}
                    <svg className="absolute left-1/2 top-1/2 w-[200px] h-[200px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
                      <line
                        x1="50%"
                        y1="50%"
                        x2={`calc(50% - ${x}px)`}
                        y2={`calc(50% - ${y}px)`}
                        stroke={platform.color}
                        strokeWidth="1"
                        opacity="0.3"
                        strokeDasharray="4 4"
                      />
                    </svg>

                    <div 
                      className="w-20 h-20 rounded-lg bg-[#1a1f3a] border-2 flex items-center justify-center relative z-10"
                      style={{ 
                        borderColor: platform.color,
                        boxShadow: `0 0 20px ${platform.color}40`,
                      }}
                    >
                      <span className="text-xs text-white text-center px-2">{platform.label}</span>
                    </div>
                  </motion.div>
                );
              })}

              {/* Pulsing Rings */}
              <motion.div
                className="absolute w-48 h-48 rounded-full border-2 border-[#00f5ff]/30"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />
              <motion.div
                className="absolute w-64 h-64 rounded-full border-2 border-[#00ff88]/30"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: 1,
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
