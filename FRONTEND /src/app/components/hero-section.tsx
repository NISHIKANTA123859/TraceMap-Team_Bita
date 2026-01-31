import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Camera, MapPin, Code, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { AnalyzeDigitalExposure } from './AnalyzeDigitalExposure';
import { ViewArchitecture } from './ViewArchitecture';
import { TextOSINTAnalyzer } from './TextOSINTAnalyzer';
import { ImageOSINTAnalyzer } from './ImageOSINTAnalyzer';
import { LocationOSINTAnalyzer } from './LocationOSINTAnalyzer';
import { CodeOSINTAnalyzer } from './CodeOSINTAnalyzer';

const featureCards = [
  { icon: Search, title: 'Text OSINT', description: 'Username & Email Analysis', view: 'Text' },
  { icon: Camera, title: 'Image OSINT', description: 'Metadata & Visual Intelligence', view: 'Image' },
  { icon: MapPin, title: 'Location OSINT', description: 'Geographic Footprint Mapping', view: 'Location' },
  { icon: Code, title: 'Code OSINT', description: 'Repository & Commit Analysis', view: 'Code' },
];

export function HeroSection() {
  const [activeView, setActiveView] = useState<'Home' | 'Analyze' | 'Architecture' | 'Text' | 'Image' | 'Location' | 'Code'>('Home');

  return (
    <>
      <AnimatePresence>
        {activeView === 'Analyze' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#0a0f1c] overflow-y-auto">
            <AnalyzeDigitalExposure onClose={() => setActiveView('Home')} />
          </motion.div>
        )}
        {activeView === 'Architecture' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#0a0f1c] overflow-y-auto">
            <ViewArchitecture onClose={() => setActiveView('Home')} />
          </motion.div>
        )}
        {activeView === 'Text' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#0a0f1c] overflow-y-auto">
            <TextOSINTAnalyzer onClose={() => setActiveView('Home')} />
          </motion.div>
        )}
        {activeView === 'Image' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#0a0f1c] overflow-y-auto">
            <ImageOSINTAnalyzer onClose={() => setActiveView('Home')} />
          </motion.div>
        )}
        {activeView === 'Location' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#0a0f1c] overflow-y-auto">
            <LocationOSINTAnalyzer onClose={() => setActiveView('Home')} />
          </motion.div>
        )}
        {activeView === 'Code' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#0a0f1c] overflow-y-auto">
            <CodeOSINTAnalyzer onClose={() => setActiveView('Home')} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative min-h-screen flex flex-col bg-[#0a0f1c] text-white">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(#00f2ff 1px, transparent 1px), linear-gradient(90deg, #00f2ff 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <section className="flex-1 flex flex-col items-center justify-center relative z-10 px-6 max-container py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono mb-8 tech-font">
              <Shield className="w-3 h-3" /> SECURE OSINT FUSION ENGINE v2.0
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-purple-500">
              TraceMap
            </h1>

            <p className="text-xl md:text-2xl text-white font-medium mb-4 tech-font">
              Digital Footprint Fusion Engine
            </p>

            <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-12 italic">
              “Mapping the Invisible Digital Footprint using Multi-Modal OSINT”
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 mb-20">
              <Button
                onClick={() => setActiveView('Analyze')}
                className="h-14 px-8 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-bold rounded-xl transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] active:scale-95"
              >
                Analyze Digital Exposure
              </Button>
              <Button
                variant="outline"
                onClick={() => setActiveView('Architecture')}
                className="h-14 px-8 border-slate-700 hover:border-cyan-500/50 hover:bg-cyan-500/5 text-white font-bold rounded-xl transition-all active:scale-95"
              >
                View Architecture
              </Button>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-6xl mx-auto">
            {featureCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.2 } }}
                onClick={() => setActiveView(card.view as any)}
                className="group relative p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-cyan-500/50 backdrop-blur-xl cursor-pointer transition-all hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)]"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-xl bg-slate-800 flex items-center justify-center mb-6 group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors">
                    <card.icon className="w-7 h-7 text-slate-400 group-hover:text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2 tech-font">{card.title}</h3>
                  <p className="text-sm text-slate-500 group-hover:text-slate-400 transition-colors leading-relaxed">
                    {card.description}
                  </p>
                </div>

                <div className="absolute bottom-4 right-8 opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all">
                  <Search className="w-4 h-4 text-cyan-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 border-t border-slate-900 bg-slate-950/50 relative z-10">
          <div className="max-container text-center">
            <p className="text-slate-500 text-sm mb-2">
              TraceMap OSINT Fusion System v2.0.4
            </p>
            <p className="text-slate-600 text-xs italic">
              Academic Research & Digital Privacy Awareness Tool
            </p>
          </div>
        </footer>

        {/* Scanning Line Animation */}
        <motion.div
          className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent z-20 pointer-events-none"
          animate={{ top: ['0%', '100%'] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    </>
  );
}
