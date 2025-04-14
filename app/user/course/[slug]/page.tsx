import SingleUserCourseClientComponent from "@/components/user/course/single-course-client-component";
import { metaDataGeneratorForNormalPage } from "@/lib/meta-generator";

export const metadata = metaDataGeneratorForNormalPage("Become Instructor");
const SingleCOursePage = ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  return (
    <>
      <SingleUserCourseClientComponent slug={slug} />
    </>
  );
};

export default SingleCOursePage;
