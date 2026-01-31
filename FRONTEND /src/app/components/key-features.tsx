import { motion } from 'motion/react';
import { Network, Atom, FolderTree, Gauge, Shield, UserCheck } from 'lucide-react';

const features = [
  {
    icon: Network,
    title: 'Multi-Modal OSINT Collection',
    description: 'Aggregates data from text sources, images, location metadata, and code repositories for comprehensive intelligence gathering.',
    color: '#00f5ff',
  },
  {
    icon: Atom,
    title: 'Data Fusion & Correlation Engine',
    description: 'Advanced algorithms merge disparate data points, identifying patterns and connections across multiple platforms.',
    color: '#00ff88',
  },
  {
    icon: FolderTree,
    title: 'Exposure Classification',
    description: 'Categorizes discovered information into identity clues, location hints, image metadata, and repository signals.',
    color: '#0066ff',
  },
  {
    icon: Gauge,
    title: 'Risk Severity Assessment',
    description: 'Calculates exposure scores with Low, Medium, and High risk classifications based on data sensitivity.',
    color: '#00f5ff',
  },
  {
    icon: Shield,
    title: 'Ethical & Privacy-Preserving',
    description: 'Operates strictly on public data with no unauthorized access, adhering to responsible OSINT practices.',
    color: '#00ff88',
  },
  {
    icon: UserCheck,
    title: 'Intelligence Profile Creation',
    description: 'Generates comprehensive digital footprint reports with actionable insights and visualization dashboards.',
    color: '#0066ff',
  },
];

export function KeyFeatures() {
  return (
    <section className="relative py-24 bg-gradient-to-b from-[#0a0e27] via-[#000000] to-[#0d1117] overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-[#00f5ff] rounded-full blur-[150px] opacity-10" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-[#00ff88] rounded-full blur-[150px] opacity-10" />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-1 w-20 bg-gradient-to-r from-[#00f5ff] to-[#00ff88]" />
            <span className="text-[#00f5ff] uppercase tracking-wider text-sm">Core Capabilities</span>
            <div className="h-1 w-20 bg-gradient-to-r from-[#00ff88] to-[#00f5ff]" />
          </div>
          <h2 className="text-5xl text-white mb-4">
            Key Features
          </h2>
          <p className="text-lg text-[#8b949e] max-w-2xl mx-auto">
            Powerful capabilities designed for comprehensive digital footprint analysis
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                y: -12, 
                boxShadow: `0 20px 50px ${feature.color}40`,
              }}
              className="relative p-6 rounded-xl bg-gradient-to-br from-[#1a1f3a] to-[#0a0e27] border-2 transition-all duration-300 cursor-pointer group overflow-hidden"
              style={{ 
                borderColor: `${feature.color}50`,
              }}
            >
              {/* Glow Effect on Hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"
                style={{
                  background: `radial-gradient(circle at top right, ${feature.color}15, transparent 70%)`,
                }}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon Container */}
                <div 
                  className="w-16 h-16 rounded-lg flex items-center justify-center mb-4 border-2"
                  style={{ 
                    backgroundColor: `${feature.color}10`,
                    borderColor: feature.color,
                    boxShadow: `0 0 20px ${feature.color}40`,
                  }}
                >
                  <feature.icon 
                    className="w-8 h-8" 
                    style={{ color: feature.color }}
                    strokeWidth={1.5}
                  />
                </div>

                {/* Title */}
                <h3 className="text-white mb-3 group-hover:text-[#00f5ff] transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#8b949e] leading-relaxed">
                  {feature.description}
                </p>

                {/* Decorative Corner */}
                <div 
                  className="absolute top-0 right-0 w-20 h-20 opacity-20 group-hover:opacity-40 transition-opacity"
                  style={{
                    background: `radial-gradient(circle at top right, ${feature.color}, transparent)`,
                  }}
                />
              </div>

              {/* Bottom Accent Line */}
              <motion.div
                className="absolute bottom-0 left-0 h-1 rounded-full"
                style={{ backgroundColor: feature.color }}
                initial={{ width: '0%' }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.3, duration: 0.5 }}
              />
            </motion.div>
          ))}
        </div>

        {/* Additional Info Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 p-6 rounded-xl bg-[#1a1f3a] border border-[#00f5ff]/30 text-center"
        >
          <p className="text-[#c9d1d9]">
            All features operate on <span className="text-[#00f5ff]">publicly available data</span> only, 
            ensuring ethical OSINT practices and compliance with privacy standards.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
