"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import { INFO } from "@/constants";
import { footerNavigationItems } from "@/constants/navLinks";
import postCategories from "@/constants/postCategories";
import { Routes } from "@/constants/routes";
import socialLinks from "@/constants/socialLinks";

import { useMode } from "@/context/ModeContext";

import Logo from "../logo";

export default function Footer() {
  const { mode } = useMode();
  return (
    <>
      <footer
        className="border-border border-t bg-black"
        aria-labelledby="footer-heading"
      >
        <h2
          id="footer-heading"
          className="sr-only"
        >
          Footer
        </h2>
        <div className="container-2">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8 pt-20">
            <div className="xl:col-span-1">
              <Logo
                className="mb-4 w-44"
                white
              />
              <p className="text-sm leading-6 text-gray-300 max-w-xs mb-6">
                A community built for roasting commercials that make us cringe.
              </p>
              <div className="flex space-x-6">
                {socialLinks.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-white hover:text-gray-400"
                  >
                    <span className="sr-only">{item.name}</span>
                    <FontAwesomeIcon
                      icon={item.icon}
                      className="h-6 w-6"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>
            </div>
            <div className="mt-16 grid gap-8 xl:col-span-2 xl:mt-0">
              <div className="md:grid md:grid-cols-3 md:gap-8">
                <div>
                  <h3 className="text-xl font-semibold leading-6 dark:text-white text-white">Company</h3>
                  <ul
                    role="list"
                    className="mt-6 space-y-4"
                  >
                    {footerNavigationItems.company.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="text-sm+ leading-6 text-gray-300 hover:text-white"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold leading-6 dark:text-white text-white">Communities</h3>
                  <ul
                    role="list"
                    className="mt-6 space-y-4"
                  >
                    {postCategories.map((item) => (
                      <li key={item.value}>
                        <Link
                          href={`${Routes.POSTS}/${item.value}`}
                          className="text-sm+ leading-6 text-gray-300 hover:text-white"
                        >
                          {item.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-10 md:mt-0">
                  <h3 className="text-xl font-semibold leading-6 dark:text-white text-white">Legal</h3>
                  <ul
                    role="list"
                    className="mt-6 space-y-4"
                  >
                    {footerNavigationItems.legal.map((item) => (
                      <li key={item.name}>
                        <Link
                          href={item.href}
                          className="text-sm+ leading-6 text-gray-300 hover:text-white"
                        >
                          {item.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 border-t border-white/20 pt-6 pb-4 flex justify-between">
            <p className="text-xs+ leading-5 text-gray-400">
              © {mode && INFO.MODES[mode]?.title} {new Date().getFullYear()}. All Rights Reserved.
            </p>
            <p className="text-center text-xs+ leading-5 text-gray-400">
              Developed by{" "}
              <Link
                href="https://truesocialmarketing.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                TSM
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

