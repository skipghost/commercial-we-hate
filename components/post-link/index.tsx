import Link from "next/link";

import { cn } from "@/lib/utils";

type PostLinkProps = {
  url: string;
  className?: string;
};

const getDomainFromUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
};

const PostLink = ({ url, className }: PostLinkProps) => {
  const domain = getDomainFromUrl(url);

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex justify-between items-center gap-3 w-full border border-gray-300 px-4 py-2.5 rounded-xl text-sm text-gray-700",
        className
      )}
    >
      <div className="">{domain || "Invalid URL"}</div>
      <div className="border rounded-full px-4 py-1.5 text-sm bg-gray-100 hover:bg-gray-200 transition">Open</div>
    </Link>
  );
};

export default PostLink;

