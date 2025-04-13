"use client";
import { CustomToolTipComponent } from "@/components/custom-tooltip";
import JumbotronComponent from "@/components/jumbotron";
import axiosInstance from "@/lib/axios-instance";
import { CourseWithIdAndInstructorNameAndId } from "@/lib/interface/course";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiMiniPencilSquare } from "react-icons/hi2";
import Image from "next/image";
import SpinnerLoader from "@/components/loader";
import ReactRemarkdownDataVisualComponent from "@/components/react-markdown-data-visual-component";
import AddORUpdateLesson from "@/components/instructor/add-or-update-lession";
import { BsQuestionCircle } from "react-icons/bs";
import { CheckSquare } from "lucide-react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { frontendSuccessResponse } from "@/lib/frontend-toast-response";
import SingleCourseSkeletonLoader from "@/components/single-course-skeleton-loader";
import { FaUserGear } from "react-icons/fa6";

const SingleInstructorCourse = ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const [course, setCourse] = useState<CourseWithIdAndInstructorNameAndId>();
  const [isLoading, setIsLoading] = useState(true);
  const [isPublishIsLoading, setIsPublishIsLoading] = useState(false);
  const [students, setStudents] = useState(0);

  useEffect(() => {
    loadCourse();
  }, [slug]);

  const loadCourse = async () => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.get(`/course/single-course/${slug}`);
      console.log({ data: data.data });
      if (data?.success) {
        setCourse(data?.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (course?._id) {
      studentCount();
    }
  }, [course]);

  const studentCount = async () => {
    const { data } = await axiosInstance.post(`/instructor/student-count`, {
      courseId: course?._id,
    });
    console.log(data, data.length);
    setStudents(data?.data?.length);
  };

  const handlePublishOrUnpublishCourse = async () => {
    try {
      setIsPublishIsLoading(true);
      const { data } = await axiosInstance.put(`/course/publish-or-unpublish`, {
        published: !course?.published,
        courseId: course?._id,
      });
      if (data?.success) {
        frontendSuccessResponse(data?.message);
        setCourse((prev) => {
          if (!prev) return prev; // or throw an error if prev should never be undefined

          return {
            ...prev,
            published: data?.data?.published,
          };
        });
      }
    } finally {
      setIsPublishIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && !course ? (
        <SingleCourseSkeletonLoader />
      ) : (
        <>
          <JumbotronComponent text={course?.name as string} />

          <div className="w-full pt-2">
            <div className=" pt-4 grid grid-cols-12">
              <Image
                width={80}
                height={80}
                src={
                  course?.image
                    ? course?.image
                    : "https://i.ibb.co.com/HYf5r66/arfat-rahman-21.jpg"
                }
                alt="Course Image"
                className="size-20 rounded-full col-span-2"
              />
              <div className="ml-4 w-full col-span-10">
                <div className="w-full">
                  <div className="grid grid-cols-[1fr_70px]">
                    <h5 className="mt-2 text-blue-500">{course?.name}</h5>
                    <div className="flex justify-center items-start gap-2 pt-4 w-1/3">
                      {/* Add any buttons or actions here */}

                      <CustomToolTipComponent
                        toolValue={`Edit`}
                        triggerer={
                          <Link href={`/instructor/course/edit/${slug}`}>
                            <HiMiniPencilSquare />
                          </Link>
                        }
                      />
                      <CustomToolTipComponent
                        toolValue={`Total students: ${students}`}
                        triggerer={
                          <span className="cursor-pointer">
                            <FaUserGear size={16} />
                          </span>
                        }
                      />
                      {(course?.lessons?.length as number) < 5 ? (
                        <>
                          <CustomToolTipComponent
                            toolValue={`Min 5 lessions required to publish`}
                            triggerer={
                              <span className="cursor-pointer">
                                <BsQuestionCircle size={16} />
                              </span>
                            }
                          />
                        </>
                      ) : (
                        <>
                          {isPublishIsLoading ? (
                            <>
                              <CustomToolTipComponent
                                toolValue={`Loading...`}
                                triggerer={
                                  <span className="cursor-pointer">
                                    <SpinnerLoader size={16} />
                                  </span>
                                }
                              />
                            </>
                          ) : (
                            <button
                              onClick={handlePublishOrUnpublishCourse}
                              type="button"
                              className="cursor-pointer"
                            >
                              {course?.published ? (
                                <>
                                  <CustomToolTipComponent
                                    toolValue={`Unpublish`}
                                    triggerer={
                                      <span>
                                        <AiOutlineCloseCircle size={16} />
                                      </span>
                                    }
                                  />
                                </>
                              ) : (
                                <>
                                  <CustomToolTipComponent
                                    toolValue={`Publish`}
                                    triggerer={
                                      <span>
                                        <CheckSquare size={16} />
                                      </span>
                                    }
                                  />
                                </>
                              )}
                            </button>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  <p className="text-sm mt-1">
                    {course?.lessons?.length} Lessons
                  </p>
                  <p className="text-xs mt-1">{course?.category}</p>
                </div>{" "}
              </div>
              <div className="col-span-12">
                <p className="text-xs mt-4 overflow-hidden">
                  <ReactRemarkdownDataVisualComponent
                    context={course?.description || ""}
                  />
                </p>
              </div>
            </div>
            <hr className="mt-4" />

            <div className="text-center mt-4">
              <AddORUpdateLesson
                slug={slug}
                setCourse={setCourse}
                instructorId={course?.instructor._id as string}
              />
            </div>

            <div className="w-full mt-6">
              <h4 className="text-xl font-bold">
                {course?.lessons?.length} Lessons
              </h4>
              <div className="space-y-4 mt-4">
                {course?.lessons?.map((item, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex justify-center items-center">
                      <span>{index + 1}</span>
                    </div>
                    <div className="ml-4">
                      <h6 className="text-lg font-semibold">{item.title}</h6>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SingleInstructorCourse;
