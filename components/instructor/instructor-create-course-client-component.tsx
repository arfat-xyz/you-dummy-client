"use client";

import CourseCreateForm from "@/components/instructor/course-create-form";
import JumbotronComponent from "@/components/jumbotron";

// Define types for the state values

const InstructorCreateCourseClientComponent = () => {
  return (
    <>
      <JumbotronComponent text="Create Course" />
      <div className="px-4 py-6">
        <CourseCreateForm />
      </div>
    </>
  );
};

export default InstructorCreateCourseClientComponent;
