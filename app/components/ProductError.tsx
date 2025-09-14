import React from "react";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";

export default function ProductError() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="p-6 text-red-600">
        <h1>Oops! {error.status}</h1>
        <p>{error.statusText}</p>
      </div>
    );
  }

  return (
    <div className="p-6 text-red-600">
      <h1>Something went wrong</h1>
      <p>{error instanceof Error ? error.message : "Unknown error"}</p>
    </div>
  );
}
