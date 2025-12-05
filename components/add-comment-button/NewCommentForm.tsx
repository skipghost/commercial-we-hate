"use client";

import { useEffect, useRef, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { createComment, updateCommentById } from "@/lib/actions/comment.actions";
import { cn, isActionError, showToast } from "@/lib/utils";

import CustomFormField from "@/components/form-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { commentSchema } from "@/constants/schemas";

import { usePost } from "@/context/SinglePostContext";
import { CommentDTOPopulatedUser } from "@/types/comment.types";

interface NewCommentFormProps {
  onCancel: () => void;
  comment?: CommentDTOPopulatedUser;
}

const NewCommentForm = ({ onCancel, comment }: NewCommentFormProps) => {
  const { post, addNewComment, onUpdateCommentComplete } = usePost();
  const [loading, setLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const form = useForm({
    resolver: yupResolver(commentSchema),
    defaultValues: {
      content: comment?.content || "",
    },
  });

  const {
    reset,
    setValue,
    formState: { errors },
    watch,
  } = form;

  const handleSubmit = async (data: yup.InferType<typeof commentSchema>) => {
    setLoading(true);
    try {
      let result;
      if (comment) {
        result = await updateCommentById({
          commentId: comment._id,
          content: data.content,
          postId: post._id,
        });

        if (!result || isActionError(result)) {
          showToast("Failed to update comment", { variant: "destructive" });
          return;
        }

        onUpdateCommentComplete(result);
      } else {
        result = await createComment({
          content: data.content,
          postId: post._id,
        });

        if (!result || isActionError(result)) {
          showToast("Failed to comment", { variant: "destructive" });
          return;
        }

        addNewComment(result);
      }

      reset();
      onCancel();
    } catch (error) {
      console.log(error);

      const errorMessage =
        typeof (error as any)?.message === "string" ? (error as any).message : "Something went wrong.";

      showToast(errorMessage, {
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    textareaRef.current?.focus();
  }, []);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="relative"
      >
        <div className={cn("relative input", errors.content && "!border-primary")}>
          <CustomFormField
            name="content"
            ref={textareaRef}
          >
            <Textarea
              rows={6}
              className="mb-2 !ring-0 !ring-transparent !border-transparent !outline-transparent !border-none !outline-0 !shadow-none"
            />
          </CustomFormField>
          <div className="flex gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={loading}
              size="sm"
            >
              {comment ? "Update" : "Comment"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default NewCommentForm;

