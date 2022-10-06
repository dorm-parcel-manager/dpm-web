import type { Context } from "~/proto/common";
import { authenticator } from "~/services/auth.server";

export async function getUser(request: Request) {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  return user;
}

export async function getGrpcContext(request: Request): Promise<Context> {
  const user = await getUser(request);
  return {
    userId: user.id,
    userType: user.type,
  };
}
