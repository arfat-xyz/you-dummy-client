import { IUser } from "./token-user-interface";

export const hasUserRole = (
  allowedRoles: Array<"Subscriber" | "Instructor" | "Admin">
): boolean => {
  const getUserFromLocalStorage: IUser | null = JSON.parse(
    window.localStorage.getItem("user") || "null"
  );

  if (!getUserFromLocalStorage) return false;

  // getUserFromLocalStorage.role is an array, e.g., ["Subscriber"]
  const userRoles = getUserFromLocalStorage.role;

  // Check if any of the allowedRoles is included in the user's roles
  return allowedRoles.some((role) => userRoles.includes(role));
};
