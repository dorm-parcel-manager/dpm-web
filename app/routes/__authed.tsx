import { Box, Container, Stack, styled, Theme } from "@mui/joy";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getUser } from "~/auth/utils";
import type { UserInfo } from "~/proto/user-service";

import logo from "~/assets/images/logo.svg";
import { UserMenu } from "~/components/UserMenu";
import { MobileMenu } from "~/components/MobileMenu";
import useMediaQuery from "@mui/material/useMediaQuery";

type LoaderData = UserInfo;

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  return json<LoaderData>(user);
};

const AppBar = styled("header")(({ theme }) => ({
  display: "flex",
  position: "fixed",
  width: "100%",
  flexDirection: "row",
  alignItems: "center",
  background: "var(--appbar-background)",
  padding: "8px 16px",
  backdropFilter: "blur(20px)",
  borderStyle: "solid",
  borderColor: theme.vars.palette.divider,
  borderWidth: "0 0 thin",
  zIndex: 1000,
}));

const Toolbar = styled("div")({
  flex: 1,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  height: 48,
});

export default function AuthedLayout() {
  const user = useLoaderData<LoaderData>();
  const isDesktop = useMediaQuery<Theme>((theme) => theme.breakpoints.up("sm"));

  return (
    <div>
      <AppBar>
        <Toolbar>
          <Box component="img" src={logo} sx={{ width: 36, height: 36 }} />
          <Box sx={{ flexGrow: 1 }} />
          {isDesktop ? <UserMenu user={user} /> : <MobileMenu user={user} />}
        </Toolbar>
      </AppBar>
      <Container sx={{ paddingTop: 10 }}>
        <Outlet />
      </Container>
    </div>
  );
}
