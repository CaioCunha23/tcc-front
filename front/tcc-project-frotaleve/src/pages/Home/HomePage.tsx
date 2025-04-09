import { useEffect, useState } from "react";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartInfracoes } from "@/components/ChartInfractions";
import ColaboradorAumentoTable from "@/components/ColaboradorAumentoTable";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import TopOffendersTable from "@/components/TopOffendersTable";
import VeiculosProxManutencao from "@/components/VeiculosProxManutencao";
import InfractionsDueDate from "@/components/MultasAVencer";

interface DashboardMetrics {
  totalInfractionsValue: number;
  growthMultas: number;
  growthMultasPercent: number;
  growthSemParar: number;
  growthSemPararPercent: number;
  availableCars: number;
  vehiclesInUse: number;
  vehiclesInMaintenance: number;
  vehiclesAvailable: number;
}

export function HomePage() {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalInfractionsValue: 0,
    growthMultas: 0,
    growthMultasPercent: 0,
    growthSemParar: 0,
    growthSemPararPercent: 0,
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

        <Card>
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

        <Card>
          <CardHeader className="relative">
            <CardDescription>Crescimento Gasto com Multas</CardDescription>
            <CardTitle className="text-2xl font-semibold">
              R$ {metrics.growthMultas.toFixed(2)}
            </CardTitle>
            <div className="absolute right-4 top-4">
              <Badge
                variant="outline"
                className={`flex gap-1 rounded-lg text-xs items-center ${metrics.growthMultasPercent >= 0
                  ? 'bg-green-100 text-green-800 hover:bg-green-200'
                  : 'bg-red-100 text-red-800 hover:bg-red-200'
                  }`}
              >
                {metrics.growthMultasPercent >= 0 ? (
                  <TrendingUpIcon className="size-3" />
                ) : (
                  <TrendingDownIcon className="size-3" />
                )}
                {metrics.growthMultasPercent >= 0 ? "+" : ""}
                {metrics.growthMultasPercent.toFixed(1)}%
              </Badge>
            </div>
          </CardHeader>
          <CardFooter className="text-sm text-muted-foreground">
            Comparado ao último período
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="relative">
            <CardDescription>Crescimento Infrações Sem Parar</CardDescription>
            <CardTitle className="text-2xl font-semibold">
              R$ {metrics.growthSemParar.toFixed(2)}
            </CardTitle>
            <div className="absolute right-4 top-4">
              <Badge
                variant="outline"
                className={`flex gap-1 rounded-lg text-xs items-center ${metrics.growthSemPararPercent >= 0
                  ? 'bg-green-100 text-green-800 hover:bg-green-200'
                  : 'bg-red-100 text-red-800 hover:bg-red-200'
                  }`}
              >
                {metrics.growthSemPararPercent >= 0 ? (
                  <TrendingUpIcon className="size-3" />
                ) : (
                  <TrendingDownIcon className="size-3" />
                )}
                {metrics.growthSemPararPercent >= 0 ? "+" : ""}
                {metrics.growthSemPararPercent.toFixed(1)}%
              </Badge>
            </div>
          </CardHeader>
          <CardFooter className="text-sm text-muted-foreground">
            Tendência de crescimento
          </CardFooter>
        </Card>

        <Card>
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

      <Tabs defaultValue="colaborador-aumento" className="flex w-full flex-col gap-6">

        <TabsList>
          <TabsTrigger value="colaborador-aumento">Aumento Multas</TabsTrigger>
          <TabsTrigger value="top-offenders">Top Offenders</TabsTrigger>
          <TabsTrigger value="veiculos-manutencao">Veículos Próximos de Manutenção</TabsTrigger>
          <TabsTrigger value="multas-a-vencer">Multas Próximas do Vencimento</TabsTrigger>
        </TabsList>

        <TabsContent value="colaborador-aumento">
          <ColaboradorAumentoTable />
        </TabsContent>

        <TabsContent value="top-offenders">
          <TopOffendersTable />
        </TabsContent>

        <TabsContent value="veiculos-manutencao">
          <VeiculosProxManutencao />
        </TabsContent>

        <TabsContent value="multas-a-vencer">
          <InfractionsDueDate />
        </TabsContent>
      </Tabs>
    </div>
  );
}