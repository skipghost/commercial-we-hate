import { useClerk, useUser } from "@clerk/nextjs";

import { cn } from "@/lib/utils";

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
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();

  const handleClick = () => {
    if (disabled) return;
    if (isSignedIn) onClick();
    else openSignIn();
  };

  return (
    <button
      onClick={handleClick}
      aria-label={ariaLabel}
      className={cn(
        "group w-8 h-8 rounded-full flex justify-center items-center transition-all duration-300",
        hasVoted ? "hover:bg-ghost-hover/30" : "hover:bg-ghost-hover/40",
        disabled && "opacity-50 pointer-events-none"
      )}
    >
      <Like
        className={cn(
          "w-3.5 h-3.5",
          isUpvote ? "" : "scale-y-[-1]",
          "stroke-gray-500",
          hasVoted
            ? active &&
                (isUpvote
                  ? "fill-teal-500 stroke-teal-500 group-hover:fill-teal-500"
                  : "fill-red-500 stroke-red-500 group-hover:fill-red-500")
            : isUpvote
              ? "group-hover:stroke-teal-500"
              : "group-hover:stroke-red-500"
        )}
        filled={active}
      />
    </button>
  );
};

export default VoteIconButton;

