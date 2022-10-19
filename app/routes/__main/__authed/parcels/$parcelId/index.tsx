import { Box, Button, Typography, Link as JoyLink, Chip, TextField, Stack, Card } from "@mui/joy";
import { MdCheck } from "react-icons/md";
import { formatRelative } from "~/utils";
import { Timestamp } from "~/proto/google/protobuf/timestamp";
import { CopyButton } from "~/components/CopyButton";
import { ParcelProgress } from "~/components/ParcelProgress";

import type { LoaderArgs, LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { AiFillCaretLeft } from "react-icons/ai";
import { FiSave } from "react-icons/fi";
import { getGrpcContext } from "~/auth/utils";
import { parcelServiceClient } from "~/client";
import type { Parcel } from "~/proto/parcel-service";
import { ParcelStatus } from "~/proto/parcel-service";

type LoaderData = Parcel;

export async function loader({ request, params }: LoaderArgs) {
    const id = parseInt(params.parcelId as string);
    const context = await getGrpcContext(request);
    const response = await parcelServiceClient.getParcel({ context, id }).response;
    const parcel = response.parcel!;
    return json<LoaderData>(parcel);
}

export default function Parcels() {
  const parcel = useLoaderData<LoaderData>();

  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "baseline" }}>
        <Button
            component={Link}
            to="/parcels"
            color="primary"
            size="sm"
            sx={{ mr: 2 }}
            startDecorator={<AiFillCaretLeft />}
        />
        <Typography level="h4">Parcel</Typography>
      </Box>
      <ParcelDetailView parcel = {parcel}/>
    </div>
  );
}

function ParcelDetailView({ parcel }: { parcel: Parcel }) {
    console.log(parcel)
    return (
        <Stack direction="column" spacing={2} sx={{ marginTop: 2 }}>
            <ParcelDetailCard parcel={parcel} />
        </Stack>
    );
}

function ParcelDetailCard({ parcel }: { parcel: Parcel }){
    return(
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
            <Typography
            level="h4"
            textColor="text.primary"
            >
            { parcel.name ? parcel.name : 'iPhone 15 Pro max'}
            </Typography>
            <Typography
            level="body2"
            textColor="text.primary"
            sx={{ marginRight: 0.5 }}
            >
            from {parcel.sender}
            </Typography>
            <Box sx={{ display: "flex"}}>
                <Typography
                level="body2"
                textColor="text.primary"
                sx={{ marginRight: 0.5 }}
                >
                via {parcel.transportCompany} - {parcel.trackingNumber}
                </Typography>
                <CopyButton />
            </Box>
        </Stack>
        <Box sx={{marginTop : 1.5 }}>
            {parcel.arrivalDate && 
                <Typography
                level="h6"
                textColor="text.primary"
                >
                Arrived : 
                {" "+formatRelative(
                    Timestamp.toDate(parcel.arrivalDate),
                    new Date()
                )}
                </Typography>
            }
            {parcel.pickedUpDate && 
                <Typography
                level="h6"
                textColor="text.primary"
                >
                Picked up : 
                {" "+formatRelative(
                    Timestamp.toDate(parcel.pickedUpDate),
                    new Date()
                )}
                </Typography>
            }
        </Box>

        <Box sx={{marginTop : 1.5}}>
            <ParcelProgress status={parcel.status} />
        </Box> 
    </Card>
    )
}