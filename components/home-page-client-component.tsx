"use client";

import JumbotronComponent from "@/components/jumbotron";

import ShowCourses from "@/components/show-courses";

const MainPage = () => {
  return (
    <div className="min-h-screen">
      <JumbotronComponent text="All courses" className="rounded-lg" />

      <ShowCourses
        url="/course/courses-for-all"
        singleCardRedirect="/course/"
      />
    </div>
  );
};

export default MainPage;
