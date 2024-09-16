import { Courses, CreatedBy, Education, Patient, PatientType } from "./patient"

type filterpatient = {
    isActive?: boolean
    createdBy?: CreatedBy
    course?: Courses
    patientType?: PatientType
    education?: Education
    gender?: string
    createdAt?: Date
    name?: string
    id?: number
    age?: number
    registration?: string
    offset?: number
    limit?: number
    minAge?: number
    maxAge?: number
    minDate?: Date
    maxDate?: Date
    month?: number
    year?: number
}

export type SearchPatient = filterpatient
