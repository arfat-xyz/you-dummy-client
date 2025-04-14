import BecomeInstructorPageClientComponent from "@/components/user/become-instructor-client-component";
import { metaDataGeneratorForNormalPage } from "@/lib/meta-generator";

export const metadata = metaDataGeneratorForNormalPage("Become Instructor");
const BecomeInstructorPage = () => {
  return (
    <>
      <BecomeInstructorPageClientComponent />
    </>
  );
};

export default BecomeInstructorPage;
