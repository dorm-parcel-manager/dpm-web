import { GrpcTransport } from "@protobuf-ts/grpc-transport";
import { CLIENT_PARCELSERVICEURL, CLIENT_USERSERVICEURL } from "~/env";
import { ChannelCredentials } from "@grpc/grpc-js";
import { UserServiceClient } from "~/proto/user-service-client";
import { ParcelServiceClient } from "~/proto/parcel-service-client";

export * from "./utils";

export const userServiceClient = new UserServiceClient(
  new GrpcTransport({
    host: CLIENT_USERSERVICEURL,
    channelCredentials: ChannelCredentials.createInsecure(),
  })
);

export const parcelServiceClient = new ParcelServiceClient(
  new GrpcTransport({
    host: CLIENT_PARCELSERVICEURL,
    channelCredentials: ChannelCredentials.createInsecure(),
  })
);
