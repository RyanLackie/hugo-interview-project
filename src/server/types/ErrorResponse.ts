export enum ErrorDataEntities {
    APPLICATION = "Application",
    USER = "User",
    VEHICLE = "Vehicle"
}

export interface ErrorData {
    type: ErrorDataEntities
    id: number,
    field: string,
    error: string
}

export class ErrorResponse extends Error {
    status: number;
    data: ErrorData[];
    
    constructor(message: string, status: number, data: ErrorData[]=[]) {
        super();
        
        Error.captureStackTrace(this, this.constructor);
        
        this.name = this.constructor.name;
        this.message = message || 'Something went wrong. Please try again.';
        this.status = status || 500;
        this.data = data || [];
    }
}