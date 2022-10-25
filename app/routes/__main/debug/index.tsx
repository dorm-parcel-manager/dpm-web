import { Button, List, ListItem, ListItemButton, Typography } from "@mui/joy";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useLoaderData, useTransition } from "@remix-run/react";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { getUserOptional } from "~/auth/utils";
import { userServiceClient } from "~/client";
import { FadeModal } from "~/components/Modals";
import { useDisclosure } from "~/hooks/useDisclosure";
import { UserType } from "~/proto/common";
import type { User, UserInfo } from "~/proto/user-service";
import { authenticator } from "~/services/auth.server";
import { commitSession, getSession } from "~/services/session.server";

interface LoaderData {
  user: UserInfo | null;
  users: User[];
}

async function requireDebugMode(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  const debugModeEnabled = session.get("debugMode") === true;
  if (!debugModeEnabled) {
    throw redirect("/debug/enable");
  }
}

export async function loader({ request }: LoaderArgs) {
  await requireDebugMode(request);

  const user = await getUserOptional(request);
  const { users } = await userServiceClient.getUsers({
    context: {
      userId: 1,
      userType: UserType.TYPE_ADMIN,
    },
  }).response;

  return json<LoaderData>({
    user,
    users,
  });
}

export async function action({ request }: ActionArgs) {
  await requireDebugMode(request);

  const form = await request.clone().formData();
  switch (form.get("a")) {
    case "disable":
      return await disable(request);
    case "mockAuth":
      return await mockAuth(request, form);
  }
}

async function mockAuth(request: Request, form: FormData) {
  const userId = Number(form.get("userId") as string | null);
  if (isNaN(userId)) {
    await authenticator.logout(request, { redirectTo: "/debug" });
  }

  return authenticator.authenticate("mock-auth", request, {
    successRedirect: "/debug",
    failureRedirect: "/debug",
  });
}

async function disable(request: Request) {
  const session = await getSession(request.headers.get("Cookie"));
  session.unset("debugMode");
  throw redirect("/debug", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function DebugMenu() {
  const data = useLoaderData<LoaderData>();
  const mockAuthModal = useDisclosure();
  const { state } = useTransition();
  const isSubmitting = state === "submitting";
  const { onClose } = mockAuthModal;

  useEffect(() => {
    if (isSubmitting) {
      onClose();
    }
  }, [onClose, isSubmitting]);

  return (
    <div>
      <Typography level="h1">Debug Menu</Typography>
      <Form method="post">
        <input type="hidden" name="a" value="disable" />
        <Button type="submit">Disable</Button>
      </Form>
      <hr />
      <Typography level="h2">Auth</Typography>
      {data.user ? (
        <div>
          <pre>{JSON.stringify(data.user, null, 2)}</pre>
        </div>
      ) : (
        <div>
          <Typography>Not logged in</Typography>
        </div>
      )}
      <Button onClick={mockAuthModal.onOpen}>Mock auth user</Button>
      <FadeModal open={mockAuthModal.isOpen} onClose={mockAuthModal.onClose}>
        <div>
          <Typography level="h4">Choose user</Typography>
          <List>
            <MockAuthOption value={null}>Unauthenticated</MockAuthOption>
            {data.users.map((user) => (
              <MockAuthOption key={user.id} value={user.id}>
                {user.id} {user.firstName} {user.lastName}
              </MockAuthOption>
            ))}
          </List>
        </div>
      </FadeModal>
    </div>
  );
}

function MockAuthOption({
  value,
  children,
}: {
  value: number | null;
  children: ReactNode;
}) {
  return (
    <Form method="post">
      <input type="hidden" name="a" value="mockAuth" />
      <input type="hidden" name="userId" value={`${value}`} />
      <ListItem>
        <ListItemButton component="button" type="submit">
          {children}
        </ListItemButton>
      </ListItem>
    </Form>
  );
}
