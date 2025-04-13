"use client";
import axiosInstance from "@/lib/axios-instance";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const StripeSuccesspage = ({ params: { id } }: { params: { id: string } }) => {
  const router = useRouter();
  useEffect(() => {
    if (id) successRequest();
  }, [id]);
  const successRequest = async () => {
    const { data } = await axiosInstance.get(`/course/stripe-success/${id}`);
    if (data?.success) router.push(`/user/course/${data?.data?.slug}`);
  };
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Processing your payment...</h1>
        <p className="text-gray-500 mt-2">
          Please wait while we verify your payment.
        </p>
      </div>
    </div>
  );
};

export default StripeSuccesspage;
