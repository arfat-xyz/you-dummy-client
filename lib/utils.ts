import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export const currencyFormatter = (data: {
  amount: string | number;
  currency: string;
}) => {
  return ((Number(data.amount) * 100) / 100).toLocaleString(data.currency, {
    style: "currency",
    currency: data.currency,
  });
};
export const stripeCurrencyFormatter = (data: {
  amount: string | number;
  currency: string;
}) => {
  return (Number(data.amount) / 100).toLocaleString(data.currency, {
    style: "currency",
    currency: data.currency,
  });
};

export const formatDate = (dateString: string) => {
  if (typeof dateString !== "string") return dateString;
  return new Date(dateString).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
};
