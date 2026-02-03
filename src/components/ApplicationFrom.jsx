export default function ApplicationForm() {
    // const info = [
    //   {"leave applicaiton","leaving date"},
    //    { "reporting date",
    //     "subject",
    //     "reason"},
       
    // ]
    return (
        // <div>
        //     {info.map((item)=>{
        //        return <p key={item.name}>{item.name}</p>
        //     })}
        // </div>
        <div className="bg-slate-50 text-slate-900 h-screen flex flex-col items-center justify-center font-sans">
            <div className="bg-white p-10 rounded-xl shadow-lg border border-slate-200 w-[500px] grid grid-cols-[145px_1fr] gap-y-6 items-center">
                
                <h2 className="col-span-2 text-2xl font-bold text-slate-800 mb-2">Leave Application</h2>

                <label className="text-sm font-semibold text-slate-600">Leaving Date</label>
                <input className="outline-none border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" type="date" />

                <label className="text-sm font-semibold text-slate-600">Reporting Date</label>
                <input className="outline-none border border-slate-300 rounded-md p-2 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" type="date" />

                <label className="text-sm font-semibold text-slate-600">Subject</label>
                <input className="outline-none border border-slate-300 rounded-md p-2 w-full focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" type="text" />

                <div className="col-span-2 flex flex-col gap-2">
                    <label className="text-sm font-semibold text-slate-600">Reason</label>
                    <textarea
                        className="outline-none border border-slate-300 rounded-md p-3 text-slate-800 w-full h-32 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-none"
                        placeholder="Please describe the reason for your leave..."
                    />
                </div>

                <button className="mt-4 col-span-2 w-full bg-indigo-600 text-white font-bold py-3 rounded-lg shadow-md hover:bg-indigo-700 active:scale-[0.98] transition-all duration-200 cursor-pointer">
                    Submit Application
                </button>
            </div>
        </div>
    );
}
