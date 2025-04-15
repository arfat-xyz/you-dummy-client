"use client";
import { Avatar } from "@/components/ui/avatar";
import { LessonWitID } from "@/lib/interface/course";
import { cn } from "@/lib/utils";
import { CheckCircle, MinusCircle } from "lucide-react";
import React, { Dispatch, SetStateAction } from "react";

const UserSingleCourseLessonList = ({
  lesson,
  isActive,
  isUnlocked,
  index,
  isCompleted,
  setClicked,
}: {
  lesson: LessonWitID;
  isActive: boolean;
  isUnlocked: boolean;
  isCompleted: boolean;
  index: number;
  setClicked: Dispatch<SetStateAction<number>>;
}) => {
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
};

export default UserSingleCourseLessonList;
