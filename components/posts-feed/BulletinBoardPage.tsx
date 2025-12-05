import Link from "next/link";

import Container from "@/components/container";
import UserAvatar from "@/components/user-avatar";

import { Routes } from "@/constants/routes";

import { PostsProvider } from "@/context/PostsContext";
import { UserDTO } from "@/types/user.types";

import DonateButton from "../layout/donate-button";
import { Button } from "../ui/button";
import BulletinBoardList from "./BulletinBoardList";

interface BulletinBoardPageProps {
  limit: number;
  user?: UserDTO;
  hideCategory?: boolean;
}

const BulletinBoardPage = ({ limit, user }: BulletinBoardPageProps) => {
  return (
    <PostsProvider {...{ limit, populateComments: true }}>
      <Container>
        <div className="space-y-6">
          {user && (
            <UserAvatar
              {...{ imageUrl: user.photo!, username: user.username }}
              size="lg"
            />
          )}
          <div className="flex justify-between items-center gap-2 flex-wrap mb-4">
            <h1 className="text-3xl font-bold">Bulletin Board</h1>
            <div className="flex gap-4 flex-wrap">
              <Link href={Routes.BULLETIN_BOARD_CREATE_POST}>
                <Button>Create Post</Button>
              </Link>
              <DonateButton />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <BulletinBoardList />
          </div>
        </div>
      </Container>
    </PostsProvider>
  );
};

export default BulletinBoardPage;

