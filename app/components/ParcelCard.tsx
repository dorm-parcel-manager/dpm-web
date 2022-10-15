import { Box, Card, Chip, Link as JoyLink, Typography } from "@mui/joy";
import type { Parcel } from "~/proto/parcel-service";
import { ParcelStatus } from "~/proto/parcel-service";
import { ParcelProgress } from "./ParcelProgress";
import { CopyButton } from "./CopyButton";
import { MdCheck } from "react-icons/md";
import { formatRelative } from "~/utils";
import { Timestamp } from "~/proto/google/protobuf/timestamp";
import { Link } from "@remix-run/react";

interface Props {
  parcel: Parcel;
}

export function ParcelCard({ parcel }: Props) {
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
      <JoyLink
        component={Link}
        to={`/parcels/${parcel.id}`}
        overlay
        underline="none"
      >
        <Typography level="h6">{parcel.name}</Typography>
      </JoyLink>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography
          level="body2"
          textColor="text.primary"
          sx={{ marginRight: 0.5 }}
        >
          {parcel.transportCompany} - {parcel.trackingNumber}
        </Typography>
        <CopyButton />
      </Box>
      {parcel.status !== ParcelStatus.PARCEL_PICKED_UP ? (
        <Box sx={{ paddingTop: 1.5 }}>
          <ParcelProgress status={parcel.status} />
        </Box>
      ) : (
        <Box sx={{ display: "flex", alignItems: "baseline", paddingTop: 1 }}>
          <Chip
            size="sm"
            color="success"
            variant="soft"
            sx={{ width: 20, minHeight: 20, marginRight: 1 }}
          >
            <MdCheck />
          </Chip>
          <Typography>
            Picked up
            {parcel.pickedUpDate &&
              ` ${formatRelative(
                Timestamp.toDate(parcel.pickedUpDate),
                new Date()
              )}`}
          </Typography>
        </Box>
      )}
    </Card>
  );
}
