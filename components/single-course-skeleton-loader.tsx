import React from "react";

const SingleCourseSkeletonLoader = () => {
  return (
    <div className="animate-pulse p-6 space-y-6">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-8 space-y-4">
          <div className="h-8 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-full"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6"></div>
          <div className="h-6 bg-blue-200 rounded-full w-32"></div>
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        </div>

        <div className="col-span-12 md:col-span-4 space-y-4">
          <div className="w-full h-[250px] bg-gray-300 rounded-lg"></div>
          <div className="h-4 bg-gray-300 rounded w-24"></div>
        </div>
      </div>

      {/* Skeleton for lessons */}
      <div className="space-y-4">
        <div className="h-6 bg-gray-300 rounded w-40"></div>
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <div className="flex-1 h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-blue-200 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleCourseSkeletonLoader;
