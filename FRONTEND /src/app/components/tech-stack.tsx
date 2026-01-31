import { motion } from 'motion/react';
import { Code2, Database, Server, Palette, Globe, Cpu } from 'lucide-react';

const technologies = [
  {
    icon: Code2,
    name: 'React',
    category: 'Frontend',
    color: '#00f5ff',
  },
  {
    icon: Server,
    name: 'Node.js',
    category: 'Backend',
    color: '#00ff88',
  },
  {
    icon: Code2,
    name: 'Python',
    category: 'Backend',
    color: '#0066ff',
  },
  {
    icon: Database,
    name: 'MongoDB',
    category: 'Database',
    color: '#00f5ff',
  },
  {
    icon: Server,
    name: 'Express',
    category: 'Backend',
    color: '#00ff88',
  },
  {
    icon: Globe,
    name: 'APIs',
    category: 'Integration',
    color: '#0066ff',
  },
  {
    icon: Palette,
    name: 'D3.js',
    category: 'Visualization',
    color: '#00f5ff',
  },
  {
    icon: Cpu,
    name: 'REST',
    category: 'Architecture',
    color: '#00ff88',
  },
];

export function TechStack() {
  return (
    <section className="relative py-24 bg-[#0a0e27] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0"
             style={{
               backgroundImage: `
                 repeating-linear-gradient(0deg, #00f5ff 0px, #00f5ff 1px, transparent 1px, transparent 20px),
                 repeating-linear-gradient(90deg, #00f5ff 0px, #00f5ff 1px, transparent 1px, transparent 20px)
               `,
             }}
        />
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
            <span className="text-[#00f5ff] uppercase tracking-wider text-sm">Technology</span>
            <div className="h-1 w-20 bg-gradient-to-r from-[#00ff88] to-[#00f5ff]" />
          </div>
          <h2 className="text-5xl text-white mb-4">
            Tech Stack
          </h2>
          <p className="text-lg text-[#8b949e] max-w-2xl mx-auto">
            Built with modern, reliable technologies for scalability and performance
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {technologies.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ 
                scale: 1.1,
                rotate: 5,
                boxShadow: `0 20px 40px ${tech.color}40`,
              }}
              className="relative p-6 rounded-xl bg-[#1a1f3a] border-2 transition-all duration-300 cursor-pointer group"
              style={{ borderColor: `${tech.color}30` }}
            >
              {/* Glow Effect */}
              <div 
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(circle at center, ${tech.color}20, transparent 70%)`,
                }}
              />

              {/* Content */}
              <div className="relative z-10 flex flex-col items-center">
                <div 
                  className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{ 
                    backgroundColor: `${tech.color}15`,
                    border: `2px solid ${tech.color}`,
                  }}
                >
                  <tech.icon 
                    className="w-8 h-8" 
                    style={{ color: tech.color }}
                    strokeWidth={1.5}
                  />
                </div>

                <h4 className="text-white mb-1">{tech.name}</h4>
                <span 
                  className="text-xs px-2 py-1 rounded-full"
                  style={{ 
                    color: tech.color,
                    backgroundColor: `${tech.color}15`,
                  }}
                >
                  {tech.category}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
