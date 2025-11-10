import React from 'react';
import { useMsal } from '@azure/msal-react';
import { LogOut } from 'lucide-react'; 

const LogoutButton = () => {
    const { instance } = useMsal();

    const handleLogout = () => {
    
        instance.logoutRedirect({
            postLogoutRedirectUri: "/", 
        });
    };

    return (
        <button 
            onClick={handleLogout} 
            className="
                flex items-center space-x-2 
                px-4 py-2 
                bg-orange-900 text-white font-medium rounded-xl hover:bg-orange-800 
                text-white 
                font-medium text-sm 
                rounded-lg 
                shadow-md 
                transition duration-150 ease-in-out
                focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50
            "
        >
            {/* Using a simple icon from lucide-react (ensure this library is installed) */}
            <LogOut size={20} />
            <span>Sign Out</span>
        </button>
    );
};

export default LogoutButton;