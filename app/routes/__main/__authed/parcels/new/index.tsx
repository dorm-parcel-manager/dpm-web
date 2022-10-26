import { Box, Button, Typography, Stack, FormLabel, Input } from "@mui/joy";
import { FormControl } from "@mui/material";
import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { useActionData } from "@remix-run/react";
import { FiSave } from "react-icons/fi";

import { getGrpcContext } from "~/auth/utils";
import { parcelServiceClient } from "~/client";
import { BackButton } from "~/components/BackButton";

function validate(data: string | undefined, name: string) {
  if (!data) {
    return name + " is required";
  } else if (typeof data !== "string" || data.length < 0) {
    return name + ` must not be empty`;
  }
}

export async function action({ request }: ActionArgs) {
  const context = await getGrpcContext(request);

  const form = await request.formData();
  const ownerId = context.userId;
  const name = form.get("name")?.toString();
  const trackingNumber = form.get("trackingNumber")?.toString();
  const transportCompany = form.get("transportCompany")?.toString();
  const sender = form.get("sender")?.toString();

  const errors = {
    name: validate(name, "Parcel name"),
    trackingNumber: validate(trackingNumber, "Tracking Number"),
    transportCompany: validate(transportCompany, "Transport Company"),
    sender: validate(sender, "Sender"),
  };

  if (Object.values(errors).some(Boolean)) return { errors };
  if (ownerId && name && transportCompany && trackingNumber && sender) {
    const data = { ownerId, name, transportCompany, trackingNumber, sender };
    await parcelServiceClient.createParcel({ context, data });
  }
  return redirect(`/parcels`);
}

export default function Parcels() {

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "baseline" }}>
        <BackButton sx={{ mr: 2 }} />
        <Typography level="h4">New Parcel</Typography>
      </Box>
      <NewParcelView />
    </>
  );
}

function NewParcelView() {
  const actionData = useActionData();

  return(
    <Form method="post">
        <Stack direction="column" spacing={3} sx={{ marginTop: 2 }}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              placeholder={actionData?.errors?.name? actionData?.errors?.name : ""}
              color={actionData?.errors?.name ? "warning" : "neutral"}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Tracking Number</FormLabel>
            <Input
              name="trackingNumber"
              placeholder={actionData?.errors?.trackingNumber? actionData?.errors?.trackingNumber : ""}
              color={actionData?.errors?.trackingNumber ? "warning" : "neutral"}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Transport Company</FormLabel>
            <Input
              name="transportCompany"
              placeholder={actionData?.errors?.transportCompany? actionData?.errors?.transportCompany : ""}
              color={actionData?.errors?.transportCompany ? "warning" : "neutral"}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Sender</FormLabel>
            <Input
              name="sender"
              placeholder={actionData?.errors?.sender ? actionData?.errors?.sender : ""}
              color={actionData?.errors?.sender ? "warning" : "neutral"}
            />
          </FormControl>
          <Button
            color="info"
            fullWidth
            type="submit"
            startDecorator={<FiSave />}
          >
            Save
          </Button>
        </Stack>
      </Form>
  );
}
