import { Link, useNavigate } from "react-router-dom"
import { Mail, LockKeyhole, UserRound } from "lucide-react"
import { useState } from "react"

const LOGIN_URL = "http://localhost:5000/api/auth/login"

export default function LoginForm() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const resolveRole = (data) => {
        const roleValue = data?.role ?? data?.user?.role
        if (typeof roleValue === "string") {
            return roleValue.toLowerCase()
        }
        return ""
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError("")
        setIsSubmitting(true)

        try {
            const response = await fetch(LOGIN_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ email, password }),
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => null)
                const message = errorData?.message || "Login failed. Please try again."
                throw new Error(message)
            }

            const data = await response.json().catch(() => ({}))
            const role = resolveRole(data)

            if (role === "admin") {
                navigate("/Admins")
            } else {
                navigate("/Application")
            }
        } catch (err) {
            setError(err.message || "Login failed. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center px-4 py-12">
            <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.12),_transparent_60%)]" />
                <div className="relative grid gap-10 lg:grid-cols-[1.05fr_1fr]">
                    <div className="p-10 lg:p-14">
                        <div className="flex items-center gap-3 text-blue-600">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50">
                                <UserRound className="size-6" />
                            </div>
                            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-500">Welcome Back</span>
                        </div>
                        <h1 className="mt-6 text-4xl font-semibold leading-tight text-slate-900">
                            Login to manage your leave requests
                        </h1>
                        <p className="mt-4 text-base text-slate-600">
                            Keep track of approvals, requests, and team calendars in one place.
                        </p>
                        <div className="mt-10 grid gap-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-6">
                            <div className="flex items-center gap-4">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white">
                                    <Mail className="size-5 text-blue-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-900">Company email</p>
                                    <p className="text-xs text-slate-500">Use your work email to sign in.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white">
                                    <LockKeyhole className="size-5 text-blue-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-900">Secure access</p>
                                    <p className="text-xs text-slate-500">Protected with encrypted sessions.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 text-slate-900 sm:p-10">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <h2 className="text-2xl font-semibold text-slate-900">Sign in</h2>
                                <p className="text-sm text-slate-500">Use your credentials to continue.</p>
                            </div>
                            <label className="block text-sm font-medium text-slate-600">
                                Email address
                                <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                                    <Mail className="size-4 text-slate-400" />
                                    <input
                                        className="w-full bg-transparent text-sm text-slate-900 outline-none"
                                        type="email"
                                        placeholder="name@company.com"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        required
                                    />
                                </div>
                            </label>
                            <label className="block text-sm font-medium text-slate-600">
                                Password
                                <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                                    <LockKeyhole className="size-4 text-slate-400" />
                                    <input
                                        className="w-full bg-transparent text-sm text-slate-900 outline-none"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        required
                                    />
                                </div>
                            </label>
                            <label className="flex items-center gap-2 text-sm text-slate-500">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                                    checked={showPassword}
                                    onChange={(event) => setShowPassword(event.target.checked)}
                                />
                                Show password
                            </label>
                            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                                <Link className="text-blue-600 hover:text-blue-700" to="/signup">
                                    Create new account
                                </Link>
                                <Link className="text-slate-500 hover:text-slate-700" to="/forgot-password">
                                    Forgot password?
                                </Link>
                            </div>
                            {error ? <p className="text-sm text-rose-500">{error}</p> : null}
                            <button
                                type="submit"
                                className="w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Logging in..." : "Login"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
