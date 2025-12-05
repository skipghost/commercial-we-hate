" client";

import { useState } from "react";

import { useUser } from "@clerk/nextjs";
import { Ellipsis } from "lucide-react";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { usePosts } from "@/context/PostsContext";
import { UserRoleEnum } from "@/types/enums";
import { PostDTOPopulatedUser } from "@/types/post.types";

import DeletePostButton from "./DeletePostButton";
import EditPostButton from "./EditPostButton";
import TogglePinPostButton from "./TogglePinPostButton";

interface BulletinBoardPostActionsMenuProps {
  post: PostDTOPopulatedUser;
  redirectHome?: boolean;
}

const BulletinBoardPostActionsMenu = ({ post, redirectHome }: BulletinBoardPostActionsMenuProps) => {
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const { user } = useUser();
  const username = post?.user?.username;
  const { togglePinPost } = usePosts();

  return username ? (
    <Popover
      open={openPopover}
      onOpenChange={setOpenPopover}
    >
      <PopoverTrigger>
        <Ellipsis className="hover:bg-neutral-200/60 text-foreground w-7 h-7 rounded-full transition-all duration-300 p-1" />
      </PopoverTrigger>
      <PopoverContent className="p-0 max-w-[200px] overflow-hidden dark:bg-ghost">
        <div className="flex flex-col divide-y-[1px] divide-border">
          {(user?.publicMetadata.role === UserRoleEnum.ADMIN ||
            user?.publicMetadata.role === UserRoleEnum.PRIMARY_ADMIN) && (
            <TogglePinPostButton
              postId={post._id}
              isPinned={post.isPinned}
              onClose={() => setOpenPopover(false)}
              onTogglePinPost={togglePinPost}
            />
          )}

          {post.userId === user?.publicMetadata.userId && (
            <EditPostButton
              postId={post._id}
              postSlug={post.slug}
              isBulletinBoardPost={true}
            />
          )}

          <DeletePostButton
            postId={post._id}
            postUserId={post?.user?._id!}
            redirectHome={redirectHome}
          />
        </div>
      </PopoverContent>
    </Popover>
  ) : null;
};

export default BulletinBoardPostActionsMenu;

