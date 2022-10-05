import type { ActionFunction } from "@remix-run/node";
import { authenticator } from "~/services/auth.server";

export const action: ActionFunction = async ({ request }) => {
  return authenticator.authenticate("google-token", request, {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  });
};
