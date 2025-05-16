import { useMemo, useState } from "react";
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
import { useTokenStore } from "./useTokenStore";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import VehicleHistoryEditFormDialog from "@/features/vehicles/components/Vehicles History/EditVehicleHistoryDialog";

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
    tipoUso: string;
    dataInicio: Date;
    dataFim: Date;
}

interface UseVehiclesHistoryColumnsOptions {
    onVehicleHistoryUpdated: () => void;
}

export function useVehiclesHistoryColumns({ onVehicleHistoryUpdated }: UseVehiclesHistoryColumnsOptions): ColumnDef<VehiclesHistory>[] {
    const navigate = useNavigate();
    const { token } = useTokenStore();

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
            accessorKey: "tipoUso",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                        className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                        Tipo de Uso
                        <ArrowUpDown />
                    </Button>
                )
            },
            cell: ({ row }) => <div className="flex justify-center">{row.getValue("tipoUso")}</div>,
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
                const [open, setOpen] = useState(false);

                async function handleSave(values: Partial<VehiclesHistory>) {
                    const updatedVehicleHistory: VehiclesHistory = { ...historico, ...values };
                    const res = await fetch(`http://localhost:3000/historico/${historico.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                        body: JSON.stringify(updatedVehicleHistory),
                    });
                    console.log(updatedVehicleHistory)
                    if (res.ok) {
                        setOpen(false);
                        toast.success(`Histórico atualizado (às ${new Date().toLocaleTimeString()})`);
                        onVehicleHistoryUpdated && onVehicleHistoryUpdated();
                    } else {
                        console.error("Erro ao atualizar");
                        toast.error(`Erro ao atualizar histórico.`);
                    }
                }

                const handleEditClick = (event: React.MouseEvent) => {
                    event.stopPropagation();
                    setOpen(true);
                };


                return (
                    <>
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Abrir Menu</span>
                                    <MoreHorizontal />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    onClick={(event) => {
                                        event.stopPropagation();
                                        navigator.clipboard.writeText(String(historico.id));
                                    }}
                                >
                                    Copiar ID
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleEditClick}>
                                    Atualizar Histórico
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                    <DialogTitle>Editar Histórico</DialogTitle>
                                    <DialogDescription>
                                        Altere os dados do Histórico e salve.
                                    </DialogDescription>
                                </DialogHeader>

                                <VehicleHistoryEditFormDialog defaultValues={historico} onSubmit={handleSave} />
                            </DialogContent>
                        </Dialog>
                    </>
                );
            },
        },
    ], [navigate]);
}