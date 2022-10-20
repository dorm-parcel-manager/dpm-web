import type { ActionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form } from "@remix-run/react";
import { DEBUG_MODE_PASSWORD } from "~/env";
import { commitSession, getSession } from "~/services/session.server";

export async function action({ request }: ActionArgs) {
  const form = await request.formData();
  const password = form.get("password") as string | null;

  if (password !== DEBUG_MODE_PASSWORD) {
    throw new Response("Invalid password", { status: 401 });
  }

  const session = await getSession(request.headers.get("Cookie"));
  session.set("debugMode", true);

  return redirect("/debug", {
    headers: {
      "Set-Cookie": await commitSession(session),
    },
  });
}

export default function EnableDebugMode() {
  return (
    <Form method="post">
      <label htmlFor="password">Password</label>
      <input type="password" name="password" />
      <button type="submit">Enable</button>
    </Form>
  );
}
