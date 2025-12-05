"use client";

import { VariantProps, cva } from "class-variance-authority";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { Routes } from "@/constants/routes";

const userAvatarVariants = cva(
  "flex w-fit gap-2 items-center [&>img]:rounded-full [&>div:first-of-type]:rounded-full !ring-0 !outline-0 select-none",
  {
    variants: {
      size: {
        default:
          "[&>img]:w-12 [&>img]:h-12 [&>div>p:first-of-type]:text-lg [&>div>p:last-of-type]:text-sm [&>div>p:first-of-type]:font-semibold",
        sm: "[&>img]:w-7 [&>img]:h-7 [&>div:first-of-type]:h-7 [&>p]:text-xs",
        lg: "[&>img]:w-12 sm:[&>img]:w-16 [&>div:first-of-type]:w-12 sm:[&>div:first-of-type]:w-16 [&>img]:h-12 sm:[&>img]:h-16 [&>div:first-of-type]:h-12 sm:[&>div:first-of-type]:h-16 [&>div>p:first-of-type]:text-xl sm:[&>div>p:first-of-type]:text-2xl [&>div>p:first-of-type]:font-semibold",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

interface UserAvatarProps extends VariantProps<typeof userAvatarVariants> {
  className?: string;
  username?: string;
  imageUrl?: string;
  usernameClassName?: string;
}

const UserAvatar = ({ size, className, username, imageUrl, usernameClassName }: UserAvatarProps) => {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) =>
    username ? (
      <Link
        href={`${Routes.USER}/${username}`}
        className={cn(userAvatarVariants({ size }), className)}
      >
        {children}
      </Link>
    ) : (
      <div className={cn(userAvatarVariants({ size }), className)}>{children}</div>
    );

  return (
    <Wrapper>
      <Image
        width={100}
        height={100}
        src={imageUrl || "/icons/avatar-placeholder.svg"}
        alt={username || "Deleted User"}
      />
      <div className="flex flex-col justify-center">
        <p className={cn("text-foreground", usernameClassName)}>{username || "Deleted User"}</p>
        {username && size !== "sm" && <p className="text-neutral-500">u/{username}</p>}
      </div>
    </Wrapper>
  );
};

export default UserAvatar;

