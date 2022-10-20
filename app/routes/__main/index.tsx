import type { LoaderFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { getUser } from "~/auth/utils";
import { UserType } from "~/proto/common";

export const loader: LoaderFunction = async ({ request }) => {
  const user = await getUser(request);
  switch (user.type) {
    case UserType.TYPE_STUDENT:
      return redirect("/parcels");
    case UserType.TYPE_STAFF:
      return redirect("/staff/dashboard");
    case UserType.TYPE_ADMIN:
      return redirect("/admin/users");
  }
};

export default function Index() {
  return null;
}
