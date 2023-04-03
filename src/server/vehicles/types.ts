import { ErrorResponse } from "../types/ErrorResponse";
import { Vehicle } from "./entities";

export interface VehicleType extends Pick<
    Vehicle, "application"|"vin"|"year"|"make"|"model"
> {}

export class VehicleNotFoundError extends ErrorResponse {
    constructor(message: string | undefined = undefined) {
        super(message || 'No Vehicle found.', 404);
    }
}
