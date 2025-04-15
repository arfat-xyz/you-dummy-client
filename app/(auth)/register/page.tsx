import RegisterClientPage from "@/components/register-client";
import { metaDataGeneratorForNormalPage } from "@/lib/meta-generator";

export const metadata = metaDataGeneratorForNormalPage("Register");
const RegisterPage = () => {
  return <RegisterClientPage />;
};

export default RegisterPage;
