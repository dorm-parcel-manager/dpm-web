import { Button, Typography } from "@mui/joy";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { userServiceClient } from "~/client";
import type { HelloResponse } from "~/proto/common";
import { useState } from "react";
import { FadeModal } from "~/shared/components/FadeModal";

type LoaderData = HelloResponse;

export const loader: LoaderFunction = async () => {
  const result = await userServiceClient.hello({ name: "Remix" });
  return json<LoaderData>(result.response);
};

export default function Index() {
  const data = useLoaderData<LoaderData>();

  const [open, setOpen] = useState(false);

  return (
    <div>
      <Typography level="h4" component="h1">
        {data.message}
      </Typography>

      <Button onClick={() => setOpen(true)}>Open Modal</Button>
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
    </div>
  );
}
