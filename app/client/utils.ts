import type { ThrownResponse } from "@remix-run/react";

enum StatusCode {
  OK = 0,
  CANCELLED = 1,
  UNKNOWN = 2,
  INVALID_ARGUMENT = 3,
  DEADLINE_EXCEEDED = 4,
  NOT_FOUND = 5,
  ALREADY_EXISTS = 6,
  PERMISSION_DENIED = 7,
  UNAUTHENTICATED = 16,
  RESOURCE_EXHAUSTED = 8,
  FAILED_PRECONDITION = 9,
  ABORTED = 10,
  OUT_OF_RANGE = 11,
  UNIMPLEMENTED = 12,
  INTERNAL = 13,
  UNAVAILABLE = 14,
  DATA_LOSS = 15,
  DO_NOT_USE = -1,
}

type GrpcErrorMap = {
  [k: number]: ThrownResponse;
};

const grpcErrorMap: GrpcErrorMap = {
  [StatusCode.INVALID_ARGUMENT]: {
    status: 400,
    statusText: "Bad Request",
    data: {},
  },
  [StatusCode.DEADLINE_EXCEEDED]: {
    status: 504,
    statusText: "Gateway Timeout",
    data: {},
  },
  [StatusCode.NOT_FOUND]: {
    status: 404,
    statusText: "Not Found",
    data: {},
  },
  [StatusCode.ALREADY_EXISTS]: {
    status: 409,
    statusText: "Conflict",
    data: {},
  },
  [StatusCode.PERMISSION_DENIED]: {
    status: 403,
    statusText: "Forbidden",
    data: {},
  },
  [StatusCode.UNAUTHENTICATED]: {
    status: 401,
    statusText: "Unauthorized",
    data: {},
  },
  [StatusCode.FAILED_PRECONDITION]: {
    status: 412,
    statusText: "Precondition Failed",
    data: {},
  },
  [StatusCode.UNIMPLEMENTED]: {
    status: 501,
    statusText: "Not Implemented",
    data: {},
  },
  [StatusCode.UNAVAILABLE]: {
    status: 503,
    statusText: "Service Unavailable",
    data: {},
  },
};

export function mapGrpcError(error: Error): ThrownResponse | null {
  if (!error.stack?.startsWith("RpcError: ")) return null;

  const matches = error.message.match(/^(\d+) \w+: (.+)$/);
  if (!matches) return null;

  const code = Number(matches[1]);
  const template = grpcErrorMap[Number(code)];
  if (!template) return null;

  const message = matches[2];
  return { ...template, data: message };
}
