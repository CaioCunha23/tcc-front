import { Card, CardHeader, CardDescription, CardTitle, CardFooter } from "./ui/card";
import { fetchMetrics } from "@/pages/home/HomePage";
import { Badge } from "./ui/badge";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";
import { useTokenStore } from "@/hooks/useTokenStore";
import { useSuspenseQuery } from "@tanstack/react-query";

export function CardGrowthSemParar() {
    const { token } = useTokenStore();
    const { data: metrics } = useSuspenseQuery({
        queryKey: ['card', 'dashboard', 'Sem Parar'],
        queryFn: () => {
            return fetchMetrics(token!)
        }
    })
    const growthSemParar = metrics?.growthSemParar;
    const growthSemPararPercent = metrics?.growthMultasPercent ?? 0;


    return (
        <Card>
            <CardHeader className="relative">
                <CardDescription>Crescimento Gasto com Multas</CardDescription>
                <CardTitle className="text-2xl font-semibold">
                    R$ {growthSemParar?.toFixed(2)}
                </CardTitle>
                <div className="absolute right-4 top-4">
                    <Badge
                        variant="outline"
                        className={`flex gap-1 rounded-lg text-xs items-center ${growthSemPararPercent >= 0
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                            }`}
                    >
                        {growthSemPararPercent >= 0 ? (
                            <TrendingUpIcon className="size-3" />
                        ) : (
                            <TrendingDownIcon className="size-3" />
                        )}
                        {growthSemPararPercent >= 0 ? "+" : ""}
                        {growthSemPararPercent.toFixed(1)}%
                    </Badge>
                </div>
            </CardHeader>
            <CardFooter className="text-sm text-muted-foreground">
                Comparado ao mês anterior
            </CardFooter>
        </Card>
    )
}