import { useState } from "react";

import { useUser } from "@clerk/nextjs";
import { DialogClose } from "@radix-ui/react-dialog";
import { Flag } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { useProtectedAction } from "@/hooks/useProtectedAction";
import { PostDTOPopulatedUser } from "@/types/post.types";

import ReportReasonForm from "./ReportReasonForm";

interface PostReportButtonProps {
  username: string;
  post: PostDTOPopulatedUser;
}

const PostReportButton = ({ post, username }: PostReportButtonProps) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { user } = useUser();
  const { executeWithAuthCheck } = useProtectedAction({ onClick: () => setOpen(!open) });

  const handleFormSubmit = () => {
    setSubmitted(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSubmitted(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <Button
        variant="ghost"
        size="sm"
        className="font-semibold border h-9 border-black/5 flex items-center gap-2"
        onClick={executeWithAuthCheck}
      >
        <Flag className="w-5 h-4 stroke-[1.5px] stroke-current" />

        <span className="max-sm:hidden">Report</span>
      </Button>

      <DialogContent className="max-w-2xl max-h-[600px] overflow-auto">
        <DialogHeader>
          <DialogTitle>Report Post</DialogTitle>
        </DialogHeader>

        {submitted ? (
          <div className="text-sm text-text-body space-y-4">
            <p>
              Thank you for your report! Your action helps keep the community safe, welcoming, and respectful for
              everyone. We appreciate your vigilance and care.
            </p>
            <div className="flex justify-end">
              <DialogClose asChild>
                <Button
                  type="button"
                  size="sm"
                  className="min-w-[10rem]"
                  onClick={handleClose}
                >
                  Done
                </Button>
              </DialogClose>
            </div>
          </div>
        ) : (
          <ReportReasonForm
            post={post}
            username={username}
            onSubmitCallback={handleFormSubmit}
            loading={loading}
            setLoading={setLoading}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PostReportButton;

