import { Avatar, Box, Button, Divider, IconButton, Typography } from "@mui/joy";
import { Link } from "@remix-run/react";

import { MdClose, MdLogout, MdMenu } from "react-icons/md";
import { useDisclosure } from "~/hooks/useDisclosure";
import type { UserInfo } from "~/proto/user-service";
import { AvatarInitials } from "./AvatarInitials";
import { FullscreenModal } from "./Modals";
import { Sidebar } from "./Sidebar";

interface Props {
  user: UserInfo;
}

export function MobileMenu({ user }: Props) {
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <>
      <IconButton
        onClick={onToggle}
        variant="outlined"
        size="sm"
        sx={{
          display: { xs: "block", sm: "none" },
          fontSize: 16,
          paddingTop: "4px",
        }}
      >
        {isOpen ? <MdClose /> : <MdMenu />}
      </IconButton>
      <FullscreenModal
        open={isOpen}
        onClose={onClose}
        sx={{ display: "flex", flexDirection: "column", paddingTop: 10 }}
      >
        <>
          <Typography level="h4">Dorm Parcel Manager</Typography>
          <Box sx={{ marginTop: 1 }}>
            <Sidebar user={user} onItemClick={onClose} />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Divider sx={{ margin: 0, marginTop: 2, marginBottom: 2 }} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 2,
            }}
          >
            <Avatar src={user.picture} size="sm" sx={{ marginRight: 1.5 }}>
              <AvatarInitials user={user} />
            </Avatar>
            <Typography component="span">
              {user.firstName} {user.lastName}
            </Typography>
          </Box>
          <Button
            component={Link}
            to="/logout"
            startDecorator={<MdLogout />}
            size="sm"
          >
            Logout
          </Button>
        </>
      </FullscreenModal>
    </>
  );
}
