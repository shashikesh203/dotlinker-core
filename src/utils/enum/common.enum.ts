export enum UserRole {
    DOCTOR = 'doctor',
    PATIENT = 'patient'
}

export enum AppointmentStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED', // doctor only
    REJECTED = 'REJECTED', // doctor only
    CANCELLED = 'CANCELLED', 
    COMPLETED = 'COMPLETED' // doctor only
}

export enum PayloadType {
    BODY = 'body',
    QUERY = 'query',
    PARAMS = 'params',
    FILE = 'file',
    FILES = 'files'
}