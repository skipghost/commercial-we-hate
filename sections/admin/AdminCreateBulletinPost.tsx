"use client";

import { useState } from "react";

import { useUser } from "@clerk/nextjs";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { createPost, updatePostById } from "@/lib/actions/post.actions";
import { isActionError, showToast } from "@/lib/utils";

import CustomFormField from "@/components/form-field";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Routes } from "@/constants/routes";
import { bulletinPostSchema } from "@/constants/schemas";

import { useMode } from "@/context/ModeContext";
import { UserRoleEnum } from "@/types/enums";
import { PostDTOPopulatedUser } from "@/types/post.types";

interface AdminCreateBulletinPostProps {
  post?: PostDTOPopulatedUser;
}

const AdminCreateBulletinPost = ({ post }: AdminCreateBulletinPostProps) => {
  const form = useForm({
    resolver: yupResolver(bulletinPostSchema),
    defaultValues: {
      title: post?.title ?? "",
      content: post?.content ?? "",
      isPinned: post?.isPinned,
    },
  });

  const { mode } = useMode();

  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async (data: yup.InferType<typeof bulletinPostSchema>) => {
    setLoading(true);
    try {
      const userId = user?.publicMetadata?.userId as string;
      const userRole = user?.publicMetadata?.role as UserRoleEnum;

      const username = user?.username as string;

      if (!userId || !username) {
        showToast("User information is missing.", { variant: "destructive" });
        return;
      }

      if (!!post?.isAdminCreated && userRole !== UserRoleEnum.ADMIN && userRole !== UserRoleEnum.PRIMARY_ADMIN) {
        showToast("You're not allowed to add this post", { variant: "destructive" });
        return;
      }

      let result;

      if (!post) {
        result = await createPost({ ...data, userId, type: mode, isBulletin: true });
      } else {
        result = await updatePostById(post._id, { ...data, userId, isBulletin: true });
      }

      if (isActionError(result) || !result) {
        showToast(result?.error || "Failed to save the post.", {
          variant: "destructive",
        });
        return;
      }

      router.push(`${Routes.POSTS}/${Routes.BULLETIN_BOARD}`);
      showToast(post ? "Post updated successfully!" : "Post published successfully!", {
        variant: "success",
      });
    } catch (error: any) {
      showToast(error.message || "Failed to save the post.", {
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl font-semibold mb-6">{!post ? "Create Bulletin Board Post" : post.title}</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4"
        >
          {!post && (
            <CustomFormField
              name="title"
              label="Title"
              required
              maxLength={200}
            >
              <Input placeholder="Title" />
            </CustomFormField>
          )}

          <CustomFormField
            name="content"
            label="Content"
          >
            <Textarea
              rows={6}
              placeholder="Tell us what you think..."
            />
          </CustomFormField>

          {(UserRoleEnum.ADMIN === user?.publicMetadata?.role ||
            user?.publicMetadata?.role === UserRoleEnum.PRIMARY_ADMIN) && (
            <CustomFormField
              name="isAdminCreated"
              label="Is Pinned?"
            >
              <Checkbox
                onCheckedChange={(checked) => form.setValue("isPinned", checked === true)}
                checked={form.watch("isPinned") || false}
              />
            </CustomFormField>
          )}

          <div className="flex gap-4 justify-end">
            <Button
              type="submit"
              loading={loading}
            >
              {post ? "Update Post" : "Create Post"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AdminCreateBulletinPost;

