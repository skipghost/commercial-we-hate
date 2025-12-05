import { useState } from "react";

import { MessageCircle } from "lucide-react";

import CommentVoteButton from "@/components/comment-vote-button";
import { Button } from "@/components/ui/button";

import { useProtectedAction } from "@/hooks/useProtectedAction";
import { CommentDTOPopulatedUser } from "@/types/comment.types";
import { VoteValue } from "@/types/vote.types";

import ReplyForm from "../reply-form";

interface CommentInteractionBarProps {
  comment: CommentDTOPopulatedUser;
  onPostVoteComplete: (postId: string, value: VoteValue) => void;
}

const CommentInteractionBar = ({ comment, onPostVoteComplete }: CommentInteractionBarProps) => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleToggle = () => setIsFormVisible((prev) => !prev);
  const handleCancel = () => setIsFormVisible(false);

  const { executeWithAuthCheck } = useProtectedAction({
    onClick: handleToggle,
  });

  return (
    <div>
      <div className="flex flex-wrap gap-4">
        <CommentVoteButton
          commentId={comment._id}
          count={comment.upVotes - comment.downVotes}
          hasUpvoted={comment.userVote === 1}
          hasDownvoted={comment.userVote === -1}
          onPostVoteComplete={onPostVoteComplete}
        />

        <div>
          <Button
            variant="link"
            size="sm"
            className="p-2 text-gray-600 font-medium dark:bg-transparent"
            onClick={executeWithAuthCheck}
          >
            <MessageCircle className="w-5 h-4 stroke-[1.5px] stroke-current" />
            Reply
          </Button>
        </div>
      </div>

      {isFormVisible && (
        <ReplyForm
          parentId={comment._id}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default CommentInteractionBar;

