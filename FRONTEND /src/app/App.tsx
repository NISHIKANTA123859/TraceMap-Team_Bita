import { useState, useEffect } from 'react';
import { HeroSection } from '@/app/components/hero-section';
import { ProblemStatement } from '@/app/components/problem-statement';
import { ProcessFlow } from '@/app/components/process-flow';
import { KeyFeatures } from '@/app/components/key-features';
import { SystemArchitecture } from '@/app/components/system-architecture';
import { LiveDemo } from '@/app/components/live-demo';
import { TechStack } from '@/app/components/tech-stack';
import { EthicsPrivacy } from '@/app/components/ethics-privacy';
import { Applications } from '@/app/components/applications';
import { Footer } from '@/app/components/footer';
import { LoginView } from '@/app/components/login-view';
import { NavMenu } from '@/app/components/nav-menu';
import { TextOSINTAnalyzer } from '@/app/components/TextOSINTAnalyzer';
import { ImageOSINTAnalyzer } from '@/app/components/ImageOSINTAnalyzer';
import { LocationOSINTAnalyzer } from '@/app/components/LocationOSINTAnalyzer';
import { CodeOSINTAnalyzer } from '@/app/components/CodeOSINTAnalyzer';
import { ViewArchitecture } from '@/app/components/ViewArchitecture';

export default function App() {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  useEffect(() => {
    const savedUser = localStorage.getItem('tracemap_session');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = (userData: { name: string; email: string }) => {
    localStorage.setItem('tracemap_session', JSON.stringify(userData));
    setUser(userData);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('tracemap_session');
    setUser(null);
    setIsMenuOpen(false);
    setActiveTab('dashboard');
  };

  if (!user) {
    return <LoginView onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'text-osint': return <TextOSINTAnalyzer onClose={() => setActiveTab('dashboard')} />;
      case 'image-osint': return <ImageOSINTAnalyzer onClose={() => setActiveTab('dashboard')} />;
      case 'location-osint': return <LocationOSINTAnalyzer onClose={() => setActiveTab('dashboard')} />;
      case 'code-osint': return <CodeOSINTAnalyzer onClose={() => setActiveTab('dashboard')} />;
      case 'architecture': return <ViewArchitecture onClose={() => setActiveTab('dashboard')} />;
      default:
        return (
          <>
            <HeroSection />
            <ProblemStatement />
            <ProcessFlow />
            <KeyFeatures />
            <SystemArchitecture />
            <TechStack />
            <LiveDemo />
            <EthicsPrivacy />
            <Applications />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white overflow-x-hidden">
      <NavMenu
        isOpen={isMenuOpen}
        onToggle={() => setIsMenuOpen(!isMenuOpen)}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onLogout={handleLogout}
        userName={user.name}
      />

      <main>
        {renderContent()}
      </main>

      <Footer />
    </div>
  );
}