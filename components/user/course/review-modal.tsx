"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useState } from "react";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Rating } from "@smastrom/react-rating";
import axiosInstance from "@/lib/axios-instance";
import { useAuth } from "@/index";

const reviewFormSchema = z.object({
  rating: z.number().min(1, "Rating is required").max(5),
  comment: z.string().min(10, "Comment must be at least 10 characters"),
  courseId: z.string(), // Added courseId to the schema
});

type ReviewFormValues = z.infer<typeof reviewFormSchema>;

interface ReviewModalProps {
  courseId: string;
  setShowReviewModal: Dispatch<SetStateAction<boolean>>;
}

export const ReviewModal = ({
  courseId,
  setShowReviewModal,
}: ReviewModalProps) => {
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      rating: 0,
      comment: "",
      courseId, // Initialize with the prop value
    },
  });

  const ratingValue = watch("rating");

  const onSubmit = async (formData: ReviewFormValues) => {
    setIsSubmitting(true);
    try {
      const { data } = await axiosInstance.post(`/course/review/${courseId}`, {
        ...formData,
        user: user?._id,
      });
      if (data?.success && data?.data) {
        setShowReviewModal(false);
      }

      // reset();
    } catch (error) {
      console.error("Failed to submit review:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Review this course
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <input type="hidden" {...register("courseId")} />

          <div className="space-y-2">
            <label htmlFor="rating" className="block text-sm font-medium">
              Rating
            </label>
            <div className="flex items-center gap-2">
              <Rating
                style={{ maxWidth: 150 }}
                value={ratingValue}
                onChange={(value: number) => setValue("rating", value)}
              />
              <span className="text-sm text-gray-500">
                {ratingValue > 0 ? ratingValue : "Select"} stars
              </span>
            </div>
            {errors.rating && (
              <p className="text-sm text-red-500">{errors.rating.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="comment" className="block text-sm font-medium">
              Review
            </label>
            <textarea
              id="comment"
              placeholder="Share your experience with this course..."
              className="w-full min-h-[120px] p-2 border rounded-md"
              {...register("comment")}
            />
            {errors.comment && (
              <p className="text-sm text-red-500">{errors.comment.message}</p>
            )}
          </div>

          <input type="hidden" {...register("rating")} />

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => reset()}
              disabled={isSubmitting}
            >
              Clear
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
