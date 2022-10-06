import { Box, Button, Typography } from "@mui/joy";
import { Link } from "@remix-run/react";
import { MdAdd } from "react-icons/md";
import { ParcelsEmpty } from "~/icons/ParcelsEmpty";

const mockParcels: unknown[] = [];

export default function Parcels() {
  const parcels = mockParcels;
  const isEmpty = parcels.length === 0;

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
      {isEmpty ? <EmptyParcelView /> : null}
    </div>
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
