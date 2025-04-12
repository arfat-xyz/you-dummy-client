import { CreateLessionFormData } from "../zod/lession-zod-validation";

export interface CourseCreateState {
  name: string;
  description: string;
  price: string;
  slug: string;
  uploading: boolean;
  category: string;
  image: string;
  paid: boolean;
  loading: boolean;
  published: boolean;
}

export interface CourseWithId extends CourseCreateState {
  _id: string;
}

export interface CourseWithIdAndLesson extends CourseWithId {
  lessons: CreateLessionFormData[];
}
export interface CourseWithIdAndInstructorNameAndId
  extends CourseWithIdAndLesson {
  instructor: {
    _id: string;
    name: string;
  };
}
export interface LessonWitID extends CreateLessionFormData {
  _id: string;
}
