import {
  ColumnDef} from "@tanstack/react-table";

import styles from "./Patient.module.css";
import {
  Courses,
  CoursesDisplay,
  Education,
  EducationDisplay,
  Patient as IPatient,
  PatientType,
  PatientTypeDisplay,
} from "@/@types/patient";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, SearchIcon, EyeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { patientApi } from "@/services/patient";
import { SearchPatient } from "@/@types/patient";
import Loading from "@/components/Loading";
import { DataTable } from "@/components/data-table";
import { useRouter } from "next/navigation";

interface PatientResponse {
  data: [];
  currentPage: number;
  totalPages: number;
  count: number;
}


export interface IResponseMetaData {
  page: number;
  perPage: 10 | 20 | 30 | 40 | 50;
  total: number;
  totalPages: number;
}

export const Patient = () => {
  const router = useRouter();
  const [perPage, setPerPage] = useState<10 | 20 | 30 | 40 | 50>(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [count, setCount] = useState(0);

  const [data, setData] = useState<IPatient[]>([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<SearchPatient>({
    limit: 10,
  });

  const onSearch = async (value: string) => {
    setFilters({ ...filters, name: value });
  };

  const onValueChange = async (value: any, name: string) => {
    setFilters({ ...filters, [name]: value });
  };

  const fetchPatients = async (params: SearchPatient = { limit: 10 }) => {
    try {
      const response = (await patientApi.fetchPatients(
        params
      )) as PatientResponse;

      setData(response.data);
      setTotalPages(response.totalPages);
      setCount(response.count);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients({
      ...filters, limit: perPage, page: currentPage
    });
  }, [
    filters, perPage, currentPage
  ]);

  const columns: ColumnDef<IPatient>[] = [
    {
      accessorKey: "name",
      header: "Nome",
      cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "registration",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="h-12 p-0 text-left align-middle font-bold text-xl text-muted-foreground [&:has([role=checkbox])]:pr-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Matrícula
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("registration") || "----"}</div>
      ),
    },
    {
      accessorKey: "patientType",
      header: "Função",
      cell: ({ row }) => (
        <div className="capitalize">
          {PatientTypeDisplay[row.getValue("patientType") as PatientType]}
        </div>
      ),
    },
    {
      accessorKey: "course",
      header: "Curso",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("course") || "----"}</div>
      ),
    },
    {
      accessorKey: "series",
      header: "Série/Módulo",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("series") || "----"}</div>
      ),
    },
    {
      accessorKey: "sessions",
      header: "Sessões",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("sessions") || "----"}</div>
      ),
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
            <Button title="Detalhes" onClick={() => {
              router.push(`/pacientes/${id}`)
            }}><EyeIcon /></Button>
          </div>
        );
      },
    },
  ];
  

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

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <Select onValueChange={(value) => onValueChange(value, "patientType")}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Função" />
          </SelectTrigger>
          <SelectContent>
            {PatientTypeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => onValueChange(value, "education")}>
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

        <Select onValueChange={(value) => onValueChange(value, "course")}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Curso" />
          </SelectTrigger>
          <SelectContent>
            {cousesOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select onValueChange={(value) => onValueChange(value, "series")}>
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
        <div className="relative">
          <Input
            placeholder="Pesquisar paciente"
            // value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              // table.getColumn("name")?.setFilterValue(event.target.value)
              onSearch(event.target.value)
            }
            className="max-w-sm"
          />
          <SearchIcon size={20} className="absolute right-2 top-3" />
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
            currentPage={currentPage}
            totalRows={count}
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
  );
};
