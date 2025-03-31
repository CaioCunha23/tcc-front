import { useEffect, useState } from "react";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartInfracoes } from "@/components/chart-infractions";

interface DashboardMetrics {
  totalInfractionsValue: number;
  growthMultas: number;
  growthSemParar: number;
  availableCars: number;
  vehiclesInUse: number;
  vehiclesInMaintenance: number;
  vehiclesAvailable: number;
}

export function HomePage() {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalInfractionsValue: 0,
    growthMultas: 0,
    growthSemParar: 0,
    availableCars: 0,
    vehiclesInUse: 0,
    vehiclesInMaintenance: 0,
    vehiclesAvailable: 0,
  });

  useEffect(() => {
    async function fetchMetrics() {
      try {
        const response = await fetch("http://localhost:3000/dashboard-metrics");
        if (!response.ok) throw new Error("Erro ao buscar métricas");
        const data: DashboardMetrics = await response.json();
        setMetrics(data);
      } catch (error) {
        console.error("Erro ao buscar métricas:", error);
      }
    }
    fetchMetrics();
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4">

        <Card className="@container/card">
          <CardHeader className="relative">
            <CardDescription>Total Gasto com Infrações</CardDescription>
            <CardTitle className="text-2xl font-semibold">
              R$ {metrics.totalInfractionsValue.toFixed(2)}
            </CardTitle>
          </CardHeader>
          <CardFooter className="text-sm text-muted-foreground">
            Valores atualizados recentemente
          </CardFooter>
        </Card>

        <Card className="@container/card">
          <CardHeader className="relative">
            <CardDescription>Crescimento Gasto com Multas</CardDescription>
            <CardTitle className="text-2xl font-semibold">
              {metrics.growthMultas.toFixed(1)}%
            </CardTitle>
            <div className="absolute right-4 top-4">
              <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                {metrics.growthMultas >= 0 ? <TrendingUpIcon className="size-3" /> : <TrendingDownIcon className="size-3" />}
                {metrics.growthMultas >= 0 ? "+" : ""}{metrics.growthMultas.toFixed(1)}%
              </Badge>
            </div>
          </CardHeader>
          <CardFooter className="text-sm text-muted-foreground">
            Comparado ao último período
          </CardFooter>
        </Card>

        <Card className="@container/card">
          <CardHeader className="relative">
            <CardDescription>Crescimento Infrações "Sem Parar"</CardDescription>
            <CardTitle className="text-2xl font-semibold">
              {metrics.growthSemParar.toFixed(1)}%
            </CardTitle>
            <div className="absolute right-4 top-4">
              <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
                {metrics.growthSemParar >= 0 ? <TrendingUpIcon className="size-3" /> : <TrendingDownIcon className="size-3" />}
                {metrics.growthSemParar >= 0 ? "+" : ""}{metrics.growthSemParar.toFixed(1)}%
              </Badge>
            </div>
          </CardHeader>
          <CardFooter className="text-sm text-muted-foreground">
            Tendência de crescimento
          </CardFooter>
        </Card>

        <Card className="@container/card">
          <CardHeader className="relative">
            <CardDescription>Status dos Veículos</CardDescription>
            <CardTitle className="text-2xl font-semibold">
              Em Uso: {metrics.vehiclesInUse} | Disponíveis: {metrics.vehiclesAvailable}
            </CardTitle>
          </CardHeader>
          <CardFooter className="text-sm text-muted-foreground">
            Em Manutenção: {metrics.vehiclesInMaintenance}
          </CardFooter>
        </Card>
      </div>

      <div className="mt-8">
        <ChartInfracoes />
      </div>
    </div>
  );
}