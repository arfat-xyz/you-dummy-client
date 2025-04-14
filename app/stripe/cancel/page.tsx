import CancelPageClientComponent from "@/components/stripe/cancel-client-component";
import { metaDataGeneratorForNormalPage } from "@/lib/meta-generator";

export const metadata = metaDataGeneratorForNormalPage("Stripe cancel");
const StripeCancelPage = () => {
  return (
    <>
      <CancelPageClientComponent />
    </>
  );
};

export default StripeCancelPage;
