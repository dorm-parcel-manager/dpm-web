import { GrpcTransport } from "@protobuf-ts/grpc-transport";
import { USER_SERVICE } from "~/env";
import { ChannelCredentials } from "@grpc/grpc-js";
import { UserServiceClient } from "~/proto/user-service-client";

export const userServiceClient = new UserServiceClient(
  new GrpcTransport({
    host: USER_SERVICE,
    channelCredentials: ChannelCredentials.createInsecure(),
  })
);
