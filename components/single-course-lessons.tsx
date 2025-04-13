"use client";
import {
  CourseWithIdAndInstructorNameAndId,
  LessonWitID,
} from "@/lib/interface/course";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import ReactPlayer from "react-player";

const SingleCourseLessons = ({
  lessons,
  course,
}: {
  lessons: LessonWitID[];
  course: CourseWithIdAndInstructorNameAndId;
}) => {
  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      <h4 className="text-2xl font-semibold mb-4">{lessons?.length} Lessons</h4>
      <hr className="border-gray-300 mb-6" />
      <ul className="space-y-4">
        {lessons.map((item, index) => (
          <li
            key={index}
            className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">
                {index + 1}
              </div>
              <div>
                <p className="text-sm font-medium">{item.title}</p>
              </div>
            </div>
            {item.free_preview ? (
              <>
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="text-blue-600 hover:underline text-sm font-medium"
                    >
                      Preview
                    </button>
                  </DialogTrigger>
                  <DialogContent className="w-full md:max-w-sm lg:max-w-md xl:max-w-lg">
                    <DialogHeader>
                      <ReactPlayer
                        url={lessons[0]?.video}
                        width={`100%`}
                        height={`250px`}
                        light={course?.image}
                        playing={true}
                        controls={true}
                        style={{
                          borderRadius: "20px",
                          marginTop: "20px",
                        }}
                      />
                    </DialogHeader>
                  </DialogContent>
                </Dialog>
              </>
            ) : (
              <></>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SingleCourseLessons;
