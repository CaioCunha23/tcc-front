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
import InfractionEditForm from "@/features/infractions/components/EditInfractionDialog";
import { useTokenStore } from "./useTokenStore";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Infracao } from "@/types/Infraction";

interface UseInfractionsColumnsOptions {
    onInfractionUpdated: () => void;
}

export function useInfractionsColumns({ onInfractionUpdated }: UseInfractionsColumnsOptions): ColumnDef<Infracao>[] {
    const navigate = useNavigate();
    const { token } = useTokenStore();

    return useMemo<ColumnDef<Infracao>[]>(() => [
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
            accessorKey: "colaboradorUid",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    UID
                    <ArrowUpDown />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="flex justify-center">{row.getValue("colaboradorUid")}</div>
            ),
        },
        {
            accessorKey: "tipo",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    Tipo
                    <ArrowUpDown />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="flex justify-center">{row.getValue("tipo")}</div>
            ),
        },
        {
            accessorKey: "placaVeiculo",
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
                <div className="flex justify-center">{row.getValue("placaVeiculo")}</div>
            ),
        },
        {
            accessorKey: "tag",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    Tag
                    <ArrowUpDown />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="flex justify-center">{row.getValue("tag")}</div>
            ),
        },
        {
            accessorKey: "marca",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    Brand
                    <ArrowUpDown />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="flex justify-center">{row.getValue("marca")}</div>
            ),
        },
        {
            accessorKey: "dataInfracao",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    Data Infracao
                    <ArrowUpDown />
                </Button>
            ),
            filterFn: "between",
            cell: ({ row }) => {
                const rawDate = row.getValue("dataInfracao");
                const dateValue = rawDate
                    ? new Date(rawDate as string | number | Date).toLocaleString("pt-BR", { timeZone: "UTC" })
                    : "N/A";
                return <div className="flex justify-center">{dateValue}</div>;
            },
        },
        {
            accessorKey: "dataEnvio",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    Data Envio
                    <ArrowUpDown />
                </Button>
            ),
            filterFn: "between",
            cell: ({ row }) => {
                const rawDate = row.getValue("dataEnvio");
                const dateValue = rawDate
                    ? new Date(rawDate as string | number | Date).toLocaleString("pt-BR", { timeZone: "UTC" })
                    : "N/A";
                return <div className="flex justify-center">{dateValue}</div>;
            },
        },
        {
            accessorKey: "indicacaoLimite",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    Indicação Limite
                    <ArrowUpDown />
                </Button>
            ),
            filterFn: "between",
            cell: ({ row }) => {
                const rawDate = row.getValue("indicacaoLimite");
                const dateValue = rawDate
                    ? new Date(rawDate as string | number | Date).toLocaleString("pt-BR", { timeZone: "UTC" })
                    : "N/A";
                return <div className="flex justify-center">{dateValue}</div>;
            },
        },
        {
            accessorKey: "statusResposta",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    Status Resposta
                    <ArrowUpDown />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="flex justify-center">{row.getValue("statusResposta")}</div>
            ),
        },
        {
            accessorKey: "reconhecimento",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    Reconhecimento
                    <ArrowUpDown />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="flex justify-center">
                    {row.getValue("reconhecimento") ? "Reconhecido" : "Não reconhecido"}
                </div>
            ),
        },
        {
            accessorKey: "enviadoParaRH",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    Enviado p/ RH
                    <ArrowUpDown />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="flex justify-center">
                    {row.getValue("enviadoParaRH") ? "Sim" : "Não"}
                </div>
            ),
        },
        {
            accessorKey: "valor",
            header: ({ column }) => (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                    className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    Valor
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            ),
            cell: ({ row }) => (
                <div className="flex justify-end">
                    {(row.getValue("valor") as number / 100).toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                    })}
                </div>
            ),
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const infraction = row.original;
                const [open, setOpen] = useState(false);

                async function handleSave(values: Partial<Infracao>) {
                    const updatedInfraction: Infracao = { ...infraction, ...values };
                    const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}infracao/${infraction.id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${token}`,
                        },
                        body: JSON.stringify(updatedInfraction),
                    });
                    if (res.ok) {
                        setOpen(false);
                        toast.success(`Infração atualizada (às ${new Date().toLocaleTimeString()})`);
                        onInfractionUpdated && onInfractionUpdated();
                    } else {
                        console.error("Erro ao atualizar");
                        toast.error(`Erro ao atualizar infração.`);
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
                                        navigator.clipboard.writeText(infraction.codigoMulta);
                                    }}
                                >
                                    Copiar Código Multa
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={handleEditClick}>
                                    Editar Infração
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Dialog open={open} onOpenChange={setOpen}>
                            <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                    <DialogTitle>Editar Infração</DialogTitle>
                                    <DialogDescription>
                                        Atualize os dados da infração e salve.
                                    </DialogDescription>
                                </DialogHeader>

                                <InfractionEditForm
                                    defaultValues={infraction}
                                    onSubmit={handleSave}
                                    onInfractionUpdated={onInfractionUpdated}
                                />
                            </DialogContent>
                        </Dialog>
                    </>
                )
            },
        },
    ], [navigate]);
}