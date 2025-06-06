"use client";
import ReactRemarkdownDataVisualComponent from "@/components/react-markdown-data-visual-component";
import axiosInstance from "@/lib/axios-instance";
import {
  CourseWithIdAndInstructorNameAndId,
  IReview,
  LessonWitID,
} from "@/lib/interface/course";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import ReactPlayer from "react-player";
import Image from "next/image";
import { loadStripe } from "@stripe/stripe-js";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaPlay } from "react-icons/fa6";
import SingleCourseLessons from "@/components/single-course-lessons";
import SingleCourseSkeletonLoader from "@/components/single-course-skeleton-loader";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/index";
import { MdSafetyCheck } from "react-icons/md";
import { Rating } from "@smastrom/react-rating";
import {
  frontendErrorResponse,
  frontendSuccessResponse,
} from "@/lib/frontend-toast-response";
import { IUser } from "@/lib/interface/token-user-interface";

const SingleCoursePageForAllClientComponent = ({ slug }: { slug: string }) => {
  const { user } = useAuth();
  const [course, setCourse] = useState<CourseWithIdAndInstructorNameAndId>();
  const [lessons, setLessons] = useState<LessonWitID[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState<IReview[]>([]);
  const router = useRouter();
  const [enrolled, setEnrolled] = useState(false);
  const [isEnrollmentLoaing, setIsEnrollmentLoaing] = useState(false);

  useEffect(() => {
    loadCourse();
  }, [slug]);
  const loadCourse = async () => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.get(`/course/single-course/${slug}`);
      if (data?.success && data?.data) {
        setCourse(data?.data);
        setLessons(data?.data?.lessons);
        setReviews(data?.data?.reviews);
        await axios
          .get(
            `${process.env.NEXT_PUBLIC_API}/course/check-enrollemnt/${data?.data?._id}`,
            { withCredentials: true }
          )
          .then(({ data: enrolleData }) =>
            setEnrolled(enrolleData?.data?.status)
          )
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .catch((e) => setEnrolled(false));
      } else {
        router.push("/"); // Redirect if course not found
      }
    } finally {
      setIsLoading(false);
    }
  };
  const handleRedirectOwnerCourseView = () => {
    router.push(`/instructor/course/view/${course?.slug}`);
  };

  const handlePaidEnrollment = async () => {
    try {
      setIsEnrollmentLoaing(true);

      if (!user) {
        frontendErrorResponse("You need to be logged in to enroll.");
        return router.push("/login");
      }

      if (enrolled) {
        return router.push(`/user/course/${course?.slug}`);
      }

      const { data } = await axiosInstance.post(
        `/course/paid-enrollment/${course?._id}`
      );
      console.log({ data: data?.data });
      if (data?.success && data?.data) {
        const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);
        await stripe?.redirectToCheckout({ sessionId: data?.data });
        console.log("Stripe session data:", data);
      } else {
        frontendErrorResponse("Something went wrong. Please try again.");
      }
    } catch (e) {
      console.error("handlePaidEnrollment error:", e);
      frontendErrorResponse("Enrollment failed. Please try again.");
    } finally {
      setIsEnrollmentLoaing(false);
    }
  };

  const handleFreeEnrollment = async () => {
    try {
      setIsEnrollmentLoaing(true);
      console.log(`handleFreeEnrollment`);
      if (!user) {
        frontendErrorResponse("You need to be logged in to enroll.");
        return router.push("/login");
      }

      if (enrolled) {
        return router.push(`/user/course/${course?.slug}`);
      }
      const { data } = await axiosInstance.post(
        `/course/free-enrollment/${course?._id}`
      );
      if (data?.success && data?.data) {
        console.log({ data: data?.data });
        frontendSuccessResponse(data?.message);
        setEnrolled(true);
        router.push(`/user/course/${data?.data?.slug}`);
      }
    } finally {
      setIsEnrollmentLoaing(false);
    }
  };

  if (isLoading) {
    return <SingleCourseSkeletonLoader />;
  }

  // Protect against undefined course (just in case)
  if (!course) return null;

  return (
    <>
      <div className="jumbotron grid grid-cols-12  gap-6 relative">
        <div className="order-2 md:order-1 col-span-12 md:col-span-8">
          <h1 className="text-2xl font-bold">{course.name}</h1>
          <p>
            <ReactRemarkdownDataVisualComponent
              context={course.description || ""}
            />
          </p>
          <Badge
            variant="outline"
            className="bg-[#00a2ff] border-2 border-white text-white rounded-3xl"
          >
            {course.category}
          </Badge>
          <p>Created by {course.instructor?.name}</p>
          <p>Last updated {formatDate(course?.updatedAt as string)}</p>
        </div>

        <div className="order-1 md:order-2 col-span-12 md:col-span-4  md:sticky top-12 self-start">
          {lessons.length > 0 && lessons[0].free_preview ? (
            <Dialog>
              <DialogTrigger asChild>
                <div className="rounded-lg cursor-pointer">
                  <ReactPlayer
                    url={lessons[0].video}
                    width="100%"
                    height="250px"
                    light={course.image}
                    controls
                    playing={false}
                    playIcon={
                      <div className="text-white text-6xl bg-black bg-opacity-60 p-6 rounded-full">
                        <FaPlay />
                      </div>
                    }
                    style={{ borderRadius: "20px", overflow: "hidden" }}
                  />
                </div>
              </DialogTrigger>
              <DialogContent className="w-full md:max-w-sm lg:max-w-md xl:max-w-lg">
                <DialogHeader>
                  <ReactPlayer
                    url={lessons[0].video}
                    width="100%"
                    height="250px"
                    light={course.image}
                    playing
                    controls
                    style={{ borderRadius: "20px", marginTop: "20px" }}
                  />
                </DialogHeader>
              </DialogContent>
            </Dialog>
          ) : (
            <Image
              width={400}
              height={250}
              src={course.image}
              alt={course.name || "Course thumbnail"}
              className="w-full h-[250px] object-cover rounded-lg"
            />
          )}
          <Button
            className="my-3 w-full rounded-full text-white bg-blue-600 hover:bg-blue-700"
            size="lg"
            disabled={isEnrollmentLoaing}
            onClick={() => {
              if (user?._id === course?.instructor?._id) {
                handleRedirectOwnerCourseView();
              } else if (course?.paid) {
                handlePaidEnrollment();
              } else {
                handleFreeEnrollment();
              }
            }}
          >
            <MdSafetyCheck className="mr-2 h-5 w-5" />
            {isEnrollmentLoaing
              ? "Loading..."
              : user
              ? user._id === course?.instructor?._id
                ? "View as Instructor"
                : enrolled
                ? "Go to course"
                : "Enroll"
              : "Login to enroll"}
          </Button>
        </div>
      </div>
      <div className="my-8">
        <div className="">
          <h2 className="text-2xl font-bold text-gray-800">Students Reviews</h2>
          <div className="mt-6">
            {reviews.length === 0 ? (
              <p className="text-gray-500">
                No reviews yet. Be the first to leave a review!
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {reviews.map((review) => (
                  <div
                    key={review._id}
                    className="bg-white rounded-lg shadow-md p-4 mb-6"
                  >
                    <div className="flex items-start space-x-4">
                      {/* User Profile Picture */}
                      <div className="size-12 border-2 rounded-full overflow-hidden">
                        <Image
                          width={48}
                          height={48}
                          src={(review.user as IUser)?.picture || "/logo.png"} // Default avatar if no profile picture
                          alt={(review.user as IUser)?.name || "Anonymous"}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-grow">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold text-lg">
                            {(review.user as IUser)?.name || "Anonymous"}
                          </h3>
                          <span className="text-sm text-gray-500 hidden md:block">
                            {formatDate(review.createdAt).split(" at")[0]}
                          </span>
                        </div>
                        <div className="flex items-center mt-2">
                          <Rating
                            style={{ maxWidth: 150 }}
                            value={review.rating}
                          />

                          <span className="text-gray-600">
                            {review.rating} / 5
                          </span>
                        </div>
                        <p className="mt-2 text-gray-700">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Only render if course exists */}
      <SingleCourseLessons course={course} lessons={lessons} />
    </>
  );
};

export default SingleCoursePageForAllClientComponent;
