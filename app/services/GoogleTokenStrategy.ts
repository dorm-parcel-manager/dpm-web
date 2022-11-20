import type { OAuth2Client } from "google-auth-library";
import { FormStrategy } from "remix-auth-form";
import { userServiceClient } from "~/client";
import type { UserInfo } from "~/proto/user-service";

export class GoogleTokenStrategy extends FormStrategy<UserInfo> {
  constructor(client: OAuth2Client, clientId: string) {
    super(async ({ form }) => {
      const credential = form.get("credential") as string;
      const ticket = await client.verifyIdToken({
        idToken: credential,
        audience: clientId,
      });
      const payload = ticket.getPayload()!;
      const { response } = await userServiceClient.getUserForAuth({
        oauthId: payload.sub,
        firstName: payload.given_name!,
        lastName: payload.family_name!,
        picture: payload.picture ?? "",
        email: payload.email!,
      });
      const { id, firstName, lastName, picture, type } = response;
      return { id, firstName, lastName, picture, type };
    });
  }
}
