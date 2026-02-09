import { Link } from "react-router-dom"
import { Mail, LockKeyhole, UserRound } from "lucide-react"

export default function LoginForm() {
    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-[url('https://media.istockphoto.com/id/1460636032/vector/abstract-colorful-wave-element-for-design-digital-frequency-track-equalizer-stylized-line.jpg?s=612x612&w=0&k=20&c=jjIb7AZrOQt80WdqeUnQYRVT9ZTmEUUXl9t5ENnH2C4=')] bg-cover bg-center bg-no-repeat p-4">
            <form className="flex flex-col justify-center w-full max-w-md items-center gap-2 border border-white/30 p-10 rounded-2xl shadow-2xl backdrop-blur-lg bg-white/40">
                
                <div className="bg-white/60 p-3 rounded-full shadow-sm mb-2">
                    <UserRound className="size-10 text-[#2a4e75]" />
                </div>
                
                <h1 className="font-light font-mono text-4xl text-[#2a4e75] text-center mb-8 tracking-tight">Welcome Back</h1>
                
                <div className="text-[#4a5568] w-full flex flex-col gap-8 [&>div]:border-b-2 [&>div]:border-[#2a4e75]/20">
                    <div className="flex gap-3 pb-2 transition-all focus-within:border-[#2a4e75]">
                        <Mail className="size-5 text-[#2a4e75]" />
                        <input className="bg-transparent outline-none w-full placeholder:text-gray-500" type="email" placeholder="Email Address"/>
                    </div>
                    
                    <div className="flex gap-3 pb-2 transition-all focus-within:border-[#2a4e75]">
                        <LockKeyhole className="size-5 text-[#2a4e75]" />
                        <input className="bg-transparent outline-none w-full placeholder:text-gray-500" type="password" placeholder="Password"/>
                    </div>
                </div>

                <div className="mt-6 flex justify-between w-full text-sm font-medium text-[#366496]">
                    <Link to="/signUp" className="hover:underline">Create Account</Link>
                    <a href="#" className="hover:underline">Forgot Password?</a>
                </div>

                <button className="bg-[#2a4e75] text-white w-full py-3 rounded-xl mt-8 font-semibold transition-all hover:bg-[#1e3a5a] hover:shadow-lg active:scale-[0.98]">
                    Sign In
                </button>
            </form>
        </div>
    )
}
