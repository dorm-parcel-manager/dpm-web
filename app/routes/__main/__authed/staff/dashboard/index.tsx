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
import { Link, useFetcher, useLoaderData } from "@remix-run/react";
import React from "react";
import { FiSearch } from "react-icons/fi";
import { getGrpcContext } from "~/auth/utils";
import { parcelServiceClient, userServiceClient } from "~/client";
import type { Parcel } from "~/proto/parcel-service";
import type { UserInfo } from "~/proto/user-service";

type LoaderData = (Parcel & { owner: UserInfo })[];

export async function loader({ request }: LoaderArgs) {
  const context = await getGrpcContext(request);
  const url = new URL(request.url);
  const trackingNumber = url.searchParams.get("trackingNumber") ?? "";
  const { parcels } = await parcelServiceClient.staffGetParcels({
    context,
    data: { trackingNumber },
  }).response;
  const ownerIds = parcels.map((parcel) => parcel.ownerId);
  const { userInfos } = await userServiceClient.batchGetUserInfo({
    ids: ownerIds,
  }).response;
  const parcelsWithOwner = parcels.map((parcel) => ({
    ...parcel,
    owner: userInfos.find((ownerInfo) => ownerInfo.id === parcel.ownerId)!,
  }));
  return json<LoaderData>(parcelsWithOwner);
}

export default function Index() {
  const parcels = useLoaderData<LoaderData>();
  const fetcher = useFetcher<LoaderData>();
  return (
    <Stack gap={2}>
      <Typography level="h4" component="h1">
        Pending Parcels
      </Typography>
      <fetcher.Form method="get">
        <TextField
          fullWidth
          placeholder="Tracking number"
          startDecorator={<FiSearch />}
          name="trackingNumber"
          onChange={(event) => fetcher.submit(event.target.form)}
        />
      </fetcher.Form>
      <ParcelList parcels={fetcher.data ?? parcels} />
    </Stack>
  );
}

function ParcelList({ parcels }: { parcels: LoaderData }) {
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
                <Typography component="p">
                  {parcel.owner.firstName} {parcel.owner.lastName}
                </Typography>
              </Stack>
            </ListItemButton>
          </ListItem>
          {index !== parcels.length - 1 && <ListDivider />}
        </React.Fragment>
      ))}
    </Stack>
  );
}
