import { Mail, Shield } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus("success")
    setMessage("If an account exists, a reset link will be sent to your email shortly.")
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center px-4 py-12">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.12),_transparent_60%)]" />
        <div className="relative grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="p-10 lg:p-14">
            <div className="flex items-center gap-3 text-sky-600">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50">
                <Shield className="size-6" />
              </div>
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-500">Reset Access</span>
            </div>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-slate-900">
              Forgot your password?
            </h1>
            <p className="mt-4 text-base text-slate-600">
              Enter your email and we will send a secure link to reset your password.
            </p>
            <div className="mt-10 grid gap-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white">
                  <Mail className="size-5 text-sky-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Check your inbox</p>
                  <p className="text-xs text-slate-500">We will send a reset link within minutes.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 text-slate-900 sm:p-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Reset password</h2>
                <p className="text-sm text-slate-500">Provide your email to receive the link.</p>
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
              {message ? (
                <p className="text-sm text-emerald-600">{message}</p>
              ) : (
                <p className="text-xs text-slate-400">
                  We will email you a reset link if your account exists.
                </p>
              )}
              <button
                type="submit"
                className="w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Send reset link
              </button>
              <div className="text-sm text-slate-500">
                Remember your password?{" "}
                <Link className="text-sky-600 hover:text-sky-700" to="/login">
                  Back to login
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
