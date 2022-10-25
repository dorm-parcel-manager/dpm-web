import { Box, Typography, Stack, Card, Button } from "@mui/joy";
import { formatRelative } from "~/utils";
import { Timestamp } from "~/proto/google/protobuf/timestamp";
import { CopyButton } from "~/components/CopyButton";
import { ParcelProgress } from "~/components/ParcelProgress";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { getGrpcContext } from "~/auth/utils";
import { parcelServiceClient } from "~/client";
import type { Parcel } from "~/proto/parcel-service";
import { ParcelStatus } from "~/proto/parcel-service";
import { BackButton } from "~/components/BackButton";

type LoaderData = Parcel;

export async function loader({ request, params }: LoaderArgs) {
  const id = parseInt(params.parcelId as string);
  const context = await getGrpcContext(request);
  const response = await parcelServiceClient.getParcel({ context, id })
    .response;
  const parcel = response.parcel!;
  return json<LoaderData>(parcel);
}

export async function action({ request, params }: ActionArgs) {
  switch (request.method) {
    case "POST": {
      const context = await getGrpcContext(request);
      const id = parseInt(params.parcelId as string);
      await parcelServiceClient.studentClaimParcel({ context, id }).response;
      return redirect(`/parcels/${id}`);
    }
    default: {
      throw new Response("Method Not Allowed", {
        status: 405,
        statusText: "Method Not Allowed",
      });
    }
  }
}

export default function Parcels() {
  const parcel = useLoaderData<LoaderData>();

  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "baseline" }}>
        <BackButton sx={{ mr: 2 }} />
        <Typography level="h4">Parcel</Typography>
      </Box>
      <ParcelDetailView parcel={parcel} />
    </div>
  );
}

function ParcelDetailView({ parcel }: { parcel: Parcel }) {
  return (
    <Stack direction="column" spacing={4} sx={{ marginTop: 2 }}>
      <ParcelDetailCard parcel={parcel} />
      {parcel.status === ParcelStatus.PARCEL_ARRIVED && (
        <Form method="post">
          <Button color="success" fullWidth type="submit">
            Accept Parcel
          </Button>
        </Form>
      )}
    </Stack>
  );
}

function ParcelDetailCard({ parcel }: { parcel: Parcel }) {
  return (
    <Card
      variant="outlined"
      sx={{
        transition: "border 200ms",
        "&:hover": {
          borderColor: "neutral.outlinedHoverBorder",
        },
      }}
    >
      <Stack>
        <Typography level="h4" textColor="text.primary">
          {parcel.name ? parcel.name : "iPhone 15 Pro max"}
        </Typography>
        <Typography
          level="body2"
          textColor="text.primary"
          sx={{ marginRight: 0.5 }}
        >
          from {parcel.sender}
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Typography
            level="body2"
            textColor="text.primary"
            sx={{ marginRight: 0.5 }}
          >
            via {parcel.transportCompany} - {parcel.trackingNumber}
          </Typography>
          <CopyButton />
        </Box>
        {parcel.description && (
          <Typography
            level="body2"
            textColor="text.primary"
            sx={{ marginRight: 0.5 }}
          >
            Description : {parcel.description}
          </Typography>
        )}
      </Stack>
      <Box sx={{ marginTop: 1.5 }}>
        {parcel.createdAt && (
          <Typography level="h6" textColor="text.primary">
            Registered :
            {" " +
              formatRelative(Timestamp.toDate(parcel.createdAt), new Date())}
          </Typography>
        )}
        {parcel.arrivalDate && (
          <Typography level="h6" textColor="text.primary">
            Arrived :
            {" " +
              formatRelative(Timestamp.toDate(parcel.arrivalDate), new Date())}
          </Typography>
        )}
        {parcel.pickedUpDate && (
          <Typography level="h6" textColor="text.primary">
            Picked up :
            {" " +
              formatRelative(Timestamp.toDate(parcel.pickedUpDate), new Date())}
          </Typography>
        )}
      </Box>

      <Box sx={{ marginTop: 1.5 }}>
        <ParcelProgress status={parcel.status} />
      </Box>
    </Card>
  );
}
