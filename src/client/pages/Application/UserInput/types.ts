import { Application } from "../../../../server/applications/entities";
import { ErrorData } from "../../../../server/types/ErrorResponse";
import { User } from "../../../../server/users/entities";

export interface UserInputConnectorProps {
    user: User
    index: number
    application: Application
    setApplication: Function
    userErrors: ErrorData[]
}

export interface UserInputProps {
    user: User
    index: number
    SetUser: Function
    DeleteUser: Function
    userErrors: ErrorData[]
}
