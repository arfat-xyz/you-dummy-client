import InstructorViewCourseClientComponent from "@/components/instructor/instructor-view-course-client-component";
import axiosInstance from "@/lib/axios-instance";
import { generateCourseMetadata } from "@/lib/meta-generator";
import { Metadata } from "next";

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const { data } = await axiosInstance.get(`/course/single-course/${slug}`);

  return generateCourseMetadata(data?.data);
}

const InstructorSingleCoursePage = ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  return (
    <>
      <InstructorViewCourseClientComponent slug={slug} />
    </>
  );
};

export default InstructorSingleCoursePage;
