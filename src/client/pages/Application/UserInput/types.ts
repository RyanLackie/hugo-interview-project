import { Application } from "../../../../server/applications/entities";
import { ErrorData } from "../../../../server/types/ErrorResponse";
import { User } from "../../../../server/users/entities";

export interface UserInputConnectorProps {
    user: User
    application: Application
    setApplication: Function
    userErrors: ErrorData[]
}

export interface UserInputProps {
    user: User
    SetUser: Function
    DeleteUser: Function
    userErrors: ErrorData[]
}
