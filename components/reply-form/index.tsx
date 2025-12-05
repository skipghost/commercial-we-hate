"use client";

import { useEffect, useRef, useState } from "react";

import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import { createComment } from "@/lib/actions/comment.actions";
import { cn, isActionError, showToast } from "@/lib/utils";

import CustomFormField from "@/components/form-field";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

import { commentSchema } from "@/constants/schemas";

import { usePost } from "@/context/SinglePostContext";

interface ReplyFormProps {
  onCancel: () => void;
  parentId: string;
}

const ReplyForm = ({ onCancel, parentId }: ReplyFormProps) => {
  const { post, addNewComment } = usePost();
  const [loading, setLoading] = useState<boolean>(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const form = useForm({
    resolver: yupResolver(commentSchema),
    defaultValues: {
      content: "",
    },
  });

  const {
    reset,
    formState: { errors },
  } = form;

  const onSubmit = async (data: yup.InferType<typeof commentSchema>) => {
    setLoading(true);
    try {
      let result;

      result = await createComment({
        content: data.content,
        postId: post._id,
        parentId,
      });

      if (!result || isActionError(result)) {
        showToast("Failed to comment", { variant: "destructive" });
        return;
      }

      addNewComment(result);

      reset();

      onCancel();

      // Reset the form
      reset();
    } catch (error) {
      showToast("Failed to comment", { variant: "destructive" });
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
        onSubmit={form.handleSubmit(onSubmit)}
        className="relative"
      >
        <CustomFormField name="content">
          <div className={cn("relative input", errors.content && "!border-primary")}>
            <Textarea
              ref={textareaRef}
              rows={1}
              className="mb-2 min-h-[40px] !ring-0 !ring-transparent !border-transparent !outline-transparent !border-none !outline-0 !shadow-none"
            />
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
                Reply
              </Button>
            </div>
          </div>
        </CustomFormField>
      </form>
    </Form>
  );
};

export default ReplyForm;

