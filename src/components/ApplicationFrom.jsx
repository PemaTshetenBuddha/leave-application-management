import { X, CalendarDays, FileText, AlignLeft } from 'lucide-react';
import { useState } from 'react';
import Navbar from './Navbar';
import UserTable from './UserTable';
import EmployeeDetails from "./EmployeeDetail";
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
    const [preview, setPreview] = useState(false)

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
        <main className="min-h-screen w-full bg-[url('https://media.istockphoto.com/id/1460636032/vector/abstract-colorful-wave-element-for-design-digital-frequency-track-equalizer-stylized-line.jpg?s=612x612&w=0&k=20&c=jjIb7AZrOQt80WdqeUnQYRVT9ZTmEUUXl9t5ENnH2C4=')] bg-cover bg-center bg-fixed">
            <Navbar />
            
            <div className="px-8 mb-10">
                <button 
                    onClick={() => setVisible(true)} 
                    className="bg-[#2a4e75] text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-[#1e3a5a] transition-all active:scale-95 flex justify-end"
                >
                    Add Leave
                </button>
            </div>

            {visible && (
                <div 
                    onClick={closeForm} 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-md p-4"
                >
                    <div 
                        onClick={(e) => e.stopPropagation()} 
                        className="relative w-full max-w-lg border border-white/30 p-10 rounded-2xl shadow-2xl backdrop-blur-lg bg-white/40 flex flex-col gap-6"
                    >
                        <button onClick={closeForm} className="absolute top-4 right-4 text-[#2a4e75] hover:rotate-90 transition-transform">
                            <X size={24} />
                        </button>

                        <div className="flex flex-col items-center mb-2">
                            <div className="bg-white/60 p-3 rounded-full shadow-sm mb-4">
                                <CalendarDays className="size-8 text-[#2a4e75]" />
                            </div>
                            <h2 className="font-light font-mono text-3xl text-[#2a4e75] tracking-tight">Leave Application</h2>
                        </div>

                        <div className="text-[#4a5568] flex flex-col gap-6 [&>div]:border-b-2 [&>div]:border-[#2a4e75]/20">
                            <div className="flex gap-4 pb-2 transition-all focus-within:border-[#2a4e75]">
                                <CalendarDays className="size-5 text-[#2a4e75] shrink-0" />
                                <div className="flex flex-col w-full">
                                    <span className="text-[10px] uppercase font-bold text-[#2a4e75]/70">Leaving Date</span>
                                    <input className="bg-transparent outline-none w-full text-[#2a4e75]" type="date" />
                                </div>
                            </div>

                            <div className="flex gap-4 pb-2 transition-all focus-within:border-[#2a4e75]">
                                <CalendarDays className="size-5 text-[#2a4e75] shrink-0" />
                                <div className="flex flex-col w-full">
                                    <span className="text-[10px] uppercase font-bold text-[#2a4e75]/70">Reporting Date</span>
                                    <input className="bg-transparent outline-none w-full text-[#2a4e75]" type="date" />
                                </div>
                            </div>

                            <div className="flex gap-4 pb-2 transition-all focus-within:border-[#2a4e75]">
                                <FileText className="size-5 text-[#2a4e75] shrink-0" />
                                <input className="bg-transparent outline-none w-full placeholder:text-gray-500" type="text" placeholder="Subject / Title" />
                            </div>

                            <div className="flex gap-4 pb-2 transition-all focus-within:border-[#2a4e75]">
                                <AlignLeft className="size-5 text-[#2a4e75] shrink-0 mt-1" />
                                <textarea
                                    className="bg-transparent outline-none w-full h-24 resize-none placeholder:text-gray-500"
                                    placeholder="Reason for leave..."
                                />
                            </div>
                        </div>

                        <button className="bg-[#2a4e75] text-white w-full py-3 rounded-xl mt-4 font-semibold transition-all hover:bg-[#1e3a5a] hover:shadow-lg active:scale-[0.98]">
                            Submit Application

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

            <div className="mx-8 bg-white/30 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden">
                <UserTable setPreview={setPreview} />
            </div>
            {preview && <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-white/30 " onClick={() => setPreview(false)}>
                         <EmployeeDetails/>
                    </div>}
            <UserTable refreshToken={refreshToken} />
        </main>
    );
}
