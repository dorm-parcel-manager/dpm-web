// @generated by protobuf-ts 2.8.1 with parameter long_type_string
// @generated from protobuf file "parcel-service.proto" (package "pb", syntax proto3)
// tslint:disable
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { ParcelService } from "./parcel-service";
import type { StudentClaimParcelRequest } from "./parcel-service";
import type { StaffAcceptDeliveryRequest } from "./parcel-service";
import type { DeleteParcelRequest } from "./parcel-service";
import type { UpdateParcelRequest } from "./parcel-service";
import type { Empty } from "./common";
import type { CreateParcelRequest } from "./parcel-service";
import type { GetParcelResponse } from "./parcel-service";
import type { GetParcelRequest } from "./parcel-service";
import type { StaffGetParcelsResponse } from "./parcel-service";
import type { StaffGetParcelsRequest } from "./parcel-service";
import type { StudentGetParcelsResponse } from "./parcel-service";
import type { StudentGetParcelsRequest } from "./parcel-service";
import type { GetParcelsResponse } from "./parcel-service";
import type { GetParcelsRequest } from "./parcel-service";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { HelloResponse } from "./common";
import type { HelloRequest } from "./common";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";
/**
 * @generated from protobuf service pb.ParcelService
 */
export interface IParcelServiceClient {
    /**
     * @generated from protobuf rpc: Hello(pb.HelloRequest) returns (pb.HelloResponse);
     */
    hello(input: HelloRequest, options?: RpcOptions): UnaryCall<HelloRequest, HelloResponse>;
    /**
     * @generated from protobuf rpc: GetParcels(pb.GetParcelsRequest) returns (pb.GetParcelsResponse);
     */
    getParcels(input: GetParcelsRequest, options?: RpcOptions): UnaryCall<GetParcelsRequest, GetParcelsResponse>;
    /**
     * @generated from protobuf rpc: StudentGetParcels(pb.StudentGetParcelsRequest) returns (pb.StudentGetParcelsResponse);
     */
    studentGetParcels(input: StudentGetParcelsRequest, options?: RpcOptions): UnaryCall<StudentGetParcelsRequest, StudentGetParcelsResponse>;
    /**
     * @generated from protobuf rpc: StaffGetParcels(pb.StaffGetParcelsRequest) returns (pb.StaffGetParcelsResponse);
     */
    staffGetParcels(input: StaffGetParcelsRequest, options?: RpcOptions): UnaryCall<StaffGetParcelsRequest, StaffGetParcelsResponse>;
    /**
     * @generated from protobuf rpc: GetParcel(pb.GetParcelRequest) returns (pb.GetParcelResponse);
     */
    getParcel(input: GetParcelRequest, options?: RpcOptions): UnaryCall<GetParcelRequest, GetParcelResponse>;
    /**
     * @generated from protobuf rpc: CreateParcel(pb.CreateParcelRequest) returns (pb.Empty);
     */
    createParcel(input: CreateParcelRequest, options?: RpcOptions): UnaryCall<CreateParcelRequest, Empty>;
    /**
     * @generated from protobuf rpc: UpdateParcel(pb.UpdateParcelRequest) returns (pb.Empty);
     */
    updateParcel(input: UpdateParcelRequest, options?: RpcOptions): UnaryCall<UpdateParcelRequest, Empty>;
    /**
     * @generated from protobuf rpc: DeleteParcel(pb.DeleteParcelRequest) returns (pb.Empty);
     */
    deleteParcel(input: DeleteParcelRequest, options?: RpcOptions): UnaryCall<DeleteParcelRequest, Empty>;
    /**
     * @generated from protobuf rpc: StaffAcceptDelivery(pb.StaffAcceptDeliveryRequest) returns (pb.Empty);
     */
    staffAcceptDelivery(input: StaffAcceptDeliveryRequest, options?: RpcOptions): UnaryCall<StaffAcceptDeliveryRequest, Empty>;
    /**
     * @generated from protobuf rpc: StudentClaimParcel(pb.StudentClaimParcelRequest) returns (pb.Empty);
     */
    studentClaimParcel(input: StudentClaimParcelRequest, options?: RpcOptions): UnaryCall<StudentClaimParcelRequest, Empty>;
}
/**
 * @generated from protobuf service pb.ParcelService
 */
