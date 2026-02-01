import { Plane,MailQuestionMark,FileCheck,Trash2} from "lucide-react"
export default function HightLight(){
    return <main>
        <div className="flex justify-between px-10 py-4">
            <div className="flex gap-3 justify-center font-bold px-10 py-4 rounded-2xl shadow-lg">
                <div className=" shadow-xl bg-gray-100 p-4 rounded-2xl ">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
                    </svg>
                </div>
                <div>
                    <h1>Employees</h1>
                    <h2 className="font-bold">100</h2>
                </div>
            </div>
            <div className="flex justify-center gap-3  shadow-lg px-10 py-4 rounded-2xl">
                <div className="text-orange-400 shadow-xl bg-gray-100 p-4 rounded-2xl">
                        < Plane />
                    </div>
                    <div className="">
                        <h1>On Leave</h1>
                        <h2 className="font-bold">100</h2>
                    </div>
            </div>
            <div className="flex justify-center gap-3  shadow-lg px-10 py-4 rounded-2xl">
                <div className="text-purple-400 shadow-xl bg-gray-100 p-4 rounded-2xl">
                    <MailQuestionMark />
                </div>
                <div>
                    <h1>Pending</h1>
                    <h2 className="font-bold">100</h2>
                </div>
            </div>
            <div className="flex justify-center gap-3  shadow-lg px-10 py-4 rounded-2xl">
                <div className="text-green-300 shadow-xl bg-gray-100 p-4 rounded-2xl">
                <FileCheck />
                </div>
                <div>
                    <h1>Approved</h1>
                    <h2 className="font-bold">100</h2>
                </div>
            </div>
            <div className="flex justify-center gap-3  shadow-lg px-10 py-4 rounded-2xl">
                <div className="text-red-500 shadow-xl bg-gray-100 p-4 rounded-2xl">
                    <Trash2 />
                </div>
                <div>
                    <h1>Rejected</h1>
                    <h2 className="font-bold">100</h2>
                </div>
                
            </div>

        </div>

    </main>
}