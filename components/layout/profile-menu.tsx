"use client";

import { UserButton, useUser } from "@clerk/nextjs";
import { Files, FilesIcon, Users } from "lucide-react";
import { useRouter } from "next/navigation";

import { Routes } from "@/constants/routes";

import { UserRoleEnum } from "@/types/enums";

const ProfileMenu = () => {
  const router = useRouter();
  const { user } = useUser();
  return (
    <UserButton>
      {(user?.publicMetadata.role === UserRoleEnum.PRIMARY_ADMIN ||
        user?.publicMetadata.role === UserRoleEnum.PRIMARY_ADMIN) && (
        <UserButton.MenuItems>
          <UserButton.Action
            label="Users"
            labelIcon={<Users className="w-4 h-4 stroke-2" />}
            onClick={() => router.push(`${Routes.ADMIN_USERS}`)}
          />
        </UserButton.MenuItems>
      )}

      {(user?.publicMetadata.role === UserRoleEnum.PRIMARY_ADMIN ||
        user?.publicMetadata.role === UserRoleEnum.PRIMARY_ADMIN) && (
        <UserButton.MenuItems>
          <UserButton.Action
            label="All Posts"
            labelIcon={<FilesIcon className="w-4 h-4 stroke-2" />}
            onClick={() => router.push(`${Routes.ADMIN_POSTS}`)}
          />
        </UserButton.MenuItems>
      )}

      {(user?.publicMetadata.role === UserRoleEnum.PRIMARY_ADMIN ||
        user?.publicMetadata.role === UserRoleEnum.PRIMARY_ADMIN) && (
        <UserButton.MenuItems>
          <UserButton.Action
            label="Admin Posts"
            labelIcon={<FilesIcon className="w-4 h-4 stroke-2" />}
            onClick={() => router.push(`${Routes.ADMIN_SELECTIONS}`)}
          />
        </UserButton.MenuItems>
      )}

      {(user?.publicMetadata.role === UserRoleEnum.PRIMARY_ADMIN ||
        user?.publicMetadata.role === UserRoleEnum.PRIMARY_ADMIN) && (
        <UserButton.MenuItems>
          <UserButton.Action
            label="User Requests"
            labelIcon={<FilesIcon className="w-4 h-4 stroke-2" />}
            onClick={() => router.push(`${Routes.ADMIN_REQUESTS}`)}
          />
        </UserButton.MenuItems>
      )}

      <UserButton.MenuItems>
        <UserButton.Action
          label="My Posts"
          labelIcon={<Files className="w-4 h-4 stroke-2" />}
          onClick={() => router.push(`${Routes.USER}/${user?.username}`)}
        />
      </UserButton.MenuItems>
    </UserButton>
  );
};

export default ProfileMenu;

