import { ReactNode } from "react";

import { type ClassValue, clsx } from "clsx";
import { formatDistanceToNow } from "date-fns";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

import { ActionError, Option } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleError = (error: any) => {
  if (typeof error === "string") {
    return { error: error };
  } else if (typeof error === "object" && error instanceof Error) {
    throw error;
  } else if (typeof error === "object" && error.message) {
    return { error: error.message };
  } else {
    return { error: `An unknown error occurred: ${JSON.stringify(error)}` };
  }
};

export function isActionError(error: any): error is ActionError {
  return error && typeof error === "object" && "error" in error && error.error;
}

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}${path}`;
}

export function showToast(
  message: string | ReactNode,
  options?: {
    description?: string;
    variant?: "success" | "destructive" | "default";
    position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center";
  }
) {
  const { description, variant = "default", position = "top-center" } = options || {};

  const toastOptions = { description, position };

  if (variant === "success") {
    toast.success(message, {
      ...toastOptions,
      classNames: {
        toast: "!bg-teal-500 !text-white",
      },
    });
  } else if (variant === "destructive") {
    toast.error(message, {
      ...toastOptions,
      classNames: {
        toast: "!bg-red-500 !text-white",
      },
    });
  } else {
    toast(message, {
      ...toastOptions,
      classNames: {
        toast: "!bg-gray-800 !text-white",
      },
    });
  }
}

export function formatNumberCompact(number: number, locale: string = "en"): string {
  return new Intl.NumberFormat(locale, { notation: "compact", maximumFractionDigits: 1 }).format(number);
}

export const formatTimeAgo = (date: Date | number) =>
  formatDistanceToNow(date, { addSuffix: true }).replace(/^(about |over |almost )/, "");

export function findLabelByValue(options: Option[], value?: string): string | undefined {
  if (!value || !Array.isArray(options)) return;

  const match = options.find((option) => option.value === value);
  return match?.label;
}

export function getObjectLabel(array: Option[], type?: string) {
  return array.find((item) => item.value === type)?.label;
}

