import { Card, CardHeader, CardDescription, CardTitle, CardFooter } from "./ui/card";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useTokenStore } from "@/hooks/useTokenStore";
import { DashboardMetrics, fetchMetrics } from "../pages/home/HomePage"

export function CardTotalInfracoes({ propriedadePraPegar }: { propriedadePraPegar: keyof DashboardMetrics }) {
    const { token } = useTokenStore();
    const { data: totalInfracoes } = useSuspenseQuery({
        queryKey: ['card', 'dashboard', 'infracoes'],
        queryFn: () => {
            return fetchMetrics(token!);
        }
    })
    const valor = totalInfracoes?.[propriedadePraPegar];

    return (
        <Card>
            <CardHeader className="relative">
                <CardDescription>Total Gasto com Infrações</CardDescription>
                <CardTitle className="text-2xl font-semibold">
                    R$ {valor?.toFixed(2)}
                </CardTitle>
            </CardHeader>
            <CardFooter className="text-sm text-muted-foreground">
                Valores atualizados recentemente
            </CardFooter>
        </Card>
    )
}