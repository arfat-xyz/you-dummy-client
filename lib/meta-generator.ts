import { Metadata } from "next";

export const metaDataGeneratorForNormalPage = (
  title: string = `Home`,
  description: string = `U Dummy is the smart way to learn — our all-in-one LMS platform makes online education easy, engaging, and accessible. Whether you're a beginner or a pro, we've got the tools to help you grow smarter every day.`
) => {
  return {
    title: `${title} | U Dummy`,
    description,
    image: `/logo.png`,
    openGraph: {
      images: [`/logo.png`],
    },
  };
};

export async function generateCourseMetadata(
  courseDetails: {
    name: string;
    description: string;
    _id: string;
    image: string;
  } | null
): Promise<Metadata> {
  if (!courseDetails?._id) {
    return {
      title: `Not found | U Dummy`,
      openGraph: {
        images: [`/logo.png`],
      },
      description: `U Dummy is the smart way to learn — our all-in-one LMS platform makes online education easy, engaging, and accessible. Whether you're a beginner or a pro, we've got the tools to help you grow smarter every day.`,
    };
  }

  return {
    title: courseDetails?.name + ` | U Dummy`,
    openGraph: {
      images: [courseDetails?.image, `./logo.png`],
    },
    description:
      courseDetails.description.length > 97
        ? courseDetails.description.slice(0, 97) + "..."
        : courseDetails.description,
  };
}
