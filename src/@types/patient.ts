import { Appointment, Session } from "./agendamentos";

export interface Patient {
    id: number;
    name: string;
    email: string;
    password: string;
    registration?: string | null;
    course?: Courses | null;
    education?: Education | null;
    age: number;
    phone: string;
    gender: Gender;
    patientType: PatientType;
    attachment: attachment[];
    series?: string | null;
    createdAt: Date;
    updatedAt: Date | null;
    psychologicalDisorder?: psychologicalDisorder[];
    relationship?: Relationship[];
    createdBy: CreatedBy;
    isActive?: boolean | null;
    difficulty?: Difficulty[];
    Appointment?: Appointment[];
    Session?: Session[];
    Anamenese?: Anamenese[];
}

export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
}

export const GenderDisplay: { [key in Gender]: string } = {
    [Gender.MALE]: "Masculino",
    [Gender.FEMALE]: "Feminino",
}


export enum CreatedBy {
    PATIENT = 'PATIENT',
    PSYCHOLOGIST = 'PSYCHOLOGIST',
}

export const CreatedByDisplay: { [key in CreatedBy]: string } = {
    [CreatedBy.PATIENT]: "Paciente",
    [CreatedBy.PSYCHOLOGIST]: "Psicólogo",
}



export enum Difficulty {
    AVALIATION = 'AVALIATION',
    ORGANIZATION_ON_STUDIES = 'ORGANIZATION_ON_STUDIES',
    CONCENTRATION = 'CONCENTRATION',
    MEMORY = 'MEMORY',
    TDAH = 'TDAH',
    COMUNICATION = 'COMUNICATION',
    RELATIONSHIP = 'RELATIONSHIP',
    OTHER = 'OTHER',
}

export const DifficultyDisplay: { [key in Difficulty]: string } = {
    [Difficulty.AVALIATION]: "Avaliação",
    [Difficulty.ORGANIZATION_ON_STUDIES]: "Organização nos estudos",
    [Difficulty.CONCENTRATION]: "Concentração",
    [Difficulty.MEMORY]: "Memória",
    [Difficulty.TDAH]: "TDAH",
    [Difficulty.COMUNICATION]: "Comunicação",
    [Difficulty.RELATIONSHIP]: "Relacionamento",
    [Difficulty.OTHER]: "Outros",
}

export enum Education {
    MEDIO = 'MEDIO',
    SUPERIOR = 'SUPERIOR',
    POS_GRADUACAO = 'POS_GRADUACAO',
    TECNICO = 'TECNICO',
    MESTRADO = 'MESTRADO',
}

export const EducationDisplay: { [key in Education]: string } = {
    [Education.MEDIO]: "Ensino Médio",
    [Education.SUPERIOR]: "Ensino Superior",
    [Education.POS_GRADUACAO]: "Pós-Graduação",
    [Education.TECNICO]: "Técnico",
    [Education.MESTRADO]: "Mestrado",
}

export enum Courses {
    FISICA = 'FISICA',
    QUIMICA = 'QUIMICA',
    ADS = 'ADS',
    ELETROTECNICA = 'ELETROTECNICA',
    ADMINISTRACAO = 'ADMINISTRACAO',
    INFORMATICA = 'INFORMATICA',
}

export const CoursesDisplay: { [key in Courses]: string } = {
    [Courses.FISICA]: "Física",
    [Courses.QUIMICA]: "Química",
    [Courses.ADS]: "ADS",
    [Courses.ELETROTECNICA]: "Eletrotécnica",
    [Courses.ADMINISTRACAO]: "Administração",
    [Courses.INFORMATICA]: "Informática",
}

export enum PatientType {
    STUDENT = 'STUDENT',
    CONTRACTOR = 'CONTRACTOR',
    GUARDIAN = 'GUARDIAN',
    TEACHER = 'TEACHER',
}

export const PatientTypeDisplay: { [key in PatientType]: string } = {
    [PatientType.STUDENT]: "Aluno",
    [PatientType.CONTRACTOR]: "Contratado",
    [PatientType.GUARDIAN]: "Responsável",
    [PatientType.TEACHER]: "Professor",
}

export enum attachment {
    PEDAGOGICAL_REPORT = 'PEDAGOGICAL_REPORT',
    MEDICAL_REPORT = 'MEDICAL_REPORT',
    TEACHER_REPORT = 'TEACHER_REPORT',
    PROFESSIONAL_REPORT = 'PROFESSIONAL_REPORT',
    CORDENATION_REPORT = 'CORDENATION_REPORT',
    DIRECTION_REPORT = 'DIRECTION_REPORT',
    ENAPI_REPORT = 'ENAPI_REPORT',
    DIRECTION_EDUCATION_REPORT = 'DIRECTION_EDUCATION_REPORT',
    SPONTANEOUS_DECISION = 'SPONTANEOUS_DECISION',
    OTHER = 'OTHER',
}

export const attachmentDisplay: { [key in attachment]: string } = {
    [attachment.PEDAGOGICAL_REPORT]: "Laudo Pedagógico",
    [attachment.MEDICAL_REPORT]: "Laudo Médico",
    [attachment.TEACHER_REPORT]: "Laudo do Professor",
    [attachment.PROFESSIONAL_REPORT]: "Laudo Profissional",
    [attachment.CORDENATION_REPORT]: "Laudo da Coordenação",
    [attachment.DIRECTION_REPORT]: "Laudo da Direção",
    [attachment.ENAPI_REPORT]: "Laudo do ENAPI",
    [attachment.DIRECTION_EDUCATION_REPORT]: "Laudo da Direção de Educação",
    [attachment.SPONTANEOUS_DECISION]: "Decisão Espontânea",
    [attachment.OTHER]: "Outros",
}


