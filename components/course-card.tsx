import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CourseWithIdAndInstructorNameAndId } from "@/lib/interface/course";
import { currencyFormatter } from "@/lib/utils";
import { CustomToolTipComponent } from "./custom-tooltip";
import { Rating } from "@smastrom/react-rating";
import { Star } from "@smastrom/react-rating";

const CourseCard: React.FC<{
  course: CourseWithIdAndInstructorNameAndId;
  singleCardRedirect: string;
}> = ({ course, singleCardRedirect }) => {
  const {
    name,
    instructor,
    price,
    paid,
    category,
    image,
    slug,
    published,
    lessons,
    averageRating,
    numberOfRatings,
  } = course;
  return (
    <div className="flex flex-col justify-between p-4 bg-white shadow-sm rounded-xl hover:shadow-lg transition-all duration-300 h-full">
      <div>
        <Image
          width={400}
          height={200}
          src={image}
          alt={name}
          className="w-full h-48 object-cover rounded-md border"
        />

        <div className="mt-3 space-y-2">
          <Link href={`${singleCardRedirect}${slug}`}>
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

          {/* Rating Display */}
          <div className="flex items-center gap-1">
            <Rating
              value={averageRating || 0}
              readOnly
              style={{ maxWidth: 80 }}
              itemStyles={{
                itemShapes: Star,
                activeFillColor: "#f59e0b", // amber-500
                inactiveFillColor: "#d1d5db", // gray-300
              }}
            />
            <span className="text-sm text-gray-600">
              {averageRating?.toFixed(1) || "0.0"}
              <span className="text-xs text-gray-500 ml-1">
                ({numberOfRatings || 0})
              </span>
            </span>
          </div>

          <div className="text-sm text-gray-600 truncate">{category}</div>
          <div className="text-3xl font-bold">
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
    </div>
  );
};

export default CourseCard;
