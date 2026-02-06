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
        <div className="w-full min-h-screen flex bg-linear-to-b from-[#e5b3f6] to-[#b9e4eb] text-white">
            <form
                className="flex-col flex justify-start m-auto  w-[500px] items-center gap-1"
                onSubmit={handleSubmit}
            >
                <UserRound className="size-12" />
                <h1 className="font-extralight font-mono text-5xl text-center mb-4">Sign Up</h1>
                <div className="text-[#7f8fb7] w-full flex flex-col gap-10 [&>div]:border-b">
                    <div className="flex gap-3 pb-3 mx-10">
                        <User />
                        <input
                            className="outline-none"
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            required
                        />
                    </div>
                    <div className="flex gap-3 pb-3 mx-10 ">
                        <Mail />
                        <input
                            className="outline-none"
                            type="email"
                            placeholder="Write Email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                        />
                    </div>
                    <div className="flex gap-3 pb-3 mx-10">
                        <LockKeyhole />
                        <input
                            className="outline-none"
                            type="password"
                            placeholder="Write Password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                        />
                    </div>
                    <div className="flex gap-3 pb-3 mx-10">
                        <LockKeyhole />
                        <input
                            className="outline-none"
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(event) => setConfirmPassword(event.target.value)}
                            required
                        />
                    </div>
                </div>
                <div className="mt-6 flex text-[#366496]">
                    <Link to="/login">Go to LogIn</Link>
                </div>
                {error ? <p className="text-red-500 mt-3">{error}</p> : null}
                <button
                    type="submit"
                    className="bg-[#2a4e75] w-100 py-2 rounded mt-4 transition-all hover:bg-[#366496] active:scale-95 active:shadow-inner"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Signing up..." : "SignUp"}
                </button>
            </form>
        </div>
    )
}
