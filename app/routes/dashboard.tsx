import { Button, Typography } from "@mui/joy";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import type { UserInfo } from "~/proto/user-service";
import { authenticator } from "~/services/auth.server";

type LoaderData = UserInfo;

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  return json<LoaderData>(user);
};

export default function Index() {
  const data = useLoaderData<LoaderData>();

  return (
    <div>
      <Typography level="h4" component="h1">
        Hello {data.firstName} {data.lastName}!
      </Typography>
      <Button component={Link} to="/logout">
        Logout
      </Button>
    </div>
  );
}
