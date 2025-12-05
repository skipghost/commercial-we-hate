import { useState } from "react";

import { useUser } from "@clerk/nextjs";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

import { deletePostById } from "@/lib/actions/post.actions";
import { isActionError, showToast } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { UserRoleEnum } from "@/types/enums";

import MenuItem from "../menu-item";

interface DeletePostButtonProps {
  postId: string;
  postUserId: string;
  redirectHome?: boolean;
}

const DeletePostButton = ({ postId, postUserId, redirectHome }: DeletePostButtonProps) => {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const userId = user?.publicMetadata?.userId as string;

  const handleDeletePost = async () => {
    if (!userId) {
      showToast("You must be logged in to delete the post.", { variant: "destructive" });
      return;
    }

    const isOwner = userId === postUserId;
    const isAdmin =
      user?.publicMetadata.role === UserRoleEnum.ADMIN || user?.publicMetadata.role === UserRoleEnum.PRIMARY_ADMIN;

    if (!isOwner && !isAdmin) {
      showToast("You're not allowed to delete this post.", { variant: "destructive" });
      return;
    }

    setLoading(true);
    try {
      const result = await deletePostById(postId, userId);

      if (isActionError(result)) {
        showToast(result.error || "Failed to delete the post.", { variant: "destructive" });
        setLoading(false);
        return;
      }
      showToast("Post deleted successfully!", { variant: "success" });
      setTimeout(() => {
        if (redirectHome) router.push("/");
        else window.location.reload();
      }, 2000);
    } catch (error) {
      showToast("Failed to delete the post.", { variant: "destructive" });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <MenuItem className="w-full">
          <Trash className="text-foreground transition-all duration-300 w-4" />
          Delete
        </MenuItem>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader className="mb-2">
          <DialogTitle className="mb-2">Delete Post?</DialogTitle>
          <DialogDescription>This action is permanent and cannot be undone.</DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex justify-end">
          <DialogClose asChild>
            <Button
              type="submit"
              variant="outline"
            >
              Cancel
            </Button>
          </DialogClose>

          <Button
            type="submit"
            variant="destructive"
            onClick={handleDeletePost}
            loading={loading}
          >
            Yes, Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePostButton;

