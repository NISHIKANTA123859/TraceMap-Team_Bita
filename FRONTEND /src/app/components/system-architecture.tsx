import { motion } from 'motion/react';
import { Search, Database, Zap, BarChart3, Monitor, ArrowRight } from 'lucide-react';

const architectureBlocks = [
  {
    icon: Search,
    title: 'OSINT Collector',
    description: 'Multi-source data harvesting',
    layer: 'Input Layer',
    color: '#00f5ff',
    connections: ['normalizer'],
  },
  {
    icon: Database,
    title: 'Data Normalizer',
    description: 'Structure & standardization',
    layer: 'Processing Layer',
    color: '#00ff88',
    connections: ['fusion'],
  },
  {
    icon: Zap,
    title: 'Fusion Engine',
    description: 'Correlation & intelligence merge',
    layer: 'Core Engine',
    color: '#0066ff',
    connections: ['analyzer'],
  },
  {
    icon: BarChart3,
    title: 'Risk Analyzer',
    description: 'Exposure classification & scoring',
    layer: 'Analysis Layer',
    color: '#00f5ff',
    connections: ['dashboard'],
  },
  {
    icon: Monitor,
    title: 'Visualization Dashboard',
    description: 'Interactive reporting interface',
    layer: 'Output Layer',
    color: '#00ff88',
    connections: [],
  },
];

export function SystemArchitecture() {
  return (
    <section className="relative py-24 bg-[#0d1117] overflow-hidden">
      {/* Circuit Board Pattern Background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full">
          <defs>
            <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="2" fill="#00f5ff" />
              <circle cx="90" cy="90" r="2" fill="#00ff88" />
              <line x1="10" y1="10" x2="50" y2="10" stroke="#00f5ff" strokeWidth="1" />
              <line x1="50" y1="10" x2="50" y2="50" stroke="#00f5ff" strokeWidth="1" />
              <line x1="50" y1="50" x2="90" y2="90" stroke="#00ff88" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)" />
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
            <span className="text-[#00f5ff] uppercase tracking-wider text-sm">Technical Design</span>
            <div className="h-1 w-20 bg-gradient-to-r from-[#00ff88] to-[#00f5ff]" />
          </div>
          <h2 className="text-5xl text-white mb-4">
            System Architecture
          </h2>
          <p className="text-lg text-[#8b949e] max-w-2xl mx-auto">
            Modular pipeline architecture for scalable intelligence processing
          </p>
        </motion.div>

        {/* Desktop - Vertical Flow */}
        <div className="hidden lg:block max-w-4xl mx-auto">
          <div className="space-y-8">
            {architectureBlocks.map((block, index) => (
              <motion.div
                key={block.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <div className="flex items-center gap-8">
                  {/* Layer Label */}
                  <div className="w-40 text-right">
                    <span 
                      className="text-xs uppercase tracking-wider px-3 py-1 rounded-full border"
                      style={{ 
                        color: block.color,
                        borderColor: `${block.color}50`,
                        backgroundColor: `${block.color}10`,
                      }}
                    >
                      {block.layer}
                    </span>
                  </div>

                  {/* Architecture Block */}
                  <motion.div
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: `0 20px 60px ${block.color}40`,
                    }}
                    className="flex-1 p-6 rounded-xl bg-gradient-to-br from-[#1a1f3a] to-[#0a0e27] border-2 transition-all duration-300 cursor-pointer"
                    style={{ borderColor: block.color }}
                  >
                    <div className="flex items-center gap-6">
                      {/* Icon */}
                      <div 
                        className="w-20 h-20 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ 
                          backgroundColor: `${block.color}20`,
                          boxShadow: `0 0 30px ${block.color}40`,
                        }}
                      >
                        <block.icon 
                          className="w-10 h-10" 
                          style={{ color: block.color }}
                          strokeWidth={1.5}
                        />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h3 className="text-white text-xl mb-2">{block.title}</h3>
                        <p className="text-[#8b949e]">{block.description}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Connection Arrow */}
                {index < architectureBlocks.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 + 0.3 }}
                    className="flex justify-center my-4"
                  >
                    <div className="flex flex-col items-center">
                      <div 
                        className="w-0.5 h-8 rounded-full"
                        style={{ 
                          background: `linear-gradient(to bottom, ${block.color}, ${architectureBlocks[index + 1].color})`,
                        }}
                      />
                      <ArrowRight 
                        className="rotate-90" 
                        style={{ color: architectureBlocks[index + 1].color }}
                      />
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile - Simplified Cards */}
        <div className="lg:hidden space-y-6">
          {architectureBlocks.map((block, index) => (
            <motion.div
              key={block.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative p-6 rounded-xl bg-gradient-to-br from-[#1a1f3a] to-[#0a0e27] border-2"
              style={{ borderColor: block.color }}
            >
              {/* Layer Badge */}
              <span 
                className="text-xs uppercase tracking-wider px-3 py-1 rounded-full border inline-block mb-4"
                style={{ 
                  color: block.color,
                  borderColor: `${block.color}50`,
                  backgroundColor: `${block.color}10`,
                }}
              >
                {block.layer}
              </span>

              <div className="flex items-start gap-4">
                <div 
                  className="w-16 h-16 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ 
                    backgroundColor: `${block.color}20`,
                    boxShadow: `0 0 20px ${block.color}40`,
                  }}
                >
                  <block.icon 
                    className="w-8 h-8" 
                    style={{ color: block.color }}
                    strokeWidth={1.5}
                  />
                </div>

                <div>
                  <h4 className="text-white mb-2">{block.title}</h4>
                  <p className="text-sm text-[#8b949e]">{block.description}</p>
                </div>
              </div>

              {index < architectureBlocks.length - 1 && (
                <div className="flex justify-center mt-4">
                  <ArrowRight 
                    className="rotate-90" 
                    style={{ color: architectureBlocks[index + 1].color }}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Tech Stack Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="mt-16 p-8 rounded-xl bg-[#1a1f3a] border border-[#00f5ff]/30"
        >
          <h3 className="text-white text-xl mb-4 text-center">Built with Modern Technologies</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {['React', 'Node.js', 'Python', 'MongoDB', 'Express', 'APIs'].map((tech, i) => (
              <span 
                key={tech}
                className="px-4 py-2 rounded-lg bg-[#0a0e27] border border-[#00f5ff]/50 text-[#00f5ff] text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
