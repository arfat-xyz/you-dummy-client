"use server";
import { cookies } from "next/headers";

export const removeTokenFromCookie = async () => {
  cookies().delete("token");
};
