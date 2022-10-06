import { List, ListItem, ListItemButton, Typography } from "@mui/joy";
import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { getGrpcContext } from "~/auth/utils";
import { userServiceClient } from "~/client";
import type { User } from "~/proto/user-service";

type LoaderData = User[];

export async function loader({ request }: LoaderArgs) {
  const context = await getGrpcContext(request);
  const { users } = await userServiceClient.getUsers({
    context,
  }).response;
  return json<LoaderData>(users);
}

export default function Users() {
  const users = useLoaderData<LoaderData>();
  return (
    <div>
      <Typography level="h4">Users</Typography>
      <List>
        {users.map((user) => (
          <ListItem key={user.id}>
            <ListItemButton component={Link} to={`${user.id}`}>
              {user.id} {user.firstName} {user.lastName}
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
