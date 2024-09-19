"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import style from "./profileForm.module.css";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Courses,
  CoursesDisplay,
  Difficulty,
  DifficultyDisplay,
  Education,
  EducationDisplay,
  Patient,
  PatientType,
  PatientTypeDisplay,
  psychologicalDisorderDisplay,
  psychologicalDisorder as psychologicalDisorderEnum,
  Relationship,
  RelationshipDisplay,
} from "@/@types/patient";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { patientApi } from "@/services/patient";
import { useParams } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Digite um nome.",
  }),
  email: z.string().email({
    message: "Entre com um email válido.",
  }),
  phone: z.string().min(2, {
    message: "Digite um número de telefone.",
  }),
   birth: z.string({
    message: "Digite uma data de nascimento"
   }).optional(),
  registration: z
    .string({
      message: "Digite uma matrícula.",
    })
    .optional(),
  education: z
    .union([
      z.enum([
        Education.MEDIO,
        Education.SUPERIOR,
        Education.POS_GRADUACAO,
        Education.TECNICO,
        Education.MESTRADO,
      ]),
      z.string().min(0).max(0),
    ])
    .optional(),

  course: z
    .union([
      z.enum([
        Courses.FISICA,
        Courses.QUIMICA,
        Courses.ADS,
        Courses.ELETROTECNICA,
        Courses.ADMINISTRACAO,
        Courses.INFORMATICA,
      ]),
      z.string().min(0).max(0),
    ])
    .optional(),
  series: z
    .string({
      message: "Selecione uma série.",
    })
    .optional(),
  sessions: z
    .number({
      message: "Digite o número de sessões.",
    })
    .optional(),
  patientType: z
    .union([
      z.enum(
        [
          PatientType.STUDENT,
          PatientType.CONTRACTOR,
          PatientType.GUARDIAN,
          PatientType.TEACHER,
        ],
        {
          message: "Selecione um tipo de paciente válido.",
        }
      ),
      z
        .string({
          message: "Selecione um tipo de paciente.",
        })
        .min(1, {
          message: "Selecione um tipo de paciente.",
        })
        .max(1), // String vazia
    ])
    .optional(),
  psychologicalDisorder: z
    .array(
      z.enum(Object.values(psychologicalDisorderEnum) as [string, ...string[]])
    )
    .optional(),

  difficulty: z
    .array(z.enum(Object.values(Difficulty) as [string, ...string[]]))
    .optional(),

  relationship: z
    .array(z.enum(Object.values(Relationship) as [string, ...string[]]))
    .optional(),
  otherRelationship: z.string().optional(),
});

