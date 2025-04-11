import { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUpIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useTokenStore } from '@/hooks/useTokenStore';

interface ColaboradorAumento {
  colaboradorUid: string;
  currentCount: number;
  previousCount: number;
  growth: number;
}

export default function ColaboradorAumentoTable() {
  const [data, setData] = useState<ColaboradorAumento[]>([]);
  const [loading, setLoading] = useState(true);
  const { token } = useTokenStore();

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:3000/dashboard-metrics-colaborador-maior-aumento', {
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
        console.error("Erro ao buscar dados:", err);
        setLoading(false);
      });
  }, []);

  return (
    <Card className="w-full shadow-sm">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <TrendingUpIcon className="h-5 w-5 text-orange-500" />
            Colaboradores com Maior Aumento de Multas
          </CardTitle>
          <Badge variant="outline" className="text-orange-700 hover:bg-orange-100">
            Top Infratores
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-2">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50 hover:bg-muted/50">
                <TableHead className="w-[180px] font-medium">Colaborador</TableHead>
                <TableHead className="text-center font-medium">Mês Atual</TableHead>
                <TableHead className="text-center font-medium">Mês Anterior</TableHead>
                <TableHead className="text-right font-medium pr-6">Variação</TableHead>
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
                data.map((item) => (
                  <TableRow key={item.colaboradorUid}>
                    <TableCell className="font-medium py-3">
                      {item.colaboradorUid}
                    </TableCell>
                    <TableCell className="text-center py-3">
                      <span className="font-semibold">{item.currentCount}</span>
                    </TableCell>
                    <TableCell className="text-center py-3">
                      {item.previousCount}
                    </TableCell>
                    <TableCell className="text-right py-3 pr-6">
                      <Badge
                        variant={item.growth > 50 ? "destructive" : item.growth > 20 ? "outline" : "secondary"}
                        className={`${item.growth > 50
                          ? 'bg-red-500 text-white hover:bg-red-400'
                          : item.growth > 20
                            ? 'bg-orange-100 text-orange-800 hover:bg-orange-200'
                            : 'bg-blue-100 text-black hover:bg-blue-200'
                          }`}
                      >
                        +{item.growth.toFixed(1)}%
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