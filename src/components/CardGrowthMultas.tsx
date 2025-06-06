import { Card, CardHeader, CardDescription, CardTitle, CardFooter } from "./ui/card";
import { DashboardMetrics, fetchMetrics } from '@/pages/Home/HomePage';
import { Badge } from "./ui/badge";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { useTokenStore } from "@/hooks/useTokenStore";
import { useSuspenseQuery } from "@tanstack/react-query";

export function CardGrowthMultas() {
    const { token, colaborador } = useTokenStore();
    const isAdmin = colaborador?.type === "admin";

    const { data: metrics } = useSuspenseQuery<DashboardMetrics>({
        queryKey: ['card', 'dashboard', 'multas'],
        queryFn: () => {
            return fetchMetrics(token!)
        },
    })

    const valorExibidoGrowthMultas = isAdmin
        ? metrics.growthMultas ?? 0
        : metrics?.userGrowthMultas ?? 0;

    const valorExibidoGrowthMultasPercent = isAdmin
        ? metrics.growthMultasPercent ?? 0
        : metrics?.userGrowthMultasPercent ?? 0;

    return (
        <Card>
            <CardHeader className="relative">
                <CardDescription>Crescimento Gasto com Multas</CardDescription>
                <CardTitle className="text-2xl font-semibold">
                    R$ {valorExibidoGrowthMultas?.toFixed(2)}
                </CardTitle>
                <div className="absolute right-4 top-4">
                    <Badge
                        variant="outline"
                        className={`flex gap-1 rounded-lg text-xs items-center ${valorExibidoGrowthMultasPercent >= 0
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                            }`}
                    >
                        {valorExibidoGrowthMultasPercent >= 0 ? (
                            <TrendingUpIcon className="size-3" />
                        ) : (
                            <TrendingDownIcon className="size-3" />
                        )}
                        {valorExibidoGrowthMultasPercent >= 0 ? "+" : ""}
                        {valorExibidoGrowthMultasPercent.toFixed(1)}%
                    </Badge>
                </div>
            </CardHeader>
            <CardFooter className="text-sm text-muted-foreground">
                Comparado ao mês anteior
            </CardFooter>
        </Card>
    )
}