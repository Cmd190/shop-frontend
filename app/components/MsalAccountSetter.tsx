import { useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import { msalInstance } from '~/root';
import { EventType, type AuthenticationResult, type EventMessage } from '@azure/msal-browser';


/** we need to set the active msal account after login */
const MsalAccountSetter = () => {
    const { instance, accounts } = useMsal();
    
    useEffect(() => {
        msalInstance.initialize().then(() => {
    // Account selection logic is app dependent. Adjust as needed for different use cases.
    const accounts = msalInstance.getAllAccounts();
    if (accounts.length > 0) {
        msalInstance.setActiveAccount(accounts[0]);
    }

    msalInstance.addEventCallback((event: EventMessage) => {
        if (event.eventType === EventType.LOGIN_SUCCESS && event.payload) {
            const payload = event.payload as AuthenticationResult;
            const account = payload.account;
            msalInstance.setActiveAccount(account);
        }
    });
  })
    })
    useEffect(() => {
        // 1. Check if there is an active account currently set on the instance
        const currentActiveAccount = instance.getActiveAccount();

        // 2. If no active account is set, but accounts are stored, set one.
        if (!currentActiveAccount && accounts.length > 0) {
            // Set the first stored account as the active one.
            // This is crucial for getActiveAccount() to work outside React hooks.
            instance.setActiveAccount(accounts[0]);
            console.log("MSAL Active Account set successfully.");
        }
    }, [instance, accounts]); // Dependency array to run when instance or accounts change
    
    // This component renders nothing; it just handles initialization logic.
    return null; 
};

export default MsalAccountSetter;