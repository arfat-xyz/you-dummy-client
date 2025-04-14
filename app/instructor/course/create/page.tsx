import InstructorCreateCourseClientComponent from "@/components/instructor/instructor-create-course-client-component";
import { metaDataGeneratorForNormalPage } from "@/lib/meta-generator";

export const metadata = metaDataGeneratorForNormalPage("Create Course");
const InstructorCreateCoursePage = () => {
  return (
    <>
      <InstructorCreateCourseClientComponent />
    </>
  );
};

export default InstructorCreateCoursePage;
