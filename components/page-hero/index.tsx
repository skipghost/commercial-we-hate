import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { Routes } from "@/constants/routes";

type PageHeroProps = {
  title?: string;
  description?: string;
  hasBreadCrumb?: boolean;
  pageName?: string;
  className?: string;
  secondLink?: string;
  secondTitle?: string;
};

const PageHero = ({
  title,
  hasBreadCrumb = true,
  secondLink = "",
  secondTitle = "",
  pageName,
  className,
}: PageHeroProps) => {
  return (
    <section className="relative">
      <div
        className={cn(
          "relative isolate overflow-hidden h-auto bg-primary",
          "min-h-[12rem] sm:min-h-[20rem] flex flex-col justify-center"
        )}
      >
        <div className={cn("relative z-10 text-white text-lg py-10", className)}>
          <div className="container flex flex-col items-center text-center justify-center">
            {title && <h1 className={cn("text-2xl mb-3 sm:mb-5 sm:text-4xl lg:text-5xl max-w-2xl ")}>{title}</h1>}
            {hasBreadCrumb && (
              <div className="flex items-center gap-2 whitespace-nowrap text-sm lg:text-lg">
                <Link
                  href={Routes.HOME}
                  className="flex gap-2 group items-center"
                >
                  <div className="group-hover:underline transition-all duration-300">Home</div>
                </Link>
                <FontAwesomeIcon
                  icon={faChevronRight}
                  className="w-3 h-3"
                />

                {secondTitle &&
                  (secondLink ? (
                    <>
                      <Link
                        href={secondLink}
                        className="flex gap-2 group items-center"
                      >
                        <div className="group-hover:underline transition-all duration-300">{secondTitle}</div>
                      </Link>
                      <FontAwesomeIcon
                        icon={faChevronRight}
                        className="w-3 h-3"
                      />
                    </>
                  ) : (
                    <>
                      <div className="flex gap-2 group items-center">
                        <div className="group-hover:underline transition-all duration-300">{secondTitle}</div>
                      </div>
                      <div>
                        <FontAwesomeIcon
                          icon={faChevronRight}
                          className="w-3 h-3"
                        />
                      </div>
                    </>
                  ))}
                <div className="text-white">{pageName}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PageHero;

