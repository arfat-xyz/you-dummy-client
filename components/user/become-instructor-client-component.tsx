"use client";
import JumbotronComponent from "@/components/jumbotron";
import SpinnerLoader from "@/components/loader";
import { useAuth } from "@/index";
import axiosInstance from "@/lib/axios-instance";
import {
  frontendErrorResponse,
  frontendSuccessResponse,
} from "@/lib/frontend-toast-response";
import React, { useState } from "react";
import { FaUserTie } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
const BecomeInstructorPageClientComponent = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  const becomeInstructor = async () => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.post(
        "/instructor/make-instructor",
        user
      );
      if (data?.success) {
        frontendSuccessResponse(data?.message);
        window.location.href = data?.data;
        return;
      }
      return frontendErrorResponse(data?.message);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      {user?.role ? (
        <>
          <JumbotronComponent text="Become Instructor" />
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center pt-16">
              <div className="w-full flex justify-center items-center">
                {" "}
                <FaUserTie className="text-9xl pb-3" />
              </div>

              <h2 className="text-2xl font-semibold mt-4">
                Setup payout to publish courses on youDemy
              </h2>

              <p className="text-lg text-yellow-600 mt-2">
                youDemy partners with Stripe to transfer earnings to your bank
                account.
              </p>

              <button
                className="mt-6 mb-3 px-6 py-3 text-white bg-blue-600 rounded-full text-lg w-full disabled:bg-gray-400"
                onClick={becomeInstructor}
                disabled={user.role.includes("Instructor") || isLoading}
              >
                <span className="flex justify-center gap-2 items-center">
                  {isLoading ? (
                    <>
                      <SpinnerLoader /> Processing
                    </>
                  ) : (
                    <>
                      <FaGear className="animate-spin" />
                      Payout Setup
                    </>
                  )}
                </span>
              </button>

              <p className="text-lg mt-4">
                You will be redirected to Stripe to complete the onboarding
                process.
              </p>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default BecomeInstructorPageClientComponent;
