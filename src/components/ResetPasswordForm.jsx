import { KeyRound, LockKeyhole, Shield } from "lucide-react"
import { useMemo, useState } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"

const RESET_PASSWORD_URL = "http://localhost:5000/api/auth/reset-password"

export default function ResetPasswordForm() {
  const { token } = useParams()
  const navigate = useNavigate()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const hasToken = useMemo(() => Boolean(token), [token])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError("")
    setMessage("")

    if (!hasToken) {
      setError("Reset token is missing.")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(RESET_PASSWORD_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        const errorMessage = errorData?.message || "Unable to reset password."
        throw new Error(errorMessage)
      }

      await response.json().catch(() => ({}))
      setMessage("Password updated successfully. You can now log in.")
      setPassword("")
      setConfirmPassword("")
      setTimeout(() => navigate("/login"), 1200)
    } catch (err) {
      setError(err.message || "Unable to reset password.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex items-center justify-center px-4 py-12">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(15,118,110,0.12),_transparent_60%)]" />
        <div className="relative grid gap-10 lg:grid-cols-[1.1fr_1fr]">
          <div className="p-10 lg:p-14">
            <div className="flex items-center gap-3 text-emerald-600">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50">
                <Shield className="size-6" />
              </div>
              <span className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-500">Secure Reset</span>
            </div>
            <h1 className="mt-6 text-4xl font-semibold leading-tight text-slate-900">
              Create a new password
            </h1>
            <p className="mt-4 text-base text-slate-600">
              Choose a strong password to keep your account safe.
            </p>
            <div className="mt-10 grid gap-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white">
                  <KeyRound className="size-5 text-emerald-500" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Strong passwords</p>
                  <p className="text-xs text-slate-500">Use at least 8 characters with a mix of symbols.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 text-slate-900 sm:p-10">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <h2 className="text-2xl font-semibold text-slate-900">Reset password</h2>
                <p className="text-sm text-slate-500">Enter your new password below.</p>
              </div>
              <label className="block text-sm font-medium text-slate-600">
                New password
                <div className="mt-2 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                  <LockKeyhole className="size-4 text-slate-400" />
                  <input
                    className="w-full bg-transparent text-sm text-slate-900 outline-none"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter a new password"
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
                    placeholder="Re-enter your new password"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    required
                  />
                </div>
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-500">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  checked={showPassword}
                  onChange={(event) => setShowPassword(event.target.checked)}
                />
                Show password
              </label>
              {error ? <p className="text-sm text-rose-600">{error}</p> : null}
              {message ? <p className="text-sm text-emerald-600">{message}</p> : null}
              {!hasToken ? (
                <p className="text-xs text-slate-400">
                  The reset token is missing. Please use the link from your email.
                </p>
              ) : null}
              <button
                type="submit"
                className="w-full rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60"
                disabled={isSubmitting || !hasToken}
              >
                {isSubmitting ? "Saving..." : "Update password"}
              </button>
              <div className="text-sm text-slate-500">
                Remember your password?{" "}
                <Link className="text-emerald-600 hover:text-emerald-700" to="/login">
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
