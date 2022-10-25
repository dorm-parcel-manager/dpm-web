import { Button, FormLabel, Input, Typography } from "@mui/joy";
import { FormControl } from "@mui/material";
import { Stack } from "@mui/system";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { getGrpcContext } from "~/auth/utils";
import { parcelServiceClient } from "~/client";
import { BackButton } from "~/components/BackButton";
import type { Parcel } from "~/proto/parcel-service";
import { ParcelStatus } from "~/proto/parcel-service";
import { getParcelStatus } from "~/utils/parcels";

type LoaderData = Parcel;

export async function loader({ request, params }: LoaderArgs) {
  const context = await getGrpcContext(request);
  const { parcel } = await parcelServiceClient.getParcel({
    context,
    id: Number(params.id),
  }).response;
  if (!parcel) {
    return { status: 404 };
  }
  return json<LoaderData>(parcel);
}

export async function action({ request, params }: ActionArgs) {
  switch (request.method) {
    case "POST": {
      const context = await getGrpcContext(request);
      const formData = await request.formData();
      const id = parseInt(params.id as string);
      await parcelServiceClient.staffAcceptDelivery({
        context,
        id,
        data: { description: formData.get("description") as string },
      }).response;
      return redirect(`/staff/dashboard/${id}`);
    }
    default: {
      throw new Response("Method Not Allowed", {
        status: 405,
        statusText: "Method Not Allowed",
      });
    }
  }
}

export default function Index() {
  const parcel = useLoaderData<LoaderData>();
  return (
    <Stack gap={2}>
      <Stack gap={2} direction="row">
        <BackButton />
        <Typography level="h3" component="h1">
          Parcel
        </Typography>
      </Stack>
      <Typography level="h4" component="h3">
        {parcel.name}
      </Typography>
      <Stack gap={1}>
        <Stack gap={0.75}>
          <Typography fontSize="small">Owner</Typography>
          <Typography fontSize="large">{parcel.ownerId}</Typography>
        </Stack>
        <Stack gap={0.75}>
          <Typography fontSize="small">Sender</Typography>
          <Typography fontSize="large">{parcel.sender}</Typography>
        </Stack>
        <Stack gap={0.75}>
          <Typography fontSize="small">Tracking Number</Typography>
          <Typography fontSize="large">{parcel.trackingNumber}</Typography>
        </Stack>
        <Stack gap={0.75}>
          <Typography fontSize="small">Shipping Company</Typography>
          <Typography fontSize="large">{parcel.transportCompany}</Typography>
        </Stack>
        <Stack gap={0.75}>
          <Typography fontSize="small">Status</Typography>
          <Typography fontSize="large">
            {getParcelStatus(parcel.status)}
          </Typography>
        </Stack>
      </Stack>
      {parcel.status === ParcelStatus.PARCEL_REGISTERED && (
        <Form method="post">
          <Stack gap={2} mt={3}>
            <FormControl>
              <FormLabel>Description</FormLabel>
              <Input
                name="description"
                placeholder="Note for student to pick up"
              />
            </FormControl>
            <Button type="submit">Accept Delivery</Button>
          </Stack>
        </Form>
      )}
    </Stack>
  );
}
