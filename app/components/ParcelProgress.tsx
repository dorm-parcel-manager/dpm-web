import { Box, Typography } from "@mui/joy";
import { ParcelStatus } from "~/proto/parcel-service";
import { ProgressBar } from "./ProgressBar";

interface Props {
  status: ParcelStatus;
}

export function ParcelProgress({ status }: Props) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <ProgressBar progressWidth={getProgress(status)} />
      <Box
        sx={{
          display: "flex",
          marginTop: 1,
        }}
      >
        <Typography
          sx={{ flexGrow: 1 }}
          component="span"
          level="body3"
          textColor="text.primary"
          fontWeight={
            status === ParcelStatus.PARCEL_REGISTERED ? "bold" : "normal"
          }
        >
          Registered
        </Typography>
        <Typography
          sx={{ flexGrow: 1, textAlign: "center" }}
          component="span"
          level="body3"
          textColor="text.primary"
          fontWeight={
            status === ParcelStatus.PARCEL_ARRIVED ? "bold" : "normal"
          }
        >
          Arrived
        </Typography>
        <Typography
          sx={{ flexGrow: 1, textAlign: "end" }}
          component="span"
          level="body3"
          textColor="text.primary"
          fontWeight={
            status === ParcelStatus.PARCEL_PICKED_UP ? "bold" : "normal"
          }
        >
          Picked Up
        </Typography>
      </Box>
    </Box>
  );
}

function getProgress(status: ParcelStatus): string | number {
  switch (status) {
    case ParcelStatus.PARCEL_ARRIVED:
      return "50%";
    case ParcelStatus.PARCEL_PICKED_UP:
      return "100%";
    default:
      return 36;
  }
}
