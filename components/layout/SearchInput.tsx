"use client";

import { useEffect, useRef, useState } from "react";

import { Loader2, Search } from "lucide-react";
import Link from "next/link";

import { getAllPosts } from "@/lib/actions/post.actions";
import { cn, isActionError } from "@/lib/utils";

import { Routes } from "@/constants/routes";

import { PostDTOPopulatedUser } from "@/types/post.types";

interface SearchDropdownProps {
  placeholder?: string;
  className?: string;
  debounceTime?: number;
  maxResults?: number;
}

const SearchDropdown = ({
  placeholder = "Search...",
  className = "",
  debounceTime = 500,
  maxResults = 5,
}: SearchDropdownProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<PostDTOPopulatedUser[]>([]);
  const [loading, setLoading] = useState(false);
  const [focused, setFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch search results
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await getAllPosts({
          query,
          limit: maxResults,
          page: 1,
          populateUser: true,
        });

        if (!data || isActionError(data)) {
          setResults([]);
          return;
        }

        setResults(data.posts as PostDTOPopulatedUser[]);
      } catch (err) {
        console.error("Search error:", err);
      } finally {
        setLoading(false);
      }
    }, debounceTime);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={wrapperRef}
      className={cn("relative", className)}
    >
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputRef}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        className={`rounded-full border border-gray-400 bg-white py-2.5 px-10 text-sm text-gray-800 placeholder:text-gray-400 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all duration-300 ease-in-out
          ${focused ? "w-full md:w-96" : "w-0 px-[1.35rem] md:px-10 md:w-64"}`}
      />

      <div
        className="absolute left-3.5 md:left-4 top-1/2 -translate-y-1/2 text-gray-400 z-0"
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          inputRef.current?.focus();
        }}
      >
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
      </div>

      {focused && results.length > 0 && (
        <ul className="absolute z-50 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-auto">
          {results.map((post) => (
            <li
              key={post._id}
              className="px-4 py-2 hover:bg-gray-100 transition"
            >
              <Link
                href={`${Routes.POSTS}/${post._id}/${post.slug}`}
                className="block text-sm font-medium text-gray-700 line-clamp-1"
                onClick={() => {
                  setFocused(false);
                  setQuery("");
                }}
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      )}

      {focused && !loading && results.length === 0 && query.trim() !== "" && (
        <div className="absolute z-50 mt-2 w-full bg-white border border-gray-300 rounded-lg shadow-lg px-4 py-2 text-sm text-black">
          No results found
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;

