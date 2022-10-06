import { Avatar, Box, Button, Menu, MenuItem } from "@mui/joy";
import { useRef } from "react";
import { useDisclosure } from "~/hooks/useDisclosure";
import type { UserInfo } from "~/proto/user-service";
import { MdLogout } from "react-icons/md";
import { Link } from "@remix-run/react";

interface Props {
  user: UserInfo;
}

export function UserMenu({ user }: Props) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        ref={buttonRef}
        onClick={onOpen}
        variant="outlined"
        startDecorator={
          <Avatar
            alt={`${user.firstName} ${user.lastName}`}
            src={user.picture}
            size="sm"
          />
        }
        sx={{
          display: {
            xs: "none",
            sm: "flex",
          },
        }}
      >
        {user.firstName}
      </Button>
      <Menu
        anchorEl={buttonRef.current}
        placement="bottom-end"
        open={isOpen}
        onClose={onClose}
      >
        <MenuItem component={Link} to="/logout">
          <MdLogout />
          <Box component="span" sx={{ marginLeft: 1 }}>
            Logout
          </Box>
        </MenuItem>
      </Menu>
    </>
  );
}
