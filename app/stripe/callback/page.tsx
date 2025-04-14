import StripeCallBackPageClientComponent from "@/components/stripe/callback-client-component";
import { metaDataGeneratorForNormalPage } from "@/lib/meta-generator";

export const metadata = metaDataGeneratorForNormalPage("Stripe callback");
const StripeCallbackPage = () => {
  return (
    <>
      <StripeCallBackPageClientComponent />
    </>
  );
};

export default StripeCallbackPage;
