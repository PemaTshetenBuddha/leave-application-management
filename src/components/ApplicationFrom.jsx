import { X } from 'lucide-react';
import { useState } from 'react';
import Navbar from './Navbar';
import UserTable from './UserTable';

export default function ApplicationForm() {
    const [visible, setVisible] = useState(false);
    const closeForm = () => setVisible(false);

    return (
        <main>
            <Navbar />

            <button 
                onClick={() => setVisible(true)} 
                className='ml-10 border-b-2 p-1 mt-4 relative text-indigo-600 font-medium hover:text-indigo-800'
            >
                Add Leave
            </button>

            {visible && (
                <div 
                    onClick={closeForm} 
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                >
                    <div 
                        onClick={(e) => e.stopPropagation()} 
                        className="relative bg-white p-10 rounded-xl shadow-2xl border border-slate-200 w-[500px] grid grid-cols-[145px_1fr] gap-y-6 items-center"
                    >
                        <button onClick={closeForm} className="absolute top-4 right-4 text-slate-400 hover:text-slate-800 transition-colors">
                            <X size={20} />
                        </button>
                        
                        <h2 className="col-span-2 text-2xl font-bold text-slate-800 mb-2">Leave Application</h2>

                        <label className="text-sm font-semibold text-slate-600">Leaving Date</label>
                        <input className="outline-none border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500" type="date" />

                        <label className="text-sm font-semibold text-slate-600">Reporting Date</label>
                        <input className="outline-none border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500" type="date" />

                        <label className="text-sm font-semibold text-slate-600">Subject</label>
                        <input className="outline-none border border-slate-300 rounded-md p-2 w-full focus:ring-2 focus:ring-indigo-500" type="text" />

                        <div className="col-span-2 flex flex-col gap-2">
                            <label className="text-sm font-semibold text-slate-600">Reason</label>
                            <textarea
                                className="outline-none border border-slate-300 rounded-md p-3 text-slate-800 w-full h-32 focus:ring-2 focus:ring-indigo-500 transition-all resize-none"
                                placeholder="Please describe the reason for your leave..."
                            />
                        </div>

                        <button className="mt-4 col-span-2 w-full bg-indigo-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-indigo-700 active:scale-[0.98] transition-all">
                            Submit Application
                        </button>
                    </div>
                </div>
            )}

            <UserTable />
        </main>
    );
}
