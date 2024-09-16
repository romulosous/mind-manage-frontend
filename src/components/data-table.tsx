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
  
  import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table";
  import { Button } from "@/components/ui/button";
  import React, { Dispatch, SetStateAction } from "react";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
  
  export interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    pagesCount: number;
    rowsPerPage: 10 | 20 | 30 | 40 | 50;
    currentPage: number;
    hiddenColumns?: VisibilityState;
    title: string;
    createRowLink?: string;
    totalRows: number;
    query: string;
    setQuery: Dispatch<SetStateAction<string>>;
    setPage: Dispatch<SetStateAction<number>>;
    setRowsPerPage: Dispatch<SetStateAction<number>>;
  }
  
  export function DataTable<TData, TValue>({
    columns,
    data,
    pagesCount,
    rowsPerPage,
    currentPage,
    query,
    createRowLink,
    totalRows,
    title,
    hiddenColumns = {},
    setQuery,
    setPage,
    setRowsPerPage,
  }: DataTableProps<TData, TValue>) {
    console.log("pagesCount: ", pagesCount);
    console.log("rowsPerPage: ", rowsPerPage);
    console.log("currentPage: ", currentPage);
    console.log("query: ", query);
    console.log("createRowLink: ", createRowLink);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
      [],
    );
    const [columnVisibility, setColumnVisibility] =
      React.useState<VisibilityState>(hiddenColumns);
    const table = useReactTable({
      data,
      columns,
      pageCount: pagesCount,
      rowCount: rowsPerPage,
      manualPagination: true,
      manualFiltering: true,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      onSortingChange: setSorting,
      getSortedRowModel: getSortedRowModel(),
      onColumnFiltersChange: setColumnFilters,
      getFilteredRowModel: getFilteredRowModel(),
      onColumnVisibilityChange: setColumnVisibility,
      state: {
        sorting,
        columnFilters,
        columnVisibility,
        pagination: {
          pageIndex: currentPage - 1,
          pageSize: rowsPerPage,
        },
      },
    });
  
    return (
      <div className="">
        <div className="rounded-md border">
          <Table className="bg-white rounded-lg">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="flex items-center justify-between p-2">
          <div className="flex-1 text-sm text-muted-foreground">
            showing {data.length} of {totalRows} row(s) .
          </div>
          <div className="flex items-center space-x-6 lg:space-x-8">
            <div className="flex items-center space-x-2">
              <p className="text-sm font-medium">Rows per page</p>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  setRowsPerPage(Number(value));
                  setPage(1);
                }}
              >
                <SelectTrigger className="h-8 w-[70px]">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {[10, 20, 30, 40, 50].map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex w-[100px] items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => setPage(currentPage - 1)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeftIcon className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => setPage(currentPage + 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRightIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }