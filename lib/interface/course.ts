import { CreateLessionFormData } from "../zod/lession-zod-validation";
import { IUser } from "./token-user-interface";

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
  createdAt?: Date | string;
  updatedAt?: Date | string;
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
  averageRating: number;
  numberOfRatings: number;
}

export type IReview = {
  _id: string;
  user: string | IUser;
  name: string;
  rating: number;
  comment: string;
  course: string | CourseCreateState;
  createdAt: string;
};
export interface LessonWitID extends CreateLessionFormData {
  _id: string;
}
