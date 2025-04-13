"use client";
import JumbotronComponent from "@/components/jumbotron";
import ShowCourses from "@/components/show-courses";
import React from "react";

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
