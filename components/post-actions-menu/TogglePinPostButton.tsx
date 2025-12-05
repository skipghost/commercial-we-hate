import { useState } from "react";

import { useUser } from "@clerk/nextjs";
import { Pin, PinOff } from "lucide-react";
import { useRouter } from "next/navigation";

import { updatePostById } from "@/lib/actions/post.actions";
import { isActionError, showToast } from "@/lib/utils";

import { Routes } from "@/constants/routes";

import { UserRoleEnum } from "@/types/enums";

import MenuItem from "../menu-item";

interface TogglePinPostButtonProps {
  postId: string;
  isPinned?: boolean;
  onClose: () => void;
  onTogglePinPost: (postId: string) => void;
}

const TogglePinPostButton = ({ postId, isPinned, onClose, onTogglePinPost }: TogglePinPostButtonProps) => {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const userId = user?.publicMetadata?.userId as string;

  const handleTogglePinPost = async () => {
    if (!userId) {
      showToast("You must be logged in to delete the post.", { variant: "destructive" });
      return;
    }

    if (user?.publicMetadata.role !== UserRoleEnum.ADMIN && user?.publicMetadata.role !== UserRoleEnum.PRIMARY_ADMIN) {
      showToast("You're not allowed to update this post", { variant: "destructive" });
      return;
    }

    setLoading(true);

    try {
      const result = await updatePostById(postId, { isPinned: !isPinned }, `${Routes.POSTS}${Routes.BULLETIN_BOARD}`);

      if (isActionError(result)) {
        showToast(result.error || "Failed to update the post.", { variant: "destructive" });
        setLoading(false);
        return;
      }
      showToast("Post updated successfully!", { variant: "success" });
      onTogglePinPost(postId);
      router.refresh();
    } catch (error) {
      console.log(error);

      showToast("Failed to update the post.", { variant: "destructive" });
    } finally {
      setLoading(false);
      onClose();
    }
  };

  return (
    <MenuItem
      className="w-full"
      onClick={handleTogglePinPost}
    >
      {isPinned ? (
        <PinOff className="text-foreground transition-all duration-300 w-4" />
      ) : (
        <Pin className="text-foreground transition-all duration-300 w-4" />
      )}
      {isPinned ? "Unpin Post" : "Pin Post"}
    </MenuItem>
  );
};

export default TogglePinPostButton;

