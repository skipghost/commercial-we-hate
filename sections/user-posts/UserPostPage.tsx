import Container from "@/components/container";

import { SinglePostProvider } from "@/context/SinglePostContext";
import { CommentDTOPopulatedUser } from "@/types/comment.types";
import { PostDTOPopulatedUser } from "@/types/post.types";

import SinglePost from "./SinglePost";

interface UserPostPageProps {
  post: PostDTOPopulatedUser;
  comments?: CommentDTOPopulatedUser[];
  limit: number;
}

const UserPostPage = ({ post, comments, limit }: UserPostPageProps) => {
  return (
    <SinglePostProvider {...{ post, comments, limit }}>
      <Container className="">
        <div className="flex flex-col">
          <SinglePost />
        </div>
      </Container>
    </SinglePostProvider>
  );
};

export default UserPostPage;

