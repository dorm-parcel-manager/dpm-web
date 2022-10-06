import { Avatar, Box, Button, Grid, Typography } from "@mui/joy";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Link,
  useLoaderData,
  useNavigate,
  useSubmit,
  useTransition,
} from "@remix-run/react";
import { format } from "date-fns";

import { MdArrowBackIosNew, MdDelete, MdEdit } from "react-icons/md";
import { getGrpcContext } from "~/auth/utils";
import { userServiceClient } from "~/client";
import { AvatarInitials } from "~/components/AvatarInitials";
import { FadeModal } from "~/components/Modals";
import { useDisclosure } from "~/hooks/useDisclosure";
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

export async function action({ request, params }: ActionArgs) {
  switch (request.method) {
    case "DELETE": {
      const context = await getGrpcContext(request);
      const id = parseInt(params.userId as string);
      await userServiceClient.deleteUser({ context, id }).response;
      return redirect("/users");
    }
    default: {
      throw new Response("Method Not Allowed", {
        status: 405,
        statusText: "Method Not Allowed",
      });
    }
  }
}

export default function UserDetail() {
  const user = useLoaderData<LoaderData>();
  const navigate = useNavigate();
  const deleteModal = useDisclosure();
  const submit = useSubmit();
  const transition = useTransition();
  const isLoading = transition.state !== "idle";

  const onCancelDelete = () => {
    if (isLoading) return;
    deleteModal.onClose();
  };

  const onConfirmDelete = () => {
    submit({}, { method: "delete" });
  };

  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "baseline" }}>
        <Button
          onClick={() => navigate(-1)}
          size="sm"
          disabled={isLoading}
          sx={{ marginRight: 2 }}
        >
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
          disabled={isLoading}
          startDecorator={<MdEdit />}
          sx={{ marginRight: 2 }}
        >
          Edit
        </Button>
        <Button
          onClick={deleteModal.onOpen}
          color="danger"
          size="sm"
          disabled={isLoading}
          startDecorator={<MdDelete />}
        >
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
      <FadeModal open={deleteModal.isOpen} onClose={onCancelDelete}>
        <div>
          <Typography level="h4">Delete User</Typography>
          <Typography sx={{ marginTop: 2 }}>
            Are you sure you want to delete this user?
          </Typography>
          <Box
            sx={{ display: "flex", justifyContent: "flex-end", marginTop: 2 }}
          >
            <Button
              variant="soft"
              color="neutral"
              onClick={onCancelDelete}
              disabled={isLoading}
              sx={{ marginRight: 2 }}
            >
              Cancel
            </Button>
            <Button
              color="danger"
              onClick={onConfirmDelete}
              disabled={isLoading}
            >
              Delete
            </Button>
          </Box>
        </div>
      </FadeModal>
    </div>
  );
}
