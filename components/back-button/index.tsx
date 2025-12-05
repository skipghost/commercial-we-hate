"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

const BackButton = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.back()}
      variant="outline"
      className="w-4 h-4 px-4 py-4"
    >
      <ChevronLeft className="w-4 h-4 " />
    </Button>
  );
};

export default BackButton;

