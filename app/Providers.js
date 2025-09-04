"use client";

import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify";
import Loading from "@/components/Loading";
import { Suspense } from "react";

export function AuthProvider({ children }) {
  return (
    <SessionProvider>
      {children} <ToastContainer />
    </SessionProvider>
  );
}
export function LoadingProvider({ children }) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
