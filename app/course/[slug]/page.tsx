import SingleCoursePageForAllClientComponent from "@/components/course/single-course-client-component";
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

const AllUserSingleCouse = ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  return (
    <>
      <SingleCoursePageForAllClientComponent slug={slug} />
    </>
  );
};

export default AllUserSingleCouse;
