import Container from "@/components/container";

import { PostDTO } from "@/types/post.types";
import { UserDTO } from "@/types/user.types";

import AdminCreateBulletinPost from "./AdminCreateBulletinPost";

const EditAdminBulletinPostPage = ({ user, post }: { user?: UserDTO; post: PostDTO }) => {
  return (
    <Container>
      <div className="space-y-2">
        <div className="flex justify-between items-center"></div>
        <AdminCreateBulletinPost {...{ post }} />
      </div>
    </Container>
  );
};

export default EditAdminBulletinPostPage;

