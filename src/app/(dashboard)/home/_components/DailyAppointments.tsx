"use client";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import styles from "./DailyAppointments.module.css";
import {
  Appointment as IAppointments,
  Status,
  typeAppointment,
} from "@/@types/agendamentos";
import { Button } from "@/components/ui/button";
import {
  ArrowUpDown
} from "lucide-react";

import { useEffect, useState } from "react";

import { AppointmentApi } from "@/services/appointments";
import { FilterAppointment } from "@/@types/agendamentos";
import Loading from "@/components/Loading";
import { PatientType, PatientTypeDisplay } from "@/@types/patient";
import { DailyAppointmentsTable } from "./DailyAppointmentsTable";

export const columns: ColumnDef<IAppointments>[] = [
  {
    accessorKey: "appointmentDate.Hour",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-12 p-0 text-left align-middle font-bold text-sm text-muted-foreground [&:has([role=checkbox])]:pr-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Horário
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const hour = row.original.appointmentDate;
      const startTime = hour ? new Date(hour) : new Date(); // Fallback to current date if hour is null
      const endTime = new Date(startTime);
      endTime.setHours(endTime.getHours() + 1);

      const formattedStartTime = format(startTime, "kk:mm");
      const formattedEndTime = format(endTime, "kk:mm");

      return (
        <div className="capitalize">
          {formattedStartTime} - {formattedEndTime}
        </div>
      );
    },
  },
  {
    accessorKey: "Patient.name",
    header: "Paciente",
    cell: ({ row }) => {
      const patientName = (row.original.Patient as { name?: string })?.name;
      return <div className="capitalize">{patientName || "----"}</div>;
    },
  },
  {
    accessorKey: "Patient.patientType",
    header: "Função",
    cell: ({ row }) => {
      const patientType = (row.original.Patient as { patientType?: string })
        ?.patientType;
      return (
        <div className="capitalize">
          {PatientTypeDisplay[patientType as PatientType] || "----"}
        </div>
      );
    },
  },
  {
    accessorKey: "Patient.course",
    header: "Curso",
    cell: ({ row }) => {
      const patientCourse = (row.original.Patient as { course?: string })
        ?.course;
      return <div className="capitalize">{patientCourse || "----"}</div>;
    },
  },
  {
    accessorKey: "actions",
    header: " Ações/Status",
    cell: ({ row }) => {
      return <Button variant="outline" className="bg-secondary-foreground text-white h-6">Iniciar</Button>;
    },
  },
];

export const resChedulingColumns: ColumnDef<IAppointments>[] = [
  {
    accessorKey: "appointmentDate.Hour",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-12 p-0 text-left align-middle font-bold text-sm text-muted-foreground [&:has([role=checkbox])]:pr-0"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Horário
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const hour = row.original.appointmentDate;
      const startTime = hour ? new Date(hour) : new Date(); // Fallback to current date if hour is null
      const endTime = new Date(startTime);
      endTime.setHours(endTime.getHours() + 1);

      const formattedStartTime = format(startTime, "kk:mm");
      const formattedEndTime = format(endTime, "kk:mm");

      return (
        <div className="capitalize">
          {formattedStartTime} - {formattedEndTime}
        </div>
      );
    },
  },
  {
    accessorKey: "Patient.name",
    header: "Paciente",
    cell: ({ row }) => {
      const patientName = (row.original.Patient as { name?: string })?.name;
      return <div className="capitalize">{patientName || "----"}</div>;
    },
  },
  {
    accessorKey: "Patient.patientType",
    header: "Função",
    cell: ({ row }) => {
      const patientType = (row.original.Patient as { patientType?: string })
        ?.patientType;
      return (
        <div className="capitalize">
          {PatientTypeDisplay[patientType as PatientType] || "----"}
        </div>
      );
    },
  },
  {
    accessorKey: "Patient.course",
    header: "Curso",
    cell: ({ row }) => {
      const patientCourse = (row.original.Patient as { course?: string })
        ?.course;
      return <div className="capitalize">{patientCourse || "----"}</div>;
    },
  },
  {
    accessorKey: "actions",
    header: " Ações/Status",
    cell: ({ row }) => {
      return <Button variant="outline" className="bg-secondary-foreground text-white h-6">Visualizar</Button>;
    },
  },
];

interface AppointmentsResponse {
  data: [];
  currentPage: number;
  totalPages: number;
  count: number;
}

export interface IResponse<T> {
  data: T[];
}

export const DailyAppointments = () => {
  const [dailyAppointmentData, setDailyAppointmentData] = useState<IAppointments[]>([]);
  const [dailyReschedulingData, setDailyReschedulingData] = useState<IAppointments[]>([]);

  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<FilterAppointment>({
    minDate: new Date(new Date().setUTCHours(0, 0, 0, 0)).toISOString(),
    maxDate: new Date(new Date().setUTCHours(23, 59, 0, 0)).toISOString(),
    type: typeAppointment.SESSION,
  });

  const fetchDailyAppointments = async (
    params: FilterAppointment = { limit: 10 }
  ) => {
    try {
      const response = (await AppointmentApi.fetchAppointments(
        params
      )) as AppointmentsResponse;
      setDailyAppointmentData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchDailyRescheduling = async (
    params: FilterAppointment = { limit: 10 }
  ) => {
    try {
      const response = (await AppointmentApi.fetchAppointments(
        params
      )) as AppointmentsResponse;
      setDailyReschedulingData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDailyAppointments({
      ...filters,
      status: Status.CONFIRMED,
    });

    fetchDailyRescheduling({
      ...filters,
      status: Status.PENDING,
    })
  }, [filters]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h1 className="text-[#159A9C] text-[25px] font-semibold mb-1">
          Sessões do dia
        </h1>
        <div className={styles.container}>
          <div className="">
            {dailyAppointmentData ? (
              <DailyAppointmentsTable
                data={dailyAppointmentData}
                columns={columns}
                hiddenColumns={{
                  phoneNumber: false,
                  address: false,
                  createdAt: false,
                  updatedAt: false,
                }}
              />
            ) : (
              "loading"
            )}
          </div>
        </div>
      </div>

      <div>
        <h1 className="text-[#159A9C] text-[25px] font-semibold mb-1">
          Reagendamentos
        </h1>
        <div className={styles.container}>
          <div className="">
            {dailyReschedulingData ? (
              <DailyAppointmentsTable
                data={dailyReschedulingData}
                columns={resChedulingColumns}
                hiddenColumns={{
                  phoneNumber: false,
                  address: false,
                  createdAt: false,
                  updatedAt: false,
                }}
              />
            ) : (
              "loading"
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
