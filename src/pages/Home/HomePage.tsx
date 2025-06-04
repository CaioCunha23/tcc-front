import { Suspense } from "react";
import { ChartInfracoes } from "@/components/ChartInfractions";
import ColaboradorAumentoTable from "@/components/ColaboradorAumentoTable";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import TopOffendersTable from "@/components/TopOffendersTable";
import VeiculosProxManutencao from "@/components/VeiculosProxDevolucao";
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
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/dashboard-metrics`, {
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
    <div className="flex flex-1 flex-col gap-3 p-2 sm:gap-4 sm:p-4 pt-0">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
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

      <div className="mt-4 sm:mt-6 lg:mt-8">
        <ErrorBoundary fallbackRender={({ resetErrorBoundary }) => (
          <ChartInfracoesErrorFallback resetErrorBoundary={resetErrorBoundary} />
        )}>
          <Suspense fallback={<ChartInfracoesSkeleton />}>
            <div className="w-full overflow-hidden rounded-lg">
              <ChartInfracoes />
            </div>
          </Suspense>
        </ErrorBoundary>
      </div>

      <div className="mt-3 sm:mt-4 lg:mt-6">
        <Tabs defaultValue="colaborador-aumento" className="w-full">
          <div className="mb-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <TabsList className="w-full min-w-max grid grid-cols-2 sm:grid-cols-4 lg:w-max lg:flex h-auto p-1">
              <TabsTrigger
                value="colaborador-aumento"
                className="text-xs sm:text-sm px-2 py-2 sm:px-4 data-[state=active]:bg-white data-[state=active]:text-black"
              >
                <span className="truncate">Aumento Multas</span>
              </TabsTrigger>
              <TabsTrigger
                value="top-offenders"
                className="text-xs sm:text-sm px-2 py-2 sm:px-4 data-[state=active]:bg-white data-[state=active]:text-black"
              >
                <span className="truncate">Top Offenders</span>
              </TabsTrigger>
              <TabsTrigger
                value="veiculos-manutencao"
                className="text-xs sm:text-sm px-2 py-2 sm:px-4 data-[state=active]:bg-white data-[state=active]:text-black"
              >
                <span className="truncate">Veículos a Vencer</span>
              </TabsTrigger>
              <TabsTrigger
                value="multas-a-vencer"
                className="text-xs sm:text-sm px-2 py-2 sm:px-4 data-[state=active]:bg-white data-[state=active]:text-black"
              >
                <span className="truncate">Multas a Vencer</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="space-y-4">
            <TabsContent value="colaborador-aumento" className="mt-0">
              <ErrorBoundary fallbackRender={({ resetErrorBoundary }) => (
                <ChartInfracoesErrorFallback resetErrorBoundary={resetErrorBoundary} />
              )}>
                <Suspense fallback={<ChartInfracoesSkeleton />}>
                  <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                    <div className="min-w-[600px] sm:min-w-[800px]">
                      <ColaboradorAumentoTable />
                    </div>
                  </div>
                </Suspense>
              </ErrorBoundary>
            </TabsContent>

            <TabsContent value="top-offenders" className="mt-0">
              <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <div className="min-w-[600px] sm:min-w-[800px]">
                  <TopOffendersTable />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="veiculos-manutencao" className="mt-0">
              <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <div className="min-w-[600px] sm:min-w-[800px]">
                  <VeiculosProxManutencao />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="multas-a-vencer" className="mt-0">
              <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                <div className="min-w-[600px] sm:min-w-[800px]">
                  <InfractionsDueDate />
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}