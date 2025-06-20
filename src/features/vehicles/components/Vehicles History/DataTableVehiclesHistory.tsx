import { useState, useEffect, useMemo } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  VisibilityState,
  FilterFn,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useVehiclesHistoryColumns, VehiclesHistory } from "@/hooks/useVehiclesHistoryColumns";
import { useTokenStore } from "@/hooks/useTokenStore";
import AddVehicleHistoryDialog from "./AddVehicleHistoryDialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DateRangePicker } from "@/components/DateRangePicker";

export function DataTableVehiclesHistory() {
  const [data, setData] = useState<VehiclesHistory[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [dateFilterField, setDateFilterField] = useState<"dataInicio" | "dataFim">("dataInicio");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");

  const { token, colaborador, logout } = useTokenStore();
  const isAdmin = colaborador?.type === "admin";
  const userUid = colaborador?.uidMSK;

  const betweenDatesFn: FilterFn<VehiclesHistory> = (row, columnId, filterValue) => {
    const rowVal = row.getValue<string>(columnId);
    if (!filterValue || typeof filterValue !== "object") return true;

    const { from, to } = filterValue as { from: string; to: string };
    const d = new Date(rowVal);
    return (!from || d >= new Date(from)) && (!to || d <= new Date(to));
  };

  async function fetchData() {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/historicos`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 403) {
        logout();
        throw new Error("Usuário não autenticado.");
      }

      if (!response.ok) {
        throw new Error("Erro ao buscar históricos");
      }
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error("Erro no fetch:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [token]);

  const filteredData = useMemo(() => {
    if (isAdmin) return data;
    return data.filter((item) => item.colaboradorUid === userUid);
  }, [data, isAdmin, userUid]);

  const columns = useVehiclesHistoryColumns({ onVehicleHistoryUpdated: fetchData });

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    filterFns: {
      between: betweenDatesFn,
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  function applyDateFilter() {
    table
      .getColumn(dateFilterField)
      ?.setFilterValue(dateFrom && dateTo ? { from: dateFrom, to: dateTo } : "");
  }

  return (
    <div className="w-full">
      <div className="flex flex-col gap-4 py-4">
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center flex-1">
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
              <div className="flex gap-2">
                {isAdmin && (
                  <Input
                    placeholder="Pesquisar placa..."
                    value={(table.getColumn("veiculoPlaca")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                      table.getColumn("veiculoPlaca")?.setFilterValue(event.target.value)
                    }
                    className="w-full sm:max-w-sm"
                  />
                )}
                {isAdmin && <AddVehicleHistoryDialog onVehicleHistoryAdded={fetchData} />}
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:items-center">
                <Select onValueChange={(v) => setDateFilterField(v as any)} value={dateFilterField}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Selecione coluna" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Coluna de Data</SelectLabel>
                      <SelectItem value="dataInicio">Data Início</SelectItem>
                      <SelectItem value="dataFim">Data Finalização</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                <div className="w-full sm:w-auto">
                  <DateRangePicker
                    dateFrom={dateFrom}
                    dateTo={dateTo}
                    setDateFrom={setDateFrom}
                    setDateTo={setDateTo}
                  />
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                  <Button onClick={applyDateFilter} className="w-full sm:w-auto cursor-pointer">
                    Filtrar
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setDateFrom("");
                      setDateTo("");
                      table.getColumn(dateFilterField)?.setFilterValue("");
                    }}
                    className="w-full sm:w-auto cursor-pointer"
                  >
                    Limpar
                  </Button>
                </div>
              </div>
            </div >

            <div className="flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full sm:w-auto">
                    Colunas <ChevronDown />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {table
                    .getAllColumns()
                    .filter((column) => column.getCanHide())
                    .map((column) => (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) => column.toggleVisibility(!!value)}
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-lvw size-auto overflow-x-auto rounded border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-gray-100 dark:bg-gray-800">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="px-4 py-2 text-sm font-medium text-center"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b last:border-0"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4 py-2 text-center text-sm">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Sem resultados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-end space-y-2 sm:space-y-0 sm:space-x-2 py-4 px-4 sm:px-6">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} linha(s) selecionadas.
        </div>
        <div className="flex space-x-2">
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
    </div >
  );
}