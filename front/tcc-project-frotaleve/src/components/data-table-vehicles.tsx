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
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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
import { useNavigate } from "react-router"
import { useEffect, useState } from "react"

export const columns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className="dark:bg-gray-800 dark:border-gray-600"
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
        className="dark:bg-gray-800 dark:border-gray-600"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "fornecedor",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        Fornecedor
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="flex justify-center">{row.getValue("fornecedor")}</div>,
  },
  {
    accessorKey: "contrato",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        Contrato
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="flex justify-center">{row.getValue("contrato")}</div>,
  },
  {
    accessorKey: "placa",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        Placa
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="flex justify-center">{row.getValue("placa")}</div>,
  },
  {
    accessorKey: "modelo",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        Modelo
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="flex justify-center">{row.getValue("modelo")}</div>,
  },
  {
    accessorKey: "cor",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        Cor
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="flex justify-center">{row.getValue("cor")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        Status
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="flex justify-center">{row.getValue("status")}</div>,
  },
  {
    accessorKey: "cliente",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        Cliente
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="flex justify-center">{row.getValue("cliente")}</div>,
  },
  {
    accessorKey: "dataDisponibilizacao",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        Disponibilização
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const rawDate = row.getValue("dataDisponibilizacao")
      const dateValue = rawDate ? new Date(rawDate as string | number | Date).toLocaleDateString() : "N/A"
      return <div className="flex justify-center">{dateValue}</div>
    },
  },
  {
    accessorKey: "previsaoDevolucao",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        Previsão Devolução
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const rawDate = row.getValue("previsaoDevolucao")
      const dateValue = rawDate ? new Date(rawDate as string | number | Date).toLocaleDateString() : "N/A"
      return <div className="flex justify-center">{dateValue}</div>
    },
  },
  {
    accessorKey: "mensalidade",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        Mensalidade
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      const value = row.getValue("mensalidade")
      return <div className="flex justify-center">{value ? `R$ ${value}` : "N/A"}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const vehicle = row.original
      const navigate = useNavigate()
      const handleEditClick = () => {
        navigate(`/veiculo/${vehicle.id}`)
      }

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Abrir Menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Ações</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(vehicle.placa)}
            >
              Copy Placa
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleEditClick}>Edit Veículo</DropdownMenuItem>
            <DropdownMenuItem>Desativar Veículo</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function DataTableVehicles() {
  const [data, setData] = useState<any[]>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/veiculos")
        if (!response.ok) throw new Error("Erro ao buscar dados")
        const data = await response.json()
        console.log("Dados recebidos:", data)
        setData(data)
      } catch (error) {
        console.error("Erro ao buscar dados:", error)
      }
    }
    fetchData()
  }, [])

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
  })

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row items-center justify-between py-4">
        <Input
          placeholder="Pesquisar placa..."
          value={(table.getColumn("placa")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("placa")?.setFilterValue(event.target.value)
          }
          className="max-w-sm mb-4 sm:mb-0"
        />
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

      <div className="flex max-w-460 rounded border">
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
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}