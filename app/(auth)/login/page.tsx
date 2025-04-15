import LoginClientPage from "@/components/login-client";
import { metaDataGeneratorForNormalPage } from "@/lib/meta-generator";

export const metadata = metaDataGeneratorForNormalPage("Login");
const LoginPage = () => {
  return <LoginClientPage />;
};

export default LoginPage;
