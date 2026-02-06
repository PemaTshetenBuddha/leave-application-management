import { X } from "lucide-react";
import { useState } from "react";
import Navbar from "./Navbar";
import UserTable from "./UserTable";

const APPLICATION_URL = "http://localhost:5000/api/applications";

export default function ApplicationForm() {
    const [visible, setVisible] = useState(false);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [subject, setSubject] = useState("");
    const [reason, setReason] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [refreshToken, setRefreshToken] = useState(0);
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const minimumDate = startDate || undefined;

    const closeForm = () => setVisible(false);

    const resetForm = () => {
        setStartDate("");
        setEndDate("");
        setSubject("");
        setReason("");
        setError("");
        setSuccessMessage("");
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        setSuccessMessage("");
        setIsSubmitting(true);

        try {
            const response = await fetch(APPLICATION_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    subject,
                    startDate,
                    endDate,
                    reason,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                const message = errorData?.message || "Unable to submit application.";
                throw new Error(message);
            }

            await response.json().catch(() => ({}));
            setSuccessMessage("Application submitted successfully.");
            resetForm();
            setVisible(false);
            setRefreshToken((token) => token + 1);
        } catch (err) {
            setError(err.message || "Unable to submit application.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <main>
            <Navbar />

            <div className="mt-6 ml-10 flex items-center gap-4">
                <button
                    onClick={() => {
                        setVisible(true);
                        setError("");
                        setSuccessMessage("");
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-2 text-sm font-semibold text-white shadow-md shadow-indigo-200 transition hover:-translate-y-0.5 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    <span className="text-base">＋</span>
                    Add Leave
                </button>
            </div>
            {successMessage ? (
                <p className="ml-10 mt-3 text-sm text-emerald-600">{successMessage}</p>
            ) : null}

            {visible && (
                <div
                    onClick={() => {
                        closeForm();
                        resetForm();
                    }}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                >
                    <form
                        onSubmit={handleSubmit}
                        onClick={(e) => e.stopPropagation()}
                        className="relative bg-white p-10 rounded-xl shadow-2xl border border-slate-200 w-[500px] grid grid-cols-[145px_1fr] gap-y-6 items-center"
                    >
                        <button
                            type="button"
                            onClick={() => {
                                closeForm();
                                resetForm();
                            }}
                            className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <h2 className="col-span-2 text-2xl font-bold text-slate-800 mb-2">Leave Application</h2>

                        <label className="text-sm font-semibold text-slate-600">Leaving Date</label>
                        <input
                            className="outline-none border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500"
                            type="date"
                            value={startDate}
                            onChange={(event) => setStartDate(event.target.value)}
                            required
                        />

                        <label className="text-sm font-semibold text-slate-600">Reporting Date</label>
                        <input
                            className="outline-none border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500"
                            type="date"
                            value={endDate}
                            min={minimumDate}
                            onChange={(event) => setEndDate(event.target.value)}
                            required
                        />

                        <label className="text-sm font-semibold text-slate-600">Subject</label>
                        <input
                            className="outline-none border border-slate-300 rounded-md p-2 w-full focus:ring-2 focus:ring-indigo-500"
                            type="text"
                            value={subject}
                            onChange={(event) => setSubject(event.target.value)}
                            required
                        />

                        <div className="col-span-2 flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-600">Reason</label>
                            <textarea
                                className="outline-none border border-slate-300 rounded-md p-3 text-slate-800 w-full h-32 focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                                placeholder="Please describe the reason for your leave..."
                                value={reason}
                                onChange={(event) => setReason(event.target.value)}
                                required
                            />
                        </div>

                        {error ? <p className="col-span-2 text-sm text-rose-600">{error}</p> : null}

                        <button
                            type="submit"
                            className="mt-4 col-span-2 w-full bg-indigo-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:opacity-60"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Submitting..." : "Submit Application"}
                        </button>
                    </form>
                </div>
            )}

            <UserTable refreshToken={refreshToken} />
        </main>
    );
}
