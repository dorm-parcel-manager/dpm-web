import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { getUser } from "~/auth/utils";
import { notificationServiceClient } from "~/client";

export const action: ActionFunction = async ({ request }) => {
  const user = await getUser(request);
  const formData = await request.formData();
  const subscription = formData.get("subscription") as string;
  const redirectTo = formData.get("redirectTo") as string;
  await notificationServiceClient.notificationSubscribe(user.id, subscription);
  return redirect(redirectTo);
};
