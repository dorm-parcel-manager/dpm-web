export type ToastType = "success" | "error";

export interface ToastData {
  type: ToastType;
  message: string;
}
