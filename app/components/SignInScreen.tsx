import { useMsal } from '@azure/msal-react';
import { loginRequest } from '../authConfig';
import { useEffect, type ReactElement } from 'react';
import { NavLink } from 'react-router';
import { getRoute, RouteName } from '~/routes';

const SignInScreen = (): ReactElement => {
  
  const { instance } = useMsal();

    const handleLoginRedirect = () => {
        instance.loginRedirect(loginRequest);
    };

  return (
       <div className="flex items-center justify-center min-h-screen bg-gray-100">
      
      <div className="w-full max-w-sm p-8 space-y-6 bg-white rounded-lg shadow-xl border border-gray-200">
        
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome Back
          </h1>
          <p className="text-sm text-gray-500">
            Please sign in to continue to your account.
          </p>
        </div>
        
        <div className="flex justify-center pt-4">
       {/* <NavLink
              to={getRoute(RouteName.Login)}
              className={({ isActive }) =>
                `text-lg font-medium transition-colors ${
                  isActive
                    ? "text-blue-600"
                    : "text-gray-600 hover:text-blue-500"
                }`
              }
            >
              Sign In
            </NavLink> */}
            <button 
                        onClick={handleLoginRedirect} // *** Use the handler here ***
                        className="
                            w-full sm:w-auto px-8 py-3 
                            bg-orange-600 text-white font-semibold text-lg rounded-xl 
                            hover:bg-orange-700 active:scale-[0.98] 
                            transition duration-150 ease-in-out
                            shadow-lg hover:shadow-xl
                        "
                    >
                        Sign In
                    </button>
        </div>
      </div>
    </div>

  );
};

export default SignInScreen;