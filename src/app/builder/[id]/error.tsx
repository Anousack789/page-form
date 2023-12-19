"use client";
import { useEffect } from "react";

function ErrorPage({ error }: { error: Error }) {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <div className="flex w-full h-full flex-col items-center justify-center">
      ErrorPage
    </div>
  );
}

export default ErrorPage;
