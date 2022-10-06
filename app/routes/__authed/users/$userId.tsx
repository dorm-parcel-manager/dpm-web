import { Avatar, Box, Button, Grid, Typography } from "@mui/joy";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData, useNavigate } from "@remix-run/react";
import { format } from "date-fns";
import { MdArrowBackIosNew, MdDelete, MdEdit } from "react-icons/md";
import { getGrpcContext } from "~/auth/utils";
import { userServiceClient } from "~/client";
import { AvatarInitials } from "~/components/AvatarInitials";
import { UserType } from "~/proto/common";
import { Timestamp } from "~/proto/google/protobuf/timestamp";
import type { User } from "~/proto/user-service";

type LoaderData = User;

export async function loader({ request, params }: LoaderArgs) {
  const context = await getGrpcContext(request);
  const id = parseInt(params.userId as string);
  const response = await userServiceClient.getUser({ context, id }).response;
  const user = response.user!;
  return json<LoaderData>(user);
}

export default function UserDetail() {
  const user = useLoaderData<LoaderData>();
  const navigate = useNavigate();
  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "baseline" }}>
        <Button onClick={() => navigate(-1)} size="sm" sx={{ marginRight: 2 }}>
          <MdArrowBackIosNew />
        </Button>
        <Typography level="h4" sx={{ display: { xs: "none", md: "block" } }}>
          {user.firstName} {user.lastName}
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button
          component={Link}
          to="edit"
          color="info"
          size="sm"
          startDecorator={<MdEdit />}
          sx={{ marginRight: 2 }}
        >
          Edit
        </Button>
        <Button color="danger" size="sm" startDecorator={<MdDelete />}>
          Delete
        </Button>
      </Box>
      <Avatar
        size="lg"
        src={user.picture}
        sx={{ width: 120, height: 120, fontSize: 48, marginTop: 2 }}
      >
        <AvatarInitials user={user} />
      </Avatar>
      <Typography
        level="h4"
        sx={{ display: { xs: "block", md: "none" }, marginTop: 2 }}
      >
        {user.firstName} {user.lastName}
      </Typography>
      <Grid container spacing={2} sx={{ marginTop: 2 }}>
        <Grid xs={6}>
          <Typography level="h5">ID</Typography>
          <Typography>{user.id}</Typography>
        </Grid>
        <Grid xs={6}>
          <Typography level="h5">Type</Typography>
          <Typography>{UserType[user.type]}</Typography>
        </Grid>
        <Grid xs={6}>
          <Typography level="h5">Google ID</Typography>
          <Typography>{user.oauthId}</Typography>
        </Grid>
        <Grid xs={6}>
          <Typography level="h5">Email</Typography>
          <Typography>{user.email}</Typography>
        </Grid>
        <Grid xs={6}>
          <Typography level="h5">Created At</Typography>
          <Typography>
            {format(Timestamp.toDate(user.createdAt!), "d MMM yyyy, HH:mm:ss")}
          </Typography>
        </Grid>
        <Grid xs={6}>
          <Typography level="h5">Updated At</Typography>
          <Typography>
            {format(Timestamp.toDate(user.updatedAt!), "d MMM yyyy, HH:mm:ss")}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
