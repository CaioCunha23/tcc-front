import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CarIcon } from 'lucide-react';
import { useTokenStore } from '@/hooks/useTokenStore';

interface VehicleMaintenance {
    placa: string;
    proximaRevisao: string;
}

export default function VeiculosProxManutencao() {
    const [data, setData] = useState<VehicleMaintenance[]>([]);
    const [loading, setLoading] = useState(true);
    const { token } = useTokenStore();

    useEffect(() => {
        setLoading(true);
        fetch('/api/veiculos-manutencao', {
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

    // Função para verificar se a data está próxima (7 dias)
    const isDateNear = (dateString: string) => {
        const maintenanceDate = new Date(dateString);
        const today = new Date();
        const diffTime = maintenanceDate.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 7;
    };

    return (
        <Card className="w-full shadow-sm">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <CarIcon className="h-5 w-5 text-blue-500" />
                    Veículos com Manutenção Programada
                </CardTitle>
            </CardHeader>
            <CardContent className="p-2">
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50 hover:bg-muted/50">
                                <TableHead className="font-medium">Placa</TableHead>
                                <TableHead className="font-medium">Data de Manutenção</TableHead>
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
                                        Nenhum dado encontrado
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data.map((item) => (
                                    <TableRow key={item.placa}>
                                        <TableCell className="font-medium">{item.placa}</TableCell>
                                        <TableCell className={isDateNear(item.proximaRevisao) ? "text-amber-600 font-semibold" : ""}>
                                            {item.proximaRevisao}
                                        </TableCell>
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