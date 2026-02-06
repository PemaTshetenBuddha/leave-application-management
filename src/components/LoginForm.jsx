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
        <div className="w-full min-h-screen flex text-black">
            <form
                className="flex-col flex justify-start m-auto w-[500px] items-center gap-1"
                onSubmit={handleSubmit}
            >
                <UserRound className="size-12" />
                <h1 className="font-extralight font-mono text-5xl text-center mb-4">Users Login</h1>
                <div className="text-[#7f8fb7] w-full flex flex-col gap-10 [&>div]:border-b">
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
                </div>
                <div className="mt-6 flex gap-37 text-[#366496]">
                    <Link to="/signUp">Create New Acc</Link>
                    <a href="#">Forgot Password?</a>
                </div>
                {error ? <p className="text-red-500 mt-3">{error}</p> : null}
                <button
                    type="submit"
                    className="bg-[#2a4e75] w-100 py-2 rounded mt-4 transition-all hover:bg-[#366496] active:scale-95 active:shadow-inner"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Logging in..." : "Login"}
                </button>
            </form>
        </div>
    )
}
