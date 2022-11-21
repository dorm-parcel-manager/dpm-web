import { Authenticator } from "remix-auth";
import { FormStrategy } from "remix-auth-form";
import type { UserInfo } from "~/proto/user-service";
import { sessionStorage } from "~/services/session.server";
import { userServiceClient } from "~/client";
import { BASE_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "~/env";
import { OAuth2Client } from "google-auth-library";
import { GoogleStrategy } from "remix-auth-google";
import { GoogleTokenStrategy } from "./GoogleTokenStrategy";

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
  new GoogleTokenStrategy(client, GOOGLE_CLIENT_ID),
  "google-token"
);

authenticator.use(
  new FormStrategy(async ({ form }) => {
    const userId = Number(form.get("userId"));
    const { response } = await userServiceClient.getUserInfo({ id: userId });
    const { id, firstName, lastName, picture, type } = response;
    return { id, firstName, lastName, picture, type };
  }),
  "mock-auth"
);
