import { CssVarsProvider, getInitColorSchemeScript } from "@mui/joy";
import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { useInitGoogleSignIn } from "~/auth/googleSignIn";
import { GOOGLE_CLIENT_ID } from "./env";

import globalStyles from "~/styles/shared.css";
import { CssBaseline } from "@mui/material";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Dorm Parcel Manager",
  viewport: "width=device-width,initial-scale=1",
});

interface LoaderData {
  clientId: string;
}

export const loader: LoaderFunction = async () => {
  return json<LoaderData>({
    clientId: GOOGLE_CLIENT_ID,
  });
};

export default function App() {
  const { clientId } = useLoaderData<LoaderData>();

  useInitGoogleSignIn(clientId);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        {getInitColorSchemeScript({ defaultMode: "system" })}
        <CssVarsProvider defaultMode="system">
          <CssBaseline />
          <Outlet />
        </CssVarsProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <script src="https://accounts.google.com/gsi/client" async defer />
      </body>
    </html>
  );
}

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: globalStyles }];
};
