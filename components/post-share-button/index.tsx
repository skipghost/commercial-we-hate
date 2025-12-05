"use client";

import { useState } from "react";

import { faBluesky, faFacebook, faThreads, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Check, Share } from "lucide-react";
import { FacebookShareButton, TwitterShareButton, WhatsappShareButton } from "react-share";

import { showToast } from "@/lib/utils";

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { INFO } from "@/constants";

import { PostDTOPopulatedUser } from "@/types/post.types";

import MenuItem from "../menu-item";
import { Button } from "../ui/button";

interface PostShareButtonProps {
  username: string;
  post: PostDTOPopulatedUser;
}

const PostShareButton = ({ post, username }: PostShareButtonProps) => {
  const [openPopover, setOpenPopover] = useState<boolean>(false);

  const handleClose = () => setOpenPopover(false);

  const postUrl = `${INFO.WEBSITE_URL}/user/${username}/posts/${post._id}/${post.slug}`;

  const shareItems = [
    {
      text: "Copy Link",
      icon: (
        <FontAwesomeIcon
          icon={faCopy}
          className=""
        />
      ),
      function: async () => {
        navigator.clipboard
          .writeText(postUrl)
          .then(() => {
            showToast(
              <div className="flex gap-3 items-center">
                <Check className="bg-green-400 text-white rounded-full w-5 h-5 flex-shrink-0" />
                <p className="text-base">Link Copied</p>
              </div>
            );
          })
          .catch((error) => {
            console.error("Unable to copy text to clipboard:", error);
          });
      },
    },

    {
      text: "Facebook",
      icon: (
        <FontAwesomeIcon
          icon={faFacebook}
          className=""
        />
      ),
      wrapper: FacebookShareButton,
    },

    {
      text: "Twitter",
      icon: (
        <FontAwesomeIcon
          icon={faTwitter}
          className=""
        />
      ),
      wrapper: TwitterShareButton,
    },

    {
      text: "WhatsApp",
      icon: (
        <FontAwesomeIcon
          icon={faWhatsapp}
          className=""
        />
      ),
      wrapper: WhatsappShareButton,
    },
    {
      text: "Threads",
      icon: (
        <FontAwesomeIcon
          icon={faThreads}
          className=""
        />
      ),
      function: () => {
        window.open(`https://www.threads.net/share?url=${encodeURIComponent(postUrl)}`, "_blank");
      },
    },
    {
      text: "Blue Sky",
      icon: (
        <FontAwesomeIcon
          icon={faBluesky}
          className=""
        />
      ),
      function: () => {
        window.open(`https://bsky.app/share?text=${encodeURIComponent(postUrl)}`, "_blank");
      },
    },
  ];
  return (
    <Popover
      open={openPopover}
      onOpenChange={setOpenPopover}
    >
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="font-semibold border h-9 border-black/5"
        >
          <Share className="w-5 h-4 stroke-[1.5px] stroke-current" />
          <span className="max-sm:hidden">Share</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 max-w-[200px] overflow-hidden bg-foreground dark:bg-ghost border border-foreground dark:border-ghost">
        <div className="flex flex-col">
          {shareItems.map((item) => {
            const Wrapper = item.wrapper || "div";
            return (
              <Wrapper
                key={item.text}
                title={post?.title}
                url={postUrl}
                className="w-full"
              >
                <MenuItem
                  className="w-full cursor-pointer hover:bg-gray-800 text-background dark:text-foreground"
                  component="div"
                  onClick={() => {
                    item.function && item.function();
                    handleClose();
                  }}
                >
                  {item.icon}
                  <p>{item.text}</p>
                </MenuItem>
              </Wrapper>
            );
          })}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PostShareButton;

