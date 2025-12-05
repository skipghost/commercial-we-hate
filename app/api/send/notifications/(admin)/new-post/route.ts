"use server";

import { renderAsync } from "@react-email/render";
import { NextResponse } from "next/server";
import { Resend } from "resend";

import { getPostById } from "@/lib/actions/post.actions";
import { isActionError } from "@/lib/utils";

import AdminNewPostNotificationTemplate from "@/components/email-templates/AdminNewPostNotificationTemplate";

import { INFO } from "@/constants";
import { Routes } from "@/constants/routes";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const body = JSON.parse(JSON.stringify(payload));
    const { postId } = body;

    const result = await getPostById(postId);

    if (!result || isActionError(result)) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const { title: postTitle, slug, user, _id, category, content, videoUrl } = result;

    const postUrl = `${Routes.USER}/${user?.username}${Routes.POSTS}/${_id}/${slug}`;

    const html = await renderAsync(
      AdminNewPostNotificationTemplate({
        postTitle,
        postUrl,
        postAuthorUsername: user?.username!,
        category,
        content,
        videoUrl,
      }) as React.ReactElement
    );

    const data = await resend.emails.send({
      from: `${INFO.BUSINESS_NAME} <no-reply@mail.tsmdesignstudio.com>`,
      to: [...INFO.ADMIN_EMAILS],
      subject: `New post just submitted to ${INFO.BUSINESS_NAME}`,
      html,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error sending notification email:", error);
    return NextResponse.json({ error: error || "Failed to send email" }, { status: 500 });
  }
}

