import { ColumnDef } from "@tanstack/react-table";

import { format } from "date-fns";

import styles from "./Appointments.module.css";
import {
  Appointment as IAppointments,
  Status,
  StatusDisplay,
  typeAppointment,
  typeAppointmentDisplay,
} from "@/@types/agendamentos";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
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

export const columns: ColumnDef<IAppointments>[] = [
  {
    accessorKey: "appointmentDate",
    header: "Data",
    // {format(booking.date, "MMMM", { locale: ptBR })}
    // cell: ({ row }) => (
    //   <div className="capitalize">{row.getValue("appointmentDate")}</div>
    // ),
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

      return <div className="capitalize">
        {formattedStartTime} - {formattedEndTime}
      </div>;
    },
  },
  {
    accessorKey: "type",
    header: "Tipo",
    cell: ({ row }) => (
      <div className="capitalize">
        {typeAppointmentDisplay[row.getValue("type") as typeAppointment]}
      </div>
    ),
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
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => {
      return <div className="capitalize">{row.getValue("name") || "----"}</div>
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
];

interface AppointmentsResponse {
  data: [];
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

export const Appointments = () => {
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(10);
  const [query, setQuery] = useState("");

  const [data, setData] = useState<IResponse<IAppointments>>();
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<FilterAppointment>({
    limit: 10,
  });

  const onSearch = async (value: string, name: string) => {
    setFilters({ ...filters, [name]: value });
  };

  const onValueChange = async (value: any, name: string) => {
    setFilters({ ...filters, [name]: value });
  };

  const fetchAppointments = async (
    params: FilterAppointment = { limit: 10 }
  ) => {
    try {
      const response = (await AppointmentApi.fetchAppointments(
        params
      )) as AppointmentsResponse;

      const dataWithMeta: IResponse<IAppointments> = {
        data: response.data,
        meta: {
          page: 0,
          perPage: (params.limit as 10 | 20 | 30 | 40 | 50) || 10,
          total: response.count,
          totalPages: Math.ceil(response.count / (params.limit || 10)),
        },
      };

      setData(dataWithMeta);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments({
      ...filters,
      limit: perPage,
      offset: page,
    });
  }, [filters, page, perPage, query]);

  const AppointmentsTypeOptions = Object.keys(typeAppointmentDisplay).map(
    (key) => ({
      value: key,
      label: typeAppointmentDisplay[key as typeAppointment],
    })
  );

  const AppointmentsStatusOptions = Object.keys(StatusDisplay).map((key) => ({
    value: key,
    label: StatusDisplay[key as Status],
  }));

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <Select onValueChange={(value) => onValueChange(value, "type")}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Tipo" />
          </SelectTrigger>
          <SelectContent>
            {AppointmentsTypeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => onValueChange(value, "status")}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {AppointmentsStatusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      
        <div className="relative flex-1">
          <Input
            placeholder="Pesquisar nome registro"
            onChange={(event) =>
              onSearch(event.target.value, "name")
            }
            className="pr-6"
          />
          <SearchIcon size={16} className="absolute right-2 top-3" />
        </div>

        <div className="relative flex-1">
          <Input
            placeholder="Pesquisar nome paciente"
            onChange={(event) =>
              onSearch(event.target.value, "patientName")
            }
            className="pr-6"
          />
          <SearchIcon size={14} className="absolute right-2 top-3" />
        </div>

        <div>
          <Button onClick={() => setFilters({})} className="h-12">
            Limpar Filtros
          </Button>
        </div>
      </div>

      <div>
        {data ? (
          <DataTable
            data={data.data}
            columns={columns}
            pagesCount={data.meta.totalPages}
            rowsPerPage={data.meta.perPage}
            setRowsPerPage={setPerPage}
            query={query}
            title="Users Table"
            totalRows={data.meta.total}
            hiddenColumns={{
              phoneNumber: false,
              address: false,
              createdAt: false,
              updatedAt: false,
            }}
            setQuery={setQuery}
            currentPage={data.meta.page}
            setPage={setPage}
          />
        ) : (
          "loading"
        )}
      </div>
    </div>
  );
};
