import { Mail, LockKeyhole, UserRound, User } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"

const SIGNUP_URL = "http://localhost:5000/api/auth/signup"

export default function SignUpForm() {
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [error, setError] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError("")

        if (password !== confirmPassword) {
            setError("Passwords do not match.")
            return
        }

        setIsSubmitting(true)

        try {
            const response = await fetch(SIGNUP_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ name, email, password }),
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => null)
                const message = errorData?.message || "Sign up failed. Please try again."
                throw new Error(message)
            }

            await response.json().catch(() => ({}))
            navigate("/login")
        } catch (err) {
            setError(err.message || "Sign up failed. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center px-4 py-12">
            <div className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(99,102,241,0.12),_transparent_60%)]" />
                <div className="relative grid gap-10 lg:grid-cols-[1.05fr_1fr]">
                    <div className="p-10 lg:p-14">
                        <div className="flex items-center gap-3 text-indigo-600">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50">
                                <UserRound className="size-6" />
                            </div>
                            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-indigo-500">Get Started</span>
                        </div>
                        <h1 className="mt-6 text-4xl font-semibold leading-tight text-slate-900">
                            Create your leave management account
                        </h1>
                        <p className="mt-4 text-base text-slate-600">
                            Join your team workspace and manage leave requests with confidence.
                        </p>
                        <div className="mt-10 grid gap-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-6">
                            <div className="flex items-center gap-4">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white">
                                    <User className="size-5 text-indigo-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-900">Team ready</p>
                                    <p className="text-xs text-slate-500">Invite teammates once you sign up.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white">
                                    <LockKeyhole className="size-5 text-indigo-500" />
                                </div>
                                <div>
                                    <p className="text-sm font-semibold text-slate-900">Protected access</p>
                                    <p className="text-xs text-slate-500">Passwords are encrypted securely.</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 text-slate-900 sm:p-10">
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <h2 className="text-2xl font-semibold text-slate-900">Create account</h2>
                                <p className="text-sm text-slate-500">Fill in your details to begin.</p>
                            </div>
                            <label className="block text-sm font-medium text-slate-600">
                                Full name
                                <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                                    <User className="size-4 text-slate-400" />
                                    <input
                                        className="w-full bg-transparent text-sm text-slate-900 outline-none"
                                        type="text"
                                        placeholder="Jane Doe"
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                        required
                                    />
                                </div>
                            </label>
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
                                        placeholder="Create a password"
                                        value={password}
                                        onChange={(event) => setPassword(event.target.value)}
                                        required
                                    />
                                </div>
                            </label>
                            <label className="block text-sm font-medium text-slate-600">
                                Confirm password
                                <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                                    <LockKeyhole className="size-4 text-slate-400" />
                                    <input
                                        className="w-full bg-transparent text-sm text-slate-900 outline-none"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Re-enter your password"
                                        value={confirmPassword}
                                        onChange={(event) => setConfirmPassword(event.target.value)}
                                        required
                                    />
                                </div>
                            </label>
                            <label className="flex items-center gap-2 text-sm text-slate-500">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500"
                                    checked={showPassword}
                                    onChange={(event) => setShowPassword(event.target.checked)}
                                />
                                Show password
                            </label>
                            <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                                <Link className="text-indigo-600 hover:text-indigo-700" to="/login">
                                    Already have an account?
                                </Link>
                            </div>
                            {error ? <p className="text-sm text-rose-500">{error}</p> : null}
                            <button
                                type="submit"
                                className="w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Signing up..." : "Create account"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
