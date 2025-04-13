import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CourseWithIdAndInstructorNameAndId } from "@/lib/interface/course";
import { currencyFormatter } from "@/lib/utils";
import { CustomToolTipComponent } from "./custom-tooltip";

const CourseCard: React.FC<{ course: CourseWithIdAndInstructorNameAndId }> = ({
  course,
}) => {
  const {
    _id,
    name,
    instructor,
    price,
    paid,
    category,
    image,
    slug,
    published,
    lessons,
  } = course;

  return (
    <div
      key={_id}
      className="flex flex-col justify-between p-4 bg-white shadow-sm rounded-xl hover:shadow-lg transition-all duration-300"
    >
      <div>
        <Image
          width={400}
          height={200}
          src={image}
          alt={name}
          className="w-full h-48 object-cover rounded-md border"
        />

        <div className="mt-3 space-y-1">
          <Link href={`/course/${slug}`}>
            <CustomToolTipComponent
              toolValue={name}
              triggerer={
                <span className="block text-lg font-semibold text-blue-600 hover:underline cursor-pointer truncate">
                  {name}
                </span>
              }
            />
          </Link>

          <p className="text-sm text-gray-700 truncate">
            By {instructor?.name}
          </p>
          <div className="text-sm text-gray-600 truncate">{category}</div>
          <div className="text-3xl  font-bold">
            {paid
              ? currencyFormatter({ amount: price, currency: "BDT" })
              : "Free"}
          </div>
          <p className="text-sm text-gray-600">
            {lessons.length} Lesson{lessons.length !== 1 ? "s" : ""}
          </p>
          {lessons.length < 5 ? (
            <p className="text-yellow-600 text-sm">
              ⚠️ At least 5 lessons are required to publish
            </p>
          ) : published ? (
            <p className="text-green-600 text-sm">
              ✅ Your course is live in the marketplace
            </p>
          ) : (
            <p className="text-green-600 text-sm">
              ✅ Your course is ready to be published
            </p>
          )}
        </div>
      </div>

      {/* <div className="pt-3">
        {published ? (
          <span className="text-green-600" title="Published">
            <FaCheck className="text-green-600 size-4" />
          </span>
        ) : (
          <span className="text-yellow-500" title="Unpublished">
            <RxCross2 className="text-red-600 size-4" />
          </span>
        )}
      </div> */}
    </div>
  );
};

export default CourseCard;
