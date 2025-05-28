import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShieldAlertIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useTokenStore } from '@/hooks/useTokenStore';

interface Offender {
    colaboradorUid: string;
    infractionCount: number;
    percentage: number;
}

export default function TopOffendersTable() {
    const [data, setData] = useState<Offender[]>([]);
    const [loading, setLoading] = useState(true);
    const { token } = useTokenStore();

    useEffect(() => {
        setLoading(true);
        fetch('${process.env.VITE_BACKEND_URL}top-offenders', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        }
        )
            .then(response => response.json())
            .then(result => {
                setData(result);
                setLoading(false);
            })
            .catch(err => {
                console.error("Erro ao buscar dados de top offenders:", err);
                setLoading(false);
            });
    }, []);

    return (
        <Card className="w-full shadow-sm">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <ShieldAlertIcon className="h-5 w-5 text-yellow-500" />
                    Top Offenders do Mês Anterior
                </CardTitle>
            </CardHeader>
            <CardContent className="p-2">
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/50 hover:bg-muted/50">
                                <TableHead className="font-medium">Colaborador</TableHead>
                                <TableHead className="text-center font-medium">Infrações</TableHead>
                                <TableHead className="text-right pr-6 font-medium">Porcentagem</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={3} className="h-24 text-center">
                                        Carregando dados...
                                    </TableCell>
                                </TableRow>
                            ) : data.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={3} className="h-24 text-center">
                                        Nenhum dado encontrado
                                    </TableCell>
                                </TableRow>
                            ) : (
                                data.map((item) => (
                                    <TableRow key={item.colaboradorUid}>
                                        <TableCell className="font-medium">{item.colaboradorUid}</TableCell>
                                        <TableCell className="text-center">{item.infractionCount}</TableCell>
                                        <TableCell className="text-right pr-6">
                                            <Badge
                                                variant={item.percentage > 20 ? "destructive" : "outline"}
                                                className={`${item.percentage > 20
                                                    ? 'bg-red-500 text-white hover:bg-red-400'
                                                    : 'bg-blue-100 text-black hover:bg-blue-200'
                                                    }`}
                                            >
                                                {item.percentage.toFixed(1)}%
                                            </Badge>
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