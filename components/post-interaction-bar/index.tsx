import PostShareButton from "@/components/post-share-button";
import PostTotalCommentsButton from "@/components/post-total-comments-button";
import PostVoteButton from "@/components/post-vote-button";

import { PostDTOPopulatedUser } from "@/types/post.types";
import { VoteValue } from "@/types/vote.types";

import PostReportButton from "../post-report-button";

interface PostInteractionBarProps {
  post: PostDTOPopulatedUser;
  onPostVoteComplete: (postId: string, value: VoteValue) => void;
}

const PostInteractionBar = ({ post, onPostVoteComplete }: PostInteractionBarProps) => {
  const username = post.user?.username;

  return (
    <div className="flex flex-wrap gap-2">
      <PostVoteButton
        postId={post._id}
        count={post.upVotes - post.downVotes}
        hasUpvoted={post.userVote === 1}
        hasDownvoted={post.userVote === -1}
        onPostVoteComplete={onPostVoteComplete}
      />
      <PostTotalCommentsButton
        count={post.commentsCount ?? 0}
        postId={post._id}
        postSlug={post.slug}
        username={username as string}
      />
      <PostShareButton
        username={username as string}
        post={post}
      />

      <PostReportButton
        username={username as string}
        post={post}
      />
    </div>
  );
};

export default PostInteractionBar;

