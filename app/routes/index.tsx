import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { userServiceClient } from "~/client";
import type { HelloResponse } from "~/proto/common";

type LoaderData = HelloResponse;

export const loader: LoaderFunction = async () => {
  const result = await userServiceClient.hello({ name: "Remix" });
  return json<LoaderData>(result.response);
};

export default function Index() {
  const data = useLoaderData<LoaderData>();
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      {data.message}
    </div>
  );
}
