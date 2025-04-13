"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios-instance";
import JumbotronComponent from "@/components/jumbotron";
import { CourseWithIdAndInstructorNameAndId } from "@/lib/interface/course";

import CourseCard from "@/components/course-card";

const MainPage = () => {
  const [courses, setCourses] = useState<CourseWithIdAndInstructorNameAndId[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.get(
        `/course/courses-for-all?limit=${limit}&page=${currentPage}`
      );

      if (data?.data?.length) {
        // Prevent duplicates by filtering using _id
        setCourses((prev) => {
          const existingIds = new Set(prev.map((course) => course._id));
          const uniqueNewCourses = data.data.filter(
            (course: CourseWithIdAndInstructorNameAndId) =>
              !existingIds.has(course._id)
          );
          return [...prev, ...uniqueNewCourses];
        });
        setHasMore(data.data.length === limit);
      } else {
        setHasMore(false);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen">
      <JumbotronComponent text="Instructor Courses" className="rounded-lg" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}

          {isLoading &&
            Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="h-64 bg-gray-200 rounded-xl animate-pulse"
              />
            ))}
        </div>
      </div>

      {hasMore && !isLoading && (
        <div className="text-center mt-10">
          <button
            onClick={handleLoadMore}
            className="bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
          >
            Load More
          </button>
        </div>
      )}

      {!hasMore && !isLoading && courses.length > 0 && (
        <p className="text-center mt-8 text-gray-500">
          No more courses to load.
        </p>
      )}

      {!isLoading && courses.length === 0 && (
        <p className="text-center text-gray-500 mt-12">No courses found.</p>
      )}
    </div>
  );
};

export default MainPage;
