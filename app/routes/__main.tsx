import type { ThrownResponse } from "@remix-run/react";
import { Link, useNavigate } from "@remix-run/react";
import type { RemixErrorBoundary } from "@remix-run/react/dist/errorBoundaries";
import { Outlet, useCatch } from "@remix-run/react";
import { mapGrpcError } from "~/client";
import { Box, Button, Container, Stack, Typography } from "@mui/joy";
import { MdArrowBackIos, MdHome } from "react-icons/md";
import notFoundLogo from "~/assets/images/not-found-logo.svg";
import errorLogo from "~/assets/images/error-logo.svg";

export default function Main() {
  return <Outlet />;
}

const defaultError: ThrownResponse = {
  status: 500,
  statusText: "Internal Server Error",
  data: "Internal Server Error",
};

export function CatchBoundary() {
  const caught = useCatch();
  return <ErrorView error={caught} />;
}

export function ErrorBoundary({ error }: RemixErrorBoundary["props"]) {
  const mappedError = (error && mapGrpcError(error)) ?? defaultError;
  return <ErrorView error={mappedError} />;
}

function ErrorView({ error }: { error: ThrownResponse }) {
  const logo = error.status === 404 ? notFoundLogo : errorLogo;
  const navigate = useNavigate();

  return (
    <Container
      sx={{
        paddingTop: {
          xs: 8,
          sm: 12,
        },
        "&": {
          maxWidth: 400,
        },
      }}
    >
      <Stack>
        <Box
          component="img"
          src={logo}
          alt=""
          sx={{
            display: "inline-block",
            width: 60,
            height: 60,
            marginBottom: 4,
          }}
        />
        <Typography level="h2" sx={{ marginBottom: 4 }}>
          {error.status} {error.statusText}
        </Typography>
      </Stack>
      <Stack direction="row">
        <Button
          onClick={() => navigate(-1)}
          startDecorator={<MdArrowBackIos />}
          sx={{ marginRight: 2 }}
        >
          Back
        </Button>
        <Button
          variant="soft"
          color="neutral"
          component={Link}
          to="/"
          startDecorator={<MdHome />}
        >
          Home Page
        </Button>
      </Stack>
    </Container>
  );
}