export function ProfileForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      birth: undefined,
      patientType: "",
      registration: "",
      course: "",
      education: "",
      series: "",
      sessions: 0,
      psychologicalDisorder: [],
      difficulty: [],
      relationship: [],
      otherRelationship: "",
    },
  });

  const [selectedPsychologicalDisorder, setSelectedPsychologicalDisorder] =
    useState<string[]>([]);

  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);

  const [selectedRelationship, setSelectedRelationship] = useState<string[]>(
    []
  );

  const [loading, setLoading] = useState(true);

  const params = useParams();

  const handleTranstornoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = event.target;

    if (checked) {
      setSelectedPsychologicalDisorder([
        ...selectedPsychologicalDisorder,
        value,
      ]);
    } else {
      setSelectedPsychologicalDisorder(
        selectedPsychologicalDisorder.filter((t) => t !== value)
      );
    }
  };

  const handleDifficultyChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = event.target;

    if (checked) {
      setSelectedDifficulty([...selectedDifficulty, value]);
    } else {
      setSelectedDifficulty(selectedDifficulty.filter((d) => d !== value));
    }
  };

  const handleRelationshipChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = event.target;

    if (checked) {
      setSelectedRelationship([...selectedRelationship, value]);
    } else {
      setSelectedRelationship(selectedRelationship.filter((r) => r !== value));
    }
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const dateBirth = convertToISODate(values.birth as string);
    const payload = { ...values, birth: dateBirth };
    delete payload.sessions;

    if(params.id === "new") {
      patientApi.createPatient(payload);
    } else {
        patientApi.updatePatient(params.id as string, payload);
    }

  }

  const coursesOptions = Object.keys(CoursesDisplay).map((key) => ({
    value: key,
    label: CoursesDisplay[key as Courses],
  }));

  const PatientTypeOptions = Object.keys(PatientTypeDisplay).map((key) => ({
    value: key,
    label: PatientTypeDisplay[key as PatientType],
  }));

  const seriesOptions = [
    { value: "1", label: "1" },
    { value: "1A", label: "1A" },
    { value: "1B", label: "1B" },
    { value: "1C", label: "1C" },
    { value: "2", label: "2" },
    { value: "2A", label: "2A" },
    { value: "2B", label: "2B" },
    { value: "2C", label: "2C" },
    { value: "3", label: "3" },
    { value: "3A", label: "3A" },
    { value: "3B", label: "3B" },
    { value: "3C", label: "3C" },
    { value: "1 Modulo", label: "1 Modulo" },
    { value: "2 Modulo", label: "2 Modulo" },
    { value: "3 Modulo", label: "3 Modulo" },
    { value: "4 Modulo", label: "4 Modulo" },
    { value: "5 Modulo", label: "5 Modulo" },
    { value: "6 Modulo", label: "6 Modulo" },
    { value: "7 Modulo", label: "7 Modulo" },
    { value: "8 Modulo", label: "8 Modulo" },
  ];

  const educationOptions = Object.keys(EducationDisplay).map((key) => ({
    value: key,
    label: EducationDisplay[key as Education],
  }));

  const difficultyOptions = Object.keys(DifficultyDisplay).map((key) => ({
    value: key,
    label: DifficultyDisplay[key as Difficulty],
  }));

  const psychologicalDisorderOptions = Object.keys(
    psychologicalDisorderDisplay
  ).map((key) => ({
    value: key,
    label:
      psychologicalDisorderDisplay[
        key as keyof typeof psychologicalDisorderDisplay
      ],
  }));

  const relationshipOptions = Object.keys(RelationshipDisplay).map((key) => ({
    value: key,
    label: RelationshipDisplay[key as Relationship],
  }));

  const isStudent = form.watch("patientType") === PatientType.STUDENT;
  const hasOtherRelationship = selectedRelationship.includes("OTHER");

  useEffect(() => {
    if (!isStudent) {
      form.setValue("registration", "");
      form.setValue("course", "");
      form.setValue("education", "");
      form.setValue("series", "");
    }
  }, [isStudent]);

  function formatDate(isoString: string) {
      if(isoString === undefined || isoString === null) return;
      
    const date = new Date(isoString);
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
  
    const day = String(date.getDate()).padStart(2,   
   '0');
  
    // Format the date as YYYY-MM-DD
    return `${year}-${month}-${day}`;
  }

  function convertToISODate(dateString: string, hours = 3, minutes = 0, seconds = 0, milliseconds = 0) {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds, milliseconds));
    return date.toISOString();
  }

  const fetchPatientById = async () => {
    try {
      if (!params.id) return;
      const response = (await patientApi.fetchPatientById(
        params.id as string
      )) as unknown as Patient;

      const birth = formatDate(response.birth as string);

      const state = {
        name: response.name,
        email: response.email,
        phone: response.phone,
        birth: birth,
        patientType: response.patientType,
        registration: response.registration,
        course: response.course,
        education: response.education,
        series: response.series,
        sessions: response.sessions,
        psychologicalDisorder: response.psychologicalDisorder,
        difficulty: response.difficulty,
        relationship: response.relationship,
        otherRelationship: response?.otherRelationship,
      };
      setSelectedPsychologicalDisorder(response.psychologicalDisorder || []);
      setSelectedDifficulty(response.difficulty || []);
      setSelectedRelationship(response.relationship || []);
      form.reset(state);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if(params.id !== "new"){
        fetchPatientById();
    }
  }, []);

  console.log("form.watch('birth')", form.watch("birth"));

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className={style.inputsContainer}>
          <div className="flex-1 gap-5 flex flex-col">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome:</FormLabel>
                  <FormControl>
                    <Input placeholder="Nome" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-5">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>E-mail:</FormLabel>
                    <FormControl>
                      <Input placeholder="E-mail" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Telefone:</FormLabel>
                    <FormControl>
                      <Input placeholder="Telefone" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="patientType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo Paciente:</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Tipo Paciente" />
                      </SelectTrigger>
                      <SelectContent>
                        {PatientTypeOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
          control={form.control}
          name="birth"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date de Nascimento</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                    //   value={field.value ? format(field.value, "yyyy-MM-dd") : ""}
                      placeholder="Data de Nascimento"
                      {...field}
                    />
                  </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          </div>

          <div className="flex gap-5 flex-1 flex-col">
            <div className="flex gap-5">
              <FormField
                control={form.control}
                name="registration"
                render={({ field }) => (
                  <FormItem className="w-[180px]">
                    <FormLabel>Matrícula:</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Matrícula"
                        {...field}
                        disabled={!isStudent}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="education"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Ensino:</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!isStudent}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Ensino" />
                        </SelectTrigger>
                        <SelectContent>
                          {educationOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="course"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Curso:</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!isStudent}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Curso" />
                        </SelectTrigger>
                        <SelectContent>
                          {coursesOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-5">
              <FormField
                control={form.control}
                name="series"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Série/Módulo:</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                        disabled={!isStudent}
                      >
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Série" />
                        </SelectTrigger>
                        <SelectContent>
                          {seriesOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="sessions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sessões:</FormLabel>
                    <FormControl>
                      <Input placeholder="Sessões" {...field} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>
        <div className="flex gap-14">
          <div className="flex flex-col gap-5">
            <section>
              <h2 className="font-semibold text-2xl">
                Transtornos psicológicos:
              </h2>
              <Card
                className="max-w-[400px] border-secondary"
                style={{ marginTop: "20px" }}
              >
                <CardContent className="grid grid-cols-2 max-w-[400px] gap-2 p-2">
                  {psychologicalDisorderOptions.map((option) => {
                    return (
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={option.value}
                          key={option.value}
                          value={option.value}
                          checked={selectedPsychologicalDisorder.includes(
                            option.value
                          )}
                          onChange={(event) => {
                            handleTranstornoChange(event);
                            form.setValue("psychologicalDisorder", [
                              ...selectedPsychologicalDisorder,
                              event.target.value,
                            ]);
                          }}
                        />
                        <label
                          htmlFor={option.value}
                          className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {option.label}
                        </label>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </section>

            <section>
              <h2 className="font-semibold text-2xl">
                Dificuldades no processo de E/A:
              </h2>
              <Card
                className="max-w-[400px] border-secondary"
                style={{ marginTop: "20px" }}
              >
                <CardContent className="grid grid-cols-2 max-w-[400px] gap-2 p-2">
                  {difficultyOptions.map((option) => {
                    return (
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={option.value}
                          key={option.value}
                          value={option.value}
                          checked={selectedDifficulty.includes(option.value)}
                          onChange={(event) => {
                            handleDifficultyChange(event);
                            form.setValue("difficulty", [
                              ...selectedDifficulty,
                              event.target.value,
                            ]);
                          }}
                        />
                        <label
                          htmlFor={option.value}
                          className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          {option.label}
                        </label>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            </section>
          </div>

          <section>
            <h2 className="font-semibold text-2xl">Habilidades sociais:</h2>
            <Card
              className="max-w-[400px] border-secondary"
              style={{ marginTop: "20px" }}
            >
              <CardContent className="grid grid-cols-2 max-w-[400px] gap-2 p-2">
                {relationshipOptions.map((option) => {
                  return (
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={option.value}
                        key={option.value}
                        value={option.value}
                        checked={selectedRelationship.includes(option.value)}
                        onChange={(event) => {
                          handleRelationshipChange(event);
                          form.setValue("relationship", [
                            ...selectedRelationship,
                            event.target.value,
                          ]);
                        }}
                      />
                      <label
                        htmlFor={option.value}
                        className="text-xs font-normal peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {option.label}
                      </label>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {hasOtherRelationship && (
              <FormField
                control={form.control}
                name="otherRelationship"
                render={({ field }) => (
                  <FormItem className="mt-5">
                    <FormLabel>
                      Caso tenha marcado “Outros” descrever abaixo:
                    </FormLabel>
                    <FormControl>
                      <Textarea placeholder="Digite aqui..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </section>
        </div>

        <Button type="submit" className="bg-secondary-foreground text-white">
          Submit
        </Button>
      </form>
    </Form>
  );
}
