"use server";

import { renderAsync } from "@react-email/render";
import { NextResponse } from "next/server";
import { Resend } from "resend";

import { getPostById } from "@/lib/actions/post.actions";
import { isActionError } from "@/lib/utils";

import CommentNotificationTemplate from "@/components/email-templates/CommentNotificationTemplate";

import { INFO } from "@/constants";
import { Routes } from "@/constants/routes";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const body = JSON.parse(JSON.stringify(payload));
    const { postId, commenterUsername, commentText } = body;

    const result = await getPostById(postId);

    if (!result || isActionError(result)) {
      return NextResponse.json({ error: "Can not get the post." }, { status: 400 });
    }

    const { title: postTitle, slug, user, _id } = result;

    const postUrl = `${Routes.USER}/${user?.username}${Routes.POSTS}/${_id}/${slug}`;

    const html = await renderAsync(
      CommentNotificationTemplate({
        postTitle,
        postUrl,
        commenterUsername,
        commentText,
      }) as React.ReactElement
    );

    const data = await resend.emails.send({
      from: `${INFO.BUSINESS_NAME} <no-reply@mail.commercialswehate.com>`,
      to: [user?.email!],
      subject: `New comment on your post: ${postTitle}`,
      html,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error sending notification email:", error);
    return NextResponse.json({ error: error || "Failed to send email" }, { status: 500 });
  }
}

