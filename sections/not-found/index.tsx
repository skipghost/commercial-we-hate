import Link from "next/link";

import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";

import { Routes } from "@/constants/routes";

const NotFound = () => {
  return (
    <div className="text-center flex flex-col items-center my-auto py-24 relative">
      <Logo className="w-60 mb-4" />
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">Page not found</h1>
      <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn’t find the page you’re looking for.</p>
      <div className="mt-8 flex items-center justify-center gap-x-6">
        <Link
          href={Routes.HOME}
          className=""
        >
          <Button>Go back home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

