import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";

import MenuItem from "@/components/menu-item";

interface EditCommentButtonProps {
  handleShowEditComment: () => void;
}

const EditCommentButton = ({ handleShowEditComment }: EditCommentButtonProps) => {
  const router = useRouter();
  return (
    <MenuItem onClick={handleShowEditComment}>
      <Pencil className="text-foreground transition-all duration-300 w-4" />
      Edit Comment
    </MenuItem>
  );
};

export default EditCommentButton;

