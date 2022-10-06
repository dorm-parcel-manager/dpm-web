import {
  Avatar,
  Box,
  Button,
  Divider,
  Modal,
  ModalDialog,
  Typography,
} from "@mui/joy";
import { Link } from "@remix-run/react";

import { MdClose, MdLogout, MdMenu } from "react-icons/md";
import { useDisclosure } from "~/hooks/useDisclosure";
import type { UserInfo } from "~/proto/user-service";
import { Sidebar } from "./Sidebar";

interface Props {
  user: UserInfo;
}

export function MobileMenu({ user }: Props) {
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <>
      <Button
        onClick={onToggle}
        variant="outlined"
        size="sm"
        sx={{
          display: { xs: "block", sm: "none" },
          fontSize: 16,
          padding: "7px",
          width: 32,
          height: 32,
        }}
      >
        {isOpen ? <MdClose /> : <MdMenu />}
      </Button>
      <Modal open={isOpen} onClose={onClose} sx={{ zIndex: 999 }}>
        <ModalDialog
          layout="fullscreen"
          sx={{ display: "flex", flexDirection: "column", paddingTop: 10 }}
        >
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
            <Avatar
              alt={`${user.firstName} ${user.lastName}`}
              src={user.picture}
              size="sm"
              sx={{ marginRight: 1.5 }}
            />
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
        </ModalDialog>
      </Modal>
    </>
  );
}
