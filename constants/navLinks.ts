import { Routes } from "@/constants/routes";

export default [
  {
    id: "home",
    title: "Home",
    href: Routes.HOME,
  },

  {
    id: "about-us",
    title: "About Us",
    href: Routes.ABOUT_US,
  },

  {
    id: "help",
    title: "Help",
    href: Routes.HELP,
  },
];

export const footerNavigationItems = {
  company: [
    { name: "Home", href: Routes.HOME },
    { name: "About Us", href: Routes.ABOUT_US },
    { name: "Help", href: Routes.HELP },
  ],
  legal: [
    { name: "Privacy Policy", href: Routes.PRIVACY_POLICY },
    { name: "User Agreement", href: Routes.USER_AGREEMENT },
    { name: "Terms & Conditions", href: Routes.TERMS_AND_CONDITIONS },
    { name: "Community Guidelines", href: Routes.COMMUNITY_GUIDELINES },
    { name: "Cookie Policy", href: Routes.COOKIE_POLICY },
    { name: "Disclaimer", href: Routes.DISCLAIMER },
  ],
};

