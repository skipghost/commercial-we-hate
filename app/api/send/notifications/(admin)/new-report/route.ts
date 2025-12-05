"use server";

import { renderAsync } from "@react-email/render";
import { NextResponse } from "next/server";
import { Resend } from "resend";

import { getPostById } from "@/lib/actions/post.actions";
import { getUserByUserId } from "@/lib/actions/user.actions";
import { isActionError } from "@/lib/utils";

import AdminNewReportNotificationTemplate from "@/components/email-templates/AdminNewReportNotificationTemplate";

import { INFO } from "@/constants";
import { Routes } from "@/constants/routes";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const body = JSON.parse(JSON.stringify(payload));
    const { postId, reporterId, reason } = body;

    const result = await getPostById(postId);
    const result2 = await getUserByUserId(reporterId);

    if (!result || isActionError(result)) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (!result2 || isActionError(result2)) {
      return NextResponse.json({ error: "Reporter not found" }, { status: 404 });
    }

    const { title: postTitle, _id } = result;

    const html = await renderAsync(
      AdminNewReportNotificationTemplate({
        postTitle,
        reportUrl: `${Routes.ADMIN_POSTS}/${_id}/reports`,
        reason,
        reporter: result2.username,
      }) as React.ReactElement
    );

    const data = await resend.emails.send({
      from: `${INFO.BUSINESS_NAME} <no-reply@mail.tsmdesignstudio.com>`,
      to: [...INFO.ADMIN_EMAILS],
      subject: `New report on the post: ${postTitle}`,
      html,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error sending notification email:", error);
    return NextResponse.json({ error: error || "Failed to send email" }, { status: 500 });
  }
}

