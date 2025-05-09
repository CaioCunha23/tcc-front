import { Usable, use } from "react";
import { Card, CardHeader, CardDescription, CardTitle, CardFooter } from "./ui/card";
import { DashboardMetrics } from "@/pages/Home/HomePage";
import { Badge } from "./ui/badge";
import { TrendingDownIcon, TrendingUpIcon } from "lucide-react";

export function CardGrowthMultas({ growthMultasPromise }: { growthMultasPromise: Usable<DashboardMetrics | undefined> }) {
    const metrics = use(growthMultasPromise);
    const growthMultas = metrics?.growthMultas;
    const growthMultasPercent = metrics?.growthMultasPercent ?? 0;

    return (
        <Card>
            <CardHeader className="relative">
                <CardDescription>Crescimento Gasto com Multas</CardDescription>
                <CardTitle className="text-2xl font-semibold">
                    R$ {growthMultas?.toFixed(2)}
                </CardTitle>
                <div className="absolute right-4 top-4">
                    <Badge
                        variant="outline"
                        className={`flex gap-1 rounded-lg text-xs items-center ${growthMultasPercent >= 0
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                            }`}
                    >
                        {growthMultasPercent >= 0 ? (
                            <TrendingUpIcon className="size-3" />
                        ) : (
                            <TrendingDownIcon className="size-3" />
                        )}
                        {growthMultasPercent >= 0 ? "+" : ""}
                        {growthMultasPercent.toFixed(1)}%
                    </Badge>
                </div>
            </CardHeader>
            <CardFooter className="text-sm text-muted-foreground">
                Comparado ao último período
            </CardFooter>
        </Card>
    )
}