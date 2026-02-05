import { Mail, Briefcase, Building2, User } from 'lucide-react';

export default function UserProfile() {
  const user = {
    name: "Pema Tsheten",
    position: "Software Engineer",
    department: "Development",
    Company: "T3 Cloud",
    Email: "Pema@gmail.com"
  };


  const userDetailsList = [
    { label: "Position", value: user.position, icon: Briefcase },
    { label: "Department", value: user.department, icon: Building2 },
    { label: "Company", value: user.Company, icon: Building2 },
    { label: "Email", value: user.Email, icon: Mail },
  ];


  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
  
      <div className=" mx-auto bg-white shadow-lg rounded-lg overflow-hidden">


        <div className="p-6 bg-gray-800 flex items-center space-x-4">
          <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md">
            {getInitials(user.name)}
          </div>


          <div>
            <h1 className="text-2xl font-bold text-white">{user.name}</h1>
            <p className="text-blue-200">{user.position}</p>
          </div>
        </div>


        <div className="p-6">
          {userDetailsList.map((item) => {
            const Icon = item.icon;

            return (
              <div key={item.label} className="flex items-center mb-4 last:mb-0">

                <Icon className="w-5 h-5 text-gray-400 mr-3" />

                <p className="text-gray-800">
                  <span className="font-semibold text-gray-600">{item.label}:</span> {item.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>
   
  );
}
