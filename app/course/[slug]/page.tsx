import SingleCoursePageForAllClientComponent from "@/components/course/single-course-client-component";
import { axiosServer } from "@/lib/axios-instance";
import { generateCourseMetadata } from "@/lib/meta-generator";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params: { slug },
}: {
  params: { slug: string };
}): Promise<Metadata> {
  try {
    const { data } = await axiosServer.get(`/course/single-course/${slug}`);
    // If no course data found, redirect to Not Found page
    if (!data?.data) {
      return notFound(); // Redirects to the default 404 page
    }

    return generateCourseMetadata(data?.data);
  } catch (error) {
    console.error("Error fetching course data:", error);
    return notFound(); // In case of error, redirect to Not Found page
  }
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
