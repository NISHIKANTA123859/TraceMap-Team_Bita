import { motion } from 'motion/react';
import { UserCircle, Database, Filter, Zap, BarChart3, Eye } from 'lucide-react';

const flowSteps = [
  {
    icon: UserCircle,
    label: 'User Input',
    description: 'Username, email, or identifier submission',
  },
  {
    icon: Database,
    label: 'Data Collection',
    description: 'Multi-source OSINT aggregation',
  },
  {
    icon: Filter,
    label: 'Normalization',
    description: 'Standardize & structure data',
  },
  {
    icon: Zap,
    label: 'Fusion Engine',
    description: 'Correlate & merge intelligence',
  },
  {
    icon: BarChart3,
    label: 'Risk Analysis',
    description: 'Assess exposure severity',
  },
  {
    icon: Eye,
    label: 'Visualization',
    description: 'Generate intelligence report',
  },
];

export function ProcessFlow() {
  return (
    <section className="relative py-24 bg-[#0a0e27] overflow-hidden">
      {/* Grid Background */}
      <div className="absolute inset-0 opacity-10"
           style={{
             backgroundImage: `
               linear-gradient(rgba(0, 245, 255, 0.1) 1px, transparent 1px),
               linear-gradient(90deg, rgba(0, 245, 255, 0.1) 1px, transparent 1px)
             `,
             backgroundSize: '30px 30px',
           }} 
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-1 w-20 bg-gradient-to-r from-[#00f5ff] to-[#00ff88]" />
            <span className="text-[#00f5ff] uppercase tracking-wider text-sm">How It Works</span>
            <div className="h-1 w-20 bg-gradient-to-r from-[#00ff88] to-[#00f5ff]" />
          </div>
          <h2 className="text-5xl text-white mb-4">
            Solution Overview
          </h2>
          <p className="text-lg text-[#8b949e] max-w-2xl mx-auto">
            A comprehensive pipeline that transforms scattered data into actionable intelligence
          </p>
        </motion.div>

        {/* Desktop Flow - Horizontal */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connecting Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#00f5ff] via-[#00ff88] to-[#0066ff] -translate-y-1/2" />

            <div className="relative flex justify-between items-center">
              {flowSteps.map((step, index) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="relative flex flex-col items-center group"
                >
                  {/* Animated Flow Effect */}
                  {index < flowSteps.length - 1 && (
                    <motion.div
                      className="absolute left-full top-1/2 w-full h-1 origin-left"
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15 + 0.3, duration: 0.5 }}
                    >
                      <div className="w-2 h-2 bg-[#00f5ff] rounded-full animate-pulse absolute right-0 top-1/2 -translate-y-1/2"
                           style={{ boxShadow: '0 0 10px rgba(0, 245, 255, 0.8)' }} />
                    </motion.div>
                  )}

                  {/* Node Circle */}
                  <div 
                    className="w-28 h-28 rounded-full bg-[#1a1f3a] border-4 border-[#00f5ff] flex items-center justify-center mb-4 relative z-10 group-hover:scale-110 transition-transform duration-300"
                    style={{ boxShadow: '0 0 30px rgba(0, 245, 255, 0.5)' }}
                  >
                    <step.icon className="w-12 h-12 text-[#00f5ff]" strokeWidth={1.5} />
                    
                    {/* Number Badge */}
                    <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br from-[#00f5ff] to-[#00ff88] flex items-center justify-center text-black text-sm"
                         style={{ boxShadow: '0 0 15px rgba(0, 245, 255, 0.6)' }}>
                      {index + 1}
                    </div>
                  </div>

                  {/* Label */}
                  <h4 className="text-white mb-2 text-center">
                    {step.label}
                  </h4>
                  <p className="text-xs text-[#8b949e] text-center max-w-[140px]">
                    {step.description}
                  </p>

                  {/* Hover Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute top-full mt-4 w-56 p-4 rounded-lg bg-[#1a1f3a] border border-[#00f5ff]/50 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{ boxShadow: '0 0 20px rgba(0, 245, 255, 0.3)' }}
                  >
                    <p className="text-xs text-[#c9d1d9]">{step.description}</p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile Flow - Vertical */}
        <div className="lg:hidden space-y-8">
          {flowSteps.map((step, index) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative flex items-start gap-4"
            >
              {/* Vertical Line */}
              {index < flowSteps.length - 1 && (
                <div className="absolute left-8 top-20 bottom-0 w-0.5 bg-gradient-to-b from-[#00f5ff] to-[#00ff88]" />
              )}

              {/* Node */}
              <div className="relative z-10">
                <div 
                  className="w-16 h-16 rounded-full bg-[#1a1f3a] border-3 border-[#00f5ff] flex items-center justify-center"
                  style={{ boxShadow: '0 0 20px rgba(0, 245, 255, 0.5)' }}
                >
                  <step.icon className="w-8 h-8 text-[#00f5ff]" strokeWidth={1.5} />
                </div>
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-br from-[#00f5ff] to-[#00ff88] flex items-center justify-center text-black text-xs">
                  {index + 1}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 pt-2">
                <h4 className="text-white mb-1">{step.label}</h4>
                <p className="text-sm text-[#8b949e]">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
