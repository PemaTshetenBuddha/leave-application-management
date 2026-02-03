import { Mail, Briefcase, Building2, User } from 'lucide-react';

export default function UserProfile() {
  const user = {
    name: "Pema Tsheten",
    position: "Software Engineer",
    department: "Development",
    Company: "T3 Cloud",
    Email: "Pema@gmail.com"
  };

  // Convert the single user object into the array structure you prefer for the list
  const userDetailsList = [
    { label: "Position", value: user.position, icon: Briefcase },
    { label: "Department", value: user.department, icon: Building2 },
    { label: "Company", value: user.Company, icon: Building2 },
    { label: "Email", value: user.Email, icon: Mail },
  ];

  // Helper function to get initials for the profile picture
  const getInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
  };

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
        
        {/* Profile Header with Image Placeholder */}
        <div className="p-6 bg-gray-800 flex items-center space-x-4">
          
          {/* The "Image" (Initials Placeholder) */}
          <div className="h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-md">
            {getInitials(user.name)}
          </div>

          {/* Name and Position */}
          <div>
            <h1 className="text-2xl font-bold text-white">{user.name}</h1>
            <p className="text-blue-200">{user.position}</p>
          </div>
        </div>

        {/* User Details List */}
        <div className="p-6">
          {userDetailsList.map((item) => {
            const Icon = item.icon; // Get the Lucide icon component

            return (
              <div key={item.label} className="flex items-center mb-4 last:mb-0">
                {/* Displaying an Icon using the imported Lucide components */}
                <Icon className="w-5 h-5 text-gray-400 mr-3" />
                
                <p className="text-gray-800">
                  <span className="font-semibold text-gray-600">{item.label}:</span> {item.value}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
