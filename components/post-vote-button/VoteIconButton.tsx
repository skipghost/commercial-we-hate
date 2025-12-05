import { cn } from "@/lib/utils";

import { useProtectedAction } from "@/hooks/useProtectedAction";

import Like from "../icons/like";

interface VoteIconButtonProps {
  onClick: () => void;
  ariaLabel: string;
  active: boolean;
  isUpvote?: boolean;
  disabled?: boolean;
  hasVoted?: boolean;
}

const VoteIconButton = ({
  onClick,
  ariaLabel,
  active,
  isUpvote = false,
  disabled = false,
  hasVoted = false,
}: VoteIconButtonProps) => {
  const { executeWithAuthCheck } = useProtectedAction({ onClick });

  return (
    <button
      onClick={executeWithAuthCheck}
      aria-label={ariaLabel}
      className={cn(
        "group w-9 h-9 rounded-full flex justify-center items-center transition-all duration-300",
        hasVoted ? "hover:bg-ghost-hover/30" : "hover:bg-ghost-hover",
        disabled && "opacity-50 pointer-events-none"
      )}
    >
      <Like
        className={cn(
          "w-4 h-4",
          isUpvote ? "" : "scale-y-[-1]",
          hasVoted
            ? "fill-white stroke-white"
            : isUpvote
              ? "fill-transparent stroke-teal-500 group-hover:fill-teal-500"
              : "fill-transparent stroke-red-500 group-hover:fill-red-500"
        )}
        filled={active}
      />
    </button>
  );
};

export default VoteIconButton;

