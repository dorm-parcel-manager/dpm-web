import { ParcelStatus } from "~/proto/parcel-service";

export function getParcelStatus(status: ParcelStatus) {
  switch (status) {
    case ParcelStatus.PARCEL_REGISTERED:
      return "Registered";
    case ParcelStatus.PARCEL_ARRIVED:
      return "Arrived";
    case ParcelStatus.PARCEL_PICKED_UP:
      return "Picked up";
  }
}
