"use server";
import { cookies } from "next/headers";

export const removeTokenFromCookie = async () => {
  console.log({ trigger: true });
  cookies().delete("token");
};
