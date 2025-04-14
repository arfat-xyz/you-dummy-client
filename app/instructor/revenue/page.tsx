import InstructorRevenuePageClientComponent from "@/components/instructor/instructor-revenue-client-component";
import { metaDataGeneratorForNormalPage } from "@/lib/meta-generator";

export const metadata = metaDataGeneratorForNormalPage("Revenue");
const InstructorRevenuePage = () => {
  return (
    <>
      <InstructorRevenuePageClientComponent />
    </>
  );
};

export default InstructorRevenuePage;
