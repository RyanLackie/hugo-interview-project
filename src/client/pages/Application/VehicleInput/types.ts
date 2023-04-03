import { Application } from "../../../../server/applications/entities";
import { ErrorData } from "../../../../server/types/ErrorResponse";
import { Vehicle } from "../../../../server/vehicles/entities";

export interface VehicleInputConnectorProps {
    vehicle: Vehicle
    application: Application
    setApplication: Function
    vehicleErrors: ErrorData[]
}

export interface VehicleInputProps {
    vehicle: Vehicle
    SetVehicle: Function
    DeleteVehicle: Function
    vehicleErrors: ErrorData[]
}
