"use client";
import SingleCourseSkeletonLoader from "@/components/single-course-skeleton-loader";
import { useAuth } from "@/index";
import axiosInstance from "@/lib/axios-instance";
import {
  CourseWithIdAndInstructorNameAndId,
  LessonWitID,
} from "@/lib/interface/course";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const SingleUserCourse = ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const { user } = useAuth();
  const [course, setCourse] = useState<CourseWithIdAndInstructorNameAndId>();
  const [lessons, setLessons] = useState<LessonWitID[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    loadCourse();
  }, [slug]);

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

  return <div>SingleUserCourse</div>;
};

export default SingleUserCourse;
