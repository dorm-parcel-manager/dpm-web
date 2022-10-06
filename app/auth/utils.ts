import { userServiceClient } from "~/client";
import { BASE_URL } from "~/env";
import type { Context } from "~/proto/common";
import { authenticator } from "~/services/auth.server";

export async function getUser(request: Request) {
  const { id } = await authenticator.isAuthenticated(request, {
    failureRedirect: getLoginUrl(request),
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

export function getLoginUrl(request: Request) {
  const { url } = request;
  if (!url.startsWith(BASE_URL)) return "/login";

  const path = url.slice(BASE_URL.length);
  return "/login?r=" + encodeURIComponent(path);
}
