import * as yup from "yup";

import { PostCategoryEnum } from "@/types/enums";

export const attachmentSchema = yup.object().shape({
  url: yup.string().required(""),
  filename: yup.string().required(""),
  size: yup.string().required(""),
});

export const contactSchema = yup.object().shape({
  name: yup.string().trim().required("Name is required"),
  email: yup.string().trim().email("Invalid email").required("Email is required"),
  message: yup.string().trim().required("Message is required"),
});

export const postSchema = yup.object().shape({
  title: yup.string().trim().required("Title is required.").max(200, "Title cannot exceed 200 characters"),
  url: yup.string().trim().url("Link must be a valid URL"),
  videoUrl: yup
    .string()
    .trim()
    .url("Video URL is not valid")
    .matches(/^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be|vimeo\.com)/, "Only YouTube or Vimeo videos are allowed"),
  content: yup.string(),
  isAdminCreated: yup.bool().default(false),
  category: yup
    .mixed<PostCategoryEnum>()
    .oneOf(Object.values(PostCategoryEnum), "Invalid category")
    .required("Category is required.")
    .nonNullable(),
});

export const bulletinPostSchema = yup.object().shape({
  title: yup.string().trim().required("Title is required.").max(200, "Title cannot exceed 200 characters"),
  content: yup.string(),
  isPinned: yup.bool().default(false),
});

export const commentSchema = yup.object().shape({
  content: yup.string().required("Content is required."),
});

