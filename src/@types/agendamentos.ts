import { attachment, Courses, Education, Gender, Patient, PatientType } from "./patient";
import { Psychologist } from "./psychologist";

export interface Appointment {
    id: number;
    psychologistId: number;
    patientId: number | null;
    appointmentDate: Date | null;
    status: Status;
    reason: string | null;
    name: string | null;
    typeAcctivity: typeAcctivity | null;
    type: typeAppointment | null;
    observation: string | null;
    obejective: string | null;
    createdAt: Date;
    updatedAt: Date | null;
    Psychologist: Psychologist;
    Patient?: Patient | null;
    EmailSchedule: EmailSchedule[];
}

export enum typeAppointment {
    SESSION = 'SESSION',
    COLLECTIVE_ACTIVITIES = 'COLLECTIVE_ACTIVITIES',
    ADMINISTRATIVE_RECORDS = 'ADMINISTRATIVE_RECORDS',
}

export const typeAppointmentDisplay: { [key in typeAppointment]: string } = {
    [typeAppointment.SESSION]: "Sessão",
    [typeAppointment.COLLECTIVE_ACTIVITIES]: "Atividades Coletivas",
    [typeAppointment.ADMINISTRATIVE_RECORDS]: "Registros Administrativos",
}

export enum typeAcctivity {
    GROUP = 'GROUP',
    LECTURE = 'LECTURE',
    SEMINAR = 'SEMINAR',
    MEETING = 'MEETING',
    DISCUSSION_CIRCLE = 'DISCUSSION_CIRCLE',
}

export const typeAcctivityDisplay: { [key in typeAcctivity]: string } = {
    [typeAcctivity.GROUP]: "Grupo",
    [typeAcctivity.LECTURE]: "Palestra",
    [typeAcctivity.SEMINAR]: "Seminário",
    [typeAcctivity.MEETING]: "Reunião",
    [typeAcctivity.DISCUSSION_CIRCLE]: "Círculo de Discussão",
}

export enum Status {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    FINALIZED = 'FINALIZED',
    CANCELED = 'CANCELED',
    ABSENCE = 'ABSENCE',
}

export const StatusDisplay: { [key in Status]: string } = {
    [Status.PENDING]: "Pendente",
    [Status.CONFIRMED]: "Confirmado",
    [Status.FINALIZED]: "Finalizado",
    [Status.CANCELED]: "Cancelado",
    [Status.ABSENCE]: "Ausência",
}

export interface Session {
    id: number;
    psychologistId: number;
    patientId: number;
    sessionDate: Date | null;
    intervention: string | null;
    referrals: string | null;
    complaint: string | null;
    createdAt: Date;
    updatedAt: Date | null;
    psychologist: Psychologist;
    patient: Patient;
}

export interface EmailSchedule {
    id: number;
    toEmail: string;
    subject: string;
    content: string;
    sendAt: Date;
    isSent: boolean;
    appointmentId: number | null;
    Appointment: Appointment | null;
    createdAt: Date;
    updatedAt: Date | null;
}

export type FilterAppointment = {
    type?: typeAppointment
    status?: Status
    appointmentDate?: Date
    typeAcctivity?: typeAcctivity
    patientId?: number
    psychologistId?: number
    name?: string
    createdAt?: Date
    // offset?: number
    limit?: number
    psychologistName?: string
    gender?: Gender
    minAge?: number
    maxAge?: number
    minDate?: Date | string
    maxDate?: Date | string
    course?: Courses
    education?: Education
    isActive?: boolean
    attachment?: attachment
    patientType?: PatientType
    page?: number
}

export type SearchAppointment = FilterAppointment