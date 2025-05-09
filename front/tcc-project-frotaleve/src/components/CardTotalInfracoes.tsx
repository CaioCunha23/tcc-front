import { Usable, use } from "react";
import { Card, CardHeader, CardDescription, CardTitle, CardFooter } from "./ui/card";
import { DashboardMetrics } from "@/pages/Home/HomePage";



export function CardTotalInfracoes({ totalInfractionsPromise, propriedadePraPegar }: { totalInfractionsPromise: Usable<DashboardMetrics | undefined>; propriedadePraPegar: keyof DashboardMetrics }) {
    const totalInfracoes = use(totalInfractionsPromise);
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