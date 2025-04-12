"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { LessonWitID } from "@/lib/interface/course";
import { Dispatch, SetStateAction, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { frontendSuccessResponse } from "@/lib/frontend-toast-response";
import axiosInstance from "@/lib/axios-instance";
import SpinnerLoader from "../loader";
import { useAuth } from "@/index";

const DeleteLession = ({
  lession,
  slug,
  setLessons,
}: {
  lession: LessonWitID;
  slug: string;
  setLessons: Dispatch<SetStateAction<LessonWitID[]>>;
}) => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      // Replace this endpoint with your actual delete endpoint
      const { data } = await axiosInstance.delete(
        `/course/lesson/${slug}/${user?._id}/${lession?._id}`
      );

      if (data?.success) {
        frontendSuccessResponse(data?.message);
        setLessons(data?.data);
        setOpen(false);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => !isDeleting && setOpen(isOpen)}
    >
      <DialogTrigger asChild>
        <button
          type="button"
          title="delete"
          onClick={() => setOpen(true)}
          className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition"
        >
          <IoTrashOutline size={18} />
        </button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete this
            lesson from the course.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <span className="flex items-center gap-2">
                <SpinnerLoader size={16} /> Deleting...
              </span>
            ) : (
              "Delete"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteLession;
