import { CircleUser, LogOut } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
                {/* Logo and Title Section */}
                <Link to="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
                    <div className="bg-indigo-100 rounded-xl p-2">
                        <img
                            className="w-10 h-10 object-contain mix-blend-multiply"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToxwUOpjiqAkJ9KnkYFBAj9an2ClCdi9I8cg&s"
                            alt="Logo"
                        />
                    </div>
                    <h1 className="text-slate-800 font-bold text-xl tracking-tight">
                        Leave Management
                    </h1>
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-6">
                    <Link
                        to="/"
                        className="text-slate-600 hover:text-indigo-600 font-medium transition-colors"
                    >
                        Dashboard
                    </Link>
                    <Link
                        to="/application"
                        className="text-slate-600 hover:text-indigo-600 font-medium transition-colors"
                    >
                        Apply Leave
                    </Link>
                </div>

                {/* User Section */}
                <div className="flex items-center gap-4">
                    {/* User Profile */}
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-50 border border-slate-200">
                        <CircleUser size={24} className="text-slate-600" strokeWidth={1.5} />
                        <span className="text-sm font-medium text-slate-700 hidden md:block">
                            {user?.name || 'User'}
                        </span>
                    </div>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 hover:border-red-300 transition-all cursor-pointer"
                    >
                        <LogOut size={18} strokeWidth={2} />
                        <span className="text-sm font-medium hidden md:block">Logout</span>
                    </button>
                </div>
            </div>
        </nav>
    );
}
