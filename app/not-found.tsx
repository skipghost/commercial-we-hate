import NotFound from "@/sections/not-found";

import { INFO } from "@/constants";

export const metadata = {
  title: `404 | ${INFO.BUSINESS_NAME}`,
  openGraph: {
    title: `404 | ${INFO.BUSINESS_NAME}`,
  },
};

export default function NotFoundPage() {
  return (
    <>
      <NotFound />
    </>
  );
}

