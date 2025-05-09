import { Usable, use } from "react";
import { Card, CardHeader, CardDescription, CardTitle, CardFooter } from "./ui/card";
import { DashboardMetrics } from "@/pages/Home/HomePage";

export function CardVehiclesMetrics({ vehicleMetricsPromise }: { vehicleMetricsPromise: Usable<DashboardMetrics | undefined> }) {
    const metrics = use(vehicleMetricsPromise);
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