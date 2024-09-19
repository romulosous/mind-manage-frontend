"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import style from "./AnamneseForm.module.css";

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
import { Card, CardContent } from "@/components/ui/card";
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
import { PhoneNumber } from "@/functions/format-phone-number";

const formSchema = z.object({
  familyHistory: z.string().optional(),
  infancy: z.string().optional(),
  adolescence: z.string().optional(),
  illnesses: z.string().optional(),
  acompaniment: z.string().optional(),
});

export function AnamneseForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      familyHistory: "",
      infancy: "",
      adolescence: "",
      illnesses: "",
      acompaniment: "",
    },
  });

  const [loading, setLoading] = useState(true);

  const params = useParams();

  function onSubmit(values: z.infer<typeof formSchema>) {
    const payload = { ...values };

    // criar anamnse endpoint
    if (params.id === "new") {
      patientApi.createPatient(payload);
    } else {
      patientApi.updatePatient(params.id as string, payload);
    }
  }

  const fetchPatientById = async () => {
    try {
      if (!params.id) return;
      const response = (await patientApi.fetchPatientById(
        params.id as string
      )) as unknown as Patient;

      const state = {
        familyHistory: "",
        infancy: "",
        adolescence: "",
        illnesses: "",
        acompaniment: "",
      };

      form.reset(state);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (params.id !== "new") {
      // fetchPatientById();
    }
  }, []);

  return (
    <div>
      <h1 className="text-[#159A9C] text-4xl font-semibold mb-5">
        Anamnese
      </h1>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className={style.inputsContainer}>
            <div className="flex-1 gap-5 flex flex-col">
              <FormField
                control={form.control}
                name="familyHistory"
                render={({ field }) => (
                  <FormItem className="mt-5">
                    <FormLabel className="text-2xl font-semibold">História familiar</FormLabel>
                    <FormControl>
                      <Textarea
                      className="border-secondary border-[2px] h-28"
                        placeholder="Informações acerca do tópico em relação ao paciente ficará salvo aqui..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="infancy"
                render={({ field }) => (
                  <FormItem className="mt-5">
                    <FormLabel className="text-2xl font-semibold">Infância</FormLabel>
                    <FormControl>
                      <Textarea
                      className="border-secondary border-[2px] h-28"
                        placeholder="Informações acerca do tópico em relação ao paciente ficará salvo aqui..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="adolescence"
                render={({ field }) => (
                  <FormItem className="mt-5">
                    <FormLabel className="text-2xl font-semibold">Adolescência</FormLabel>
                    <FormControl>
                      <Textarea
                      className="border-secondary border-[2px] h-28"
                        placeholder="Informações acerca do tópico em relação ao paciente ficará salvo aqui..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="illnesses"
                render={({ field }) => (
                  <FormItem className="mt-5">
                    <FormLabel className="text-2xl font-semibold">Doenças pré-existentes:</FormLabel>
                    <FormControl>
                      <Textarea
                      className="border-secondary border-[2px] h-28"
                        placeholder="Informações acerca do tópico em relação ao paciente ficará salvo aqui..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="acompaniment"
                render={({ field }) => (
                  <FormItem className="mt-5">
                    <FormLabel className="text-2xl font-semibold">
                      Acompanhamentos psiquiátricos, psicológicos e
                      neurológicos:
                    </FormLabel>
                    <FormControl>
                      <Textarea
                      className="border-secondary border-[2px] h-28"
                        placeholder="Informações acerca do tópico em relação ao paciente ficará salvo aqui..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type="submit" className="bg-secondary-foreground text-white">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
