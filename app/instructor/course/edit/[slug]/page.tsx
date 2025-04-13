"use client";
import AddORUpdateLesson from "@/components/instructor/add-or-update-lession";
import CourseCreateForm from "@/components/instructor/course-create-form";
import DeleteLession from "@/components/instructor/delete-lesson";
import JumbotronComponent from "@/components/jumbotron";
import SpinnerLoader from "@/components/loader";
import SingleCourseSkeletonLoader from "@/components/single-course-skeleton-loader";
import axiosInstance from "@/lib/axios-instance";
import { frontendSuccessResponse } from "@/lib/frontend-toast-response";
import {
  CourseWithIdAndInstructorNameAndId,
  LessonWitID,
} from "@/lib/interface/course";
import { cn } from "@/lib/utils";
import { DragEvent, useEffect, useState } from "react";

const CourseEditPage = ({ params: { slug } }: { params: { slug: string } }) => {
  const [course, setCourse] = useState<CourseWithIdAndInstructorNameAndId>();
  const [lessons, setLessons] = useState<LessonWitID[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLessionLoading, setIsLessionLoading] = useState(false);
  useEffect(() => {
    loadCourse();
  }, [slug]);

  const loadCourse = async () => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.get(`/course/single-course/${slug}`);
      if (data?.success) {
        setCourse(data?.data);
        setLessons(data?.data?.lessons);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>, index: number) => {
    e.dataTransfer.setData("draggedIndex", String(index));
  };

  const handleDrop = async (e: DragEvent<HTMLDivElement>, index: number) => {
    setIsLessionLoading(true);
    const movingItemIndex = parseInt(e.dataTransfer.getData("draggedIndex"));
    const targetItemIndex = index;

    if (isNaN(movingItemIndex)) return;

    const updated = [...lessons];
    const [movedItem] = updated.splice(movingItemIndex, 1);
    updated.splice(targetItemIndex, 0, movedItem);

    // ✅ Update UI immediately
    setLessons(updated);
    try {
      // ✅ Then fetch fresh data from server
      const { data } = await axiosInstance.post(`/course/update-course`, {
        ...course,
        lessons: updated,
        id: course?._id,
        price: String(course?.price),
      });
      if (data?.success) {
        frontendSuccessResponse(data?.message);
      }
    } finally {
      setIsLessionLoading(false);
    }
  };

  return (
    <>
      {isLoading && !course?.name ? (
        <>
          <SingleCourseSkeletonLoader />
        </>
      ) : (
        <>
          <JumbotronComponent text={("Update: " + course?.name) as string} />
          <div className="px-4 py-6">
            <CourseCreateForm initialValues={course} />
          </div>

          {lessons.length > 0 ? (
            <>
              <hr className="my-4" />

              <div className="w-full mt-6 relative">
                {/* Loading overlay */}
                {isLessionLoading && (
                  <div className="absolute inset-0 bg-white bg-opacity-60 z-10 flex justify-center items-center">
                    <SpinnerLoader size={32} className="text-primary" />
                  </div>
                )}

                <h4 className="text-xl font-bold mb-4">
                  {lessons.length} Lessons
                </h4>

                <div
                  className={cn(
                    "space-y-4",
                    isLessionLoading && "pointer-events-none opacity-50"
                  )}
                  onDragOver={(e) => e.preventDefault()}
                >
                  {lessons.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-[40px_1fr_100px] justify-center items-center cursor-move bg-white p-2 rounded shadow"
                      draggable
                      onDragStart={(e) => handleDrag(e, index)}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => handleDrop(e, index)}
                    >
                      <div className="size-10 bg-gray-300 rounded-full flex justify-center items-center">
                        <span>{index + 1}</span>
                      </div>
                      <div className="ml-4">
                        <h6 className="text-lg font-semibold">{item.title}</h6>
                      </div>
                      <div className="flex gap-2 justify-end">
                        <DeleteLession
                          lession={item}
                          slug={course?.slug as string}
                          setLessons={setLessons}
                        />
                        <AddORUpdateLesson
                          instructorId={course?.instructor?._id as string}
                          setCourse={setCourse}
                          setLessons={setLessons}
                          slug={slug}
                          lession={item}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <></>
          )}
        </>
      )}
    </>
  );
};

export default CourseEditPage;
