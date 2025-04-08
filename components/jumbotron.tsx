import { cn } from "@/lib/utils";
import React from "react";

const JumbotronComponent = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  return <h1 className={cn("jumbotron text-white", className)}>{text}</h1>;
};

export default JumbotronComponent;
