import { ErrorData, ErrorResponse } from "../types/ErrorResponse";
import { User } from "./entities"

export interface UserType extends Pick<
    User, "application"|"firstName"|"lastName"|"dateOfBirth"|"street"|"city"|"state"|"zipCode"|"relationship"
> {}

export class UserNotFoundError extends ErrorResponse {
    constructor(message: string | undefined = undefined) {
        super(message || 'No User found.', 404);
    }
}

export class UserDataError extends ErrorResponse {
    constructor(data: ErrorData[]) {
        super('Error with user data', 400, data);
    }
}
