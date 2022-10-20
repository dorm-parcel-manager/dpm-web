import { IconButton, Typography } from "@mui/joy";
import { Stack } from "@mui/system";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { MdArrowBackIosNew } from "react-icons/md";
import { getGrpcContext } from "~/auth/utils";
import { parcelServiceClient } from "~/client";
import type { Parcel } from "~/proto/parcel-service";

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

export default function Index() {
  const parcel = useLoaderData<LoaderData>();
  const navigate = useNavigate();
  return (
    <Stack gap={2}>
      <Stack gap={2} direction="row">
        <IconButton
          onClick={() => navigate(-1)}
          variant="outlined"
          color="neutral"
        >
          <MdArrowBackIosNew />
        </IconButton>
        <Typography level="h3" component="h1">
          Parcel
        </Typography>
      </Stack>
      <Typography level="h4" component="h3">
        {parcel.name}
      </Typography>
      <Stack gap={1}>
        <div>
          <Typography fontSize="small">Owner</Typography>
          <Typography>{parcel.ownerId}</Typography>
        </div>
        <div>
          <Typography fontSize="small">Sender</Typography>
          <Typography>{parcel.sender}</Typography>
        </div>
        <div>
          <Typography fontSize="small">Tracking Number</Typography>
          <Typography>{parcel.trackingNumber}</Typography>
        </div>
        <div>
          <Typography fontSize="small">Shipping Company</Typography>
          <Typography>{parcel.transportCompany}</Typography>
        </div>
      </Stack>
    </Stack>
  );
}
