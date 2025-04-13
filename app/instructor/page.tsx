"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios-instance";
import Link from "next/link";
import JumbotronComponent from "@/components/jumbotron";
import { CourseWithIdAndLesson } from "@/lib/interface/course";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";

import { FaCheck } from "react-icons/fa6";
import { CustomToolTipComponent } from "@/components/custom-tooltip";

const InstructorPage = () => {
  const [courses, setCourses] = useState<CourseWithIdAndLesson[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(6);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.get(
        `/course/instructor-courses?limit=${limit}&page=${currentPage}`
      );

      if (data?.data?.length) {
        // Prevent duplicates by filtering using _id
        setCourses((prev) => {
          const existingIds = new Set(prev.map((course) => course._id));
          const uniqueNewCourses = data.data.filter(
            (course: CourseWithIdAndLesson) => !existingIds.has(course._id)
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

      <div className="max-w-4xl mx-auto space-y-6">
        {courses.map((course) => (
          <div
            key={course._id}
            className="flex p-4 bg-white shadow-sm rounded-xl items-start gap-4"
          >
            <Image
              width={80}
              height={80}
              src={course.image}
              alt={course.name}
              className="size-20 rounded-full object-cover border"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start flex-wrap gap-2">
                <div>
                  <Link href={`/instructor/course/view/${course.slug}`}>
                    <span className="text-xl font-semibold text-blue-600 hover:underline cursor-pointer">
                      {course.name}
                    </span>
                  </Link>
                  <p className="text-sm text-gray-600 mt-1">
                    {course.lessons.length} Lesson
                    {course.lessons.length !== 1 ? "s" : ""}
                  </p>
                  {course.lessons.length < 5 ? (
                    <p className="text-yellow-600 text-sm mt-1">
                      ⚠️ At least 5 lessons are required to publish
                    </p>
                  ) : course.published ? (
                    <p className="text-green-600 text-sm mt-1">
                      ✅ Your course is live in the marketplace
                    </p>
                  ) : (
                    <p className="text-green-600 text-sm mt-1">
                      ✅ Your course is ready to be published
                    </p>
                  )}
                </div>
                <div className="flex items-center justify-center w-10 h-10">
                  {course.published ? (
                    <CustomToolTipComponent
                      toolValue="Published"
                      triggerer={
                        <span className="text-green-600" title="Published">
                          <FaCheck className="text-green-600 size-4" />
                        </span> 
                      }
                    />
                  ) : (
                    <CustomToolTipComponent
                      toolValue="Unpublished"
                      triggerer={
                        <span className="text-yellow-500" title="Unpublished">
                          <RxCross2 className="text-red-600 size-4" />
                        </span>
                      }
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {isLoading &&
          Array.from({ length: 3 }).map((_, idx) => (
            <div
              key={idx}
              className="h-24 bg-gray-200 rounded-xl animate-pulse"
            />
          ))}
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

export default InstructorPage;
