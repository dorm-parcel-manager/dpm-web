import type { ReactElement, ReactNode } from "react";
import { useEffect, useRef } from "react";
import { cloneElement } from "react";
import { useContext, createContext } from "react";
import { Badge } from "@mui/joy";
import type { BadgeProps, Theme } from "@mui/joy";
import { Box, List, ListItem, ListItemButton } from "@mui/joy";
import { Link, useFetcher, useFetchers } from "@remix-run/react";
import { useMatch } from "react-router";
import { FiPackage } from "react-icons/fi";
import {
  MdDashboard,
  MdNotifications,
  MdPeople,
  MdPerson,
} from "react-icons/md";
import type { UserInfo } from "~/proto/user-service";
import { UserType } from "~/proto/common";
import { ModeToggle } from "./ModeToggle";
import useMediaQuery from "@mui/material/useMediaQuery";

const SidebarContext = createContext<Props>(null as unknown as Props);

interface Props {
  user: UserInfo;
  fixed?: boolean;
  onItemClick?: () => void;
}

export function Sidebar(props: Props) {
  const { user } = props;
  const isSm = useMediaQuery<Theme>((theme) => theme.breakpoints.only("sm"));

  return (
    <SidebarContext.Provider value={props}>
      <List
        sx={{
          minWidth: 40,
          "--List-item-radius": "8px",
        }}
      >
        {user.type == UserType.TYPE_STUDENT && (
          <>
            <SidebarItem to="parcels" icon={<FiPackage />}>
              Parcels
            </SidebarItem>
            <NotificationItem />
            <SidebarItem to="profile" icon={<MdPerson />}>
              Profile
            </SidebarItem>
          </>
        )}
        {user.type == UserType.TYPE_STAFF && (
          <SidebarItem to="staff/dashboard" icon={<MdDashboard />}>
            Dashboard
          </SidebarItem>
        )}
        {user.type == UserType.TYPE_ADMIN && (
          <SidebarItem to="admin/users" icon={<MdPeople />}>
            Users
          </SidebarItem>
        )}
      </List>
      <ModeToggle small={isSm} />
    </SidebarContext.Provider>
  );
}

function NotificationItem() {
  const readIds = useRef(new Set<string>());
  const fetcher = useFetcher();
  const { load } = fetcher;
  const unreadNotifications: string[] = fetcher.data ?? [];
  const fetchers = useFetchers();

  useEffect(() => {
    if (fetcher.type === "init") {
      fetcher.load("/notifications/unreadIds");
    }
  }, [fetcher]);

  useEffect(() => {
    const broadcast = new BroadcastChannel("new-notification");
    broadcast.onmessage = (e) => {
      load("/notifications/unreadIds");
    };
    return () => broadcast.close();
  }, [load]);

  for (const { submission } of fetchers) {
    const formData = submission?.formData;
    if (!formData) continue;
    const id = formData.get("id") as string | null;
    if (!id) continue;
    readIds.current.add(id);
  }

  const actualUnreadNotifications = unreadNotifications.filter(
    (id) => !readIds.current.has(id)
  );

  return (
    <SidebarItem
      to="notifications"
      icon={<MdNotifications />}
      badgeProps={{
        size: "sm",
        badgeContent: actualUnreadNotifications.length,
      }}
    >
      Notifications
    </SidebarItem>
  );
}

interface SidebarItemProps {
  to: string;
  icon?: ReactElement;
  badgeProps?: BadgeProps;
  children: ReactNode;
}

function SidebarItem({ to, icon, badgeProps, children }: SidebarItemProps) {
  const { fixed, onItemClick } = useContext(SidebarContext);
  const match = useMatch({ path: to, end: false });
  const modifiedIcon = icon
    ? cloneElement(icon, {
        style: {
          width: 20,
          height: 20,
          marginLeft: -2,
          marginRight: -2,
        },
      })
    : null;
  return (
    <ListItem>
      <ListItemButton
        onClick={onItemClick}
        component={Link}
        to={to}
        selected={!!match}
      >
        {modifiedIcon && (
          <Box
            component="span"
            sx={{
              display: "flex",
              alignItems: "center",
              color: "var(--List-decorator-color)",
              minInlineSize: fixed
                ? {
                    xs: 0,
                    md: "var(--List-decorator-size)",
                  }
                : "var(--List-decorator-size)",
            }}
          >
            {badgeProps ? (
              <Badge {...badgeProps}>{modifiedIcon}</Badge>
            ) : (
              modifiedIcon
            )}
          </Box>
        )}
        {fixed ? (
          <Box
            component="span"
            sx={{
              display: {
                xs: "none",
                md: "block",
              },
            }}
          >
            {children}
          </Box>
        ) : (
          children
        )}
      </ListItemButton>
    </ListItem>
  );
}
