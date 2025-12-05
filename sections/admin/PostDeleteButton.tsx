"use client";

import { useState } from "react";

import { adminDeletePostById } from "@/lib/actions/post.actions";
import { showToast } from "@/lib/utils";

import { Button, ButtonProps } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type PostDeleteButtonProps = ButtonProps & {
  postId: string;
  onDeleted?: () => void;
};

const PostDeleteButton = ({ children, postId, onDeleted, ...rest }: PostDeleteButtonProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDeletePost = async () => {
    setLoading(true);
    try {
      await adminDeletePostById(postId);
      showToast("The post has been successfully deleted.");

      if (onDeleted) onDeleted(); // call callback after successful deletion
    } catch (error) {
      showToast(error instanceof Error ? error.message : "Deleting post is failed.", {
        variant: "destructive",
      });
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
        <Button
          size="sm"
          variant="destructive"
          {...rest}
        >
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-xl">
        <DialogHeader>
          <DialogTitle className="mb-4">Are you sure to delete this post?</DialogTitle>
          <DialogDescription>This action cannot be undone. This will permanently delete this post.</DialogDescription>
          <DialogFooter className="sm:justify-start flex pt-4 gap-1">
            <DialogClose asChild>
              <Button
                variant="outline"
                className="min-w-[6rem]"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={handleDeletePost}
              variant="destructive"
              className="min-w-[6rem]"
              loading={loading}
            >
              Delete it
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default PostDeleteButton;

