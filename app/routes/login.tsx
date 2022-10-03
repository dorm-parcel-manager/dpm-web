import { Button } from "@mui/joy";
import { Form } from "@remix-run/react";

export default function Login() {
  return (
    <Form action="/auth/google" method="post">
      <Button type="submit">Login with Google</Button>
    </Form>
  );
}
