import {
  BrowserRouter,
  isRouteErrorResponse,
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import Navbar, { type NavItem } from "./components/Navbar";
import { getRoute, RouteName } from "./routes";
import { createBrowserRouter } from "react-router-dom";
import { createRoutesFromElements } from "react-router";
import Searchbar from "./components/Searchbar";
import { ShoppingCartProvider } from "./components/ShoppingCartContextProvider";
import type { Button } from "@mui/material";
import { useState } from "react";
import { AuthenticatedTemplate, MsalProvider, UnauthenticatedTemplate, useMsal } from '@azure/msal-react';
import { loginRequest, msalConfig } from './authConfig';
import SignInScreen from "./components/SignInScreen";
import { EventType, PublicClientApplication, type AuthenticationResult, type EventMessage } from '@azure/msal-browser';
import MsalAccountSetter from "./components/MsalAccountSetter";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

/**
 * Attaches a given access token to a MS Graph API call. Returns information about the user
 * @param accessToken 
 */
export async function callMsGraph(accessToken:any) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };

    return fetch("TODO", options)
        .then(response => response.json())
        .catch(error => console.log(error));
}




const navItems : NavItem[] = [
  {name: "Milk Chocolate", path: getRoute(RouteName.MilkChocolate)},
  {name: "Dark Chocolate", path: getRoute(RouteName.DarkChocolate)},
  {name: "White Chocolate", path: getRoute(RouteName.WhiteChocolate)}
]

export const msalInstance = new PublicClientApplication(msalConfig);

export default function App() {
  return (
    <MsalProvider instance={msalInstance}>
      <MsalAccountSetter />
      <div className="bg-white dark:bg-white">
      <AuthenticatedTemplate>
        <ShoppingCartProvider>
        <Navbar navItems={navItems}  />
        <Outlet />
      </ShoppingCartProvider>
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
          <SignInScreen/>
      </UnauthenticatedTemplate>
    </div>
    </MsalProvider>
    
  ) 
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
