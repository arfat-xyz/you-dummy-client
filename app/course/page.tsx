import JumbotronComponent from "@/components/jumbotron";
import ShowCourses from "@/components/show-courses";
import { metaDataGeneratorForNormalPage } from "@/lib/meta-generator";
import React from "react";

export const metadata = metaDataGeneratorForNormalPage("Course");
const CoursePage = () => {
  return (
    <div className="min-h-screen">
      <JumbotronComponent text="Instructor Courses" className="rounded-lg" />

      <ShowCourses
        singleCardRedirect="/course/"
        url="/course/courses-for-all"
      />
    </div>
  );
};

export default CoursePage;
