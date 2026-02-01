import { useState } from 'react';
import { Mail, LockKeyhole, UserRound } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        const success = login(email, password);
        if (success) {
            navigate('/');
        } else {
            setError('Invalid credentials');
        }
    };

    return (
        <div className="w-full min-h-screen flex bg-gradient-to-b from-indigo-100 to-slate-100">
            <form
                className="flex-col flex justify-start m-auto w-[500px] items-center gap-1 bg-white p-10 rounded-2xl shadow-xl"
                onSubmit={handleSubmit}
            >
                <div className="bg-indigo-100 p-4 rounded-full mb-2">
                    <UserRound className="size-12 text-indigo-600" />
                </div>
                <h1 className="font-semibold text-3xl text-slate-800 text-center mb-6">Welcome Back</h1>
                
                {error && (
                    <div className="w-full bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-center text-sm">
                        {error}
                    </div>
                )}

                <div className="text-slate-600 w-full flex flex-col gap-6">
                    <div className="flex gap-3 pb-3 px-4 border border-slate-200 rounded-lg items-center focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                        <Mail className="text-slate-400" size={20} />
                        <input
                            className="outline-none flex-1 py-2 bg-transparent"
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-3 pb-3 px-4 border border-slate-200 rounded-lg items-center focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                        <LockKeyhole className="text-slate-400" size={20} />
                        <input
                            className="outline-none flex-1 py-2 bg-transparent"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                <div className="mt-6 flex justify-between w-full text-sm">
                    <Link to="/signup" className="text-indigo-600 hover:text-indigo-800 transition-colors">
                        Create New Account
                    </Link>
                    <a href="#" className="text-slate-500 hover:text-slate-700 transition-colors">
                        Forgot Password?
                    </a>
                </div>

                <button
                    type="submit"
                    className="bg-indigo-600 text-white w-full py-3 rounded-lg mt-6 font-semibold transition-all hover:bg-indigo-700 active:scale-[0.98] shadow-lg shadow-indigo-200"
                >
                    Login
                </button>
            </form>
        </div>
    );
}
