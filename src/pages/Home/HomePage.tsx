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
import { useTokenStore } from "@/hooks/useTokenStore";

export interface DashboardMetrics {
  totalInfractionsValue: number;
  userTotalInfractionsValue: number;
  growthMultas: number;
  growthMultasPercent: number;
  growthSemParar: number;
  growthSemPararPercent: number;
  availableCars: number;
  vehiclesInUse: number;
  vehiclesInMaintenance: number;
  vehiclesAvailable: number;
}

export async function fetchMetrics(token: string): Promise<DashboardMetrics> {
  const { logout } = useTokenStore();

  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/dashboard-metrics`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (response.status === 403) {
    logout();
    throw new Error("Usuário não autenticado.");
  }

  if (!response.ok) {
    throw new Error("Erro ao buscar métricas");
  }
  const data: DashboardMetrics = await response.json();
  return data;
}

export function HomePage() {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <div className="flex flex-1 flex-col space-y-4 px-2 sm:px-4 py-3">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <ErrorBoundary onReset={reset} fallbackRender={({ resetErrorBoundary }) => (
          <CardErrorFallback resetErrorBoundary={resetErrorBoundary} />
        )}>
          <Suspense fallback={<CardSkeleton />}>
            <CardTotalInfracoes />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary onReset={reset} fallbackRender={({ resetErrorBoundary }) => (
          <CardErrorFallback resetErrorBoundary={resetErrorBoundary} />
        )}>
          <Suspense fallback={<CardSkeleton />}>
            <CardGrowthMultas />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary onReset={reset} fallbackRender={({ resetErrorBoundary }) => (
          <CardErrorFallback resetErrorBoundary={resetErrorBoundary} />
        )}>
          <Suspense fallback={<CardSkeleton />}>
            <CardGrowthSemParar />
          </Suspense>
        </ErrorBoundary>

        <ErrorBoundary onReset={reset} fallbackRender={({ resetErrorBoundary }) => (
          <CardErrorFallback resetErrorBoundary={resetErrorBoundary} />
        )}>
          <Suspense fallback={<CardSkeleton />}>
            <CardVehiclesMetrics />
          </Suspense>
        </ErrorBoundary>
      </div>

      <div className="w-full">
        <ErrorBoundary fallbackRender={({ resetErrorBoundary }) => (
          <ChartInfracoesErrorFallback resetErrorBoundary={resetErrorBoundary} />
        )}>
          <Suspense fallback={<ChartInfracoesSkeleton />}>
            <div className="w-full h-auto">
              <ChartInfracoes />
            </div>
          </Suspense>
        </ErrorBoundary>
      </div>

      <Tabs defaultValue="colaborador-aumento" className="w-full flex flex-col space-y-4">
        <div className="overflow-x-auto">
          <TabsList className="flex flex-wrap gap-2">
            <TabsTrigger value="colaborador-aumento" className="flex-1 min-w-[120px] text-center">
              Aumento Multas
            </TabsTrigger>
            <TabsTrigger value="top-offenders" className="flex-1 min-w-[120px] text-center">
              Top Offenders
            </TabsTrigger>
            <TabsTrigger value="veiculos-manutencao" className="flex-1 min-w-[120px] text-center">
              Veículos a Vencer
            </TabsTrigger>
            <TabsTrigger value="multas-a-vencer" className="flex-1 min-w-[120px] text-center">
              Multas a Vencer
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="colaborador-aumento">
          <div className="w-full overflow-x-auto">
            <ColaboradorAumentoTable />
          </div>
        </TabsContent>

        <TabsContent value="top-offenders">
          <div className="w-full overflow-x-auto">
            <TopOffendersTable />
          </div>
        </TabsContent>

        <TabsContent value="veiculos-manutencao">
          <div className="w-full overflow-x-auto">
            <VeiculosProxManutencao />
          </div>
        </TabsContent>

        <TabsContent value="multas-a-vencer">
          <div className="w-full overflow-x-auto">
            <InfractionsDueDate />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}