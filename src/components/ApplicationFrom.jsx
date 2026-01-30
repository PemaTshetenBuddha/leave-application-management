import { CalendarDays } from "lucide-react"
export default function applicationFrom() {
    return <div className=" bg-linear-to-b from-[#e5b3f6] to-[#b9e4eb] text-white h-screen flex flex-col items-center justify-center">
                  
            <div className="bg-linear-to-b from-[#b9e4eb] to-[#e5b3f6] py-14 px-8 rounded-2xl shadow-2xl w-[500px] grid grid-cols-[145px_1fr] gap-y-6 items-center text-gray-700">
            <label className="font-bold">Leaving Date : </label>
            <input className="outline-none border-2 border-gray-200 p-2" type="date"></input>


            <label className="font-bold">Reporting Date : </label>
            <input className="outline-none border-2 border-gray-200 p-2" type="date"></input>


            <label className="font-bold">Subject :</label>
            <textarea className="outline-none border-2 border-gray-200 p-2 w-full" type="text"></textarea>

            <div className="col-span-2 flex flex-col gap-2">
                <label className="font-bold">Reason :</label>
                <textarea
                    className="outline-none border-2 border-gray-200 p-2 text-black w-full h-32"
                    placeholder="Type your reason here..."
                />
            </div>


            <button className=" font-bold cursor-pointer col-span-2 justify-self-center shadow-2xl bg-linear-to-b from-[#b9e4eb] to-[#e5b3f6] border-2 border-gray-400 p-2 px-10 rounded-2xl text-purple-500 
                hover:scale-105 hover:brightness-110 
                active:scale-95 
                transition-all duration-100">
                Summit
            </button>
        </div>
    </div>
}