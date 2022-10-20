import type { ReactNode } from "react";
import { useContext, createContext } from "react";
import type { Theme } from "@mui/joy";
import { Box, List, ListItem, ListItemButton } from "@mui/joy";
import { Link } from "@remix-run/react";
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
            <SidebarItem to="notifications" icon={<MdNotifications />}>
              Notifications
            </SidebarItem>
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

interface SidebarItemProps {
  to: string;
  icon?: ReactNode;
  children: ReactNode;
}

function SidebarItem({ to, icon, children }: SidebarItemProps) {
  const { fixed, onItemClick } = useContext(SidebarContext);
  const match = useMatch({ path: to, end: false });
  return (
    <ListItem>
      <ListItemButton
        onClick={onItemClick}
        component={Link}
        to={to}
        selected={!!match}
      >
        {icon && (
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
            {icon}
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
