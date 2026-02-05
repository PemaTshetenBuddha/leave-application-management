import { useState } from 'react';
import { CircleUser, X } from "lucide-react";
import UserProfile from './UserProfile';

export default function Navbar() {
    const [showProfile, setShowProfile] = useState(false);

    return (
        <>
            <main className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
                <div className="mx-auto flex justify-between items-center py-3 px-10">
                    <div className="flex items-center gap-4">
                        <div className="bg-slate-300 p-2 rounded-full shadow-[0_0_25px_rgba(148,163,184,0.8)] border border-white/20">
                            <img 
                                 className="w-10 h-10"
                                src="https://www.t3bhutan.com/t3-cloud-logo-dark.svg" 
                                alt="img" 
                            />
                        </div>
                        <h1 className="text-slate-800 font-bold text-xl tracking-tight">
                            Leave Management
                        </h1>
                    </div>

                    <div 
                        onClick={() => setShowProfile(true)} 
                        className="flex items-center gap-3 text-slate-600 hover:text-indigo-600 cursor-pointer transition-colors"
                    >
                        <button className="text-sm font-medium hidden md:block">User Profile</button>
                        <CircleUser size={32} strokeWidth={1.5} />
                    </div>
                </div>
            </main>

          
            {showProfile && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div 
                        className="absolute inset-0 bg-white/40 backdrop-blur-md" 
                        onClick={() => setShowProfile(false)} 
                    />
                    <div 
                        className="relative bg-white rounded-2xl shadow-2xl overflow-hidden max-w-md w-full animate-in fade-in zoom-in-95 duration-200"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <UserProfile />
                        
                        <div className="p-4 bg-slate-50 border-t border-slate-100">
                            <button 
                                onClick={() => setShowProfile(false)}
                                className="w-full py-2.5 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
                            >
                                Close Profile
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
