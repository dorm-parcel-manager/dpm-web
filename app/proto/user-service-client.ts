// @generated by protobuf-ts 2.8.1 with parameter long_type_string
// @generated from protobuf file "user-service.proto" (package "pb", syntax proto3)
// tslint:disable
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { UserService } from "./user-service";
import type { DeleteUserRequest } from "./user-service";
import type { UpdateUserInfoRequest } from "./user-service";
import type { Empty } from "./common";
import type { UpdateUserRequest } from "./user-service";
import type { GetUserResponse } from "./user-service";
import type { GetUserRequest } from "./user-service";
import type { GetUsersResponse } from "./user-service";
import type { GetUsersRequest } from "./user-service";
import type { BatchGetUserInfoResponse } from "./user-service";
import type { BatchGetUserInfoRequest } from "./user-service";
import type { UserInfo } from "./user-service";
import type { GetUserInfoRequest } from "./user-service";
import type { User } from "./user-service";
import type { GetUserForAuthRequest } from "./user-service";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { HelloResponse } from "./common";
import type { HelloRequest } from "./common";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";
/**
 * @generated from protobuf service pb.UserService
 */
export interface IUserServiceClient {
    /**
     * @generated from protobuf rpc: Hello(pb.HelloRequest) returns (pb.HelloResponse);
     */
    hello(input: HelloRequest, options?: RpcOptions): UnaryCall<HelloRequest, HelloResponse>;
    /**
     * @generated from protobuf rpc: GetUserForAuth(pb.GetUserForAuthRequest) returns (pb.User);
     */
    getUserForAuth(input: GetUserForAuthRequest, options?: RpcOptions): UnaryCall<GetUserForAuthRequest, User>;
    /**
     * @generated from protobuf rpc: GetUserInfo(pb.GetUserInfoRequest) returns (pb.UserInfo);
     */
    getUserInfo(input: GetUserInfoRequest, options?: RpcOptions): UnaryCall<GetUserInfoRequest, UserInfo>;
    /**
     * @generated from protobuf rpc: BatchGetUserInfo(pb.BatchGetUserInfoRequest) returns (pb.BatchGetUserInfoResponse);
     */
    batchGetUserInfo(input: BatchGetUserInfoRequest, options?: RpcOptions): UnaryCall<BatchGetUserInfoRequest, BatchGetUserInfoResponse>;
    /**
     * @generated from protobuf rpc: GetUsers(pb.GetUsersRequest) returns (pb.GetUsersResponse);
     */
    getUsers(input: GetUsersRequest, options?: RpcOptions): UnaryCall<GetUsersRequest, GetUsersResponse>;
    /**
     * @generated from protobuf rpc: GetUser(pb.GetUserRequest) returns (pb.GetUserResponse);
     */
    getUser(input: GetUserRequest, options?: RpcOptions): UnaryCall<GetUserRequest, GetUserResponse>;
    /**
     * @generated from protobuf rpc: UpdateUser(pb.UpdateUserRequest) returns (pb.Empty);
     */
    updateUser(input: UpdateUserRequest, options?: RpcOptions): UnaryCall<UpdateUserRequest, Empty>;
    /**
     * @generated from protobuf rpc: UpdateUserInfo(pb.UpdateUserInfoRequest) returns (pb.Empty);
     */
    updateUserInfo(input: UpdateUserInfoRequest, options?: RpcOptions): UnaryCall<UpdateUserInfoRequest, Empty>;
    /**
     * @generated from protobuf rpc: DeleteUser(pb.DeleteUserRequest) returns (pb.Empty);
     */
    deleteUser(input: DeleteUserRequest, options?: RpcOptions): UnaryCall<DeleteUserRequest, Empty>;
}
/**
 * @generated from protobuf service pb.UserService
 */
export class UserServiceClient implements IUserServiceClient, ServiceInfo {
    typeName = UserService.typeName;
    methods = UserService.methods;
    options = UserService.options;
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
     * @generated from protobuf rpc: GetUserForAuth(pb.GetUserForAuthRequest) returns (pb.User);
     */
    getUserForAuth(input: GetUserForAuthRequest, options?: RpcOptions): UnaryCall<GetUserForAuthRequest, User> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<GetUserForAuthRequest, User>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: GetUserInfo(pb.GetUserInfoRequest) returns (pb.UserInfo);
     */
    getUserInfo(input: GetUserInfoRequest, options?: RpcOptions): UnaryCall<GetUserInfoRequest, UserInfo> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<GetUserInfoRequest, UserInfo>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: BatchGetUserInfo(pb.BatchGetUserInfoRequest) returns (pb.BatchGetUserInfoResponse);
     */
    batchGetUserInfo(input: BatchGetUserInfoRequest, options?: RpcOptions): UnaryCall<BatchGetUserInfoRequest, BatchGetUserInfoResponse> {
        const method = this.methods[3], opt = this._transport.mergeOptions(options);
        return stackIntercept<BatchGetUserInfoRequest, BatchGetUserInfoResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: GetUsers(pb.GetUsersRequest) returns (pb.GetUsersResponse);
     */
    getUsers(input: GetUsersRequest, options?: RpcOptions): UnaryCall<GetUsersRequest, GetUsersResponse> {
        const method = this.methods[4], opt = this._transport.mergeOptions(options);
        return stackIntercept<GetUsersRequest, GetUsersResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: GetUser(pb.GetUserRequest) returns (pb.GetUserResponse);
     */
    getUser(input: GetUserRequest, options?: RpcOptions): UnaryCall<GetUserRequest, GetUserResponse> {
        const method = this.methods[5], opt = this._transport.mergeOptions(options);
        return stackIntercept<GetUserRequest, GetUserResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: UpdateUser(pb.UpdateUserRequest) returns (pb.Empty);
     */
    updateUser(input: UpdateUserRequest, options?: RpcOptions): UnaryCall<UpdateUserRequest, Empty> {
        const method = this.methods[6], opt = this._transport.mergeOptions(options);
        return stackIntercept<UpdateUserRequest, Empty>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: UpdateUserInfo(pb.UpdateUserInfoRequest) returns (pb.Empty);
     */
    updateUserInfo(input: UpdateUserInfoRequest, options?: RpcOptions): UnaryCall<UpdateUserInfoRequest, Empty> {
        const method = this.methods[7], opt = this._transport.mergeOptions(options);
        return stackIntercept<UpdateUserInfoRequest, Empty>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: DeleteUser(pb.DeleteUserRequest) returns (pb.Empty);
     */
    deleteUser(input: DeleteUserRequest, options?: RpcOptions): UnaryCall<DeleteUserRequest, Empty> {
        const method = this.methods[8], opt = this._transport.mergeOptions(options);
        return stackIntercept<DeleteUserRequest, Empty>("unary", this._transport, method, opt, input);
    }
}
