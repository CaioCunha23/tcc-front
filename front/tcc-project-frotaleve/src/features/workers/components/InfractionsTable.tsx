import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";

export interface Infracao {
    id: number;
    tipo: string;
    placa: string;
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
    reconhecimento: string;
    enviadoParaRH: string;
}

export function InfractionsTable() {
    const [data, setData] = useState<Infracao[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://localhost:3000/infracoes");
                if (!response.ok) throw new Error("Erro ao buscar dados");
                const data: Infracao[] = await response.json();
                console.log("Dados recebidos:", data);
                setData(data);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        }

        fetchData();
    }, []);

    const totalInfractions = data.reduce(
        (acc, infracao) => acc + parseFloat(infracao.valor.toString()),
        0
    );

    return (
        <div className="rounded-md border overflow-x-auto">
            <Table className="min-w-full border">
                <TableCaption className="text-sm italic">
                    Lista de Infrações
                </TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-100 dark:bg-gray-800">
                        <TableHead className="px-4 py-2 text-left text-xs font-semibold uppercase">
                            UID
                        </TableHead>
                        <TableHead className="px-4 py-2 text-left text-xs font-semibold uppercase">
                            Tipo
                        </TableHead>
                        <TableHead className="px-4 py-2 text-left text-xs font-semibold uppercase">
                            Placa
                        </TableHead>
                        <TableHead className="px-4 py-2 text-left text-xs font-semibold uppercase">
                            Tag
                        </TableHead>
                        <TableHead className="px-4 py-2 text-left text-xs font-semibold uppercase">
                            Brand
                        </TableHead>
                        <TableHead className="px-4 py-2 text-left text-xs font-semibold uppercase">
                            Data Infracao
                        </TableHead>
                        <TableHead className="px-4 py-2 text-left text-xs font-semibold uppercase">
                            Data Envio
                        </TableHead>
                        <TableHead className="px-4 py-2 text-left text-xs font-semibold uppercase">
                            Indicação Limite
                        </TableHead>
                        <TableHead className="px-4 py-2 text-left text-xs font-semibold uppercase">
                            Status Resposta
                        </TableHead>
                        <TableHead className="px-4 py-2 text-left text-xs font-semibold uppercase">
                            Reconhecimento
                        </TableHead>
                        <TableHead className="px-4 py-2 text-left text-xs font-semibold uppercase">
                            Enviado p/ RH
                        </TableHead>
                        <TableHead className="px-4 py-2 text-right text-xs font-semibold uppercase">
                            Valor
                        </TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {data.map((infracao) => (
                        <TableRow
                            key={infracao.codigoMulta || infracao.id}
                            className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                            <TableCell className="px-4 py-2 text-sm">
                                {infracao.colaboradorUid}
                            </TableCell>
                            <TableCell className="px-4 py-2 text-sm">
                                {infracao.tipo}
                            </TableCell>
                            <TableCell className="px-4 py-2 text-sm">
                                {infracao.placa}
                            </TableCell>
                            <TableCell className="px-4 py-2 text-sm">
                                {infracao.tag}
                            </TableCell>
                            <TableCell className="px-4 py-2 text-sm">
                                {infracao.marca}
                            </TableCell>
                            <TableCell className="px-4 py-2 text-sm">
                                {infracao.dataInfracao}
                            </TableCell>
                            <TableCell className="px-4 py-2 text-sm">
                                {infracao.dataEnvio}
                            </TableCell>
                            <TableCell className="px-4 py-2 text-sm">
                                {infracao.indicacaoLimite}
                            </TableCell>
                            <TableCell className="px-4 py-2 text-sm">
                                {infracao.statusResposta}
                            </TableCell>
                            <TableCell className="px-4 py-2 text-sm">
                                {infracao.reconhecimento}
                            </TableCell>
                            <TableCell className="px-4 py-2 text-sm">
                                {infracao.enviadoParaRH}
                            </TableCell>
                            <TableCell className="px-4 py-2 text-sm text-right">
                                {(infracao.valor / 100).toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                })}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell
                            colSpan={10}
                            className="px-4 py-2 text-right text-sm font-semibold"
                        >
                            Total
                        </TableCell>
                        <TableCell
                            colSpan={2}
                            className="px-4 py-2 text-right text-sm font-semibold"
                        >
                            {(totalInfractions / 100).toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                            })}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </div>
    );
}  