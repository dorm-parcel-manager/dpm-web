// @generated by protobuf-ts 2.8.1 with parameter long_type_string
// @generated from protobuf file "common.proto" (package "pb", syntax proto3)
// tslint:disable
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MESSAGE_TYPE } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
/**
 * @generated from protobuf message pb.Context
 */
export interface Context {
    /**
     * @generated from protobuf field: uint32 userId = 1;
     */
    userId: number;
    /**
     * @generated from protobuf field: pb.UserType userType = 2;
     */
    userType: UserType;
}
/**
 * @generated from protobuf message pb.Empty
 */
export interface Empty {
}
/**
 * @generated from protobuf message pb.HelloRequest
 */
export interface HelloRequest {
    /**
     * @generated from protobuf field: string name = 1;
     */
    name: string;
}
/**
 * @generated from protobuf message pb.HelloResponse
 */
export interface HelloResponse {
    /**
     * @generated from protobuf field: string message = 1;
     */
    message: string;
}
/**
 * @generated from protobuf enum pb.UserType
 */
export enum UserType {
    /**
     * @generated from protobuf enum value: TYPE_STUDENT = 0;
     */
    TYPE_STUDENT = 0,
    /**
     * @generated from protobuf enum value: TYPE_STAFF = 1;
     */
    TYPE_STAFF = 1,
    /**
     * @generated from protobuf enum value: TYPE_ADMIN = 2;
     */
    TYPE_ADMIN = 2
}
// @generated message type with reflection information, may provide speed optimized methods
class Context$Type extends MessageType<Context> {
    constructor() {
        super("pb.Context", [
            { no: 1, name: "userId", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 2, name: "userType", kind: "enum", T: () => ["pb.UserType", UserType] }
        ]);
    }
    create(value?: PartialMessage<Context>): Context {
        const message = { userId: 0, userType: 0 };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<Context>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Context): Context {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* uint32 userId */ 1:
                    message.userId = reader.uint32();
                    break;
                case /* pb.UserType userType */ 2:
                    message.userType = reader.int32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: Context, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* uint32 userId = 1; */
        if (message.userId !== 0)
            writer.tag(1, WireType.Varint).uint32(message.userId);
        /* pb.UserType userType = 2; */
        if (message.userType !== 0)
            writer.tag(2, WireType.Varint).int32(message.userType);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message pb.Context
 */
export const Context = new Context$Type();
// @generated message type with reflection information, may provide speed optimized methods
class Empty$Type extends MessageType<Empty> {
    constructor() {
        super("pb.Empty", []);
    }
    create(value?: PartialMessage<Empty>): Empty {
        const message = {};
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<Empty>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: Empty): Empty {
        return target ?? this.create();
    }
    internalBinaryWrite(message: Empty, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message pb.Empty
 */
export const Empty = new Empty$Type();
// @generated message type with reflection information, may provide speed optimized methods
class HelloRequest$Type extends MessageType<HelloRequest> {
    constructor() {
        super("pb.HelloRequest", [
            { no: 1, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<HelloRequest>): HelloRequest {
        const message = { name: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<HelloRequest>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: HelloRequest): HelloRequest {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string name */ 1:
                    message.name = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: HelloRequest, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string name = 1; */
        if (message.name !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.name);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message pb.HelloRequest
 */
export const HelloRequest = new HelloRequest$Type();
// @generated message type with reflection information, may provide speed optimized methods
class HelloResponse$Type extends MessageType<HelloResponse> {
    constructor() {
        super("pb.HelloResponse", [
            { no: 1, name: "message", kind: "scalar", T: 9 /*ScalarType.STRING*/ }
        ]);
    }
    create(value?: PartialMessage<HelloResponse>): HelloResponse {
        const message = { message: "" };
        globalThis.Object.defineProperty(message, MESSAGE_TYPE, { enumerable: false, value: this });
        if (value !== undefined)
            reflectionMergePartial<HelloResponse>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: HelloResponse): HelloResponse {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string message */ 1:
                    message.message = reader.string();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: HelloResponse, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string message = 1; */
        if (message.message !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.message);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message pb.HelloResponse
 */
export const HelloResponse = new HelloResponse$Type();
