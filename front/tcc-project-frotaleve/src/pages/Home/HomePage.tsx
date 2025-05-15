import { Suspense } from "react";
import { ChartInfracoes } from "@/components/ChartInfractions";
import ColaboradorAumentoTable from "@/components/ColaboradorAumentoTable";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import TopOffendersTable from "@/components/TopOffendersTable";
import VeiculosProxManutencao from "@/components/VeiculosProxManutencao";
import InfractionsDueDate from "@/components/MultasAVencer";
import { CardTotalInfracoes } from "@/components/CardTotalInfracoes";
import { CardGrowthMultas } from "@/components/CardGrowthMultas";
import { CardGrowthSemParar } from "@/components/CardGrowthSemParar";
import { CardVehiclesMetrics } from "@/components/CardVehiclesMetrics";
import { ErrorBoundary } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import { CardErrorFallback, CardSkeleton } from "@/components/CardsFallbacks";
import { ChartInfracoesErrorFallback, ChartInfracoesSkeleton } from "@/components/ChartInfractionsFallbacks";

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

export async function fetchMetrics(token: string) {
  const response = await fetch("http://10.21.120.176:3000/dashboard-metrics", {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) {
    throw new Error("Erro ao buscar métricas");
  }
  const data: DashboardMetrics = await response.json();
  return data;
}

export function HomePage() {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-4">
        <ErrorBoundary onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <CardErrorFallback resetErrorBoundary={resetErrorBoundary} />
          )}>
          <Suspense fallback={<CardSkeleton />}>
            <CardTotalInfracoes propriedadePraPegar="totalInfractionsValue" />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <CardErrorFallback resetErrorBoundary={resetErrorBoundary} />
          )}>
          <Suspense fallback={<CardSkeleton />}>
            <CardGrowthMultas />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <CardErrorFallback resetErrorBoundary={resetErrorBoundary} />
          )}>
          <Suspense fallback={<CardSkeleton />}>
            <CardGrowthSemParar />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => (
            <CardErrorFallback resetErrorBoundary={resetErrorBoundary} />
          )}>
          <Suspense fallback={<CardSkeleton />}>
            <CardVehiclesMetrics />
          </Suspense>
        </ErrorBoundary>
      </div>

      <div className="mt-8">
        <ErrorBoundary fallbackRender={({ resetErrorBoundary }) => (
          <ChartInfracoesErrorFallback resetErrorBoundary={resetErrorBoundary} />
        )}>
          <Suspense fallback={<ChartInfracoesSkeleton />}>
            <ChartInfracoes />
          </Suspense>
        </ErrorBoundary>
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