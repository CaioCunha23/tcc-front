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

export interface Colaborador {
    nome: string;
    brand: string;
}

export interface Veiculo {
    placa: string;
    modelo: string;
    renavam: string;
    chassi: string;
    status: string;
}

export interface VehiclesHistory {
    id: number;
    colaboradorUid: string;
    colaborador: Colaborador;
    veiculo: Veiculo;
    dataInicio: string;
    dataFim: string;
}

export function useVehiclesHistoryColumns(): ColumnDef<VehiclesHistory>[] {
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
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            id: "colaboradorNome",
            accessorFn: (row) => row.colaborador?.nome,
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    Nome
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="flex justify-center">
                    {row.getValue("colaboradorNome") || "Sem nome"}
                </div>
            ),
        },
        {
            accessorKey: "colaboradorUid",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    UID MSK
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="flex justify-center">{row.getValue("colaboradorUid")}</div>
            ),
        },
        {
            id: "colaboradorBrand",
            accessorFn: (row) => row.colaborador?.brand,
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    Brand
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="flex justify-center">
                    {row.getValue("colaboradorBrand") || "Sem brand"}
                </div>
            ),
        },
        {
            id: "veiculoPlaca",
            accessorFn: (row) => row.veiculo?.placa,
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    Placa
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="flex justify-center">
                    {row.getValue("veiculoPlaca") || "Sem placa"}
                </div>
            ),
        },
        {
            id: "veiculoModelo",
            accessorFn: (row) => row.veiculo?.modelo,
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    Modelo
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="flex justify-center">
                    {row.getValue("veiculoModelo") || "Sem modelo"}
                </div>
            ),
        },
        {
            id: "veiculorenavam",
            accessorFn: (row) => row.veiculo?.renavam,
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    renavam
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="flex justify-center">
                    {row.getValue("veiculorenavam") || "Sem renavam"}
                </div>
            ),
        },
        {
            id: "veiculoChassi",
            accessorFn: (row) => row.veiculo?.chassi,
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    Chassi
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="flex justify-center">
                    {row.getValue("veiculoChassi") || "Sem chassi"}
                </div>
            ),
        },
        {
            id: "veiculoStatus",
            accessorFn: (row) => row.veiculo?.status,
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    Status
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="flex justify-center">
                    {row.getValue("veiculoStatus") || "Sem status"}
                </div>
            ),
        },
        {
            accessorKey: "dataInicio",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    Data de Início
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="flex justify-center">{row.getValue("dataInicio")}</div>
            ),
        },
        {
            accessorKey: "dataFim",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    Data de Finalização
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="flex justify-center">{row.getValue("dataFim")}</div>
            ),
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const historico = row.original;
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
                                onClick={() =>
                                    navigator.clipboard.writeText(String(historico.id))
                                }
                            >
                                Copiar ID
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Detalhes do Histórico</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ], [navigate]);
}