import { useState } from 'react';
import { Mail, LockKeyhole, UserRound, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function SignUpForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!name || !email || !password || !confirmPassword) {
            setError('Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }

        const success = signup(name, email, password);
        if (success) {
            navigate('/');
        } else {
            setError('Signup failed');
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
                <h1 className="font-semibold text-3xl text-slate-800 text-center mb-6">Create Account</h1>

                {error && (
                    <div className="w-full bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-center text-sm">
                        {error}
                    </div>
                )}

                <div className="text-slate-600 w-full flex flex-col gap-5">
                    <div className="flex gap-3 px-4 border border-slate-200 rounded-lg items-center focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                        <User className="text-slate-400" size={20} />
                        <input
                            className="outline-none flex-1 py-3 bg-transparent"
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-3 px-4 border border-slate-200 rounded-lg items-center focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                        <Mail className="text-slate-400" size={20} />
                        <input
                            className="outline-none flex-1 py-3 bg-transparent"
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-3 px-4 border border-slate-200 rounded-lg items-center focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                        <LockKeyhole className="text-slate-400" size={20} />
                        <input
                            className="outline-none flex-1 py-3 bg-transparent"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-3 px-4 border border-slate-200 rounded-lg items-center focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
                        <LockKeyhole className="text-slate-400" size={20} />
                        <input
                            className="outline-none flex-1 py-3 bg-transparent"
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                    </div>
                </div>

                <div className="mt-6 flex text-sm">
                    <span className="text-slate-500">Already have an account?</span>
                    <Link to="/login" className="text-indigo-600 hover:text-indigo-800 transition-colors ml-2">
                        Login
                    </Link>
                </div>

                <button
                    type="submit"
                    className="bg-indigo-600 text-white w-full py-3 rounded-lg mt-6 font-semibold transition-all hover:bg-indigo-700 active:scale-[0.98] shadow-lg shadow-indigo-200"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
}
