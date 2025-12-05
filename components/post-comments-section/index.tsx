import AddCommentButton from "../add-comment-button";
import PostCommentsList from "./PostCommentsList";

const PostCommentsSection = () => {
  return (
    <div
      className="flex flex-col mt-10 border-t border-border pt-10"
      id="comments"
    >
      <AddCommentButton />
      <PostCommentsList />
    </div>
  );
};

export default PostCommentsSection;

