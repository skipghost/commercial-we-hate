"use client";

import FAQ from "@/components/faq";
import PageHero from "@/components/page-hero";

import faqs from "@/constants/faqs";

import { useMode } from "@/context/ModeContext";

import CTA from "./CTA";

const HelpPage = () => {
  const { mode } = useMode();
  return (
    <>
      <PageHero
        title="Help"
        pageName="Help"
      />

      <section className=" padding-y">
        <div className="container-2">
          <h2 className="text-3xl mb-6">Frequently Asked Questions</h2>
          {mode && (
            <FAQ
              theme="dark"
              faqs={faqs[mode]}
            />
          )}

          <CTA />
        </div>
      </section>
    </>
  );
};

export default HelpPage;

