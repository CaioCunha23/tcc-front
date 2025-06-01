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
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router";
import VehicleEditFormDialog from "@/features/vehicles/components/Vehicles/EditVehicleDialog";
import { useTokenStore } from "./useTokenStore";
import { toast } from "sonner";
import { Veiculo } from "@/types/Vehicle";

interface UseVehiclesColumnsOptions {
    onVehicleUpdated: () => void;
    onGenerateQR: (veiculo: Veiculo) => void;
}

export function useVehiclesColumns({ onVehicleUpdated, onGenerateQR }: UseVehiclesColumnsOptions): ColumnDef<Veiculo>[] {
    const navigate = useNavigate();
    const { token } = useTokenStore();

    return useMemo<ColumnDef<Veiculo>[]>(() => [
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
            cell: ({ row }) => (
                <div className="flex justify-center">{row.getValue("fornecedor")}</div>
            ),
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
            cell: ({ row }) => (
                <div className="flex justify-center">{row.getValue("contrato")}</div>
            ),
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
            cell: ({ row }) => (
                <div className="flex justify-center">{row.getValue("placa")}</div>
            ),
        },
        {
            accessorKey: "renavam",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    renavam
                    <ArrowUpDown />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="flex justify-center">{row.getValue("renavam")}</div>
            ),
        },
        {
            accessorKey: "chassi",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    Chassi
                    <ArrowUpDown />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="flex justify-center">{row.getValue("chassi")}</div>
            ),
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
            cell: ({ row }) => (
                <div className="flex justify-center">{row.getValue("modelo")}</div>
            ),
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
            cell: ({ row }) => (
                <div className="flex justify-center">{row.getValue("cor")}</div>
            ),
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
            cell: ({ row }) => (
                <div className="flex justify-center">{row.getValue("status")}</div>
            ),
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
            cell: ({ row }) => (
                <div className="flex justify-center">{row.getValue("cliente")}</div>
            ),
        },
        {
            accessorKey: "perfil",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    Perfil
                    <ArrowUpDown />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="flex justify-center">{row.getValue("perfil")}</div>
            ),
        },
        {
            accessorKey: "centroCusto",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    Centro de Custo
                    <ArrowUpDown />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="flex justify-center">{row.getValue("centroCusto")}</div>
            ),
        },
        {
            accessorKey: "franquiaKM",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    Franquia KM
                    <ArrowUpDown />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="flex justify-center">{row.getValue("franquiaKM")}</div>
            ),
        },
        {
            accessorKey: "carroReserva",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    Carro Reserva
                    <ArrowUpDown />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="flex justify-center">
                    {row.getValue("carroReserva") ? "Sim" : "Não"}
                </div>
            ),
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
            filterFn: "between",
            cell: ({ row }) => {
                const rawDate = row.getValue("dataDisponibilizacao");
                const dateValue = rawDate
                    ? new Date(rawDate as string | number | Date).toLocaleDateString("pt-BR", { timeZone: "UTC" })
                    : "N/A";
                return <div className="flex justify-center">{dateValue}</div>;
            },
        },
        {
            accessorKey: "mesesContratados",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    Meses Contratados
                    <ArrowUpDown />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="flex justify-center">{row.getValue("mesesContratados")}</div>
            ),
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
            filterFn: "between",
            cell: ({ row }) => {
                const rawDate = row.getValue("previsaoDevolucao");
                const dateValue = rawDate
                    ? new Date(rawDate as string | number | Date).toLocaleDateString("pt-BR", { timeZone: "UTC" })
                    : "N/A";
                return <div className="flex justify-center">{dateValue}</div>;
            },
        },
        {
            accessorKey: "mesesFaltantes",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    Meses Faltantes
                    <ArrowUpDown />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="flex justify-center">{row.getValue("mesesFaltantes")}</div>
            ),
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
                const mensalidade = row.getValue("mensalidade") as number;
                return (
                    <div className="flex justify-center">
                        {mensalidade > 0 ? `R$ ${(mensalidade / 100).toFixed(2)}` : "Sem mensalidades"}
                    </div>
                );
            },
        },
        {
            accessorKey: "budget",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    Budget
                    <ArrowUpDown />
                </Button>
            ),
            cell: ({ row }) => {
                const budget = row.getValue("budget") as number;
                return (
                    <div className="flex justify-center">
                        {budget > 0 ? `R$ ${(budget / 100).toFixed(2)}` : "Sem budget"}
                    </div>
                );
            },
        },
        {
            accessorKey: "multa",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    Multa
                    <ArrowUpDown />
                </Button>
            ),
            cell: ({ row }) => {
                const multa = row.getValue("multa") as number;
                return (
                    <div className="flex justify-center">
                        {multa > 0 ? `R$ ${(multa / 100).toFixed(2)}` : "Sem multa"}
                    </div>
                );
            },
        },
        {
            accessorKey: "proximaRevisao",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    Próxima Revisão
                    <ArrowUpDown />
                </Button>
            ),
            filterFn: "between",
            cell: ({ row }) => {
                const rawDate = row.getValue("proximaRevisao");
                const dateValue = rawDate
                    ? new Date(rawDate as string | number | Date).toLocaleDateString("pt-BR", { timeZone: "UTC" })
                    : "N/A";
                return <div className="flex justify-center">{dateValue}</div>;
            },
        },
        {
            id: "qr",
            header: "QR",
            cell: ({ row }) => {
                const veiculo = row.original;
                return (
                    <Button size="sm" onClick={() => onGenerateQR(veiculo)}>
                        Gerar QR
                    </Button>
                );
            },
            enableSorting: false,
            enableHiding: true,
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const vehicle = row.original;
                const [open, setOpen] = useState(false);

                async function handleSave(values: Partial<Veiculo>) {
                    const updatedVehicle: Veiculo = { ...vehicle, ...values };
                    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/veiculo/${vehicle.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                        body: JSON.stringify(updatedVehicle),
                    });
                    console.log(updatedVehicle);
                    if (res.ok) {
                        setOpen(false);
                        toast.success(`Veículo atualizado (às ${new Date().toLocaleTimeString()})`);
                        onVehicleUpdated && onVehicleUpdated();
                    } else {
                        console.error("Erro ao atualizar");
                        toast.error(`Erro ao atualizar veículo.`);
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
                                        navigator.clipboard.writeText(vehicle.placa);
                                    }}
                                >
                                    Copiar Placa
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleEditClick}>
                                    Editar Veículo
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                    <DialogTitle>Editar Veículo</DialogTitle>
                                    <DialogDescription>
                                        Altere os dados do Veículo e salve.
                                    </DialogDescription>
                                </DialogHeader>

                                <VehicleEditFormDialog defaultValues={vehicle} onSubmit={handleSave} />
                            </DialogContent>
                        </Dialog>
                    </>
                );
            },
        },
    ], [navigate, token, onVehicleUpdated, onGenerateQR]);
}