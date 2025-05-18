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
  const response = await fetch("/api/dashboard-metrics", {
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
    <div className="flex flex-1 flex-col gap-4 p-3 sm:p-4 pt-0">

      <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-2 xl:grid-cols-4">
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

      <div className="mt-6 sm:mt-8">
        <ErrorBoundary fallbackRender={({ resetErrorBoundary }) => (
          <ChartInfracoesErrorFallback resetErrorBoundary={resetErrorBoundary} />
        )}>
          <Suspense fallback={<ChartInfracoesSkeleton />}>
            <ChartInfracoes />
          </Suspense>
        </ErrorBoundary>
      </div>

      <Tabs defaultValue="colaborador-aumento" className="flex w-full flex-col gap-4 sm:gap-6 mt-4">

        <div className="overflow-x-auto pb-1">
          <TabsList className="w-max">
            <TabsTrigger value="colaborador-aumento">Aumento Multas</TabsTrigger>
            <TabsTrigger value="top-offenders">Top Offenders</TabsTrigger>
            <TabsTrigger value="veiculos-manutencao">Próx. Manutenção</TabsTrigger>
            <TabsTrigger value="multas-a-vencer">Multas a Vencer</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="colaborador-aumento">
          <ErrorBoundary fallbackRender={({ resetErrorBoundary }) => (
            <ChartInfracoesErrorFallback resetErrorBoundary={resetErrorBoundary} />
          )}>
            <Suspense fallback={<ChartInfracoesSkeleton />}>
              <div className="overflow-x-auto">
                <ColaboradorAumentoTable />
              </div>
            </Suspense>
          </ErrorBoundary>
        </TabsContent>

        <TabsContent value="top-offenders">
          <div className="overflow-x-auto">
            <TopOffendersTable />
          </div>
        </TabsContent>

        <TabsContent value="veiculos-manutencao">
          <div className="overflow-x-auto">
            <VeiculosProxManutencao />
          </div>
        </TabsContent>

        <TabsContent value="multas-a-vencer">
          <div className="overflow-x-auto">
            <InfractionsDueDate />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}