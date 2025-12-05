import { Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import Pagination from "@/components/pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

import { Routes } from "@/constants/routes";

import { UserDTO } from "@/types/user.types";

interface AdminUsersProps {
  users: UserDTO[];
  limit: number;
  total: number;
}

const AdminUsers = ({ users, limit, total }: AdminUsersProps) => {
  return (
    <div className="">
      <div className="flex flex-col">
        {users.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]"></TableHead>
                <TableHead className="">Username</TableHead>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead className="">Email</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user._id}>
                  <TableCell className="font-medium">
                    <Image
                      src={user.photo ?? "/icons/avatar-placeholder.svg"}
                      width={200}
                      height={200}
                      alt={`${user.firstName} ${user.lastName}`}
                      className="rounded-full object-cover w-8 h-8"
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <Link
                      target="_blank"
                      href={`${Routes.USER}/${user.username}`}
                    >
                      @{user.username}
                    </Link>
                  </TableCell>
                  <TableCell>{user.firstName}</TableCell>
                  <TableCell>{user.lastName}</TableCell>

                  <TableCell>{user.email}</TableCell>
                  <TableCell className="capitalize">{user.role?.replace("-", " ")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="flex flex-col justify-center items-center text-center min-h-[20rem]">
            <div className="border border-slate-500 rounded-full p-3 mb-2">
              <Users className="text-slate-800 w-12 h-12" />
            </div>
            <p className="text-xl mb-4">No users found</p>
          </div>
        )}

        <Pagination
          {...{
            totalCount: total,
            limit,
            data: users,
          }}
        />
      </div>
    </div>
  );
};

export default AdminUsers;

