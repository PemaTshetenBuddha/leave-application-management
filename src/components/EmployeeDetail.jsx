import { useEffect, useState } from "react";
import { Calendar, FileText, User, MessageSquare } from "lucide-react";

const APPLICATIONS_URL = "http://localhost:5000/api/applications";

export default function EmployeeDetails({ application, onClose, canUpdateStatus = false, onStatusUpdated }) {
    const [currentStatus, setCurrentStatus] = useState(application?.status || "-");
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateError, setUpdateError] = useState("");
    const [confirmStatus, setConfirmStatus] = useState("");
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    useEffect(() => {
        setCurrentStatus(application?.status || "-");
        setUpdateError("");
        setConfirmStatus("");
        setIsConfirmOpen(false);
    }, [application]);

    const leaveDetail = {
        Name: application?.user?.name || application?.userName || "Employee",
        LeavingDate: application?.startDate ? new Date(application.startDate).toLocaleDateString() : "-",
        ReportingDate: application?.endDate ? new Date(application.endDate).toLocaleDateString() : "-",
        Subject: application?.subject || "-",
        Reason: application?.reason || "-",
        Status: currentStatus || "-",
    };

    const handleStatusChange = async (status) => {
        if (!application?._id || isUpdating) {
            return;
        }

        setIsUpdating(true);
        setUpdateError("");

        try {
            const url = `${APPLICATIONS_URL}/${application._id}`;
            console.info("Updating application status", {
                url,
                status,
                applicationId: application._id,
            });

            const response = await fetch(url, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ status }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                console.error("Failed to update application status", {
                    url,
                    status,
                    statusCode: response.status,
                    errorData,
                });
                const message = errorData?.message || "Unable to update status.";
                throw new Error(message);
            }

            const updatedApplication = await response.json().catch(() => null);
            console.info("Application status updated", {
                url,
                status,
                updatedApplication,
            });
            setCurrentStatus(status);
            setConfirmStatus("");
            setIsConfirmOpen(false);
            if (onStatusUpdated) {
                onStatusUpdated(updatedApplication ?? { ...application, status });
            }
        } catch (err) {
            console.error("Error updating application status", {
                status,
                applicationId: application?._id,
                error: err,
            });
            setUpdateError(err.message || "Unable to update status.");
        } finally {
            setIsUpdating(false);
        }
    };

    const requestStatusChange = (status) => {
        if (currentStatus === status || isUpdating) {
            return;
        }
        setConfirmStatus(status);
        setIsConfirmOpen(true);
    };

    const closeConfirmation = () => {
        if (isUpdating) {
            return;
        }
        setIsConfirmOpen(false);
        setConfirmStatus("");
    };

    return (
        <div
            className="w-auto min-w-[28rem] max-w-[90vw] max-h-[90vh] bg-white rounded-xl overflow-hidden ring-1 ring-slate-200 shadow-xl"
            onClick={(event) => event.stopPropagation()}
        >
            {/* Header */}
            <div className="flex items-center justify-between gap-4 bg-slate-900 p-6 text-white">
                <div className="flex items-center gap-4">
                    <div className="bg-slate-700 p-3 rounded-full">
                        <User size={24} />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold tracking-tight">{leaveDetail.Name}</h1>
                        <p className="text-slate-400 text-sm">Employee Leave Record</p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    className="text-slate-300 hover:text-white text-sm"
                >
                    Close
                </button>
            </div>

            {/* Dates Grid */}
            <div className="grid grid-cols-2 border-b border-slate-100">
                <div className="p-5 border-r border-slate-100">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Leaving Date</p>
                    <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
                        <Calendar size={14} className="text-blue-500" />
                        {leaveDetail.LeavingDate}
                    </div>
                </div>
                <div className="p-5">
                    <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Reporting Date</p>
                    <div className="flex items-center gap-2 text-slate-700 font-semibold text-sm">
                        <Calendar size={14} className="text-blue-500" />
                        {leaveDetail.ReportingDate}
                    </div>
                </div>
            </div>

            {/* Subject */}
            <div className="p-5 border-b border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Subject</p>
                <div className="flex items-center gap-2 text-slate-800 font-medium">
                    <FileText size={14} className="text-blue-500" />
                    {leaveDetail.Subject}
                </div>
            </div>

            {/* Reason */}
            <div className="p-5 bg-slate-50/50">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">Reason for Leave</p>
                <div className="flex gap-2">
                    <MessageSquare size={14} className="text-blue-500 mt-1 shrink-0" />
                    <p className="text-slate-600 text-sm leading-relaxed">{leaveDetail.Reason}</p>
                </div>
            </div>

            <div className="p-5 border-t border-slate-100">
                <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Status</p>
                <p className="text-sm font-semibold text-slate-700 capitalize">{leaveDetail.Status}</p>
                {canUpdateStatus && currentStatus === "pending" ? (
                    <div className="mt-4 flex flex-wrap gap-3">
                        <button
                            type="button"
                            onClick={() => requestStatusChange("approved")}
                            disabled={isUpdating || currentStatus === "approved"}
                            className="px-4 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold shadow hover:bg-emerald-700 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isUpdating && confirmStatus === "approved" ? "Updating..." : "Approve"}
                        </button>
                        <button
                            type="button"
                            onClick={() => requestStatusChange("rejected")}
                            disabled={isUpdating || currentStatus === "rejected"}
                            className="px-4 py-2 rounded-lg bg-rose-600 text-white text-sm font-semibold shadow hover:bg-rose-700 disabled:opacity-60 disabled:cursor-not-allowed"
                        >
                            {isUpdating && confirmStatus === "rejected" ? "Updating..." : "Reject"}
                        </button>
                    </div>
                ) : null}
                {updateError ? <p className="mt-3 text-sm text-rose-600">{updateError}</p> : null}
            </div>
            {isConfirmOpen ? (
                <div
                    className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 px-4"
                    onClick={closeConfirmation}
                >
                    <div
                        className="w-full max-w-sm rounded-xl bg-white p-6 shadow-2xl"
                        onClick={(event) => event.stopPropagation()}
                    >
                        <h3 className="text-lg font-semibold text-slate-900">Confirm action</h3>
                        <p className="mt-2 text-sm text-slate-600">
                            Are you sure you want to {confirmStatus} this application?
                        </p>
                        <div className="mt-5 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={closeConfirmation}
                                disabled={isUpdating}
                                className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-60"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={() => handleStatusChange(confirmStatus)}
                                disabled={isUpdating}
                                className={`px-4 py-2 rounded-lg text-sm font-semibold text-white shadow disabled:opacity-60 ${
                                    confirmStatus === "approved"
                                        ? "bg-emerald-600 hover:bg-emerald-700"
                                        : "bg-rose-600 hover:bg-rose-700"
                                }`}
                            >
                                {isUpdating ? "Updating..." : "Confirm"}
                            </button>
                        </div>
                    </div>
                </div>
            ) : null}
        </div>
    )
}


