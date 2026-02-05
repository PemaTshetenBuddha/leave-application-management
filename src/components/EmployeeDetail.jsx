import { Calendar, FileText, User, MessageSquare } from "lucide-react";

export default function EmployeeDetails() {
    const leaveDetail = {
        Name: "Pema Tsheten",
        LeavingDate: "12/12/24",
        ReportingDate: "15/12/24",
        Subject: "Sick Leave",
        Reason: "I am writing to formally request a sick leave due to a severe flu. My doctor has advised complete rest for three days to ensure a full recovery."
    }
    
    return (
       
        <div className="w-full max-w-md bg-white rounded-xl overflow-hidden">
            
            {/* Header */}
            <div className="flex items-center gap-4 bg-slate-900 p-6 text-white">
                <div className="bg-slate-700 p-3 rounded-full">
                    <User size={24} />
                </div>
                <div>
                    <h1 className="text-xl font-bold tracking-tight">{leaveDetail.Name}</h1>
                    <p className="text-slate-400 text-sm">Employee Leave Record</p>
                </div>
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
                    <p className="text-slate-600 text-sm leading-relaxed">
                        {leaveDetail.Reason}
                    </p>
                </div>
            </div>
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

