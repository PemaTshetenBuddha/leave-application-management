import { X, CalendarDays, FileText, AlignLeft } from 'lucide-react';
import { useState } from 'react';
import Navbar from './Navbar';
import UserTable from './UserTable';
import EmployeeDetails from "./EmployeeDetail";

export default function ApplicationForm() {
    const [visible, setVisible] = useState(false);
    const closeForm = () => setVisible(false);
    const [preview, setPreview] = useState(false)

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
                        </button>
                    </div>
                </div>
            )}

            <div className="mx-8 bg-white/30 backdrop-blur-md rounded-xl border border-white/20 overflow-hidden">
                <UserTable setPreview={setPreview} />
            </div>
            {preview && <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-white/30 " onClick={() => setPreview(false)}>
                         <EmployeeDetails/>
                    </div>}
        </main>
    );
}
