import { Divider, Typography } from "@mui/joy";
import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";

import { formatRelative } from "date-fns";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/login",
  });
  const notificationServiceURL = process.env.CLIENT_NOTIFICATIONSERVICEURL!
  const response = await fetch(notificationServiceURL + '/notification', {
    headers: {
      "User-Id": user.id.toString(),
    },
  })
  const notifications: Notification[] = await response.json()
  return notifications.sort((a, b) => b.unixTime - a.unixTime);
};

interface Notification {
  _id: string;
  title: string;
  message: string;
  link: string;
  userId: string;
  read: boolean;
  unixTime: number;
}

export default function Notifications() {
  const notifications = useLoaderData<Notification[]>();

  return (
    <div>
      <Typography level="h4">Notifications</Typography>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '0.5rem',
        padding: '1rem 0',
      }}>
      {
        notifications.map((notification) => (
          <>
            <div key={notification._id}>
              {
                notification.read ? null :(
                  <div style={{
                    position: "absolute",
                    height: "8px",
                    width: "8px",
                    marginLeft: "-0.7rem",
                    marginTop: "0.6rem",
                    backgroundColor: "#0BA5EC",
                    borderRadius: "50%",
                    display: "inline-block",
                  }} />
                )
              }
              
              <Typography level="h6">{notification.title}</Typography>
              <Typography level="body2">{formatRelative(new Date(notification.unixTime), new Date())}</Typography>
            </div>
            <Divider />
          </>
        ))
      }
      </div>
    </div>
  );
}
