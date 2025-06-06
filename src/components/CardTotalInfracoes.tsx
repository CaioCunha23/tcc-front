
import { Card, CardHeader, CardDescription, CardTitle, CardFooter } from "./ui/card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTokenStore } from "@/hooks/useTokenStore";
import { DashboardMetrics, fetchMetrics } from "@/pages/Home/HomePage"

export function CardTotalInfracoes() {
    const { token, colaborador } = useTokenStore();
    const isAdmin = colaborador?.type === "admin";

    const { data: metrics } = useSuspenseQuery<DashboardMetrics>({
        queryKey: ['card', 'dashboard', 'infracoes'],
        queryFn: () => {
            return fetchMetrics(token!);
        },
    })

    const valorExibido = isAdmin
        ? metrics.totalInfractionsValue ?? 0
        : metrics?.userTotalInfractionsValue ?? 0;

    return (
        <Card>
            <CardHeader className="relative">
                <CardDescription>Total Gasto com Infrações</CardDescription>
                <CardTitle className="text-2xl font-semibold">
                    R$ {valorExibido?.toFixed(2)}
                </CardTitle>
            </CardHeader>
            <CardFooter className="text-sm text-muted-foreground">
                Valores atualizados recentemente
            </CardFooter>
        </Card>
    )
}