import { Application } from "../../../server/applications/entities";
import { ErrorData } from "../../../server/types/ErrorResponse";

export interface ApplicationProps {
    application: Application
    setApplication: Function
    CreateUser: Function
    CreateVehicle: Function
    applicationErrors: ErrorData[]
}