import ForgotPasswordClientComponent from "@/components/forgot-password-client";
import { metaDataGeneratorForNormalPage } from "@/lib/meta-generator";
import React from "react";

export const metadata = metaDataGeneratorForNormalPage("Forgot Passowrd");
const ForgotPage = () => {
  return <ForgotPasswordClientComponent />;
};

export default ForgotPage;
