// @generated by protobuf-ts 2.8.1
// @generated from protobuf file "parcel-service.proto" (package "pb", syntax proto3)
// tslint:disable
import { HelloResponse } from "./common";
import { HelloRequest } from "./common";
import { ServiceType } from "@protobuf-ts/runtime-rpc";
/**
 * @generated ServiceType for protobuf service pb.ParcelService
 */
export const ParcelService = new ServiceType("pb.ParcelService", [
    { name: "Hello", options: {}, I: HelloRequest, O: HelloResponse }
]);