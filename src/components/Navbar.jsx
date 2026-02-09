import { useEffect, useRef, useState } from "react"
import { CircleUser, LogOut, UserCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import UserProfile from "./UserProfile"
import resolveProfilePic from "../utils/resolveProfilePic"

const USER_URL = "http://localhost:5000/api/users/me"
const LOGOUT_URL = "http://localhost:5000/api/auth/logout"

export default function Navbar() {
    const navigate = useNavigate()
    const [showProfile, setShowProfile] = useState(false)
    const [showMenu, setShowMenu] = useState(false)
    const [user, setUser] = useState(null)
    const [menuError, setMenuError] = useState("")
    const menuRef = useRef(null)

    const avatarSrc = resolveProfilePic(user?.profilePicUrl || user?.profilePic)

    useEffect(() => {
        let isMounted = true

        const fetchUser = async () => {
            try {
                const response = await fetch(USER_URL, { credentials: "include" })
                if (!response.ok) {
                    return
                }
                const data = await response.json().catch(() => null)
                if (isMounted && data) {
                    setUser(data)
                }
            } catch (error) {
                // ignore fetching errors here
            }
        }

        fetchUser()

        return () => {
            isMounted = false
        }
    }, [])

    useEffect(() => {
        if (!showMenu) {
            return
        }

        const handleOutsideClick = (event) => {
            if (!menuRef.current || menuRef.current.contains(event.target)) {
                return
            }
            setShowMenu(false)
        }

        document.addEventListener("mousedown", handleOutsideClick)

        return () => {
            document.removeEventListener("mousedown", handleOutsideClick)
        }
    }, [showMenu])

    const handleLogout = async () => {
        setMenuError("")
        try {
            const response = await fetch(LOGOUT_URL, {
                method: "POST",
                credentials: "include",
            })
            if (!response.ok) {
                throw new Error("Logout failed. Please try again.")
            }
            navigate("/login")
        } catch (error) {
            setMenuError(error.message || "Logout failed. Please try again.")
        } finally {
            setShowMenu(false)
        }
    }

    return (
        <>
            <main className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
                <div className="mx-auto flex justify-between items-center py-3 px-10">
                    <div className="flex items-center gap-4">
                        <div className="bg-slate-300 p-2 rounded-full shadow-[0_0_25px_rgba(148,163,184,0.8)] border border-white/20">
                            <img
                                className="w-10 h-10"
                                src="https://www.t3bhutan.com/t3-cloud-logo-dark.svg"
                                alt="img"
                            />
                        </div>
                        <h1 className="text-slate-800 font-bold text-xl tracking-tight">Leave Management</h1>
                    </div>

                    <div className="relative" ref={menuRef}>
                        <button
                            type="button"
                            onClick={() => setShowMenu((prev) => !prev)}
                            className="flex items-center gap-3 text-slate-600 hover:text-indigo-600 cursor-pointer transition-colors"
                        >
                            <span className="text-sm font-medium hidden md:block">
                                {user?.name || "User"}
                            </span>
                            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 overflow-hidden ring-1 ring-slate-200">
                                {avatarSrc ? (
                                    <img className="h-full w-full object-cover" src={avatarSrc} alt={user?.name || "User"} />
                                ) : (
                                    <CircleUser size={32} strokeWidth={1.5} />
                                )}
                            </span>
                        </button>

                        {showMenu && (
                            <div className="absolute right-0 mt-3 w-48 bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden z-50">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setShowProfile(true)
                                        setShowMenu(false)
                                    }}
                                    className="w-full flex items-center gap-2 px-4 py-3 text-sm text-slate-700 hover:bg-slate-50"
                                >
                                    <UserCircle size={16} />
                                    Profile
                                </button>
                                <button
                                    type="button"
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-2 px-4 py-3 text-sm text-rose-600 hover:bg-rose-50"
                                >
                                    <LogOut size={16} />
                                    Logout
                                </button>
                                {menuError ? (
                                    <p className="px-4 pb-3 text-xs text-rose-500">{menuError}</p>
                                ) : null}
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {showProfile && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-white/40 backdrop-blur-md"
                        onClick={() => setShowProfile(false)}
                    />
                    <div
                        className="relative bg-white rounded-2xl shadow-2xl overflow-hidden max-w-2xl w-full animate-in fade-in zoom-in-95 duration-200"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <UserProfile
                            user={user}
                            onUserUpdated={setUser}
                            onClose={() => setShowProfile(false)}
                        />
                    </div>
                </div>
            )}
        </>
    )
}
