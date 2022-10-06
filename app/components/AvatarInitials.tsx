import type { UserInfo } from "~/proto/user-service";

interface Props {
  user: UserInfo;
}

export function AvatarInitials({ user }: Props) {
  return (
    <>
      {user.firstName.substring(0, 1)}
      {user.lastName.substring(0, 1)}
    </>
  );
}
