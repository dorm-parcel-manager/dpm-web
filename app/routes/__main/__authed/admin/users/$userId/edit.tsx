import { Box, Button, Option, Select, Typography } from "@mui/joy";
import type { ActionArgs, LoaderArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  useLoaderData,
  useNavigate,
  useSubmit,
  useTransition,
} from "@remix-run/react";
import type { SubmitHandler } from "react-hook-form";
import { Controller, useForm } from "react-hook-form";
import { MdClose, MdSave } from "react-icons/md";
import { getGrpcContext } from "~/auth/utils";
import { userServiceClient } from "~/client";
import { UserType } from "~/proto/common";
import type { User } from "~/proto/user-service";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { objectFromFormData, objectToFormData } from "~/utils";

type LoaderData = User;

const schema = z.object({
  type: z.enum(["student", "staff", "admin"]),
});

type Schema = z.infer<typeof schema>;

export async function loader({ request, params }: LoaderArgs) {
  const context = await getGrpcContext(request);
  const id = parseInt(params.userId as string);
  const response = await userServiceClient.getUser({ context, id }).response;
  const user = response.user!;
  return json<LoaderData>(user);
}

export async function action({ request, params }: ActionArgs) {
  const context = await getGrpcContext(request);
  const id = parseInt(params.userId as string);

  const form = await request.formData();
  const data = schema.parse(objectFromFormData(form));
  const user = (await userServiceClient.getUser({ context, id }).response)
    .user!;
  const updateRequest = {
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    picture: user.picture,
    type: mapUserTypeFromSchema(data.type),
  };
  await userServiceClient.updateUser({ context, id, data: updateRequest });
  return redirect(`/users/${id}`);
}

export default function EditUser() {
  const user = useLoaderData<LoaderData>();
  const navigate = useNavigate();
  const submit = useSubmit();
  const transition = useTransition();
  const isLoading = transition.state !== "idle";
  const { control, handleSubmit } = useForm({
    resolver: zodResolver(schema),
    defaultValues: { type: mapUserTypeToSchema(user.type) } as Schema,
  });

  const onSubmit: SubmitHandler<Schema> = (data) => {
    submit(objectToFormData(data), { method: "post" });
  };

  return (
    <div>
      <Typography level="h4">Edit User</Typography>
      <Typography level="h5">
        {user.firstName} {user.lastName}
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography level="h6">Type</Typography>
        <Controller
          control={control}
          name="type"
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error },
            formState,
          }) => (
            <Select
              ref={ref}
              name={name}
              value={value}
              onBlur={onBlur}
              onChange={(e, newValue) => onChange(newValue)}
            >
              <Option value="student">Student</Option>
              <Option value="staff">Staff</Option>
              <Option value="admin">Admin</Option>
            </Select>
          )}
        />
        <Box sx={{ display: "flex" }}>
          <Button
            type="submit"
            color="success"
            disabled={isLoading}
            startDecorator={<MdSave />}
            sx={{ marginRight: 2 }}
          >
            Save
          </Button>
          <Button
            onClick={() => navigate(-1)}
            color="danger"
            disabled={isLoading}
            startDecorator={<MdClose />}
          >
            Cancel
          </Button>
        </Box>
      </form>
    </div>
  );
}

function mapUserTypeToSchema(type: UserType): Schema["type"] {
  switch (type) {
    case UserType.TYPE_STUDENT:
      return "student";
    case UserType.TYPE_STAFF:
      return "staff";
    case UserType.TYPE_ADMIN:
      return "admin";
  }
}

function mapUserTypeFromSchema(type: Schema["type"]): UserType {
  switch (type) {
    case "student":
      return UserType.TYPE_STUDENT;
    case "staff":
      return UserType.TYPE_STAFF;
    case "admin":
      return UserType.TYPE_ADMIN;
  }
}
