import {Mail, LockKeyhole,UserRound,User} from "lucide-react"


export default function SignUpForm(){
    return <div className="w-full min-h-screen flex bg-linear-to-b from-[#e5b3f6] to-[#b9e4eb] text-white">
    <form className=" flex-col flex justify-start m-auto  w-[500px] items-center gap-1" action="">
        <UserRound className="size-12" />
       <h1 className="font-extralight font-mono text-5xl text-center mb-4">Sign Up</h1>
        <div className="text-[#7f8fb7] w-full flex flex-col gap-10 [&>div]:border-b">
            
            <div className="flex gap-3 pb-3 mx-10">
                <User />
                <input className="outline-none" type="text" placeholder="Full Name"/>
            </div>
            <div className="flex gap-3 pb-3 mx-10 ">
                <Mail />
                <input className="outline-none" type="Email ID" placeholder="Write Email"/>
            </div>
            <div className="flex gap-3 pb-3 mx-10">
                <LockKeyhole />
                <input className="outline-none" type="Password" placeholder="Write Password"/>
            </div>
            <div className="flex gap-3 pb-3 mx-10">
                <LockKeyhole />
                <input className="outline-none" type="Password" placeholder="Confrim Password"/>
            </div>
        </div>
        <div className="mt-6 flex text-[#366496]">
            <a href="#">Go to LogIn</a>
            
        </div>
            <button className="bg-[#2a4e75] w-100 py-2 rounded mt-4 transition-all hover:bg-[#366496] active:scale-95 active:shadow-inner">
                SignUp
            </button>
        </form>

    </div>
}