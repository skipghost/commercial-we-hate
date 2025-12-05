import { useCallback } from "react";

import { useClerk, useUser } from "@clerk/nextjs";

type UseProtectedActionOptions = {
  disabled?: boolean;
  onClick: () => void;
};

export function useProtectedAction({ disabled, onClick }: UseProtectedActionOptions) {
  const { openSignIn } = useClerk();
  const { isSignedIn } = useUser();

  const executeWithAuthCheck = useCallback(() => {
    if (disabled) return;
    if (isSignedIn) onClick();
    else openSignIn();
  }, [disabled, isSignedIn, onClick, openSignIn]);

  return { executeWithAuthCheck };
}

