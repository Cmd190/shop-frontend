import { useMsal } from "@azure/msal-react";
import { useEffect, type ReactElement } from "react";
import { loginRequest } from '../authConfig';



const Login = () : ReactElement => {
    const { instance } = useMsal();
  

  useEffect(() => {
    instance.loginRedirect(loginRequest); 
  }, [instance]);

    return (
         <p className="text-sm text-gray-500">
            Redirecting to login...
          </p>
    );
}

export default Login;