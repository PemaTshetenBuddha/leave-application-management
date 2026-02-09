import { useEffect, useMemo, useState } from "react";
import { Eye } from "lucide-react";

import EmployeeDetails from "./EmployeeDetail";
import resolveProfilePic from "../utils/resolveProfilePic";

const ADMIN_APPLICATIONS_URL = "http://localhost:5000/api/applications";

export default function LeaveTables() {

    const [showDetails, SetShowDetails] = useState(false);
    const [selectedApplication, setSelectedApplication] = useState(null);
    const [applications, setApplications] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const hideDetails = () => SetShowDetails(false);

    const handleStatusUpdated = (updatedApplication) => {
        if (!updatedApplication?._id) {
            return;
        }
        setApplications((prev) =>
            prev.map((application) =>
                application._id === updatedApplication._id ? { ...application, ...updatedApplication } : application
            )
        );
        setSelectedApplication((prev) =>
            prev?._id === updatedApplication._id ? { ...prev, ...updatedApplication } : prev
        );
    };

    useEffect(() => {
        let isMounted = true;

        const fetchApplications = async () => {
            setIsLoading(true);
            setError("");
            try {
                const response = await fetch(ADMIN_APPLICATIONS_URL, { credentials: "include" });
                if (!response.ok) {
                    const errorData = await response.json().catch(() => null);
                    const message = errorData?.message || "Unable to load applications.";
                    throw new Error(message);
                }
                const data = await response.json().catch(() => []);
                if (isMounted) {
                    setApplications(Array.isArray(data) ? data : []);
                }
            } catch (err) {
                if (isMounted) {
                    setError(err.message || "Unable to load applications.");
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchApplications();

        return () => {
            isMounted = false;
        };
    }, []);

    const truncateReason = (text, limit = 35) => {
        if (!text) return "-";
        return text.length > limit ? `${text.slice(0, limit).trim()}…` : text;
    };

    const rows = useMemo(() => {
        const sortedApplications = [...applications].sort((a, b) => {
            const aDate = new Date(a.createdAt || a.startDate || 0).getTime();
            const bDate = new Date(b.createdAt || b.startDate || 0).getTime();
            return bDate - aDate;
        });

        return sortedApplications.map((application) => {
            const startDate = application.startDate ? new Date(application.startDate) : null;
            return {
                id: application._id,
                name: application.user?.name || application.userName || "Employee",
                avatarSrc: resolveProfilePic(application.user?.profilePicUrl || application.user?.profilePic),
                subject: application.subject,
                reason: application.reason,
                shortReason: truncateReason(application.reason),
                date: startDate ? startDate.toLocaleDateString() : "-",
                status: application.status,
                raw: application,
            };
        });
    }, [applications]);

    return (
        <main className="p-8 mt-10 bg-slate-50 min-h-screen font-sans">
            <div className="max-w-full mx-auto bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                <div className="flex bg-slate-50 border-b border-slate-200 p-4 text-xs uppercase tracking-wider font-bold text-slate-500">
                    <p className="flex-1">Employee</p>
                    <p className="flex-1">Leave Subject</p>
                    <p className="flex-[1.5]">Reason for Leave</p>
                    <p className="flex-1">Applied Date</p>
                    <p className="w-34 text-center">Status</p>
                    <p className="">Detail</p>
                </div>

                {isLoading ? (
                    <div className="p-6 text-sm text-slate-500">Loading applications...</div>
                ) : error ? (
                    <div className="p-6 text-sm text-rose-500">{error}</div>
                ) : rows.length === 0 ? (
                    <div className="p-6 text-sm text-slate-500">No applications found.</div>
                ) : (
                    rows.map((row) => (
                        <div
                            key={row.id}
                            className="flex p-4 items-center border-b border-slate-100 hover:bg-slate-50"
                        >
                            <div className="flex flex-1 items-center gap-3">
                                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 overflow-hidden ring-1 ring-slate-200">
                                    {row.avatarSrc ? (
                                        <img className="h-full w-full object-cover" src={row.avatarSrc} alt={row.name} />
                                    ) : (
                                        <span className="text-xs font-semibold text-slate-500">
                                            {row.name?.charAt(0) || "?"}
                                        </span>
                                    )}
                                </span>
                                <p className="font-semibold text-slate-800">{row.name}</p>
                            </div>
                            <p className="flex-1 text-slate-600 text-sm">{row.subject}</p>
                            <p className="flex-[1.5] text-slate-500 text-sm italic pr-4" title={row.reason}>
                                "{row.shortReason}"
                            </p>
                            <p className="flex-1 text-slate-600 text-sm">{row.date}</p>

                    </div>
                ))}
            </div>
            {showDetails && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/20 p-4"
                    onClick={hideDetails}
                >

                    <div
                        className="relative w-full max-w-lg border border-white/30 p-8 rounded-2xl shadow-2xl backdrop-blur-lg bg-white/40 flex flex-col gap-6"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <EmployeeDetails />
                        <div className="flex gap-4 mt-4 w-full">
                            <button
                                onClick={hideDetails}
                                className="flex-1 bg-white/50 text-[#2a4e75] border border-[#2a4e75]/20 py-3 rounded-xl font-semibold hover:bg-white/80 transition-all active:scale-95"
                            >
                                Reject
                            </button>
                            <button
                                className="flex-1 bg-[#2a4e75] text-white py-3 rounded-xl font-semibold shadow-lg hover:bg-[#1e3a5a] transition-all active:scale-95"
                            >
                                Approve
                            </button>
                        </div>
                    </div>
                </div>
            )}

                            <div className="w-32 flex justify-center">
                                <span
                                    className={`px-3 py-1 rounded-full text-[11px] font-bold shadow-sm ${
                                        row.status === "pending"
                                            ? "bg-indigo-50 text-indigo-600 border border-indigo-100"
                                            : row.status === "approved"
                                            ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                            : "bg-rose-50 text-rose-600 border border-rose-100"
                                    }`}
                                >
                                    {row.status}
                                </span>
                            </div>
                            <div className="w-15 flex justify-center shadow-2xl">
                                <button
                                    onClick={() => {
                                        setSelectedApplication(row.raw);
                                        SetShowDetails(true);
                                    }}
                                    className="text-slate-400 cursor-pointer p-1 rounded-full hover:bg-indigo-100"
                                    title="View Details"
                                >
                                    <Eye size={18} />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
            {showDetails && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm"
                    onClick={hideDetails}
                >
                    <EmployeeDetails
                        application={selectedApplication}
                        onClose={hideDetails}
                        canUpdateStatus
                        onStatusUpdated={handleStatusUpdated}
                    />
                </div>
            )}
        </main>
    );
}
