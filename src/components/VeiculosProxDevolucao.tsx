import { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CarIcon } from 'lucide-react'
import { useTokenStore } from '@/hooks/useTokenStore'

interface VeiculoContrato {
    placa: string
    previsaoDevolucao: string
}

export default function VeiculosContratoProximo() {
    const [data, setData] = useState<VeiculoContrato[]>([])
    const [loading, setLoading] = useState(true)
    const { token } = useTokenStore()

    useEffect(() => {
        setLoading(true)
        fetch('${import.meta.env.VITE_BACKEND_URL}veiculos-devolucao', {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then(r => r.json())
            .then(setData)
            .catch(console.error)
            .finally(() => setLoading(false))
    }, [token])

    const isUrgente = (dateStr: string) => {
        const d = new Date(dateStr)
        const diff = (d.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
        return diff <= 30
    }

    return (
        <Card className="w-full shadow-sm">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <CarIcon className="h-5 w-5 text-blue-500" />
                    Veículos com contrato a vencer em até 3 meses
                </CardTitle>
            </CardHeader>
            <CardContent className="p-2">
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50">
                                <TableHead className="font-medium">Placa</TableHead>
                                <TableHead className="font-medium">Data de Devolução</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={2} className="h-24 text-center">
                                        Carregando dados...
                                    </TableCell>
                                </TableRow>
                            ) : data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={2} className="h-24 text-center">
                                        Nenhum veículo próximo de vencer contrato
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data.map(({ placa, previsaoDevolucao }) => (
                                    <TableRow key={placa}>
                                        <TableCell className="font-medium">{placa}</TableCell>
                                        <TableCell
                                            className={isUrgente(previsaoDevolucao)
                                                ? 'text-red-600 font-semibold'
                                                : ''}
                                        >
                                            {new Date(previsaoDevolucao).toLocaleDateString('pt-BR')}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    )
}