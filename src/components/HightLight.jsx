import { Plane, MailQuestionMark, FileCheck, Trash2 } from "lucide-react"
import { useEffect, useState } from "react"

const USER_COUNT_URL = "http://localhost:5000/api/users/count"
const APPLICATION_COUNTS_URL = "http://localhost:5000/api/applications/counts"
const LEAVE_COUNT_URL = "http://localhost:5000/api/applications/leave-count"

export default function HightLight() {
    const [userCount, setUserCount] = useState(null)
    const [applicationCounts, setApplicationCounts] = useState({
        pending: null,
        approved: null,
        rejected: null
    })
    const [leaveCount, setLeaveCount] = useState(null)

    useEffect(() => {
        let isMounted = true

        const loadUserCount = async () => {
            try {
                const response = await fetch(USER_COUNT_URL, { credentials: "include" })
                if (!response.ok) {
                    throw new Error("Failed to load user count")
                }
                const data = await response.json()
                const count = data?.totalUsers ?? data?.count ?? data?.data?.count ?? data?.total ?? 0
                if (isMounted) {
                    setUserCount(count)
                }
            } catch (error) {
                if (isMounted) {
                    setUserCount(0)
                }
            }
        }

        const loadApplicationCounts = async () => {
            try {
                const response = await fetch(APPLICATION_COUNTS_URL, { credentials: "include" })
                if (!response.ok) {
                    throw new Error("Failed to load application counts")
                }
                const data = await response.json()
                if (isMounted) {
                    setApplicationCounts({
                        pending: data?.pending ?? 0,
                        approved: data?.approved ?? 0,
                        rejected: data?.rejected ?? 0
                    })
                }
            } catch (error) {
                if (isMounted) {
                    setApplicationCounts({ pending: 0, approved: 0, rejected: 0 })
                }
            }
        }

        const loadLeaveCount = async () => {
            try {
                const response = await fetch(LEAVE_COUNT_URL, { credentials: "include" })
                if (!response.ok) {
                    throw new Error("Failed to load leave count")
                }
                const data = await response.json()
                const count = data?.totalUsersOnLeave ?? 0
                if (isMounted) {
                    setLeaveCount(count)
                }
            } catch (error) {
                if (isMounted) {
                    setLeaveCount(0)
                }
            }
        }

        loadUserCount()
        loadApplicationCounts()
        loadLeaveCount()

        return () => {
            isMounted = false
        }
    }, [])

    return <main>
        <div className="flex justify-between px-10 py-4">
            <div className="flex gap-3 justify-center font-bold px-10 py-4 rounded-2xl shadow-lg">
                <div className=" shadow-xl bg-gray-100 p-4 rounded-2xl ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                    </svg>
                </div>
                <div>
                    <h1>Employees</h1>
                    <h2 className="font-bold">{userCount ?? "--"}</h2>
                </div>
            </div>
            <div className="flex justify-center gap-3  shadow-lg px-10 py-4 rounded-2xl">
                <div className="text-orange-400 shadow-xl bg-gray-100 p-4 rounded-2xl">
                        < Plane />
                    </div>
                    <div className="">
                        <h1>On Leave</h1>
                        <h2 className="font-bold">{leaveCount ?? "--"}</h2>
                    </div>
            </div>
            <div className="flex justify-center gap-3  shadow-lg px-10 py-4 rounded-2xl">
                <div className="text-purple-400 shadow-xl bg-gray-100 p-4 rounded-2xl">
                    <MailQuestionMark />
                </div>
                <div>
                    <h1>Pending</h1>
                    <h2 className="font-bold">{applicationCounts.pending ?? "--"}</h2>
                </div>
            </div>
            <div className="flex justify-center gap-3  shadow-lg px-10 py-4 rounded-2xl">
                <div className="text-green-300 shadow-xl bg-gray-100 p-4 rounded-2xl">
                <FileCheck />
                </div>
                <div>
                    <h1>Approved</h1>
                    <h2 className="font-bold">{applicationCounts.approved ?? "--"}</h2>
                </div>
            </div>
            <div className="flex justify-center gap-3  shadow-lg px-10 py-4 rounded-2xl">
                <div className="text-red-500 shadow-xl bg-gray-100 p-4 rounded-2xl">
                    <Trash2 />
                </div>
                <div>
                    <h1>Rejected</h1>
                    <h2 className="font-bold">{applicationCounts.rejected ?? "--"}</h2>
                </div>
                
            </div>

        </div>

    </main>
}