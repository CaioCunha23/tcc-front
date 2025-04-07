import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@/components/ui/table';
import { Label } from '@/components/ui/label';

interface ColaboradorAumento {
  colaboradorUid: string;
  currentCount: number;
  previousCount: number;
  growth: number;
}

export default function ColaboradorAumentoTable() {
  const [data, setData] = useState<ColaboradorAumento[]>([]);

  useEffect(() => {
    fetch('http://localhost:3000/dashboard-metrics-colaborador-maior-aumento')
      .then(response => response.json())
      .then(result => {
        setData(result);
      })
      .catch(err => {
        console.error("Erro ao buscar dados:", err);
      });
  }, []);

  return (
    <div className="p-4">
      <Label className="mb-4 text-xl font-bold">Colaborador com Maior Aumento de Multas</Label>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Colaborador UID</TableCell>
            <TableCell>Infrações (Mês Atual)</TableCell>
            <TableCell>Infrações (Mês Anterior)</TableCell>
            <TableCell>Variação (%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(item => (
            <TableRow key={item.colaboradorUid}>
              <TableCell>{item.colaboradorUid}</TableCell>
              <TableCell>{item.currentCount}</TableCell>
              <TableCell>{item.previousCount}</TableCell>
              <TableCell>{item.growth}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}