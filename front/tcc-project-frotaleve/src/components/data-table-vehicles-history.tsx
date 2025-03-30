"use client"

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
import { useEffect, useState } from "react"

export interface Colaborador {
  nome: string,
  uidMSK: string,
  brand: string
}

export interface Veiculo {
  placa: string,
  modelo: string,
  renavan: string,
  chassi: string,
  status: string
}

export interface HistoricoVeiculo {
  id: number,
  colaboradores: Colaborador,
  veiculos: Veiculo,
  dataInicio: string,
  dataFim: String
}

export const columns: ColumnDef<HistoricoVeiculo>[] = [
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
    accessorKey: "colaborador",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      const colaborador: Colaborador = row.getValue("colaborador");
      const nome = colaborador?.nome || "Sem nome de colaborador";
      return <div className="flex">{nome}</div>;
    },
  },
  {
    accessorKey: "colaborador",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          UIDMSK
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      const colaborador: Colaborador = row.getValue("colaborador");
      const uidMSK = colaborador?.uidMSK || "UID não encontrado";
      return <div className="flex">{uidMSK}</div>;
    },
  },
  {
    accessorKey: "colaborador",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Brand
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      const colaborador: Colaborador = row.getValue("colaborador");
      const brand = colaborador?.brand || "Colaborador sem brand";
      return <div className="flex">{brand}</div>;
    },
  },
  {
    accessorKey: "veiculo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Placa
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      const veiculo: Veiculo = row.getValue("veiculo");
      const placa = veiculo?.placa || "Placa não encontrada";
      return <div className="flex">{placa}</div>;
    },
  },
  {
    accessorKey: "veiculo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Modelo
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      const veiculo: Veiculo = row.getValue("veiculo");
      const modelo = veiculo?.modelo || "Modelo não encontrado";
      return <div className="flex">{modelo}</div>;
    },
  },
  {
    accessorKey: "veiculo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Renavan
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      const veiculo: Veiculo = row.getValue("veiculo");
      const renavan = veiculo?.renavan || "renavan não encontrado";
      return <div className="flex">{renavan}</div>;
    },
  },
  {
    accessorKey: "veiculo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Chassi
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      const veiculo: Veiculo = row.getValue("veiculo");
      const chassi = veiculo?.chassi || "chassi não encontrado";
      return <div className="flex">{chassi}</div>;
    },
  },
  {
    accessorKey: "veiculo",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => {
      const veiculo: Veiculo = row.getValue("veiculo");
      const status = veiculo?.status || "Status não encontrado";
      return <div className="flex">{status}</div>;
    },
  },
  {
    accessorKey: "dataInicio",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Data de Início
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="flex">{row.getValue("dataInicio")}</div>,
  },
  {
    accessorKey: "dataFim",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Data de Finalização
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div className="flex">{row.getValue("dataFim")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const historico = row.original

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
              onClick={() => navigator.clipboard.writeText(String(historico.id))}
            >
              Copiar ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Detalhes do Histórico</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function DataTableVehiclesHistory() {
  const [data, setData] = useState<HistoricoVeiculo[]>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/historicos")
        if (!response.ok) throw new Error("Erro ao buscar dados")
        const data = await response.json()
        console.log("Dados recebidos:", data);
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
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtrar por UID..."
          value={(table.getColumn("colaboradorUid")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("colaboradorUid")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
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
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
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
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}s
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} de{" "}
          {table.getFilteredRowModel().rows.length} linha(s) selecionadas.
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
  )
}