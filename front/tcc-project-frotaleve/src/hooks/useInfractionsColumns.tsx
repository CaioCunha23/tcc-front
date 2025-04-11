import { useMemo } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Infracao {
    tipo: string;
    placaVeiculo: string;
    colaboradorUid: string;
    veiculoId: number;
    costCenter: string;
    dataInfracao: string;
    tag: string;
    hora: string;
    valor: number;
    prefixo: string;
    marca: string;
    categoria: string;
    rodovia: string;
    praca: string;
    nome: string;
    dataEnvio: string;
    valorMulta: number;
    codigoMulta: string;
    indicacaoLimite: string;
    statusResposta: string;
    reconhecimento: boolean;
    enviadoParaRH: boolean;
}

export function useInfractionsColumns(): ColumnDef<Infracao>[] {
    return useMemo<ColumnDef<Infracao>[]>(() => [
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
            cell: ({ row }) => (
                <div className="flex justify-center">{row.getValue("dataInfracao")}</div>
            ),
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
            cell: ({ row }) => (
                <div className="flex justify-center">{row.getValue("dataEnvio")}</div>
            ),
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
            cell: ({ row }) => (
                <div className="flex justify-center">{row.getValue("indicacaoLimite")}</div>
            ),
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
    ], []);
}