import { Button, Typography } from "@mui/joy";
import { Stack } from "@mui/system";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { userServiceClient } from "~/client";
import type { HelloResponse } from "~/proto/common";
import { useState } from "react";
import { FadeModal } from "~/components/FadeModal";
import { ModeToggle } from "~/components/ModeToggle";

type LoaderData = HelloResponse;

export const loader: LoaderFunction = async () => {
  const result = await userServiceClient.hello({ name: "Remix" });
  return json<LoaderData>(result.response);
};

export default function Index() {
  const data = useLoaderData<LoaderData>();
  const [open, setOpen] = useState(false);

  return (
    <Stack alignItems="start">
      <Typography level="h4" component="h1">
        {data.message}
      </Typography>
      <Button component={Link} to="/login">
        Login
      </Button>
      <Button onClick={() => setOpen(true)}>Open Modal</Button>
      <ModeToggle />
      <FadeModal open={open} onClose={() => setOpen(false)}>
        <div>
          <Typography
            component="h2"
            level="inherit"
            fontSize="1.25em"
            mb="0.25em"
          >
            Transition modal
          </Typography>
          <Typography textColor="text.tertiary">
            Using `react-transition-group` to create a fade animation.
          </Typography>
        </div>
      </FadeModal>
    </Stack>
  );
}
