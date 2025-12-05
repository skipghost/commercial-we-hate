"use client";

import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Plus } from "lucide-react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { Routes } from "@/constants/routes";

import { Button } from "../ui/button";
import ProfileMenu from "./profile-menu";

const AuthButtons = ({ hideCreatePost = false, className }: { hideCreatePost?: boolean; className?: string }) => {
  return (
    <>
      <SignedIn>
        <div className={cn("flex gap-4", className)}>
          {!hideCreatePost && (
            <Link
              href={Routes.CREATE_POST}
              className="max-sm:hidden"
            >
              <Button variant="link">
                <Plus className="w-5 h-5" />
                Create
              </Button>
            </Link>
          )}
          <ProfileMenu />
        </div>
      </SignedIn>
      <SignedOut>
        <div className={cn("flex gap-4", className)}>
          <SignUpButton mode="modal">
            <Button variant="secondary">Sign Up</Button>
          </SignUpButton>
          <SignInButton mode="modal">
            <Button>Login</Button>
          </SignInButton>
        </div>
      </SignedOut>
    </>
  );
};

export default AuthButtons;

