import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, LayoutDashboard, Search, Image as ImageIcon, MapPin, Code, Cpu, LogOut, User } from 'lucide-react';

interface NavMenuProps {
    isOpen: boolean;
    onToggle: () => void;
    activeTab: string;
    onTabChange: (tab: string) => void;
    onLogout: () => void;
    userName: string;
}

export function NavMenu({ isOpen, onToggle, activeTab, onTabChange, onLogout, userName }: NavMenuProps) {
    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'text-osint', label: 'Text OSINT', icon: Search },
        { id: 'image-osint', label: 'Image OSINT', icon: ImageIcon },
        { id: 'location-osint', label: 'Location OSINT', icon: MapPin },
        { id: 'code-osint', label: 'Code OSINT', icon: Code },
        { id: 'architecture', label: 'View Architecture', icon: Cpu },
    ];

    return (
        <>
            {/* Hamburger Button */}
            <button
                onClick={onToggle}
                className="fixed top-6 right-6 z-[60] w-14 h-14 rounded-2xl bg-slate-900/80 border border-cyan-500/30 backdrop-blur-xl flex items-center justify-center hover:border-cyan-400 transition-all active:scale-90 group shadow-[0_0_20px_rgba(6,182,212,0.1)]"
            >
                {isOpen ? (
                    <X className="w-7 h-7 text-cyan-400" />
                ) : (
                    <Menu className="w-7 h-7 text-cyan-400 group-hover:scale-110 transition-transform" />
                )}
                <div className="absolute inset-0 rounded-2xl bg-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            {/* Slide-in Menu */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onToggle}
                            className="fixed inset-0 bg-[#060a14]/60 backdrop-blur-sm z-50"
                        />

                        {/* Panel */}
                        <motion.nav
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-full max-w-[320px] bg-[#0a0f1c]/95 border-l border-white/5 backdrop-blur-3xl z-[55] flex flex-col shadow-2xl"
                        >
                            <div className="p-10 flex-1 overflow-y-auto">
                                {/* User Info */}
                                <div className="mb-12 flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5">
                                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                                        <User className="w-6 h-6 text-cyan-400" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mb-1">Authenticated As</p>
                                        <p className="text-white text-sm font-black tech-font truncate max-w-[140px]">{userName}</p>
                                    </div>
                                </div>

                                <h4 className="text-slate-600 text-[10px] font-black uppercase tracking-[0.4em] mb-6 px-2 italic">
                                    // System Navigation
                                </h4>

                                {/* Menu Items */}
                                <div className="space-y-4">
                                    {menuItems.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={() => {
                                                onTabChange(item.id);
                                                onToggle();
                                            }}
                                            className={`w-full flex items-center gap-4 p-4 rounded-2xl transition-all group ${activeTab === item.id
                                                    ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400'
                                                    : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                                                }`}
                                        >
                                            <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-cyan-400' : 'group-hover:text-cyan-400 transition-colors'}`} />
                                            <span className="text-sm font-black tech-font uppercase tracking-tighter">{item.label}</span>
                                            {activeTab === item.id && (
                                                <motion.div layoutId="active-pill" className="ml-auto w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#06b6d4]" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Logout Footer */}
                            <div className="p-8 border-t border-white/5">
                                <button
                                    onClick={onLogout}
                                    className="w-full flex items-center justify-center gap-3 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 transition-all font-black tech-font uppercase tracking-widest text-xs"
                                >
                                    <LogOut className="w-4 h-4" />
                                    Terminate Session
                                </button>
                                <p className="text-center mt-6 text-[8px] text-slate-600 font-black uppercase tracking-[0.5em] italic">
                                    Digital Exposure Fusion Engine
                                </p>
                            </div>
                        </motion.nav>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
