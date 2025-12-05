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

const AboutUs = () => {
  const { mode } = useMode();

  const modeContent = INFO.MODES[mode || Mode.HATE];
  const router = useRouter();

  const { executeWithAuthCheck } = useProtectedAction({
    onClick: () => router.push(Routes.CREATE_POST),
  });

  return (
    <section className="padding-y">
      <div className="container-3">
        <div className="grid lg:grid-cols-2 gap-y-6">
          <div className="lg:py-10 order-2 lg:order-1">
            <h2 className="mb-4 md:mb-8 max-w-sm">{modeContent?.about.heading}</h2>
            <p className="mb-4">{modeContent?.about?.description}</p>
            <p className="mb-8">{modeContent?.about?.additional}</p>

            <Button
              size="lg"
              onClick={executeWithAuthCheck}
            >
              Create Post
            </Button>
          </div>
          <div className="lg:pl-20 w-full h-full min-h-[20rem] order-1 lg:order-2">
            <div className="bg-primary rounded-xl w-full h-full pt-4">
              <Image
                src={modeContent?.about?.imgSrc}
                alt="Logo"
                className={cn("w-2/3 mx-auto h-full")}
                imageClassName="object -mt- object-top"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

