import { Link } from "react-router-dom"
import { Mail, LockKeyhole, UserRound, User } from "lucide-react"

export default function SignUpForm() {
    return (
        <div className="w-full min-h-screen flex items-center justify-center bg-[url('https://media.istockphoto.com/id/1460636032/vector/abstract-colorful-wave-element-for-design-digital-frequency-track-equalizer-stylized-line.jpg?s=612x612&w=0&k=20&c=jjIb7AZrOQt80WdqeUnQYRVT9ZTmEUUXl9t5ENnH2C4=')] bg-cover bg-center bg-no-repeat p-4">
           
            <form className="flex flex-col justify-center w-full max-w-md items-center gap-2 border border-white/30 p-10 rounded-2xl shadow-2xl backdrop-blur-lg bg-white/40">
                
                <div className="bg-white/60 p-3 rounded-full shadow-sm mb-2">
                    <UserRound className="size-10 text-[#2a4e75]" />
                </div>
                
                <h1 className="font-light font-mono text-4xl text-[#2a4e75] text-center mb-8 tracking-tight">Create Account</h1>
                
                <div className="text-[#4a5568] w-full flex flex-col gap-6 [&>div]:border-b-2 [&>div]:border-[#2a4e75]/20">
                   
                    <div className="flex gap-3 pb-2 transition-all focus-within:border-[#2a4e75]">
                        <User className="size-5 text-[#2a4e75]" />
                        <input className="bg-transparent outline-none w-full placeholder:text-gray-500" type="text" placeholder="Full Name"/>
                    </div>

                   
                    <div className="flex gap-3 pb-2 transition-all focus-within:border-[#2a4e75]">
                        <Mail className="size-5 text-[#2a4e75]" />
                        <input className="bg-transparent outline-none w-full placeholder:text-gray-500" type="email" placeholder="Email Address"/>
                    </div>
                    
                   
                    <div className="flex gap-3 pb-2 transition-all focus-within:border-[#2a4e75]">
                        <LockKeyhole className="size-5 text-[#2a4e75]" />
                        <input className="bg-transparent outline-none w-full placeholder:text-gray-500" type="password" placeholder="Password"/>
                    </div>

                   
                    <div className="flex gap-3 pb-2 transition-all focus-within:border-[#2a4e75]">
                        <LockKeyhole className="size-5 text-[#2a4e75]" />
                        <input className="bg-transparent outline-none w-full placeholder:text-gray-500" type="password" placeholder="Confirm Password"/>
                    </div>
                </div>

                <div className="mt-6 flex justify-center w-full text-sm font-medium text-[#366496]">
                    <Link to="/login" className="hover:underline">Already have an account? Log In</Link>
                </div>

                <button className="bg-[#2a4e75] text-white w-full py-3 rounded-xl mt-8 font-semibold transition-all hover:bg-[#1e3a5a] hover:shadow-lg active:scale-[0.98]">
                    Sign Up
                </button>
            </form>
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
    const [profilePic, setProfilePic] = useState("")
    const [profilePicContentType, setProfilePicContentType] = useState("")
    const [profilePicPreview, setProfilePicPreview] = useState("")
    const [profilePicError, setProfilePicError] = useState("")

    const compressImage = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onerror = () => reject(new Error("Unable to read image."))
            reader.onload = () => {
                const img = new Image()
                img.onerror = () => reject(new Error("Unable to load image."))
                img.onload = () => {
                    const maxBytes = 5 * 1024 * 1024
                    let scale = Math.min(1, 1024 / Math.max(img.width, img.height))
                    let quality = 0.85
                    const canvas = document.createElement("canvas")
                    const ctx = canvas.getContext("2d")
                    if (!ctx) {
                        reject(new Error("Unable to process image."))
                        return
                    }

                    const getByteSize = (dataUrl) => {
                        const base64 = dataUrl.split(",")[1] || ""
                        return Math.ceil((base64.length * 3) / 4)
                    }

                    let dataUrl = ""
                    while (scale >= 0.2) {
                        canvas.width = Math.round(img.width * scale)
                        canvas.height = Math.round(img.height * scale)
                        ctx.clearRect(0, 0, canvas.width, canvas.height)
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
                        dataUrl = canvas.toDataURL(file.type || "image/jpeg", quality)

                        if (getByteSize(dataUrl) <= maxBytes) {
                            resolve(dataUrl)
                            return
                        }

                        if (quality > 0.5) {
                            quality -= 0.1
                        } else {
                            scale *= 0.85
                        }
                    }

                    reject(new Error("Profile photo is still too large after compression."))
                }
                img.src = reader.result
            }
            reader.readAsDataURL(file)
        })
    }

    const handleProfilePicChange = async (event) => {
        const file = event.target.files?.[0]
        if (!file) {
            setProfilePic("")
            setProfilePicContentType("")
            setProfilePicPreview("")
            setProfilePicError("")
            return
        }

        if (file.size > 5 * 1024 * 1024) {
            setProfilePic("")
            setProfilePicContentType("")
            setProfilePicPreview("")
            setProfilePicError("Profile photo must be 5MB or smaller before upload.")
            return
        }

        setProfilePicError("")
        setProfilePicContentType(file.type || "image/jpeg")
        try {
            const dataUrl = await compressImage(file)
            const base64Value = dataUrl.split(",")[1] || ""
            setProfilePic(base64Value)
            setProfilePicPreview(dataUrl)
        } catch (err) {
            setProfilePicError(err.message || "Unable to process profile photo.")
        }
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError("")

        if (password !== confirmPassword) {
            setError("Passwords do not match.")
            return
        }

        setIsSubmitting(true)

        try {
            const payload = {
                name,
                email,
                password,
            }

            if (profilePic) {
                payload.profilePic = profilePic
                payload.profilePicContentType = profilePicContentType
            }

            const response = await fetch(SIGNUP_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(payload),
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
                            <label className="block text-sm font-medium text-slate-600">
                                Profile photo (optional)
                                <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                                    <User className="size-4 text-slate-400" />
                                    <input
                                        className="w-full text-sm text-slate-600 file:mr-3 file:rounded-lg file:border-0 file:bg-slate-100 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-slate-700 hover:file:bg-slate-200"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleProfilePicChange}
                                    />
                                </div>
                                {profilePicPreview ? (
                                    <img
                                        className="mt-3 h-16 w-16 rounded-full object-cover ring-2 ring-slate-200"
                                        src={profilePicPreview}
                                        alt="Profile preview"
                                    />
                                ) : null}
                                {profilePicError ? (
                                    <p className="mt-2 text-xs text-rose-500">{profilePicError}</p>
                                ) : null}
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
