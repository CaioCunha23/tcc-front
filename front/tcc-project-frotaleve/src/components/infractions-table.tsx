import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useEffect, useState } from "react"

export interface Infracao {
    id: number,
    tipo: string,
    placa: string,
    colaboradorUid: string,
    veiculoId: number,
    costCenter: string,
    dataInfracao: string,
    tag: string,
    hora: string,
    valor: number,
    prefixo: string,
    marca: string,
    categoria: string,
    rodovia: string,
    praca: string,
    nome: string,
    dataEnvio: string,
    valorMulta: number,
    codigoMulta: string,
    indicacaoLimite: string,
    statusResposta: string,
    reconhecimento: string,
    enviadoParaRH: string,

}

export function InfractionsTable() {
    const [data, setData] = useState<Infracao[]>([])

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://localhost:3000/infracoes")
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

    return (
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Tipo</TableHead>
                    <TableHead>UID</TableHead>
                    <TableHead>Brand</TableHead>
                    <TableHead className="text-right">Valor</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((infracao) => (
                    <TableRow key={infracao.codigoMulta}>
                        <TableCell className="font-medium">{infracao.tipo}</TableCell>
                        <TableCell>{infracao.colaboradorUid}</TableCell>
                        <TableCell>{infracao.marca}</TableCell>
                        <TableCell className="text-right">{infracao.valor}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
            <TableFooter>
                <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">$2,500.00</TableCell>
                </TableRow>
            </TableFooter>
        </Table>
    )
}  