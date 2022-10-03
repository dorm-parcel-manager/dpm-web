import { Authenticator } from "remix-auth";
import type { UserInfo } from "~/proto/user-service";
import { sessionStorage } from "~/services/session.server";
import { userServiceClient } from "~/client";
import { GoogleStrategy } from "~/auth/google";
import { BASE_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "~/env";

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
      oauthId: profile.id,
    });
    const { id, firstName, lastName, type } = result.response;
    return { id, firstName, lastName, type };
  }
);

authenticator.use(googleStrategy);
