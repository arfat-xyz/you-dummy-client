"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import {
  CreateLessionFormData,
  lessionZodValidation,
} from "@/lib/zod/lession-zod-validation";
import {
  CourseWithIdAndInstructorNameAndId,
  LessonWitID,
} from "@/lib/interface/course";
import axiosInstance from "@/lib/axios-instance";
import { frontendSuccessResponse } from "@/lib/frontend-toast-response";
import { cn } from "@/lib/utils";

const AddORUpdateLesson = ({
  slug,
  setCourse,
  instructorId,
  lession,
  setLessons,
}: {
  slug: string;
  setCourse: React.Dispatch<
    React.SetStateAction<CourseWithIdAndInstructorNameAndId | undefined>
  >;
  setLessons?: Dispatch<SetStateAction<LessonWitID[]>>;
  instructorId: string;
  lession?: LessonWitID;
}) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<CreateLessionFormData>({
    resolver: zodResolver(lessionZodValidation),
  });

  const videoURL = watch("video");
  const [open, setOpen] = useState(false);
  const [previewURL, setPreviewURL] = useState("");

  const getYouTubeVideoId = (url: string): string | null => {
    const match = url.match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/
    );
    return match ? match[1] : "";
  };

  useEffect(() => {
    const isValid =
      lessionZodValidation.shape.video.safeParse(videoURL).success;
    if (isValid) setPreviewURL(videoURL);
    else setPreviewURL("");
  }, [videoURL]);

  useEffect(() => {
    if (lession) {
      reset({
        title: lession.title,
        content: lession.content,
        video: lession.video,
      });
      setPreviewURL(lession.video || "");
    }
  }, [lession, reset]);

  const onSubmit = async (lessionData: CreateLessionFormData) => {
    try {
      if (lession?._id) {
        // PUT: Update lesson
        const { data } = await axiosInstance.put(
          `/course/lesson/${slug}/${instructorId}`,
          {
            id: lession._id,
            ...lessionData,
          }
        );
        if (data?.success) {
          console.log({ data: data?.data });
          if (setLessons) setLessons(data?.data);
          frontendSuccessResponse(
            data?.message || "Lesson updated successfully"
          );
          setOpen(false);
          reset();
          return;
        }
      } else {
        // POST: Create lesson
        const { data } = await axiosInstance.post(
          `/course/lesson/${slug}/${instructorId}`,
          lessionData
        );
        if (data?.success) {
          setCourse(data?.data);
          frontendSuccessResponse(data?.message || "Lesson added successfully");
          setOpen(false);
          reset();
          return;
        }
      }
    } catch (error) {
      console.error("Lesson submission error:", error);
    } finally {
      setPreviewURL("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className={cn(
            "bg-blue-500 text-white rounded-full transition hover:bg-blue-600",
            lession?._id ? "   p-2  " : " py-2 px-4"
          )}
        >
          {lession ? (
            <>
              <BsPencilSquare />
            </>
          ) : (
            "Add Lesson"
          )}
        </button>
      </DialogTrigger>

      <DialogContent className="max-h-screen my-auto overflow-auto">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {lession ? "Update Lesson" : "Add New Lesson"}
          </DialogTitle>
          <DialogDescription>
            Enter lesson details and preview your video before submitting.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              {...register("title")}
              className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:ring-2 outline-none"
              placeholder="Lesson title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium">Content</label>
            <textarea
              {...register("content")}
              rows={3}
              className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:ring-2 outline-none"
              placeholder="Lesson content"
            />
            {errors.content && (
              <p className="text-red-500 text-sm mt-1">
                {errors.content.message}
              </p>
            )}
          </div>

          {/* Video URL */}
          <div>
            <label className="block text-sm font-medium">Video URL</label>
            <input
              type="url"
              {...register("video")}
              className="w-full mt-1 p-2 border rounded-md focus:ring-blue-500 focus:ring-2 outline-none"
              placeholder="https://example.com/video.mp4"
            />
            {errors.video && (
              <p className="text-red-500 text-sm mt-1">
                {errors.video.message}
              </p>
            )}
          </div>

          {/* Video Preview */}
          {previewURL && (
            <>
              {previewURL.includes("youtube.com") ||
              previewURL.includes("youtu.be") ? (
                <iframe
                  title={watch("title")}
                  src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                    previewURL
                  )}`}
                  className="w-full h-64 rounded-lg border shadow"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  controls
                  src={previewURL}
                  className="w-full max-h-64 rounded-lg border shadow"
                />
              )}
            </>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
            >
              {lession ? "Update Lesson" : "Submit Lesson"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddORUpdateLesson;
