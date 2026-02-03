import { CircleUser } from "lucide-react"
export default function Navbar() {
    return (
        <main className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
                {/* Logo and Title Section */}
                <div className="flex items-center gap-4">
                    <div className="bg-slate-100  rounded-3xl p-2">
                        <img 
                            className="w-10 h-10 object-contain mix-blend-multiply" 
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToxwUOpjiqAkJ9KnkYFBAj9an2ClCdi9I8cg&s" 
                            alt="Logo" 
                        />
                    </div>
                    <h1 className="text-slate-800 font-bold text-xl tracking-tight">
                        Leave Management
                    </h1>
                </div>

                {/* User Section */}
                <div className="flex items-center gap-3 text-slate-600 hover:text-indigo-600 cursor-pointer transition-colors">
                    <span className="text-sm font-medium hidden md:block">User Profile</span>
                    <CircleUser size={32} strokeWidth={1.5} />
                </div>
            </div>
        </main>
    );
}
