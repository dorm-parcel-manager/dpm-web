import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { getUser } from "~/auth/utils";
import { notificationServiceClient } from "~/client";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  const notifications = await notificationServiceClient.getNotifications(
    user.id
  );
  const unreadNotificationIds = notifications
    .filter((n) => !n.read)
    .map((n) => n._id);
  return json(unreadNotificationIds);
};
