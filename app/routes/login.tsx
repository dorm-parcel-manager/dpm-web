import {
  Button,
  Container as JoyContainer,
  styled,
  Typography,
} from "@mui/joy";
import { Stack } from "@mui/system";

import logo from "~/assets/images/logo.svg";
import googleLogo from "~/assets/images/google-logo.svg";
import { Form } from "@remix-run/react";

const Container = styled(JoyContainer)(({ theme }) => ({
  paddingTop: 64,
  "&": {
    maxWidth: 400,
  },
  [theme.breakpoints.up("sm")]: {
    paddingTop: 96,
  },
}));

const LogoImg = styled("img")({
  display: "inline-block",
  width: 60,
  height: 60,
  marginRight: 16,
  marginBottom: 32,
});

const GoogleLogoImg = styled("img")({
  marginRight: "0.75rem",
  width: 18,
  height: 18,
});

export default function Login() {
  return (
    <Container>
      <Stack>
        <LogoImg src={logo} alt="" />
        <Typography level="h2">Dorm Parcel Manager</Typography>
      </Stack>
      <Typography
        level="body2"
        sx={(theme) => ({
          fontSize: theme.typography.h4.fontSize,
          lineHeight: 1.2,
          marginTop: 1,
        })}
      >
        A parcel management system for dormitory students
      </Typography>
      <Form action="/auth/google" method="post">
        <Button
          type="submit"
          variant="outlined"
          color="neutral"
          sx={{ marginTop: 4 }}
        >
          <GoogleLogoImg src={googleLogo} alt="" /> Sign In with Google
        </Button>
      </Form>
    </Container>
  );
}
