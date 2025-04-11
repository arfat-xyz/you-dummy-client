"use client";
import JumbotronComponent from "@/components/jumbotron";
import SpinnerLoader from "@/components/loader";
import UserNav from "@/components/user/user-nav";
import axiosInstance from "@/lib/axios-instance";
import { frontendErrorResponse } from "@/lib/frontend-toast-response";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UserPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  // const { user } = useAuth();
  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.get("/auth/current-user");
      if (data?.success) {
        return;
      }
      return frontendErrorResponse(data?.message);
    } catch (err) {
      console.log("response error", err);
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <div className="w-full">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-2">
            <UserNav />
          </div>
          <div className="col-span-10">
            {isLoading ? (
              <>
                <div className="w-full h-full flex justify-center items-center">
                  <SpinnerLoader />
                </div>
              </>
            ) : (
              <>
                <JumbotronComponent text="User Dashboard" />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserPage;
