import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import type { UserInfo } from "~/proto/user-service";
import { sessionStorage } from "~/services/session.server";
import { userServiceClient } from "~/client";
import { BASE_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "~/env";
import { OAuth2Client } from "google-auth-library";
import { GoogleStrategy } from "remix-auth-google";

// Create an instance of the authenticator, pass a generic with what
// strategies will return and will store in the session
export let authenticator = new Authenticator<UserInfo>(sessionStorage);

let googleStrategy = new GoogleStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: `${BASE_URL}/auth/google/callback`,
  },
  async ({ profile }) => {
    const result = await userServiceClient.getUserForAuth({
      email: profile.emails[0].value,
      firstName: profile.name.givenName,
      lastName: profile.name.familyName,
      picture: profile.photos[0]?.value,
      oauthId: profile.id,
    });
    const { id, firstName, lastName, picture, type } = result.response;
    return { id, firstName, lastName, picture, type };
  }
);

authenticator.use(googleStrategy);

const client = new OAuth2Client(GOOGLE_CLIENT_ID);
authenticator.use(
  new FormStrategy(async ({ form }) => {
    const credential = form.get("credential") as string;
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: GOOGLE_CLIENT_ID,
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
  }),
  "google-token"
);
