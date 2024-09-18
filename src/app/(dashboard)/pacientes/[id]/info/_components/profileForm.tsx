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
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";

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
  registration: z
    .string()
    .min(2, {
      message: "Digite uma matrícula.",
    })
    .optional(),
  course: z
    .string()
    .min(2, {
      message: "Selecione um curso.",
    })
    .optional(),
  series: z
    .string()
    .min(2, {
      message: "Selecione uma série.",
    })
    .optional(),
  sessions: z
    .number({
      message: "Digite o número de sessões.",
    })
    .optional(),
  psychologicalDisorders: z
    .array(
      z.enum(Object.values(psychologicalDisorderEnum) as [string, ...string[]])
    )
    .optional(),
  otherPsychologicalDisorders: z.string().optional(),

  difficulty: z
    .array(z.enum(Object.values(Difficulty) as [string, ...string[]]))
    .optional(),
  otherDifficulty: z.string().optional(),

  relationship: z
    .array(z.enum(Object.values(Relationship) as [string, ...string[]]))
    .optional(),
  otherRelationship: z.string().optional(),
});

export function ProfileForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      registration: "",
      course: "",
      series: "",
      sessions: 0,
      psychologicalDisorders: [],
      otherPsychologicalDisorders: "",
      difficulty: [],
      otherDifficulty: "",
      relationship: [],
      otherRelationship: "",
    },
  });

  const [selectedPsychologicalDisorders, setSelectedPsychologicalDisorders] =
    useState<string[]>([]);

  const [selectedDifficulty, setSelectedDifficulty] = useState<string[]>([]);

  const [selectedRelationship, setSelectedRelationship] = useState<string[]>(
    []
  );

  //   tipo event checkbox
  //   const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //     const { value, checked } = event.target;

  //     if (checked) {
  //       setSelectedPsychologicalDisorders([...selectedPsychologicalDisorders, value]);
  //     } else {
  //       setSelectedPsychologicalDisorders(selectedPsychologicalDisorders.filter((t) => t !== value));
  //     }
  //   };

  const handleTranstornoChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = event.target;

    if (checked) {
      setSelectedPsychologicalDisorders([
        ...selectedPsychologicalDisorders,
        value,
      ]);
    } else {
      setSelectedPsychologicalDisorders(
        selectedPsychologicalDisorders.filter((t) => t !== value)
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

  //   const hasOthersPsychologicalDisorders =
  //     selectedPsychologicalDisorders.includes("OTHER");
  //   const hasOtherDifficulty = selectedDifficulty.includes("OTHER");
  const hasOtherRelationship = selectedRelationship.includes("OTHER");
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const cousesOptions = Object.keys(CoursesDisplay).map((key) => ({
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
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail:</FormLabel>
                  <FormControl>
                    <Input placeholder="E-mail" {...field} />
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
                  <FormItem>
                    <FormLabel>Matrícula:</FormLabel>
                    <FormControl>
                      <Input placeholder="Matrícula" {...field} />
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
                      <Input placeholder="Curso" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="series"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Série/Módulo:</FormLabel>
                    <FormControl>
                      <Input placeholder="Série/Módulo" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-5">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Telefone:</FormLabel>
                    <FormControl>
                      <Input placeholder="Telefone" {...field} />
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
                      <Input placeholder="Sessões" {...field} />
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
              <h2 className="font-semibold text-2xl">Transtornos psicológicos:</h2>
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
                          checked={selectedPsychologicalDisorders.includes(
                            option.value
                          )}
                          onChange={(event) => {
                            handleTranstornoChange(event);
                            form.setValue(
                              "psychologicalDisorders",
                              selectedPsychologicalDisorders
                            );
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
              <h2 className="font-semibold text-2xl">Dificuldades no processo de E/A:</h2>
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
                            form.setValue("difficulty", selectedDifficulty);
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
                          form.setValue("relationship", selectedRelationship);
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
                name="otherPsychologicalDisorders"
                render={({ field }) => (
                  <FormItem className="mt-5">
                    <FormLabel>Caso tenha marcado “Outros” descrever abaixo:</FormLabel>
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
