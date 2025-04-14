import InstructorPageClientComponent from "@/components/instructor/instructor-page-client-component";
import { metaDataGeneratorForNormalPage } from "@/lib/meta-generator";

export const metadata = metaDataGeneratorForNormalPage("Instructor");
const InstructorPage = () => {
  return (
    <>
      <InstructorPageClientComponent />
    </>
  );
};

export default InstructorPage;
