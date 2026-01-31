import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, User, Image, MapPin, Code, AlertCircle, Loader2, Shield, CheckCircle2, Info } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Checkbox } from '@/app/components/ui/checkbox';
import { Label } from '@/app/components/ui/label';

interface ExposureSummary {
  public_presence: string;
  platform_reuse: string;
  developer_exposure: string;
  metadata_visibility: string;
}

interface BackendResponse {
  email: string;
  risk_score: number;
  risk_level: string;
  exposure_summary: ExposureSummary;
  ai_explanation: string[];
  recommendations: string[];
  disclaimer: string;
  error?: string;
}

export function LiveDemo() {
  const [input, setInput] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState<BackendResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!input.trim() || !isAuthorized) return;

    setIsAnalyzing(true);
    setShowResults(false);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/analyze-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input_value: input,
          authorized: isAuthorized
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Analysis failed');
      }

      const data: BackendResponse = await response.json();

      if (data.error) {
        setError(data.error);
        return;
      }

      setResults(data);
      setShowResults(true);
    } catch (err: any) {
      setError(err.message || 'Failed to connect to the analysis engine');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getRiskColor = (score: number) => {
    if (score < 2.5) return { color: '#00ff88', label: 'Low' };
    if (score < 5.0) return { color: '#ffcc00', label: 'Medium' };
    if (score < 7.5) return { color: '#ff9900', label: 'High' };
    return { color: '#ff0055', label: 'Critical' };
  };

  const riskInfo = results ? getRiskColor(results.risk_score) : { color: '#8b949e', label: 'None' };

  return (
    <section className="relative py-24 bg-gradient-to-b from-[#0a0e27] to-[#000000] overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00f5ff] rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#00ff88] rounded-full blur-[150px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-1 w-20 bg-gradient-to-r from-[#00f5ff] to-[#00ff88]" />
            <span className="text-[#00f5ff] uppercase tracking-wider text-sm">Real-time awareness</span>
            <div className="h-1 w-20 bg-gradient-to-r from-[#00ff88] to-[#00f5ff]" />
          </div>
          <h2 className="text-5xl text-white mb-4">
            Digital Exposure Analyzer
          </h2>
          <p className="text-lg text-[#8b949e] max-w-2xl mx-auto">
            Ethical OSINT risk discovery and AI-powered exposure assessment
          </p>
        </motion.div>

        {/* Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="relative p-8 rounded-xl bg-[#1a1f3a] border-2 border-[#00f5ff]/30 shadow-[0_0_40px_rgba(0,245,255,0.2)]">
            {isAnalyzing && (
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-[#00f5ff]/20 to-transparent"
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}

            <div className="relative flex flex-col gap-6">
              <div className="flex gap-4">
                <Input
                  type="text"
                  placeholder="Enter email address (e.g., mail@example.com)..."
                  value={input}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                  onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === 'Enter' && handleAnalyze()}
                  disabled={isAnalyzing}
                  className="flex-1 bg-[#0a0e27] border-[#00f5ff]/50 text-white placeholder:text-[#8b949e] focus:border-[#00f5ff] focus:ring-[#00f5ff]/50"
                />
                <Button
                  onClick={handleAnalyze}
                  disabled={isAnalyzing || !input.trim() || !isAuthorized}
                  className="bg-[#00f5ff] text-black hover:bg-[#00d4ff] px-8 shadow-[0_0_20px_rgba(0,245,255,0.5)]"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Analyzing
                    </>
                  ) : (
                    <>
                      <Search className="w-5 h-5 mr-2" />
                      Analyze
                    </>
                  )}
                </Button>
              </div>

              {/* Authorization Checkbox */}
              <div className="flex items-center space-x-3 bg-[#0a0e27]/50 p-4 rounded-lg border border-[#00f5ff]/20">
                <Checkbox
                  id="authorized"
                  checked={isAuthorized}
                  onCheckedChange={(checked: boolean) => setIsAuthorized(!!checked)}
                />
                <Label htmlFor="authorized" className="text-sm text-[#c9d1d9] cursor-pointer">
                  I confirm that I own or am explicitly authorized to analyze this identifier for awareness purposes.
                </Label>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  <AlertCircle className="w-4 h-4" />
                  {error}
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Results Section */}
        {showResults && results && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Top Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Risk Meter */}
              <div className="lg:col-span-1 p-8 rounded-xl bg-[#1a1f3a] border border-[#00f5ff]/30 shadow-[0_0_40px_rgba(0,245,255,0.1)] flex flex-col items-center">
                <h3 className="text-white text-lg mb-6">Digital Risk Score</h3>
                <div className="relative w-48 h-48 mb-4">
                  <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                    <circle cx="50" cy="50" r="40" stroke="#1a1f3a" strokeWidth="8" fill="none" />
                    <motion.circle
                      cx="50" cy="50" r="40"
                      stroke={riskInfo.color}
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray="251.2"
                      initial={{ strokeDashoffset: 251.2 }}
                      animate={{ strokeDashoffset: 251.2 - (251.2 * results.risk_score) / 10 }}
                      transition={{ duration: 1, ease: 'easeOut' }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold" style={{ color: riskInfo.color }}>{results.risk_score}</span>
                    <span className="text-xs text-[#8b949e]">Out of 10</span>
                  </div>
                </div>
                <div
                  className="px-6 py-2 rounded-full text-black font-bold"
                  style={{ backgroundColor: riskInfo.color }}
                >
                  {results.risk_level}
                </div>
              </div>

              {/* AI Insight */}
              <div className="lg:col-span-2 p-8 rounded-xl bg-[#1a1f3a] border border-[#00f5ff]/30">
                <div className="flex items-center gap-3 mb-4">
                  <Shield className="w-6 h-6 text-[#00f5ff]" />
                  <h3 className="text-white text-lg">AI Exposure Interpretation</h3>
                </div>
                <div className="space-y-3">
                  {results.ai_explanation.map((item, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-start gap-3 text-[#c9d1d9] text-sm"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00f5ff] mt-1.5 flex-shrink-0" />
                      {item}
                    </motion.div>
                  ))}
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {results.recommendations.map((rec, i) => (
                    <div key={i} className="flex items-center gap-2 bg-[#00f5ff]/10 border border-[#00f5ff]/20 rounded-full px-4 py-1.5 text-xs text-[#00f5ff]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {rec}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Exposure Factors */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: 'Public Presence', value: results.exposure_summary.public_presence, icon: MapPin },
                { title: 'Platform Reuse', value: results.exposure_summary.platform_reuse, icon: User },
                { title: 'Dev Exposure', value: results.exposure_summary.developer_exposure, icon: Code },
                { title: 'Metadata Logic', value: results.exposure_summary.metadata_visibility, icon: Info },
              ].map((factor, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 rounded-xl bg-[#1a1f3a] border border-[#00f5ff]/10 hover:border-[#00f5ff]/40 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <factor.icon className="w-5 h-5 text-[#00f5ff]" />
                    <h4 className="text-white text-sm font-semibold">{factor.title}</h4>
                  </div>
                  <p className="text-[#8b949e] text-xs leading-relaxed">{factor.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* TraceMap Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 p-6 rounded-xl bg-[#1a1f3a]/50 border border-[#ffcc00]/20 max-w-4xl mx-auto"
        >
          <div className="flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-[#ffcc00] flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-[#ffcc00] mb-2 font-semibold">Ethical Awareness Architecture</h4>
              <p className="text-[#8b949e] text-sm leading-relaxed">
                {results?.disclaimer || "This analyzer implements a rule-based risk engine and AI interpretation for digital exposure awareness. It strictly uses simulated OSINT signals to demonstrate risk patterns without accessing private systems or performing any exploitation."}
              </p>
              <div className="mt-4 flex gap-6 text-[10px] text-[#8b949e] uppercase tracking-widest">
                <span className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-[#00ff88]" /> Simulated Data</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-[#00ff88]" /> Rule-Based Scoring</span>
                <span className="flex items-center gap-2"><CheckCircle2 className="w-3 h-3 text-[#00ff88]" /> Educational Tone</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
