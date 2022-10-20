import type { ActionFunction } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export const action: ActionFunction = async ({ request }) => {
  const form = await request.clone().formData();
  const redirectInput = (form.get("redirect") as string | null) ?? "";
  const redirect = redirectInput.startsWith("/") ? redirectInput : "/";

  return authenticator.authenticate("google-token", request, {
    successRedirect: redirect,
    failureRedirect: "/login",
  });
};
