"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import jsPDF from "jspdf";
import {
  CheckCircle,
  MinusCircle,
  PlayCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import SingleCourseSkeletonLoader from "@/components/single-course-skeleton-loader";
import axiosInstance from "@/lib/axios-instance";
import {
  CourseWithIdAndInstructorNameAndId,
  LessonWitID,
} from "@/lib/interface/course";
import { useAuth } from "@/index";
import { myFont } from "@/public/certificate/font";
import ReactRemarkdownDataVisualComponent from "@/components/react-markdown-data-visual-component";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const SingleUserCourse = ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const { user } = useAuth();
  const [course, setCourse] = useState<CourseWithIdAndInstructorNameAndId>();
  const [lessons, setLessons] = useState<LessonWitID[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleteOrIncompleteLoading, setIsCompleteOrIncompleteLoading] =
    useState(false);
  const router = useRouter();

  const [clicked, setClicked] = useState<number>(-1);
  const [collapsed, setCollapsed] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [updateState, setUpdateState] = useState(false);

  useEffect(() => {
    if (course?._id) loadCompletedLessons();
  }, [course]);

  useEffect(() => {
    loadCourse();
  }, [slug]);

  const loadCompletedLessons = async () => {
    const { data } = await axiosInstance.post("/course/lesson-list-completed", {
      courseId: course?._id,
    });
    if (data?.success) setCompletedLessons(data?.data);
  };

  const loadCourse = async () => {
    try {
      setIsLoading(true);
      const { data } = await axiosInstance.get(
        `/course/user/single-course/${slug}`
      );
      if (data?.success && data?.data) {
        setCourse(data.data);
        setLessons(data.data.lessons);
      } else {
        router.push("/"); // Redirect if course not found
      }
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return <SingleCourseSkeletonLoader />;
  }

  const markCompleted = async () => {
    try {
      setIsCompleteOrIncompleteLoading(false);
      const { data } = await axiosInstance.post(
        "/course/lesson-mark-as-completed",
        {
          courseId: course?._id,
          lessonId: lessons[clicked]?._id,
        }
      );
      if (data?.success) {
        console.log({
          data: data?.data,
          completedLessons,
          lessons,
          clickedlesson: lessons[clicked],
          clickedLessonId: lessons[clicked]?._id,
        });
        setCompletedLessons([...completedLessons, lessons[clicked]?._id]);
      }
    } finally {
      setIsCompleteOrIncompleteLoading(false);
    }
  };

  const markIncomplete = async () => {
    try {
      setIsCompleteOrIncompleteLoading(false);
      const { data } = await axiosInstance.post(
        "/course/lesson-mark-as-incompleted",
        {
          courseId: course?._id,
          lessonId: lessons[clicked]?._id,
        }
      );
      if (data?.success) {
        const updated = completedLessons?.filter(
          (id) => id !== lessons[clicked]?._id
        );
        setCompletedLessons(updated);
        setUpdateState(!updateState);
      }
    } finally {
      setIsCompleteOrIncompleteLoading(false);
    }
  };

  const downloadCertificate = () => {
    const doc = new jsPDF("landscape", "px", "a4", false);
    doc.addImage("/certificate/certificate.png", "png", 65, 20, 500, 400);
    doc.addFileToVFS("MyFont.ttf", myFont);
    doc.addFont("MyFont.ttf", "MyFont", "normal");
    doc.setFont("MyFont");
    doc.setFontSize(50);
    doc.text(user?.name as string, 150, 260);
    doc.setFont("courier", "normal");
    doc.setFontSize(20);
    doc.text("for his achievements of completing", 150, 290);
    doc.text(`in the 2022 ${course?.name}`, 150, 310);
    doc.text("course activities", 150, 330);
    doc.save(`${user?.name}.pdf`);
  };
  console.log({ completedLessons });
  return (
    // Inside your component
    <div className="grid grid-cols-12 relative">
      {/* Sidebar */}
      <div
        className={cn(
          "col-span-12 md:col-span-3 border-r md:h-screen overflow-y-auto transition-all duration-300 block",
          collapsed ? "md:hidden" : "md:block"
        )}
      >
        <div className="hidden md:flex items-center justify-between px-4 py-3">
          <Button
            variant="ghost"
            className="bg-sky-600 hover:bg-sky-700 text-white shadow-sm"
            onClick={() => setCollapsed(true)}
          >
            <ChevronLeft />
          </Button>
        </div>

        {lessons.map((lesson, index) => {
          const isCompleted = completedLessons?.includes(lesson?._id);
          const isUnlocked =
            isCompleted ||
            completedLessons?.includes(lessons[index - 1]?._id) ||
            index === 0;

          const isActive = clicked === index;

          return (
            <div
              key={lesson?._id}
              className={cn(
                "flex items-center justify-between cursor-pointer px-3 py-2 rounded",
                isActive ? "bg-muted" : "hover:bg-muted",
                !isUnlocked && "opacity-50 cursor-not-allowed"
              )}
              onClick={() => {
                if (isUnlocked) setClicked(index);
              }}
            >
              <div className="flex items-center space-x-2">
                <Avatar className="w-6 h-6 text-xs">{index + 1}</Avatar>
                <span>
                  {lesson?.title.length > 25
                    ? `${lesson?.title.substring(0, 25)}...`
                    : lesson?.title}
                </span>
              </div>
              <div>
                {isCompleted ? (
                  <CheckCircle className="w-4 h-4 text-green-600" />
                ) : !isUnlocked ? (
                  <MinusCircle className="w-4 h-4 text-gray-400" />
                ) : (
                  <MinusCircle className="w-4 h-4 text-red-500" />
                )}
              </div>
            </div>
          );
        })}

        {completedLessons?.length === lessons.length && (
          <div className="p-4">
            <Button onClick={downloadCertificate} className="w-full">
              Download Certificate
            </Button>
          </div>
        )}
      </div>

      {/* Sidebar popup button when collapsed */}
      {collapsed && (
        <Button
          className="bg-sky-600 hover:bg-sky-700 text-white shadow-sm hidden md:block md:absolute left-2 top-4 z-10"
          variant="ghost"
          onClick={() => setCollapsed(false)}
        >
          <ChevronRight />
        </Button>
      )}

      {/* Main content */}
      <div
        className={cn(
          "transition-all duration-300 col-span-12",
          collapsed ? "md:col-span-12" : "md:col-span-9",
          "p-4"
        )}
      >
        {clicked !== -1 ? (
          <>
            <div className="bg-blue-100 border p-4 rounded mb-4">
              <div className="flex justify-between items-center">
                <strong>{lessons[clicked]?.title}</strong>
                {isCompleteOrIncompleteLoading ? (
                  <>
                    <div className="w-32 h-6 bg-gray-200 rounded-md animate-pulse" />
                  </>
                ) : (
                  <Button
                    variant="link"
                    className="cursor-pointer"
                    onClick={
                      completedLessons?.includes(lessons[clicked]?._id)
                        ? markIncomplete
                        : markCompleted
                    }
                  >
                    {completedLessons?.includes(lessons[clicked]?._id)
                      ? "Mark as Incomplete"
                      : "Mark as Completed"}
                  </Button>
                )}
              </div>
            </div>

            {lessons[clicked]?.video && (
              <div className="mb-4 aspect-video">
                <ReactPlayer
                  url={lessons[clicked]?.video}
                  width="100%"
                  height="100%"
                  controls
                  onEnded={markCompleted}
                />
              </div>
            )}

            <ReactRemarkdownDataVisualComponent
              context={lessons[clicked]?.content || ""}
            />
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full">
            <PlayCircle className="w-24 h-24 text-blue-500" />
            <p className="text-lg mt-4 text-muted-foreground">
              Click on a lesson to start learning
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleUserCourse;
