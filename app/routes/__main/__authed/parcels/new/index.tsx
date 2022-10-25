import { Box, Button, Typography, TextField, Stack } from "@mui/joy";
import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import type { SubmitFunction } from "@remix-run/react";
import { useActionData, useSubmit } from "@remix-run/react";
import { useState } from "react";
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
  const submit = useSubmit();

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "baseline" }}>
        <BackButton sx={{ mr: 2 }} />
        <Typography level="h4">New Parcel</Typography>
      </Box>
      <NewParcelView submit={submit} />
    </>
  );
}

function NewParcelView({ submit }: { submit: SubmitFunction }) {
  const [name, setName] = useState<string>("");
  const [trackingNumber, setTrackingNumber] = useState<string>("");
  const [transportCompany, setTransportCompany] = useState<string>("");
  const [sender, setSender] = useState<string>("");
  const actionData = useActionData();

  return (
    <Stack direction="column" spacing={3} sx={{ marginTop: 2 }}>
      <TextField
        label="Parcel Name"
        placeholder={
          actionData?.errors?.name
            ? actionData?.errors?.name
            : ""
        }
        color={actionData?.errors?.name ? "warning" : "neutral"}
        variant="outlined"
        value={name}
        onChange={(newValue) => {
          setName(newValue.target.value);
        }}
      />
      <TextField
        label="Tracking Number"
        placeholder={
          actionData?.errors?.trackingNumber
            ? actionData?.errors?.trackingNumber
            : ""
        }
        color={actionData?.errors?.trackingNumber ? "warning" : "neutral"}
        variant="outlined"
        value={trackingNumber}
        onChange={(newValue) => {
          setTrackingNumber(newValue.target.value);
        }}
      />
      <TextField
        label="Transport Company"
        placeholder={
          actionData?.errors?.transportCompany
            ? actionData?.errors?.transportCompany
            : ""
        }
        color={actionData?.errors?.transportCompany ? "warning" : "neutral"}
        variant="outlined"
        value={transportCompany}
        onChange={(newValue) => {
          setTransportCompany(newValue.target.value);
        }}
      />
      <TextField
        label="Sender"
        placeholder={
          actionData?.errors?.sender
            ? actionData?.errors?.sender
            : ""
        }
        color={actionData?.errors?.sender ? "warning" : "neutral"}
        variant="outlined"
        value={sender}
        onChange={(newValue) => {
          setSender(newValue.target.value);
        }}
      />
      <Button
        color="info"
        fullWidth
        onClick={() => {
          submit(
            { name, transportCompany, trackingNumber, sender },
            { method: "post" }
          );
        }}
        startDecorator={<FiSave />}
      >
        Save
      </Button>
    </Stack>
  );
}
