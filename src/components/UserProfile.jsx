import { Mail, User, Shield, Pencil } from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import resolveProfilePic from "../utils/resolveProfilePic"

const USER_URL = "http://localhost:5000/api/users/me"

export default function UserProfile({ user, onUserUpdated, onClose }) {
  const [currentUser, setCurrentUser] = useState(user)
  const [isEditing, setIsEditing] = useState(false)
  const [formValues, setFormValues] = useState({
    name: user?.name || "",
    email: user?.email || "",
  })
  const [profilePic, setProfilePic] = useState("")
  const [profilePicContentType, setProfilePicContentType] = useState("")
  const [profilePicPreview, setProfilePicPreview] = useState("")
  const [profilePicError, setProfilePicError] = useState("")
  const [passwordValues, setPasswordValues] = useState({
    currentPassword: "",
    newPassword: "",
  })
  const [error, setError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [passwordMessage, setPasswordMessage] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [isPasswordSaving, setIsPasswordSaving] = useState(false)

  useEffect(() => {
    setCurrentUser(user)
    setFormValues((prev) => ({
      ...prev,
      name: user?.name || "",
      email: user?.email || "",
    }))
    const resolvedPic = resolveProfilePic(user?.profilePicUrl || user?.profilePic)
    setProfilePicPreview(resolvedPic)
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
          setProfilePicPreview(resolveProfilePic(data?.profilePicUrl || data?.profilePic))
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

  const userDetails = useMemo(() => {
    if (!currentUser) {
      return []
    }

    return [
      { label: "Email", value: currentUser.email, icon: Mail },
      { label: "Role", value: currentUser.role, icon: Shield },
    ]
  }, [currentUser])

  const avatarFallback = getInitials(currentUser?.name)
  const avatarSrc = profilePicPreview || resolveProfilePic(currentUser?.profilePicUrl || currentUser?.profilePic)

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormValues((prev) => ({ ...prev, [name]: value }))
  }

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
      setProfilePicPreview(resolveProfilePic(currentUser?.profilePicUrl || currentUser?.profilePic))
      setProfilePicError("")
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setProfilePic("")
      setProfilePicContentType("")
      setProfilePicPreview(resolveProfilePic(currentUser?.profilePicUrl || currentUser?.profilePic))
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

  const handlePasswordChange = (event) => {
    const { name, value } = event.target
    setPasswordValues((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = async (event) => {
    event.preventDefault()
    setError("")
    setIsSaving(true)

    if (profilePicError) {
      setError(profilePicError)
      setIsSaving(false)
      return
    }

    try {
      const payload = {
        name: formValues.name,
        email: formValues.email,
      }

      if (profilePic && !profilePicError) {
        payload.profilePic = profilePic
        payload.profilePicContentType = profilePicContentType
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
        if (response.status === 413) {
          throw new Error("Profile photo exceeds the server upload limit. Please choose a smaller image.")
        }
        const errorData = await response.json().catch(() => null)
        const message = errorData?.message || "Unable to update profile."
        throw new Error(message)
      }

      const updatedUser = await response.json().catch(() => ({ ...currentUser, ...payload }))
      setCurrentUser(updatedUser)
      onUserUpdated?.(updatedUser)
      setProfilePic("")
      setProfilePicError("")
      setIsEditing(false)
    } catch (saveError) {
      setError(saveError.message || "Unable to update profile.")
    } finally {
      setIsSaving(false)
    }
  }

  const handlePasswordSave = async (event) => {
    event.preventDefault()
    setPasswordError("")
    setPasswordMessage("")

    if (!passwordValues.currentPassword || !passwordValues.newPassword) {
      setPasswordError("Please enter your current and new password.")
      return
    }

    setIsPasswordSaving(true)

    try {
      const response = await fetch(`${USER_URL}/password`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          currentPassword: passwordValues.currentPassword,
          newPassword: passwordValues.newPassword,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => null)
        const message = errorData?.message || "Unable to update password."
        throw new Error(message)
      }

      await response.json().catch(() => ({}))
      setPasswordMessage("Password updated successfully.")
      setPasswordValues({ currentPassword: "", newPassword: "" })
    } catch (passwordSaveError) {
      setPasswordError(passwordSaveError.message || "Unable to update password.")
    } finally {
      setIsPasswordSaving(false)
    }
  }

  return (
    <div className="mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6 bg-gray-800 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="h-16 w-16 rounded-full bg-blue-600 text-white text-2xl font-bold shadow-md overflow-hidden flex items-center justify-center">
            {avatarSrc ? (
              <img className="h-full w-full object-cover" src={avatarSrc} alt={currentUser?.name || "User"} />
            ) : (
              avatarFallback
            )}
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
          <div className="space-y-6">
            <form className="space-y-4" onSubmit={handleSave}>
              <label className="block text-sm font-medium text-gray-600">
                Profile photo
                <input
                  className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-800 file:mr-3 file:rounded-md file:border-0 file:bg-gray-100 file:px-3 file:py-2 file:text-xs file:font-semibold file:text-gray-700 hover:file:bg-gray-200"
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                />
              </label>
              {profilePicPreview ? (
                <img
                  className="h-20 w-20 rounded-full object-cover ring-2 ring-gray-200"
                  src={profilePicPreview}
                  alt="Profile preview"
                />
              ) : null}
              {profilePicError ? (
                <p className="text-xs text-rose-600">{profilePicError}</p>
              ) : null}
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
            <form className="space-y-4 rounded-lg border border-gray-200 bg-gray-50/40 p-4" onSubmit={handlePasswordSave}>
              <div>
                <h3 className="text-sm font-semibold text-gray-700">Change password</h3>
                <p className="text-xs text-gray-500">Use your current password to set a new one.</p>
              </div>
              <label className="block text-sm font-medium text-gray-600">
                Current password
                <input
                  className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-800 focus:border-indigo-500 focus:outline-none"
                  name="currentPassword"
                  type="password"
                  value={passwordValues.currentPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter current password"
                  required
                />
              </label>
              <label className="block text-sm font-medium text-gray-600">
                New password
                <input
                  className="mt-2 w-full rounded-lg border border-gray-200 px-3 py-2 text-gray-800 focus:border-indigo-500 focus:outline-none"
                  name="newPassword"
                  type="password"
                  value={passwordValues.newPassword}
                  onChange={handlePasswordChange}
                  placeholder="Enter new password"
                  required
                />
              </label>
              {passwordError ? <p className="text-sm text-rose-600">{passwordError}</p> : null}
              {passwordMessage ? <p className="text-sm text-emerald-600">{passwordMessage}</p> : null}
              <button
                type="submit"
                className="w-full rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800 disabled:opacity-60"
                disabled={isPasswordSaving}
              >
                {isPasswordSaving ? "Updating..." : "Update Password"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
