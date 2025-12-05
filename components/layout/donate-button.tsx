import Link from "next/link";

import { cn } from "@/lib/utils";

import { Routes } from "@/constants/routes";

import { Button } from "../ui/button";

const DonateButton = ({ className }: { className?: string }) => {
  return (
    <Link
      href={Routes.DONATE}
      rel="nofollow noopener"
      target="_blank"
      className={cn("hidden md:block", className)}
    >
      <Button variant="secondary">Donate ❤️</Button>
    </Link>
  );
};

export default DonateButton;

