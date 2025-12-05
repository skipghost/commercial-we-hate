import Link from "next/link";

import { findLabelByValue } from "@/lib/utils";

import postCategories from "@/constants/postCategories";
import { Routes } from "@/constants/routes";

const PostCategory = ({ category }: { category: string }) => {
  return (
    <Link
      href={`${Routes.TOPICS}/${category}`}
      className="border w-fit border-border px-3 py-1 text-xs text-foreground rounded-full whitespace-nowrap h-fit"
    >
      {findLabelByValue(postCategories, category)}
    </Link>
  );
};

export default PostCategory;

