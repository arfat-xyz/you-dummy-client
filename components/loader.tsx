import { cn } from "@/lib/utils";
import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function SpinnerLoader({
  className,
  size = 24,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <>
      <AiOutlineLoading3Quarters
        className={cn("animate-spin", className)}
        size={size}
      />
    </>
  );
}
