import type { ReactNode } from "react";
import { useContext, createContext } from "react";
import { Box, List, ListItem, ListItemButton } from "@mui/joy";
import { Link } from "@remix-run/react";
import { useMatch } from "react-router";
import { FiPackage } from "react-icons/fi";
import { MdDashboard, MdPeople, MdPerson } from "react-icons/md";
import type { UserInfo } from "~/proto/user-service";
import { UserType } from "~/proto/common";

const SidebarContext = createContext<Props>(null as unknown as Props);

interface Props {
  user: UserInfo;
  fixed?: boolean;
}

export function Sidebar(props: Props) {
  const { user } = props;
  return (
    <SidebarContext.Provider value={props}>
      <List
        sx={{
          "--List-item-radius": "8px",
        }}
      >
        <SidebarItem to="dashboard" icon={<MdDashboard />}>
          Dashboard
        </SidebarItem>
        <SidebarItem to="parcels" icon={<FiPackage />}>
          Parcels
        </SidebarItem>
        {user.type == UserType.TYPE_ADMIN && (
          <SidebarItem to="users" icon={<MdPeople />}>
            Users
          </SidebarItem>
        )}
        <SidebarItem to="profile" icon={<MdPerson />}>
          Profile
        </SidebarItem>
      </List>
    </SidebarContext.Provider>
  );
}

interface SidebarItemProps {
  to: string;
  icon?: ReactNode;
  children: ReactNode;
}

function SidebarItem({ to, icon, children }: SidebarItemProps) {
  const { fixed } = useContext(SidebarContext);
  const match = useMatch({ path: to, end: false });
  return (
    <ListItem>
      <ListItemButton component={Link} to={to} selected={!!match}>
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