// import { Calendar, FileText, User, MessageSquare } from "lucide-react";

// export default function LeaveDetail() {
//     const leaveDetail = {
//         Name: "Pema Tsheten",
//         Leaving: "12/12/24",
//         Reporting: "15/12/24",
//         Subject: "Sick Leave",
//         Reason: "I am writing to formally request a sick leave due to a severe flu. My doctor has advised complete rest for three days to ensure a full recovery."
//     };

//     // Simple list for mapping
//     const info = [
//         { label: "Leaving Date", value: leaveDetail.Leaving, icon: <Calendar size={14} /> },
//         { label: "Reporting Date", value: leaveDetail.Reporting, icon: <Calendar size={14} /> },
//         { label: "Subject", value: leaveDetail.Subject, icon: <FileText size={14} /> },
//     ];

//     return (
//         <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
//             <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
                
//                 {/* Minimal Header */}
//                 <div className="p-6 border-b border-slate-100 flex items-center gap-4">
//                     <div className="bg-blue-600 p-3 rounded-full text-white"><User size={20} /></div>
//                     <div>
//                         <h1 className="text-lg font-bold text-slate-900">{leaveDetail.Name}</h1>
//                         <p className="text-xs text-slate-500 uppercase tracking-widest">Employee Record</p>
//                     </div>
//                 </div>

//                 {/* Simple List Map */}
//                 <div className="divide-y divide-slate-100">
//                     {info.map((item, index) => (
//                         <div key={index} className="p-4 flex items-center justify-between">
//                             <div className="flex items-center gap-3">
//                                 <span className="text-blue-500">{item.icon}</span>
//                                 <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{item.label}</span>
//                             </div>
//                             <span className="text-sm font-semibold text-slate-700">{item.value}</span>
//                         </div>
//                     ))}
//                 </div>

//                 {/* Plain Reason Area */}
//                 <div className="p-6 bg-slate-50 border-t border-slate-100">
//                     <div className="flex items-center gap-2 mb-2">
//                         <MessageSquare size={14} className="text-blue-500" />
//                         <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Reason</span>
//                     </div>
//                     <p className="text-sm text-slate-600 leading-relaxed italic">
//                         "{leaveDetail.Reason}"
//                     </p>
//                 </div>
//             </div>
//         </main>
//     );
// }

