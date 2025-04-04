import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router";

export interface Veiculo {
  id: number;
  fornecedor: string;
  contrato: string;
  placa: string;
  modelo: string;
  cor: string;
  status: string;
  cliente: string;
  dataDisponibilizacao: string;
  previsaoDevolucao: string;
  cidadeEstacionamento: string;
  mensalidade: string;
}

export function useVehiclesColumns(): ColumnDef<Veiculo>[] {
    const navigate = useNavigate();

    return useMemo(() => [
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
    ], [navigate]);
}