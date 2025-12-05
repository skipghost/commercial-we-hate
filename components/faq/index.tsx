import { cn } from "@/lib/utils";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import type { FAQ } from "@/constants/faqs";

type FAQProps = {
  faqs: FAQ[];
  theme?: "light" | "dark";
};

const FAQ = ({ faqs, theme = "light" }: FAQProps) => {
  return (
    <Accordion
      type="single"
      defaultValue="item-0"
      className="accordian space-y-3 "
    >
      {faqs?.map((item, index) => (
        <AccordionItem
          key={index}
          value={`item-${index}`}
          className={cn("border-b  accordion-item", theme === "light" ? "border-white/10" : "border-black/10")}
        >
          <AccordionTrigger className={"group rounded [&[data-state=open]>]:mt-20 py-5 hover:no-underline"}>
            <div className="flex flex-row justify-between items-center w-full">
              <div className="font-marcellus flex h-full items-center gap-2 flex-1 pr-5 text-xl font-medium capitalize text-left">
                {index + 1}. {item.question}
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <p
              dangerouslySetInnerHTML={{ __html: item.answer }}
              className={cn("faq-answer text-sm lg:prose-base px-6", theme === "light" ? "text-gray-300" : "text-text")}
            />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FAQ;

