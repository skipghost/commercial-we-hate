"use client";

import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";

import Image from "@/components/image";
import { Button } from "@/components/ui/button";

import { INFO } from "@/constants";
import { Routes } from "@/constants/routes";

import { useMode } from "@/context/ModeContext";
import { useProtectedAction } from "@/hooks/useProtectedAction";
import { Mode } from "@/types/enums";

const WhyChooseUs = () => {
  const { mode } = useMode();
  const router = useRouter();
  const { executeWithAuthCheck } = useProtectedAction({
    onClick: () => router.push(Routes.CREATE_POST),
  });

  const modeContent = INFO.MODES[mode || Mode.HATE];

  return (
    <section className="padding-b">
      <div className="container-3">
        <div className="grid lg:grid-cols-2 gap-x-20">
          <div className="w-full h-full min-h-[20rem]">
            <Image
              src={modeContent?.whyJoin?.imgSrc}
              alt="Logo"
              className={cn("w-full mx-auto h-full")}
              imageClassName="object-contain object-center"
            />
          </div>
          <div className="lg:py-10">
            <h2 className="mb-4 md:mb-8">{modeContent?.whyJoin.heading}</h2>
            <p className="mb-4">{modeContent?.whyJoin?.description}</p>
            <Button
              size="lg"
              onClick={executeWithAuthCheck}
            >
              Create Post
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

