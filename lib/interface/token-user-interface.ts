export type ITokenUser = {
  role: ["Subscriber" | "Instructor" | "Admin"];
  name: string;
  email: string;
  _id: string;
};

export type IUser = {
  password: string;
  picture: string;
  role: ["Subscriber" | "Instructor" | "Admin"];
  name: string;
  email: string;
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};
