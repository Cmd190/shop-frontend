import { useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { msalInstance } from "~/root";
import {
  EventType,
  type AuthenticationResult,
  type EventMessage,
} from "@azure/msal-browser";

/** we need to set the active msal account after login */
const MsalAccountSetter = () => {
  const { instance } = useMsal();

  useEffect(() => {
    const currentActive = instance.getActiveAccount();
    const allAccounts = instance.getAllAccounts();

    if (!currentActive && allAccounts.length > 0) {
      instance.setActiveAccount(allAccounts[0]);
    }

    const callbackId = instance.addEventCallback((event) => {
      if (
        event.eventType === EventType.LOGIN_SUCCESS &&
        event.payload &&
        (event.payload as any).account
      ) {
        instance.setActiveAccount((event.payload as any).account);
      }
    });

    return () => {
      if (callbackId) {
        instance.removeEventCallback(callbackId);
      }
    };
  }, [instance]);

  return null;
};

export default MsalAccountSetter;
