import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ClockAlert } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { useTokenStore } from '@/hooks/useTokenStore';

interface VehicleMaintenance {
    tipo: string;
    codigoMulta: string;
    colaboradorUid: string;
    placaVeiculo: string;
    categoria: string;
    costCenter: string;
    valor: number;
    dataInfracao: string;
    statusResposta: string;
    indicacaoLimite: string;
}

export default function VeiculosProxManutencao() {
    const [data, setData] = useState<VehicleMaintenance[]>([]);
    const [loading, setLoading] = useState(true);
    const { token } = useTokenStore();

    useEffect(() => {
        fetch('/api/vencimento-multas', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(response => response.json())
            .then(result => {
                setData(result);
                setLoading(false);
            })
            .catch(err => {
                console.error("Erro ao buscar dados de veiculos:", err);
                setLoading(false);
            });
    }, []);

    return (
        <Card>
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        <ClockAlert className="h-5 w-5 text-red-500" />
                        Multas próximas do Vencimento
                    </CardTitle>
                    <Badge variant="outline" className="text-orange-700 hover:bg-orange-100">
                        Vencimento
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="p-2">
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50 hover:bg-muted/50">
                                <TableHead className="w-[180px] font-medium">Tipo</TableHead>
                                <TableHead className="text-center font-medium">Código da Multa</TableHead>
                                <TableHead className="text-center font-medium">UID MSK</TableHead>
                                <TableHead className="text-center font-medium">Placa</TableHead>
                                <TableHead className="text-center font-medium">Categoria</TableHead>
                                <TableHead className="text-center font-medium">Centro de Custo</TableHead>
                                <TableHead className="text-center font-medium">Valor</TableHead>
                                <TableHead className="text-center font-medium">Data da Infração</TableHead>
                                <TableHead className="text-center font-medium">Status Resposta</TableHead>
                                <TableHead className="text-right font-medium pr-6">Data Indicação Limite</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center">
                                        Carregando dados...
                                    </TableCell>
                                </TableRow>
                            ) : data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} className="h-24 text-center">
                                        Nenhum dado encontrado
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data.map(item => (
                                    <TableRow key={item.codigoMulta}>
                                        <TableCell className="font-medium py-3">{item.tipo}</TableCell>
                                        <TableCell className="text-center py-3">{item.codigoMulta}</TableCell>
                                        <TableCell className="text-center py-3">{item.colaboradorUid}</TableCell>
                                        <TableCell className="text-center py-3">{item.placaVeiculo}</TableCell>
                                        <TableCell className="text-center py-3">{item.categoria}</TableCell>
                                        <TableCell className="text-center py-3">{item.costCenter}</TableCell>
                                        <TableCell className="text-center py-3">{item.valor}</TableCell>
                                        <TableCell className="text-center py-3">{item.dataInfracao}</TableCell>
                                        <TableCell className="text-center py-3">
                                            <Badge
                                                variant={
                                                    item.statusResposta === "Não"
                                                        ? "destructive"
                                                        : item.statusResposta === "Respondida"
                                                            ? "outline"
                                                            : "secondary"
                                                }
                                                className={`${item.statusResposta === "Não"
                                                    ? "bg-red-500 text-white hover:bg-red-200"
                                                    : item.statusResposta === "Respondida"
                                                        ? "bg-green-100 text-green-800 hover:bg-green-200"
                                                        : "bg-orange-100 text-orange-800 hover:bg-orange-200"
                                                    }`}
                                            >
                                                {item.statusResposta}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-right py-3 pr-6">{item.indicacaoLimite}</TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}