import {
  ListDivider,
  TextField,
  Typography,
  ListItem,
  ListItemButton,
} from "@mui/joy";
import { Stack } from "@mui/system";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import React from "react";
import { FiSearch } from "react-icons/fi";
import { getGrpcContext } from "~/auth/utils";
import { parcelServiceClient } from "~/client";
import type { Parcel } from "~/proto/parcel-service";

type LoaderData = Parcel[];

export async function loader({ request }: LoaderArgs) {
  const context = await getGrpcContext(request);
  const { parcels } = await parcelServiceClient.getParcels({
    context,
    data: {},
  }).response;
  return json<LoaderData>(parcels);
}

export default function Index() {
  const parcels = useLoaderData<LoaderData>();
  return (
    <Stack gap={2}>
      <Typography level="h4" component="h1">
        Pending Parcels
      </Typography>
      <TextField
        fullWidth
        placeholder="Tracking number"
        startDecorator={<FiSearch />}
      />
      <ParcelList parcels={parcels} />
    </Stack>
  );
}

function ParcelList({ parcels }: { parcels: Parcel[] }) {
  return (
    <Stack gap={1}>
      {parcels.map((parcel, index) => (
        <React.Fragment key={parcel.id}>
          <ListItem>
            <ListItemButton
              component={Link}
              to={`/staff/dashboard/${parcel.id}`}
            >
              <Stack>
                <Typography level="h5" component="h3">
                  {parcel.trackingNumber} - {parcel.transportCompany}
                </Typography>
                <Typography component="p">{parcel.sender}</Typography>
              </Stack>
            </ListItemButton>
          </ListItem>
          {index !== parcels.length - 1 && <ListDivider />}
        </React.Fragment>
      ))}
    </Stack>
  );
}
