import { Appointment, Session } from "./agendamentos";

export interface Psychologist {
    id: number;
    name: string;
    email: string;
    password: string;
    crp: string;
    specialty: string;
    phone: string;
    createdAt: Date;
    updatedAt: Date | null;
    Appointment: Appointment[];
    Session: Session[];
  }