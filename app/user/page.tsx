"use client";
import JumbotronComponent from "@/components/jumbotron";
import ShowCourses from "@/components/show-courses";

const UserPage = () => {
  return (
    <>
      <JumbotronComponent text="User Dashboard" />{" "}
      <ShowCourses
        singleCardRedirect="/user/course/"
        url="/course/user-courses"
      />
    </>
  );
};

export default UserPage;
