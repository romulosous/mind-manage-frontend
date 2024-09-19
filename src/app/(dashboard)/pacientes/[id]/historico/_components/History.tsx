"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import styles from "./History.module.css";
import {
  Appointment as IAppointments,
  Status,
  StatusDisplay,
  typeAppointment,
  typeAppointmentDisplay,
} from "@/@types/agendamentos";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ArrowUpDown,
  SearchIcon,
  Calendar as CalendarIcon,
  EyeIcon,
} from "lucide-react";

import { SetStateAction, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AppointmentApi } from "@/services/appointments";
import { FilterAppointment } from "@/@types/agendamentos";
import Loading from "@/components/Loading";
import { DataTable } from "@/components/data-table";
import { PatientType, PatientTypeDisplay } from "@/@types/patient";
import { ptBR } from "date-fns/locale";
import { cn } from "@/lib/utils";
import { DateRange } from "react-day-picker";

export const columns: ColumnDef<IAppointments>[] = [
  {
    accessorKey: "appointmentDate",
    header: "Data",
    cell: ({ row }) => (
      <div className="capitalize">
        {format(row.getValue("appointmentDate"), "dd/MM/yyyy", {
          locale: ptBR,
        })}
      </div>
    ),
  },
  {
    accessorKey: "appointmentDate.Hour",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="h-12 p-0 text-left align-middle font-bold text-xl text-muted-foreground [&:has([role=checkbox])]:pr-0"
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">
        {StatusDisplay[row.getValue("status") as Status]}
      </div>
    ),
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
    accessorKey: "Patient.series",
    header: "Série/Módulo",
    cell: ({ row }) => {
      console.log("row", row.original.Patient);
      const patientSeries = (row.original.Patient as { series?: string })
        ?.series;
      return <div className="capitalize">{patientSeries || "----"}</div>;
    },
  },
  {
    id: "actions",
    header: "Ações",
    enableHiding: false,
    cell: ({ row }) => {
      const id = row.id;
      console.log("id", id);

      return (
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="bg-secondary-foreground text-white h-6"
            title="Detalhes"
            onClick={() => {
              // abrir modal com detalhes da sessão
            }}
          >
            Visualizar
          </Button>
        </div>
      );
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
  meta: IResponseMetaData;
}

export interface IResponseMetaData {
  page: number;
  perPage: 10 | 20 | 30 | 40 | 50;
  total: number;
  totalPages: number;
}

export const History = () => {
  const [perPage, setPerPage] = useState<10 | 20 | 30 | 40 | 50>(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [count, setCount] = useState(0);

  const [data, setData] = useState<IAppointments[]>([]);
  const [date, setDate] = useState<Date>();
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<FilterAppointment>({
    limit: 10,
  });

  const fetchAppointments = async (
    params: FilterAppointment = { limit: 10 }
  ) => {
    try {
      const response = (await AppointmentApi.fetchAppointments(
        params
      )) as AppointmentsResponse;
      setData(response.data);
      setTotalPages(response.totalPages);
      setCount(response.count);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchAppointmentsWithFilters = async () => {
    await fetchAppointments({
      ...filters,
      limit: perPage,
      page: currentPage,
      minDate: date,
      maxDate: date,
    });
  }

  useEffect(() => {
    fetchAppointments({
      ...filters,
      status: Status.FINALIZED, // uma sessão só é considerada finalizada se o status for FINALIZED
      limit: perPage,
      page: currentPage,
    });
  }, [filters, perPage, currentPage]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="text-[#159A9C] text-4xl font-semibold mb-5">Histórico</h1>
      <div className={styles.container}>
        <div className={styles.filters}>
          <div className={cn("grid gap-2")}>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "dd/MM/yyyy", { locale: ptBR }) : <span>DD/MM/AAAA</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          <div>
            {/* <Button  onClick={() => handleFetchAppointmentsWithFilters()} className="h-12">
              Filtrar
            </Button> */}
            <Button
            variant="outline"
            size="lg"
            className="bg-secondary-foreground text-white h-8"
            title="Detalhes"
            onClick={() => handleFetchAppointmentsWithFilters()}
          >
            Filtrar
          </Button>
          </div>
        </div>
        <div>
          {data ? (
            <DataTable
              data={data}
              columns={columns}
              pagesCount={totalPages}
              rowsPerPage={perPage}
              setRowsPerPage={setPerPage}
              setCurrentPage={setCurrentPage}
              totalRows={count}
              hiddenColumns={{
                phoneNumber: false,
                address: false,
                createdAt: false,
                updatedAt: false,
              }}
              currentPage={currentPage}
            />
          ) : (
            "loading"
          )}
        </div>
      </div>
    </div>
  );
};
