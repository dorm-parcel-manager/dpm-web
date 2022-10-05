import { authenticator } from "~/services/auth.server";

export async function getUser(request: Request) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  return user;
}
