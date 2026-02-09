
import { useState } from "react";
import { Eye,X } from "lucide-react"; 
import UserProfile from "./UserProfile";
import EmployeeDetails from "./EmployeeDetail";
export default function UserTable(props) {
    const [Edetails,setEdetails] = useState(false);
    const hideEdetails = () => setEdetails(false)
    const employeesList = [
        { id: 1, Subject: "Medical Leave", Reason: "Doctor appointment", Date: "11/11/2026", status: "Pending" },
        { id: 2,  Subject: "Casual Leave", Reason: "Family function", Date: "12/11/2026", status: "Approved" },
        { id: 3, Subject: "Sick Leave", Reason: "Flu symptoms", Date: "13/11/2026", status: "Rejected" }
    ];

    return (
        <main className="">
            <div className="max-w-full mx-auto rounded-xl shadow-lg overflow-hidden">
                <div className="flex bg-slate-50 border-b border-slate-200 p-4 text-xs uppercase tracking-wider font-bold text-slate-500">
                    <p className="flex-1">Leave Subject</p>
                    <p className="flex-[1.5]">Reason for Leave</p> 
                    <p className="flex-1">Applied Date</p>
                    <p className="w-34 text-center">Status</p>
                    <p className="">Detail</p>
                </div>

                {employeesList.map((elist) => (
                    <div 
                        key={elist.id} 
                        className="flex p-4 items-center border-b border-slate-100  hover:bg-slate-50 "
                    >
                        <p className="flex-1 text-slate-600 text-sm">{elist.Subject}</p>
                        <p className="flex-[1.5] text-slate-500 text-sm italic pr-4">"{elist.Reason}"</p>
                        <p className="flex-1 text-slate-600 text-sm">{elist.Date}</p>
                        
                        
                        <div className="w-32 flex justify-center">
                            <span className={`px-3 py-1 rounded-full text-[11px] font-bold shadow-sm ${
                                elist.status === "Pending" ? "bg-indigo-50 text-indigo-600 border border-indigo-100" :
                                elist.status === "Approved" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : 
                                "bg-rose-50 text-rose-600 border border-rose-100"
                            }`}>
                                {elist.status}
                            </span>
                        </div>
                        <div className=" flex justify-center shadow-2xl">
                                <button 
                                    
                                    className="text-slate-400    cursor-pointer p-1 rounded-full hover:bg-indigo-100 "
                                    title="View Details"
                                    >
                                     <Eye onClick={()=> props.setPreview(true)} size={18} />
                                        
                                </button>
                            
                        </div>
                            
                    </div>
                ))}
            </div>
            {/* {Edetails && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-white/30 " onClick={hideEdetails}>
                         <EmployeeDetails/>
                    </div>
                   

            )} */}
        </main>
    );
}