export enum psychologicalDisorder {
    DEPRESSION = 'DEPRESSION',
    GENERALIZED_ANXIETY = 'GENERALIZED_ANXIETY',
    BIPOLAR_DISORDER = 'BIPOLAR_DISORDER',
    BORDERLINE_PERSONALITY_DISORDER = 'BORDERLINE_PERSONALITY_DISORDER',
    SCHIZOPHRENIA = 'SCHIZOPHRENIA',
    OBSESSIVE_COMPULSIVE_DISORDER = 'OBSESSIVE_COMPULSIVE_DISORDER',
    POST_TRAUMATIC_STRESS_DISORDER = 'POST_TRAUMATIC_STRESS_DISORDER',

    ATTENTION_DEFICIT_HYPERACTIVITY_DISORDER = 'ATTENTION_DEFICIT_HYPERACTIVITY_DISORDER',
    AUTISM_SPECTRUM_DISORDER = 'AUTISM_SPECTRUM_DISORDER',

    EATING_DISORDER = 'EATING_DISORDER',
    SUBSTANCE_ABUSE = 'SUBSTANCE_ABUSE',
    PERSONALITY_DISORDER = 'PERSONALITY_DISORDER',
    DISSOCIATIVE_DISORDER = 'DISSOCIATIVE_DISORDER',
    BODY_DYSMORPHIC_DISORDER = 'BODY_DYSMORPHIC_DISORDER',
    PARANOID_DISORDER = 'PARANOID_DISORDER',
    PANIC_DISORDER = 'PANIC_DISORDER',
    PSYCHOSIS = 'PSYCHOSIS',
    OTHER = 'OTHER',
}

export const psychologicalDisorderDisplay: { [key in psychologicalDisorder]: string } = {
    [psychologicalDisorder.DEPRESSION]: "Depressão",
    [psychologicalDisorder.GENERALIZED_ANXIETY]: "Ansiedade Generalizada",
    [psychologicalDisorder.BIPOLAR_DISORDER]: "Transtorno Bipolar",
    [psychologicalDisorder.BORDERLINE_PERSONALITY_DISORDER]: "Transtorno de Personalidade Borderline",
    [psychologicalDisorder.SCHIZOPHRENIA]: "Esquizofrenia",
    [psychologicalDisorder.OBSESSIVE_COMPULSIVE_DISORDER]: "Transtorno Obsessivo Compulsivo",
    [psychologicalDisorder.POST_TRAUMATIC_STRESS_DISORDER]: "Transtorno de Estresse Pós-Traumático",

    [psychologicalDisorder.ATTENTION_DEFICIT_HYPERACTIVITY_DISORDER]: "Transtorno do Déficit de Atenção e Hiperatividade",
    [psychologicalDisorder.AUTISM_SPECTRUM_DISORDER]: "Transtorno do Espectro Autista",

    [psychologicalDisorder.EATING_DISORDER]: "Transtorno Alimentar",
    [psychologicalDisorder.SUBSTANCE_ABUSE]: "Abuso de Substâncias",
    [psychologicalDisorder.PERSONALITY_DISORDER]: "Transtorno de Personalidade",
    [psychologicalDisorder.DISSOCIATIVE_DISORDER]: "Transtorno Dissociativo",
    [psychologicalDisorder.BODY_DYSMORPHIC_DISORDER]: "Transtorno Dismórfico Corporal",
    [psychologicalDisorder.PARANOID_DISORDER]: "Transtorno Paranoide",
    [psychologicalDisorder.PANIC_DISORDER]: "Transtorno do Pânico",
    [psychologicalDisorder.PSYCHOSIS]: "Psicose",
    [psychologicalDisorder.OTHER]: "Outros",
}

export enum Relationship {
    RELATIONSHIP_WITH_COLLEAGUES = 'RELATIONSHIP_WITH_COLLEAGUES',
    RELATIONSHIP_WITH_FAMILY = 'RELATIONSHIP_WITH_FAMILY',
    RELATIONSHIP_WITH_PARTNER = 'RELATIONSHIP_WITH_PARTNER',
    RELATIONSHIP_WITH_TEACHER = 'RELATIONSHIP_WITH_TEACHER',
    OTHER = 'OTHER',
}

export const RelationshipDisplay: { [key in Relationship]: string } = {
    [Relationship.RELATIONSHIP_WITH_COLLEAGUES]: "Relacionamento com Colegas",
    [Relationship.RELATIONSHIP_WITH_FAMILY]: "Relacionamento com a Família",
    [Relationship.RELATIONSHIP_WITH_PARTNER]: "Relacionamento com o Parceiro",
    [Relationship.RELATIONSHIP_WITH_TEACHER]: "Relacionamento com o Professor",
    [Relationship.OTHER]: "Outros",
}


export interface Anamenese {
    id: number;
    patientId: number;
    familyHistory: string | null;
    infancy: string | null;
    adolescence: string | null;
    illnesses: string | null;
    acompaniment: string | null;
    createdAt: Date;
    updatedAt: Date | null;
    Patient: Patient;
}