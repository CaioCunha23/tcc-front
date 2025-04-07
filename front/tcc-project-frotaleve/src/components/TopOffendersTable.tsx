import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';

interface Offender {
    colaboradorUid: string;
    infractionCount: number;
    percentage: number;
}

export default function TopOffendersTable() {
    const [data, setData] = useState<Offender[]>([]);

    useEffect(() => {
        fetch('http://localhost:3000/top-offenders')
            .then(response => response.json())
            .then(result => {
                console.log("Top offenders:", result);
                setData(result);
            })
            .catch(err => {
                console.error("Erro ao buscar dados de top offenders:", err);
            });
    }, []);

    return (
        <div className="p-4">
            <Label className="mb-4 text-xl font-bold">Top Offenders do Mês Anterior</Label>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Colaborador UID</TableCell>
                        <TableCell>Infrações</TableCell>
                        <TableCell>Porcentagem (%)</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(item => (
                        <TableRow key={item.colaboradorUid}>
                            <TableCell>{item.colaboradorUid}</TableCell>
                            <TableCell>{item.infractionCount}</TableCell>
                            <TableCell>{item.percentage}%</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}