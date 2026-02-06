import { Mail, User, Shield, Pencil } from "lucide-react"
import { useEffect, useMemo, useState } from "react"

const USER_URL = "http://localhost:5000/api/users/me"

export default function UserProfile({ user, onUserUpdated, onClose }) {
  const [currentUser, setCurrentUser] = useState(user)
  const [isEditing, setIsEditing] = useState(false)
  const [formValues, setFormValues] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
  })
  const [error, setError] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    setCurrentUser(user)
    setFormValues((prev) => ({
      ...prev,
      name: user?.name || "",
      email: user?.email || "",
    }))
  }, [user])

  useEffect(() => {
    if (currentUser) {
      return
    }

    let isMounted = true

    const fetchUser = async () => {
      try {
        const response = await fetch(USER_URL, { credentials: "include" })
        if (!response.ok) {
          throw new Error("Unable to load user profile.")
        }
        const data = await response.json().catch(() => null)
        if (isMounted) {
          setCurrentUser(data)
          onUserUpdated?.(data)
        }
      } catch (fetchError) {
        if (isMounted) {
          setError(fetchError.message || "Unable to load user profile.")
        }
      }
    }

    fetchUser()

    return () => {
      isMounted = false
    }
  }, [currentUser, onUserUpdated])

  const userDetails = useMemo(() => {
    if (!currentUser) {
      return []
    }

    return [
      { label: "Email", value: currentUser.email, icon: Mail },
      { label: "Role", value: currentUser.role, icon: Shield },
    ]
  }, [currentUser])

  const getInitials = (name = "") => {
    if (!name) {
      return "?"
    }
    return name
      .split(" ")
      .filter(Boolean)
      .map((part) => part[0])
      .join("")
      .substring(0, 2)
      .toUpperCase()
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async (event) => {
    event.preventDefault()
    setError("")
    setIsSaving(true)

    try {
      const payload = {
        name: formValues.name,
        email: formValues.email,
      }

      if (formValues.password) {
        payload.password = formValues.password
      }

      const response = await fetch(USER_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        const message = errorData?.message || "Unable to update profile."
        throw new Error(message)
      }

      const updatedUser = await response.json().catch(() => ({ ...currentUser, ...payload }))
      setCurrentUser(updatedUser)
      onUserUpdated?.(updatedUser)
      setIsEditing(false)
      setFormValues((prev) => ({ ...prev, password: "" }))
    } catch (saveError) {
      setError(saveError.message || "Unable to update profile.")
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6 bg-gray-800 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md">
            {getInitials(currentUser?.name)}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{currentUser?.name || "User"}</h1>
            <p className="text-blue-200">{currentUser?.role || ""}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setIsEditing((prev) => !prev)}
          className="flex items-center gap-2 text-sm text-white/80 hover:text-white"
        >
          <Pencil size={16} />
          {isEditing ? "Cancel" : "Edit"}
        </button>
      </div>

      <div className="p-6 space-y-6">
        {error ? <p className="text-sm text-rose-600">{error}</p> : null}
        {!isEditing ? (
          <div className="space-y-4">
            {userDetails.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.label} className="flex items-center">
                  <Icon className="w-5 h-5 text-gray-400 mr-3" />
                  <p className="text-gray-800">
                    <span className="font-semibold text-gray-600">{item.label}:</span> {item.value}
                  </p>
                </div>
              )
            })}
          </div>
        ) : (
          <form className="space-y-4" onSubmit={handleSave}>
            <label className="block text-sm font-medium text-gray-600">
              Name
              <input
                className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-800 focus:border-indigo-500 focus:outline-none"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                required
              />
            </label>
            <label className="block text-sm font-medium text-gray-600">
              Email
              <input
                className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-800 focus:border-indigo-500 focus:outline-none"
                name="email"
                type="email"
                value={formValues.email}
                onChange={handleChange}
                required
              />
            </label>
            <label className="block text-sm font-medium text-gray-600">
              New Password
              <input
                className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-800 focus:border-indigo-500 focus:outline-none"
                name="password"
                type="password"
                value={formValues.password}
                onChange={handleChange}
                placeholder="Leave blank to keep current password"
              />
            </label>
            <div className="flex items-center justify-between gap-3">
              <button
                type="submit"
                className="flex-1 rounded-lg bg-indigo-600 px-4 py-2 text-white font-semibold hover:bg-indigo-700 disabled:opacity-60"
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-lg border border-gray-200 px-4 py-2 text-gray-600 hover:bg-gray-50"
              >
                Close
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
