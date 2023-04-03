import { ErrorData, ErrorResponse } from "../types/ErrorResponse";

export interface ApplicationType {}

export class ApplicationNotFoundError extends ErrorResponse {
    constructor(message: string | undefined = undefined) {
        super(message || 'No Application found.', 404);
    }
}

export class ApplicationDataError extends ErrorResponse {
    constructor(data: ErrorData[]) {
        super('Error with application data', 400, data);
    }
}
