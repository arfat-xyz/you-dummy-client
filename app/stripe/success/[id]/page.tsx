import StripeSuccessClientComponent from "@/components/stripe/success-client-component";
import { metaDataGeneratorForNormalPage } from "@/lib/meta-generator";

export const metadata = metaDataGeneratorForNormalPage("Stripe success");
const StripeSuccessPage = ({ params: { id } }: { params: { id: string } }) => {
  return (
    <>
      <StripeSuccessClientComponent id={id} />
    </>
  );
};

export default StripeSuccessPage;
