"use client";
import { frontendErrorResponse } from "@/lib/frontend-toast-response";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const CancelPage = () => {
  const router = useRouter();

  useEffect(() => {
    frontendErrorResponse("Payment canceled.");
    const timeout = setTimeout(() => {
      router.push("/"); // Redirect to any fallback page
    }, 3000);

    return () => clearTimeout(timeout);
  }, [router]);
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-red-600">
          Payment Cancelled
        </h1>
        <p className="text-gray-500 mt-2">
          You have canceled the payment. Redirecting...
        </p>
      </div>
    </div>
  );
};

export default CancelPage;
