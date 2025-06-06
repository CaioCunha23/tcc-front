import { Card, CardHeader, CardDescription, CardTitle, CardFooter } from "./ui/card";
import { DashboardMetrics, fetchMetrics } from "@/pages/Home/HomePage";
import { Badge } from "./ui/badge";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { useTokenStore } from "@/hooks/useTokenStore";
import { useSuspenseQuery } from "@tanstack/react-query";

export function CardGrowthSemParar() {
    const { token, colaborador } = useTokenStore();
    const isAdmin = colaborador?.type === "admin";

    const { data: metrics } = useSuspenseQuery<DashboardMetrics>({
        queryKey: ['card', 'dashboard', 'Sem Parar'],
        queryFn: () => {
            return fetchMetrics(token!)
        },
    })

    const valorExibidoGrowthSemParar = isAdmin
        ? metrics.growthSemParar ?? 0
        : metrics?.userGrowthSemParar ?? 0;

    const valorExibidoGrowthSemPararPercent = isAdmin
        ? metrics.growthSemPararPercent ?? 0
        : metrics?.userGrowthSemPararPercent ?? 0;

    return (
        <Card>
            <CardHeader className="relative">
                <CardDescription>Crescimento Gasto com Sem Parar</CardDescription>
                <CardTitle className="text-2xl font-semibold">
                    R$ {valorExibidoGrowthSemParar?.toFixed(2)}
                </CardTitle>
                <div className="absolute right-4 top-4">
                    <Badge
                        variant="outline"
                        className={`flex gap-1 rounded-lg text-xs items-center ${valorExibidoGrowthSemPararPercent >= 0
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                            }`}
                    >
                        {valorExibidoGrowthSemPararPercent >= 0 ? (
                            <TrendingUpIcon className="size-3" />
                        ) : (
                            <TrendingDownIcon className="size-3" />
                        )}
                        {valorExibidoGrowthSemPararPercent >= 0 ? "+" : ""}
                        {valorExibidoGrowthSemPararPercent.toFixed(1)}%
                    </Badge>
                </div>
            </CardHeader>
            <CardFooter className="text-sm text-muted-foreground">
                Comparado ao mês anterior
            </CardFooter>
        </Card>
    )
}