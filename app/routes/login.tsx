import { Box, Container as JoyContainer, styled, Typography } from "@mui/joy";
import { Stack } from "@mui/system";
import { useCallback, useEffect, useRef } from "react";
import { useOnLoad } from "~/hooks/useOnLoad";
import { useSubmit } from "@remix-run/react";
import { renderButton, setGoogleSignInCallback } from "~/auth/googleSignIn";
import logo from "~/assets/images/logo.svg";

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

export default function Login() {
  const submit = useSubmit();
  const buttonRef = useRef<HTMLDivElement>(null);

  useOnLoad(
    useCallback(() => {
      renderButton(buttonRef.current!);
    }, [])
  );

  useEffect(() => {
    setGoogleSignInCallback((response) => {
      const data = new FormData();
      data.append("credential", response.credential);
      submit(data, {
        method: "post",
        action: "/auth/google/token",
      });
    });
  }, [submit]);

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
      <Box sx={{ display: "inline-block", paddingTop: 4 }}>
        <div ref={buttonRef} />
      </Box>
    </Container>
  );
}
