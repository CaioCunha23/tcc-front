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
import { ArrowUpDown, ChevronDown, MoreHorizontal, } from "lucide-react"
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
import { useState, useEffect } from "react"

export interface Infracao {
  valor: number
}

export interface Colaborador {
  id: number;
  nome: string;
  status: string;
  email: string;
  uidMSK: string;
  localidade: string;
  brand: string;
  jobTitle: string;
  cpf: string;
  usaEstacionamento: boolean;
  cidadeEstacionamento: string;
  cnh: string;
  tipoCNH: string;
  infracaos: Infracao
}

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
    accessorKey: "nome",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          Nome
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="flex justify-center">{row.getValue("nome")}</div>,
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          Status
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="flex justify-center">{row.getValue("status")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          Email
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="flex justify-center lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "uidMSK",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          UID MSK
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="flex justify-center">{row.getValue("uidMSK")}</div>,
  },
  {
    accessorKey: "localidade",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          Localidade
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="flex justify-center">{row.getValue("localidade")}</div>,
  },
  {
    accessorKey: "brand",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          Brand
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="flex justify-center">{row.getValue("brand")}</div>,
  },
  {
    accessorKey: "jobTitle",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          Job Title
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="flex justify-center">{row.getValue("jobTitle")}</div>,
  },
  {
    accessorKey: "cpf",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          CPF
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="flex justify-center">{row.getValue("cpf")}</div>,
  },
  {
    accessorKey: "usaEstacionamento",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          Estacionamento
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="flex justify-center">{row.getValue("usaEstacionamento") ? "Sim" : "Não"}</div>,
  },
  {
    accessorKey: "cidadeEstacionamento",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          Cidade Estacionamento
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="flex justify-center">{row.getValue("cidadeEstacionamento") || "N/A"}</div>,
  },
  {
    accessorKey: "cnh",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          CNH
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="flex justify-center">{row.getValue("cnh")}</div>,
  },
  {
    accessorKey: "tipoCNH",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          Tipo CNH
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => <div className="flex justify-center">{row.getValue("tipoCNH")}</div>,
  },
  {
    id: "infracaoValor",
    accessorFn: (row) => {
      if (!row.infracaos || row.infracaos.length === 0) return 0;

      return row.infracaos.reduce((acc: number, infracao: { valor: string }) =>
        acc + parseFloat(infracao.valor),
        0
      );
    },
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      >
        Infrações
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const valorTotal = row.getValue("infracaoValor") as number;

      return (
        <div className="flex justify-center">
          {valorTotal > 0 ? `R$ ${valorTotal.toFixed(2)}` : "Sem infrações"}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const worker = row.original
      const navigate = useNavigate();
      const handleEditClick = () => {
        navigate(`/colaborador/${worker.id}`);
      };

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
              onClick={() => navigator.clipboard.writeText(worker.uidMSK)}
            >
              Copiar UID MSK
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleEditClick}>Editar Colaborador</DropdownMenuItem>
            <DropdownMenuItem>Desativar Colaborador</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function DataTableWorker() {
  const [data, setData] = useState<Colaborador[]>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:3000/colaboradores")
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
      <div className="flex flex-col sm:flex-row items-center justify-between py-4">
        <Input
          placeholder="Pesquisar UID..."
          value={(table.getColumn("uidMSK")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("uidMSK")?.setFilterValue(event.target.value)
          }
          className="max-w-sm mb-4 sm:mb-0"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Columns <ChevronDown />
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
    </div>
  )
}