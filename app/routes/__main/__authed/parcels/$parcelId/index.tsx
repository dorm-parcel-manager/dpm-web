import { Box, Typography, Stack, Card } from "@mui/joy";
import { formatRelative } from "~/utils";
import { Timestamp } from "~/proto/google/protobuf/timestamp";
import { CopyButton } from "~/components/CopyButton";
import { ParcelProgress } from "~/components/ParcelProgress";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getGrpcContext } from "~/auth/utils";
import { parcelServiceClient } from "~/client";
import type { Parcel } from "~/proto/parcel-service";
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
    <Stack direction="column" spacing={2} sx={{ marginTop: 2 }}>
      <ParcelDetailCard parcel={parcel} />
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
