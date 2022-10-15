import { Box, Button, Stack, Typography } from "@mui/joy";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { MdAdd } from "react-icons/md";
import { getGrpcContext } from "~/auth/utils";
import { parcelServiceClient } from "~/client";
import { ParcelCard } from "~/components/ParcelCard";
import { ParcelsEmpty } from "~/icons/ParcelsEmpty";
import type { Parcel } from "~/proto/parcel-service";
import { ParcelStatus } from "~/proto/parcel-service";

type LoaderData = Parcel[];

export async function loader({ request }: LoaderArgs) {
  const context = await getGrpcContext(request);
  const { parcels } = await parcelServiceClient.studentGetParcels({ context })
    .response;
  return json<LoaderData>(parcels);
}

export default function Parcels() {
  const parcels = useLoaderData<LoaderData>();
  const ongoingParcels = parcels.filter(
    (parcel) => parcel.status !== ParcelStatus.PARCEL_PICKED_UP
  );
  const pastParcels = parcels.filter(
    (parcel) => parcel.status === ParcelStatus.PARCEL_PICKED_UP
  );
  const isEmpty = ongoingParcels.length === 0;

  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "baseline" }}>
        <Typography level="h4">Ongoing Parcels</Typography>
        <Box sx={{ flexGrow: 1 }} />
        {!isEmpty && (
          <Button
            component={Link}
            to="new"
            color="success"
            size="sm"
            startDecorator={<MdAdd />}
          >
            New Parcel
          </Button>
        )}
      </Box>
      {isEmpty ? <EmptyParcelView /> : <ParcelsView parcels={ongoingParcels} />}
      {pastParcels.length > 0 && (
        <>
          <Typography level="h4" sx={{ marginTop: 2 }}>
            Past Parcels
          </Typography>
          <ParcelsView parcels={pastParcels} />
        </>
      )}
    </div>
  );
}

function ParcelsView({ parcels }: { parcels: Parcel[] }) {
  return (
    <Stack direction="column" spacing={2} sx={{ marginTop: 2 }}>
      {parcels.map((parcel) => (
        <ParcelCard key={parcel.id} parcel={parcel} />
      ))}
    </Stack>
  );
}

function EmptyParcelView() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingY: 5,
      }}
    >
      <Box
        component="span"
        sx={(theme) => ({
          display: "flex",
          color: theme.vars.palette.neutral.plainColor,
          fontSize: 160,
          marginBottom: 4,
        })}
      >
        <ParcelsEmpty />
      </Box>
      <Typography
        level="body2"
        sx={(theme) => ({
          textAlign: "center",
          fontSize: theme.typography.h4.fontSize,
          lineHeight: 1.2,
          marginBottom: 2,
        })}
      >
        You don't have any parcel yet
      </Typography>
      <Button
        component={Link}
        to="new"
        color="success"
        startDecorator={<MdAdd />}
      >
        New Parcel
      </Button>
    </Box>
  );
}
