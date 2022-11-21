import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { getUser } from "~/auth/utils";

export const action: ActionFunction = async ({ request }) => {
    const user = await getUser(request);
    const formData = await request.formData();
    const subscription = formData.get("subscription") as string;
    const redirectTo = formData.get("redirectTo") as string;
    await fetch(process.env.CLIENT_NOTIFICATIONSERVICEURL! + "/notificationSubscribe", {
      method: "POST",
      headers: {
        "User-Id": user.id.toString(),
      },
      body: subscription
    });
    return redirect(redirectTo);
  };

  