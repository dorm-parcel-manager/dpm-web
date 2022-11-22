import type { Theme } from "@mui/joy";
import { Stack, Divider, Box, Container, styled } from "@mui/joy";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData, useSubmit } from "@remix-run/react";
import { getUser } from "~/auth/utils";
import type { UserInfo } from "~/proto/user-service";

import logo from "~/assets/images/logo.svg";
import { UserMenu } from "~/components/UserMenu";
import { MobileMenu } from "~/components/MobileMenu";
import { Sidebar } from "~/components/Sidebar";
import useMediaQuery from "@mui/material/useMediaQuery";

import type { ToastData } from "~/types";
import { commitSession, getSession } from "~/services/session.server";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { notificationServiceClient } from "~/client";

type LoaderData = {
  user: UserInfo;
  vapidPublicKey: string;
  toastData: ToastData | null;
  unreadNotifications: string[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  const vapidPublicKey = await notificationServiceClient.vapidPublicKey();
  const notifications = await notificationServiceClient.getNotifications(
    user.id
  );
  const unreadNotifications = notifications
    .filter((n) => !n.read)
    .map((n) => n._id);
  const session = await getSession(request.headers.get("Cookie"));
  const toastData = JSON.parse(session.get("toastData") || "null") as ToastData;
  return json<LoaderData>(
    { user, toastData, vapidPublicKey, unreadNotifications },
    {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    }
  );
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
  const { user, vapidPublicKey, toastData, unreadNotifications } =
    useLoaderData<LoaderData>();
  const submit = useSubmit();

  useEffect(() => {
    async function notificationSubscribe() {
      if (!("serviceWorker" in navigator)) {
        return;
      }
      navigator.serviceWorker.register("/sw.js");
      const result = await Notification.requestPermission();
      if (result !== "granted") {
        return;
      }
      const serviceWorkerRegistration = await navigator.serviceWorker.ready;
      const option = {
        userVisibleOnly: true,
        applicationServerKey: vapidPublicKey,
      };
      const pushSubscription =
        await serviceWorkerRegistration.pushManager.subscribe(option);
      const savedSubscription = window.sessionStorage.getItem("subscription");
      if (savedSubscription === JSON.stringify(pushSubscription)) {
        return;
      }
      window.sessionStorage.setItem(
        "subscription",
        JSON.stringify(pushSubscription)
      );
      submit(
        {
          subscription: JSON.stringify(pushSubscription),
          redirectTo: window.location.pathname,
        },
        {
          method: "post",
          action: `/notifications/subscribe`,
        }
      );
    }
    notificationSubscribe();
  }, [vapidPublicKey, user, submit]);

  const isDesktop = useMediaQuery<Theme>((theme) => theme.breakpoints.up("sm"));

  useEffect(() => {
    if (!toastData) return;
    switch (toastData.type) {
      case "success":
        toast.success(toastData.message);
        break;
      case "error":
        toast.error(toastData.message);
        break;
    }
  }, [toastData]);

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
          <Sidebar
            user={user}
            unreadNotifications={unreadNotifications}
            fixed
          />
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
