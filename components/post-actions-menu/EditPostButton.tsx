import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

import { Routes } from "@/constants/routes";

import MenuItem from "../menu-item";

interface EditPostButtonProps {
  postId: string;
  postSlug: string;
  isBulletinBoardPost?: boolean;
}

const EditPostButton = ({ postId, postSlug, isBulletinBoardPost }: EditPostButtonProps) => {
  const router = useRouter();
  return (
    <MenuItem
      onClick={() =>
        router.push(
          isBulletinBoardPost
            ? `${Routes.BULLETIN_BOARD}/${postId}/${postSlug}/edit`
            : `${Routes.POSTS}/${postId}/${postSlug}/edit`
        )
      }
    >
      <Pencil className="text-foreground transition-all duration-300 w-4" />
      Edit Post
    </MenuItem>
  );
};

export default EditPostButton;

