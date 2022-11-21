import type { Theme } from "@mui/joy";
import { Stack, Divider, Box, Container, styled } from "@mui/joy";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { getUser } from "~/auth/utils";
import type { UserInfo } from "~/proto/user-service";

import logo from "~/assets/images/logo.svg";
import { UserMenu } from "~/components/UserMenu";
import { MobileMenu } from "~/components/MobileMenu";
import { Sidebar } from "~/components/Sidebar";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useEffect } from "react";

type LoaderData = {
  user: UserInfo
  vapidPublicKey: string
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  const vapidResponse = await fetch(process.env.CLIENT_NOTIFICATIONSERVICEURL! + "/vapidPublicKey");
  const vapidPublicKey = await vapidResponse.text();
  return json<LoaderData>({user, vapidPublicKey});
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
  const { user, vapidPublicKey } = useLoaderData<LoaderData>();

  useEffect(() => {
    async function notificationSubscribe() {
      if (!("serviceWorker" in navigator)) {
        return;
      }
      const result = await Notification.requestPermission()
      if (result !== "granted") {
        return;
      }
      const serviceWorkerRegistration = await navigator.serviceWorker.ready
      const option = {
        userVisibleOnly: true,
        applicationServerKey: vapidPublicKey,
      }
      await serviceWorkerRegistration.pushManager.subscribe(option)
    }
    notificationSubscribe();
  }, [vapidPublicKey, user])

  const isDesktop = useMediaQuery<Theme>((theme) => theme.breakpoints.up("sm"));

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AppBar>
        <Toolbar>
          <Link to="/">
            <Box component="img" src={logo} sx={{ width: 36, height: 36 }} />
          </Link>
          <Box sx={{ flexGrow: 1 }} />
          {!isDesktop && <MobileMenu user={user} />}
          <UserMenu user={user} />
        </Toolbar>
      </AppBar>
      <Stack direction="row" sx={{ paddingTop: 8, flex: 1 }}>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            minWidth: { xs: 0, md: 200 },
            flexDirection: "column",
            padding: 2,
            paddingRight: 0,
          }}
        >
          <Sidebar user={user} fixed />
        </Box>
        <Divider
          orientation="vertical"
          sx={{ display: { xs: "none", sm: "flex" }, marginX: 2 }}
        />
        <Container>
          <Box sx={{ flexGrow: 1, marginTop: 2 }}>
            <Outlet />
          </Box>
        </Container>
      </Stack>
    </Box>
  );
}