export class ParcelServiceClient implements IParcelServiceClient, ServiceInfo {
    typeName = ParcelService.typeName;
    methods = ParcelService.methods;
    options = ParcelService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * @generated from protobuf rpc: Hello(pb.HelloRequest) returns (pb.HelloResponse);
     */
    hello(input: HelloRequest, options?: RpcOptions): UnaryCall<HelloRequest, HelloResponse> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<HelloRequest, HelloResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: GetParcels(pb.GetParcelsRequest) returns (pb.GetParcelsResponse);
     */
    getParcels(input: GetParcelsRequest, options?: RpcOptions): UnaryCall<GetParcelsRequest, GetParcelsResponse> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<GetParcelsRequest, GetParcelsResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: StudentGetParcels(pb.StudentGetParcelsRequest) returns (pb.StudentGetParcelsResponse);
     */
    studentGetParcels(input: StudentGetParcelsRequest, options?: RpcOptions): UnaryCall<StudentGetParcelsRequest, StudentGetParcelsResponse> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<StudentGetParcelsRequest, StudentGetParcelsResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: StaffGetParcels(pb.StaffGetParcelsRequest) returns (pb.StaffGetParcelsResponse);
     */
    staffGetParcels(input: StaffGetParcelsRequest, options?: RpcOptions): UnaryCall<StaffGetParcelsRequest, StaffGetParcelsResponse> {
        const method = this.methods[3], opt = this._transport.mergeOptions(options);
        return stackIntercept<StaffGetParcelsRequest, StaffGetParcelsResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: GetParcel(pb.GetParcelRequest) returns (pb.GetParcelResponse);
     */
    getParcel(input: GetParcelRequest, options?: RpcOptions): UnaryCall<GetParcelRequest, GetParcelResponse> {
        const method = this.methods[4], opt = this._transport.mergeOptions(options);
        return stackIntercept<GetParcelRequest, GetParcelResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: CreateParcel(pb.CreateParcelRequest) returns (pb.Empty);
     */
    createParcel(input: CreateParcelRequest, options?: RpcOptions): UnaryCall<CreateParcelRequest, Empty> {
        const method = this.methods[5], opt = this._transport.mergeOptions(options);
        return stackIntercept<CreateParcelRequest, Empty>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: UpdateParcel(pb.UpdateParcelRequest) returns (pb.Empty);
     */
    updateParcel(input: UpdateParcelRequest, options?: RpcOptions): UnaryCall<UpdateParcelRequest, Empty> {
        const method = this.methods[6], opt = this._transport.mergeOptions(options);
        return stackIntercept<UpdateParcelRequest, Empty>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: DeleteParcel(pb.DeleteParcelRequest) returns (pb.Empty);
     */
    deleteParcel(input: DeleteParcelRequest, options?: RpcOptions): UnaryCall<DeleteParcelRequest, Empty> {
        const method = this.methods[7], opt = this._transport.mergeOptions(options);
        return stackIntercept<DeleteParcelRequest, Empty>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: StaffAcceptDelivery(pb.StaffAcceptDeliveryRequest) returns (pb.Empty);
     */
    staffAcceptDelivery(input: StaffAcceptDeliveryRequest, options?: RpcOptions): UnaryCall<StaffAcceptDeliveryRequest, Empty> {
        const method = this.methods[8], opt = this._transport.mergeOptions(options);
        return stackIntercept<StaffAcceptDeliveryRequest, Empty>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: StudentClaimParcel(pb.StudentClaimParcelRequest) returns (pb.Empty);
     */
    studentClaimParcel(input: StudentClaimParcelRequest, options?: RpcOptions): UnaryCall<StudentClaimParcelRequest, Empty> {
        const method = this.methods[9], opt = this._transport.mergeOptions(options);
        return stackIntercept<StudentClaimParcelRequest, Empty>("unary", this._transport, method, opt, input);
    }
}
