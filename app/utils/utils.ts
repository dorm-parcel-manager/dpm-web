import { z } from "zod";
import { UserType } from "~/proto/common";

export const userTypeSchema = z.enum(["student", "staff", "admin"]);

export type UserTypeSchema = z.infer<typeof userTypeSchema>;

export function mapUserTypeToSchema(type: UserType): UserTypeSchema {
  switch (type) {
    case UserType.TYPE_STUDENT:
      return "student";
    case UserType.TYPE_STAFF:
      return "staff";
    case UserType.TYPE_ADMIN:
      return "admin";
  }
}

export function mapUserTypeFromSchema(type: UserTypeSchema): UserType {
  switch (type) {
    case "student":
      return UserType.TYPE_STUDENT;
    case "staff":
      return UserType.TYPE_STAFF;
    case "admin":
      return UserType.TYPE_ADMIN;
  }
}
