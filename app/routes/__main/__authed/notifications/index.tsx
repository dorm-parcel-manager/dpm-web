import { Divider, List, ListItem, ListItemButton, Typography } from "@mui/joy";
import { useFetcher, useLoaderData, useNavigate } from "@remix-run/react";

import { formatRelative } from "~/utils";
import { getUser } from "~/auth/utils";

import type { ActionFunction, LoaderFunction } from "@remix-run/node";
import { notificationServiceClient } from "~/client";
import type { Notification } from "~/client/NotificationServiceClient";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  const notifications = await notificationServiceClient.getNotifications(
    user.id
  );
  return {
    notifications: notifications.sort((a, b) => b.unixTime - a.unixTime),
  };
};

export const action: ActionFunction = async ({ request }) => {
  const user = await getUser(request);
  const formData = await request.formData();
  const id = formData.get("id") as string;
  await notificationServiceClient.markNotificationAsRead(user.id, id);
  return null;
};

export default function Notifications() {
  const { notifications } = useLoaderData();
  const fetcher = useFetcher();
  const navigate = useNavigate();

  const handleClick = (notification: Notification) => {
    const data = new FormData();
    data.append("id", notification._id);
    fetcher.submit(data, {
      method: "post",
    });
    navigate(notification.link);
  };

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
