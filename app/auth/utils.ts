import { userServiceClient } from "~/client";
import type { Context } from "~/proto/common";
import { authenticator } from "~/services/auth.server";

export async function getUser(request: Request) {
  const { id } = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  const user = await userServiceClient.getUserInfo({ id }).response;
  return user;
}

export async function getGrpcContext(request: Request): Promise<Context> {
  const user = await getUser(request);
  return {
    userId: user.id,
    userType: user.type,
  };
}
