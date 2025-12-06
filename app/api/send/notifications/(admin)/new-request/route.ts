"use server";

import { renderAsync } from "@react-email/render";
import { NextResponse } from "next/server";
import { Resend } from "resend";

import AdminNewRequestNotificationTemplate from "@/components/email-templates/AdminNewRequestNotificationTemplate";

import { INFO } from "@/constants";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const body = JSON.parse(JSON.stringify(payload));
    const { name, email, message } = body;

    const html = await renderAsync(
      AdminNewRequestNotificationTemplate({
        name,
        email,
        message,
      }) as React.ReactElement
    );

    const data = await resend.emails.send({
      from: `${INFO.BUSINESS_NAME} <no-reply@mail.commercialswehate.com>`,
      to: [...INFO.ADMIN_EMAILS],
      subject: `New Request from ${INFO.BUSINESS_NAME}`,
      html,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Error sending notification email:", error);
    return NextResponse.json({ error: error || "Failed to send email" }, { status: 500 });
  }
}

