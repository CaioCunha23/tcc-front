
import { Card, CardHeader, CardDescription, CardTitle, CardFooter } from "./ui/card";
import { fetchMetrics } from "@/pages/Home/HomePage";
import { useTokenStore } from "@/hooks/useTokenStore";
import { useSuspenseQuery } from "@tanstack/react-query";

export function CardVehiclesMetrics() {
    const { token } = useTokenStore();
    const { data: metrics } = useSuspenseQuery({
        queryKey: ['card', 'dashboard', 'veiculos'],
        queryFn: () => {
            return fetchMetrics(token!)
        },
    })
    const vehiclesInUse = metrics?.vehiclesInUse;
    const vehiclesAvailable = metrics?.vehiclesAvailable;
    const vehiclesInMaintenance = metrics?.vehiclesInMaintenance;

    return (
        <Card>
            <CardHeader className="relative">
                <CardDescription>Status dos Veículos</CardDescription>
                <CardTitle className="text-2xl font-semibold">
                    Em Uso: {vehiclesInUse} | Disponíveis: {vehiclesAvailable}
                </CardTitle>
            </CardHeader>
            <CardFooter className="text-sm text-muted-foreground">
                Em Manutenção: {vehiclesInMaintenance}
            </CardFooter>
        </Card>
    )
}