import { redirect } from "@remix-run/node";
import { getUser } from "~/auth/utils";

import type { ActionFunction } from "@remix-run/node";

export const action: ActionFunction = async ({ request }) => {
    const user = await getUser(request);
    const notificationServiceURL = process.env.CLIENT_NOTIFICATIONSERVICEURL!;
    const formData = await request.formData();
    const subscription = formData.get("subscription") as string;
    await fetch(notificationServiceURL + "/testNotification", {
      method: "POST",
      headers: {
        "User-Id": user.id.toString(),
      },
      body: subscription
    });
    return redirect("/notifications");
  };
