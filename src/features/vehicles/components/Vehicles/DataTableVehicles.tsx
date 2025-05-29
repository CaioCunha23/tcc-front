import {
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  FilterFn
} from "@tanstack/react-table"
import { ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"
import { useVehiclesColumns } from "@/hooks/useVehiclesColumns"
import AddVehicleDialog from "./AddVehicleDialog"
import { useTokenStore } from "@/hooks/useTokenStore"
import { Veiculo } from "@/types/Vehicle"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

export function DataTableVehicles() {
  const [data, setData] = useState<Veiculo[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [dateFilterField, setDateFilterField] = useState<"dataDisponibilizacao" | "previsaoDevolucao" | "proximaRevisao">("dataDisponibilizacao");
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const { token } = useTokenStore();

  const betweenDatesFn: FilterFn<Veiculo> = (row, columnId, filterValue) => {
    const rowVal = row.getValue<string>(columnId)
    if (!filterValue || typeof filterValue !== 'object') return true

    const { from, to } = filterValue as { from: string; to: string }
    const d = new Date(rowVal)
    return (!from || d >= new Date(from)) && (!to || d <= new Date(to))
  }

  async function fetchData() {
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/veiculos`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      if (!response.ok) throw new Error("Erro ao buscar dados")
      const data = await response.json()
      console.log("Dados recebidos:", data)
      setData(data)
    } catch (error) {
      console.error("Erro no fetch:", error)
    }
  }

  useEffect(() => {
    fetchData();
  }, [token]);

  const columns = useVehiclesColumns({ onVehicleUpdated: fetchData });

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
    filterFns: {
      between: betweenDatesFn,
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  function applyDateFilter() {
    table.getColumn(dateFilterField)
      ?.setFilterValue(dateFrom && dateTo ? { from: dateFrom, to: dateTo } : "")
  }

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-center justify-between py-4">
        <div className="flex gap-2">
          <Input
            placeholder="Pesquisar placa..."
            value={(table.getColumn("placa")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("placa")?.setFilterValue(event.target.value)
            }
            className="max-w-sm mb-4 sm:mb-0"
          />

          <AddVehicleDialog onVehicleAdded={fetchData} />

          <div className="flex items-center gap-2">
            <Select
              onValueChange={(v) => setDateFilterField(v as any)}
              value={dateFilterField}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Selecione coluna" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Coluna de Data</SelectLabel>
                  <SelectItem value="dataDisponibilizacao">Disponibilização</SelectItem>
                  <SelectItem value="previsaoDevolucao">Previsão Devolução</SelectItem>
                  <SelectItem value="proximaRevisao">Próxima Revisão</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Input
              type="date"
              placeholder="De"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
            />
            <Input
              type="date"
              placeholder="Até"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
            />

            <Button onClick={applyDateFilter}>Filtrar</Button>
            <Button
              variant="outline"
              onClick={() => {
                setDateFrom(""); setDateTo("");
                table.getColumn(dateFilterField)?.setFilterValue("");
              }}
            >
              Limpar
            </Button>
          </div>

        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
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
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
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
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-end space-y-2 sm:space-y-0 sm:space-x-2 py-4 px-4 sm:px-6">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
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
    </div>
  )
}