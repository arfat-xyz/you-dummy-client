import React, { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios-instance";
import { CourseWithIdAndInstructorNameAndId } from "@/lib/interface/course";
import CourseCard from "./course-card";

const ShowCourses = ({
  url,
  singleCardRedirect,
}: {
  url: string;
  singleCardRedirect: string;
}) => {
  const [courses, setCourses] = useState<CourseWithIdAndInstructorNameAndId[]>(
    []
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState<number>(10);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  const fetchCourses = async () => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.get(
        `${url}?limit=${limit}&page=${currentPage}`
      );

      if (data?.data?.length) {
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
  }, [currentPage, limit]);

  const handleLoadMore = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const handleLimitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setCourses([]); // reset data
      setCurrentPage(1); // reset pagination
      setHasMore(true); // reset hasMore
      setLimit(value); // update limit
    }
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-end mb-4">
          <label
            htmlFor="limitInput"
            className="mr-2 font-medium text-gray-700"
          >
            Limit:
          </label>
          <input
            id="limitInput"
            name="limit"
            type="number"
            value={limit}
            min={1}
            title="Number of courses per page"
            placeholder="e.g. 3"
            className="border rounded px-3 py-1 w-24"
            onChange={handleLimitChange}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard
              singleCardRedirect={singleCardRedirect}
              key={course._id}
              course={course}
            />
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
    </>
  );
};

export default ShowCourses;
