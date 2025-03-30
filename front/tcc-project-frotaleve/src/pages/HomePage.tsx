import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface DashboardMetrics {
  totalInfractionsValue: number;
  growthMultas: number;
  growthSemParar: number;
  fixedCarUsers: number;
  availableCars: number;
}

export function HomePage() {
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    totalInfractionsValue: 0,
    growthMultas: 0,
    growthSemParar: 0,
    fixedCarUsers: 0,
    availableCars: 0,
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

        setMetrics({
          totalInfractionsValue: 2500,
          growthMultas: 12.5,
          growthSemParar: 8.3,
          fixedCarUsers: 15,
          availableCars: 7,
        });
      }
    }
    fetchMetrics();
  }, []);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">

      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Card className="p-4">
          <h2 className="text-lg font-semibold">Total Gasto com Infrações</h2>
          <p className="text-2xl font-bold">
            ${metrics.totalInfractionsValue.toFixed(2)}
          </p>
        </Card>
        <Card className="p-4">
          <h2 className="text-lg font-semibold">Crescimento Gasto com Multas</h2>
          <p className="text-2xl font-bold">
            {metrics.growthMultas.toFixed(1)}%
          </p>
        </Card>
        <Card className="p-4">
          <h2 className="text-lg font-semibold">
            Crescimento Infrações "Sem Parar"
          </h2>
          <p className="text-2xl font-bold">
            {metrics.growthSemParar.toFixed(1)}%
          </p>
        </Card>
      </div>

      <div className="grid auto-rows-min gap-4 md:grid-cols-2">
        <Card className="p-4">
          <h2 className="text-lg font-semibold">
            Colaboradores com Carros Fixos
          </h2>
          <p className="text-2xl font-bold">{metrics.fixedCarUsers}</p>
        </Card>
        <Card className="p-4">
          <h2 className="text-lg font-semibold">Carros Disponíveis para Uso</h2>
          <p className="text-2xl font-bold">{metrics.availableCars}</p>
        </Card>
      </div>

      <div className="rounded-xl p-4">
        <h2 className="text-lg font-semibold mb-2">Gráficos</h2>
        <p className="text-sm text-muted-foreground">
          Aqui você pode inserir seus charts (ex: com Chart.js, Recharts, etc.)
        </p>
        <div className="mt-4 h-64 flex items-center justify-center border rounded">
          <p>Gráfico placeholder</p>
        </div>
      </div>
    </div>
  );
}
