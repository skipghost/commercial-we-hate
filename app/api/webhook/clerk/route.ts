import { DeletedObjectJSON, UserJSON, clerkClient } from "@clerk/nextjs/server";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest, NextResponse } from "next/server";

import { createUser, deleteUserByClerkId, updateUserByClerkId } from "@/lib/actions/user.actions";

import { UserRoleEnum } from "@/types/enums";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);
    const eventType = evt.type;

    console.log(`Webhook event received: ${eventType}`, evt.data);

    switch (eventType) {
      case "user.created":
        return await handleUserCreated(evt.data);

      case "user.updated":
        return await handleUserUpdated(evt.data);

      case "user.deleted":
        return await handleUserDeleted(evt.data);

      default:
        console.warn(`Unhandled event type: ${eventType}`);
        return NextResponse.json({ message: "Unhandled event type" }, { status: 200 });
    }
  } catch (error) {
    console.error("Webhook processing error:", error);
    return NextResponse.json({ error: "Invalid webhook or internal error" }, { status: 400 });
  }
}

async function handleUserCreated(data: UserJSON) {
  try {
    const { id, email_addresses, image_url, first_name, last_name, username } = data;

    if (!id || !email_addresses?.length) {
      throw new Error("Missing required user data on creation");
    }

    const role = UserRoleEnum.USER;

    const user = {
      clerkId: id,
      email: email_addresses[0].email_address,
      firstName: first_name ?? "",
      lastName: last_name ?? "",
      photo: image_url ?? "",
      username: username ?? "",
      role,
    };

    const newUser = await createUser(user);

    if (newUser) {
      const client = await clerkClient();

      await client.users.updateUserMetadata(id, {
        publicMetadata: {
          userId: newUser._id,
          role: role,
        },
      });
    }

    return NextResponse.json({ message: "User created", user: newUser }, { status: 200 });
  } catch (error) {
    console.error("Error handling user.created event:", error);
    return NextResponse.json({ error: "Failed to handle user.created event" }, { status: 500 });
  }
}

async function handleUserUpdated(data: UserJSON) {
  try {
    const { id, image_url, first_name, last_name, username } = data;

    if (!id) {
      throw new Error("Missing user id for update");
    }

    const userUpdateData = {
      firstName: first_name ?? "",
      lastName: last_name ?? "",
      username: username ?? "",
      photo: image_url ?? "",
    };

    const updatedUser = await updateUserByClerkId(id, userUpdateData);

    return NextResponse.json({ message: "User updated", user: updatedUser }, { status: 200 });
  } catch (error) {
    console.error("Error handling user.updated event:", error);
    return NextResponse.json({ error: "Failed to handle user.updated event" }, { status: 500 });
  }
}

async function handleUserDeleted(data: DeletedObjectJSON) {
  try {
    const { id } = data;

    if (!id) {
      throw new Error("Missing user id for deletion");
    }

    const deletedUser = await deleteUserByClerkId(id);

    return NextResponse.json({ message: "User deleted", user: deletedUser }, { status: 200 });
  } catch (error) {
    console.error("Error handling user.deleted event:", error);
    return NextResponse.json({ error: "Failed to handle user.deleted event" }, { status: 500 });
  }
}

