import { useState } from "react";

import { useProtectedAction } from "@/hooks/useProtectedAction";

import NewCommentForm from "./NewCommentForm";

const AddCommentButton = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleToggle = () => setIsFormVisible((prev) => !prev);
  const handleCancel = () => setIsFormVisible(false);

  const { executeWithAuthCheck } = useProtectedAction({
    onClick: handleToggle,
  });

  return (
    <div>
      {isFormVisible ? (
        <NewCommentForm onCancel={handleCancel} />
      ) : (
        <button
          type="button"
          className="input w-full justify-start text-left !py-3 text-text-title cursor-text !rounded-full"
          onClick={executeWithAuthCheck}
        >
          Join Conversation
        </button>
      )}
    </div>
  );
};

export default AddCommentButton;

