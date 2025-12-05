import { useState } from "react";

import { useUser } from "@clerk/nextjs";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

import { deleteComment } from "@/lib/actions/comment.actions";
import { isActionError, showToast } from "@/lib/utils";

import MenuItem from "@/components/menu-item";
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

import { usePost } from "@/context/SinglePostContext";

interface DeleteCommentButtonProps {
  commentId: string;
  username: string;
  commentUserId: string;
}

const DeleteCommentButton = ({ commentId, username, commentUserId }: DeleteCommentButtonProps) => {
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { onDeleteComplete } = usePost();

  const userId = user?.publicMetadata?.userId as string;

  const handleDeleteComment = async () => {
    if (!userId) {
      showToast("You must be logged in to delete the comment.", { variant: "destructive" });
      return;
    }

    if (userId !== commentUserId) {
      showToast("You're not allowed to delete this comment.", { variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const result = await deleteComment(commentId);

      if (isActionError(result)) {
        showToast(result.error || "Failed to delete the comment.", { variant: "destructive" });
        setLoading(false);
        return;
      }

      onDeleteComplete(commentId);

      showToast("Comment deleted successfully!", { variant: "success" });
    } catch (error) {
      console.log(error);

      showToast("Failed to delete the comment.", { variant: "destructive" });
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
          <DialogTitle className="mb-2">Delete Comment?</DialogTitle>
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
            onClick={handleDeleteComment}
            loading={loading}
          >
            Yes, Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCommentButton;

