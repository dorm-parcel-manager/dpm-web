import { Button, Divider, List, ListItem, ListItemButton, Typography } from "@mui/joy";
import { redirect } from "@remix-run/node";
import { useLoaderData, useSubmit } from "@remix-run/react";

import { formatRelative } from '~/utils'
import { getUser } from "~/auth/utils";

import type { ActionFunction, LoaderFunction } from "@remix-run/node";

interface Notification {
  _id: string;
  title: string;
  message: string;
  link: string;
  userId: string;
  read: boolean;
  unixTime: number;
}

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  const notificationServiceURL = process.env.CLIENT_NOTIFICATIONSERVICEURL!;
  const response = await fetch(notificationServiceURL + "/notification", {
    headers: {
      "User-Id": user.id.toString(),
    },
  });
  const notifications: Notification[] = await response.json();
  const vapidResponse = await fetch(notificationServiceURL + "/vapidPublicKey");
  const vapidPublicKey = await vapidResponse.text();
  return {
    notifications: notifications.sort((a, b) => b.unixTime - a.unixTime),
    vapidPublicKey,
  }
};

export const action: ActionFunction = async ({ request }) => {
  const user = await getUser(request);
  const notificationServiceURL = process.env.CLIENT_NOTIFICATIONSERVICEURL!;
  const formData = await request.formData();
  const id = formData.get("id") as string;
  const link = formData.get("link") as string;
  await fetch(notificationServiceURL + "/notification/" + id, {
    method: "PATCH",
    headers: {
      "User-Id": user.id.toString(),
    },
    body: JSON.stringify({
      read: true,
    }),
  });
  return redirect(link);
};

export default function Notifications() {
  const { notifications, vapidPublicKey } = useLoaderData();
  const submit = useSubmit();

  const handleClick = (notification: Notification) => {
    const data = new FormData();
    data.append("id", notification._id);
    data.append("link", notification.link);
    submit(data, {
      method: "post",
      action: `/notifications`,
    });
  };

  const testNotification = async() => {
    const serviceWorkerRegistration = await navigator.serviceWorker.ready
    const option = {
      userVisibleOnly: true,
      applicationServerKey: vapidPublicKey,
    }
    const pushSubscription = await serviceWorkerRegistration.pushManager.subscribe(option)
    submit({subscription: JSON.stringify(pushSubscription)}, {
      method: "post",
      action: "/notifications/test",
    })
  }

  return (
    <div>
      <Typography level="h4">Notifications</Typography>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: "0.5rem",
          padding: "1rem 0",
        }}
      >
        <Button onClick={() => {testNotification()}} >Test Notification</Button>
        <List>
          {notifications.map((notification: any) => (
            <ListItem key={notification._id}>
              <ListItemButton
                onClick={() => {
                  handleClick(notification);
                }}
                sx={{
                  marginLeft: "-1.5rem",
                }}
              >
                <div>
                  {notification.read ? null : (
                    <div
                      style={{
                        position: "absolute",
                        height: "8px",
                        width: "8px",
                        marginLeft: "-0.7rem",
                        marginTop: "0.6rem",
                        backgroundColor: "#0BA5EC",
                        borderRadius: "50%",
                        display: "inline-block",
                      }}
                    />
                  )}

                  <Typography level="h6">{notification.message}</Typography>
                  <Typography level="body2">
                    {formatRelative(
                      new Date(notification.unixTime * 1000),
                      new Date()
                    )}
                  </Typography>
                </div>
                <Divider />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}
