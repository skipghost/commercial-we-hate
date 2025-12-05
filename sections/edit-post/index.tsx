import BackButton from "@/components/back-button";
import Container from "@/components/container";
import UserAvatar from "@/components/user-avatar";
import { PostDTOPopulatedUser } from "@/types/post.types";
import CreatePostForm from "../create-post/CreatePostForm";

interface EditPostPageProps {
  post: PostDTOPopulatedUser;
}

const EditPostPage = ({ post }: EditPostPageProps) => {
  return (
    <Container>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <BackButton />
          <UserAvatar {...{ imageUrl: post.user?.photo!, username: post.user?.username }} />
        </div>
        <CreatePostForm {...{ post }} />
      </div>
    </Container>
  );
};

export default EditPostPage;

