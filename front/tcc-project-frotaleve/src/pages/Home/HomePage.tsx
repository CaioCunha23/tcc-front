import { useEffect, useState, Suspense } from "react";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartInfracoes } from "@/components/ChartInfractions";
import ColaboradorAumentoTable from "@/components/ColaboradorAumentoTable";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import TopOffendersTable from "@/components/TopOffendersTable";
import VeiculosProxManutencao from "@/components/VeiculosProxManutencao";
import InfractionsDueDate from "@/components/MultasAVencer";
import { useTokenStore } from "@/hooks/useTokenStore";
import { CardTotalInfracoes } from "@/components/CardTotalInfracoes";
import { CardGrowthMultas } from "@/components/CardGrowthMultas";
import { CardGrowthSemParar } from "@/components/CardGrowthSemParar";
import { CardVehiclesMetrics } from "@/components/CardVehiclesMetrics";

export interface DashboardMetrics {
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

function Carregando() {
  return (
    <div className="loading-container">
      <div className="loading-card">
        <div className="loading-spinner"></div>
        <p className="loading-text">Carregando...</p>
      </div>
    </div>
  )
}

async function fetchMetrics(token) {
  try {
    const response = await fetch("http://10.21.120.176:3000/dashboard-metrics", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
    if (!response.ok) throw new Error("Erro ao buscar métricas");
    const data: DashboardMetrics = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao buscar métricas:", error);
  }
}

export function HomePage() {
  const { token } = useTokenStore();
  /*const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalInfractionsValue: 0,
    growthMultas: 0,
    growthMultasPercent: 0,
    growthSemParar: 0,
    growthSemPararPercent: 0,
    availableCars: 0,
    vehiclesInUse: 0,
    vehiclesInMaintenance: 0,
    vehiclesAvailable: 0,
  });*/

  return (

    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4">
        <Suspense fallback={<Carregando />}>
          <CardTotalInfracoes totalInfractionsPromise={fetchMetrics(token)} propriedadePraPegar="totalInfractionsValue" />
        </Suspense>

        <Suspense fallback={<Carregando />}>
          <CardGrowthMultas growthMultasPromise={fetchMetrics(token)} />
        </Suspense>

        <Suspense fallback={<Carregando />}>
          <CardGrowthSemParar growthSemPararPromise={fetchMetrics(token)} />
        </Suspense>

        <Suspense fallback={<Carregando />}>
          <CardVehiclesMetrics vehicleMetricsPromise={fetchMetrics(token)} />
        </Suspense>
      </div>

      <div className="mt-8">
        <Suspense>
          <ChartInfracoes />
        </Suspense>
      </div>

      <Tabs defaultValue="colaborador-aumento" className="flex w-full flex-col gap-6">

        <TabsList>
          <TabsTrigger value="colaborador-aumento">Aumento Multas</TabsTrigger>
          <TabsTrigger value="top-offenders">Top Offenders</TabsTrigger>
          <TabsTrigger value="veiculos-manutencao">Veículos Próximos de Manutenção</TabsTrigger>
          <TabsTrigger value="multas-a-vencer">Multas Próximas do Vencimento</TabsTrigger>
        </TabsList>

        <Suspense>
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
        </Suspense>
      </Tabs>
    </div >
  );
}