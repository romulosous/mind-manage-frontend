import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import styles from "./Patient.module.css";
import { PatientType, PatientTypeDisplay } from "@/@types/patient";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface User {
  series: any;
  numberSessions: any;
  id: number;
  name: string;
  email: string;
  age: number;
  phone: string;
  course: string;
  registration: string;
  gender: string;
  patientType: PatientType;
  createdAt: string;
  updatedAt: string | null;
  isActive: boolean;
}

interface PatientProps {
  data: User[];
  count: number;
}

export const columns: ColumnDef<User>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
      <div className="lowercase">{row.getValue("registration")}</div>
    ),
  },
  {
    accessorKey: "patientType",
    header: "Função",
    cell: ({ row }) => (
      <div className="capitalize">{PatientTypeDisplay[row.getValue("patientType") as PatientType]}</div>
    ),
  },
  {
    accessorKey: "course",
    header: "Curso",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("course")}</div>
    ),
  },
  {
    accessorKey: "series",
    header: "Série/Módulo",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("series")}</div>
    ),
  },
  {
    accessorKey: "sessions",
    header: "Sessões",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("sessions")}</div>
    ),
  },
  // {
  //   accessorKey: "patientType",
  //   header: () => <div className="text-right">Amount</div>,
  //   cell: ({ row }) => {
  //     const amount = parseFloat(row.getValue("patientType"))

  //     // Format the amount as a dollar amount
  //     const formatted = new Intl.NumberFormat("en-US", {
  //       style: "currency",
  //       currency: "USD",
  //     }).format(amount)

  //     return <div className="text-right font-medium">{formatted}</div>
  //   },
  // },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <>button</>
      );
    },
  },
];

export const Patient = ({ data, count }: PatientProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.filters}>
        <Input
          placeholder="Pesquisar paciente"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>

      <Table className="bg-white rounded-lg">
        {/* <TableCaption>A list of your recent patients.</TableCaption> */}
        <TableHeader>
          {/* <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Matrícula</TableHead>
            <TableHead>Função</TableHead>
            <TableHead>Curso</TableHead>
            <TableHead>Série/Módulo</TableHead>
            <TableHead>Sessões</TableHead>
          </TableRow> */}
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {/* {data.map((item: User, index) => {
            return (
              <TableRow
                key={item.id}
                style={{}}
                className={`${(index + 1) % 2 == 0 ? "bg-[#EFF1F3]" : ""}`}
              >
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  {item.registration ? item.registration : "----"}
                </TableCell>
                <TableCell>{PatientTypeDisplay[item.patientType]}</TableCell>
                <TableCell>{item.course ? item?.course : "----"}</TableCell>
                <TableCell>{item?.series ? item?.series : "----"}</TableCell>
                <TableCell>
                  {item?.numberSessions ? item?.numberSessions : "----"}
                </TableCell>
              </TableRow>
            );
          })} */}
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Anterior
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Próxima
          </Button>
        </div>
      </div>
    </div>
  );
};
