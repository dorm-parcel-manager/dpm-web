import { Button, FormLabel, Input, Typography } from "@mui/joy";
import { FormControl } from "@mui/material";
import { Stack } from "@mui/system";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
import { MdSave } from "react-icons/md";
import { z } from "zod";
import { getGrpcContext } from "~/auth/utils";
import { userServiceClient } from "~/client";
import { BackButton } from "~/components/BackButton";
import type { UserInfo } from "~/proto/user-service";
import { objectFromFormData } from "~/utils";

type LoaderData = UserInfo;

export async function loader({ request }: LoaderArgs) {
  const context = await getGrpcContext(request);
  const userInfo = await userServiceClient.getUserInfo({ id: context.userId })
    .response;
  return json<LoaderData>(userInfo);
}

const schema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  picture: z.string(),
});

export async function action({ request }: ActionArgs) {
  switch (request.method) {
    case "POST": {
      const context = await getGrpcContext(request);
      const form = await request.formData();
      const data = schema.parse(objectFromFormData(form));
      await userServiceClient.updateUserInfo({
        context,
        data,
      });
      return redirect("/parcels");
    }
    default: {
      throw new Response("Method Not Allowed", {
        status: 405,
        statusText: "Method Not Allowed",
      });
    }
  }
}

export default function Profile() {
  const userInfo = useLoaderData<LoaderData>();
  return (
    <Stack gap={2}>
      <Stack gap={2} direction="row" alignItems="center">
        <BackButton />
        <Typography level="h4" component="h1">
          Profile
        </Typography>
      </Stack>
      <Form method="post">
        <Stack gap={2.5}>
          <FormControl fullWidth>
            <FormLabel>Firstname</FormLabel>
            <Input name="firstName" defaultValue={userInfo.firstName} />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel>Lastname</FormLabel>
            <Input name="lastName" defaultValue={userInfo.lastName} />
          </FormControl>
          <FormControl>
            <Input name="picture" sx={{ display: "none" }} defaultValue="" />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            color="success"
            startDecorator={<MdSave />}
          >
            Save
          </Button>
        </Stack>
      </Form>
    </Stack>
  );
}
