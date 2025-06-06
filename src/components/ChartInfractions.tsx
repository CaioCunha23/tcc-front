import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useTokenStore } from "@/hooks/useTokenStore"
import { useSuspenseQuery } from "@tanstack/react-query"

const chartConfig = {
    multa: {
        label: "Multa",
        color: "hsl(217, 71%, 53%)"
    },
    semParar: {
        label: "Sem Parar",
        color: "hsl(141, 71%, 48%)"
    }
}

async function fetchChartData(token: string) {
    const { logout } = useTokenStore();

    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/infracoes-chart-data`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (response.status === 403) {
        logout();
        throw new Error("Usuário não autenticado.");
    }

    if (!response.ok) {
        throw new Error("Erro ao buscar dados do gráfico")
    }

    const data = await response.json()
    return data;
}

export function ChartInfracoes() {
    const { token } = useTokenStore();
    const { data: chartData } = useSuspenseQuery({
        queryKey: ['graphic', 'dashboard'],
        queryFn: () => {
            return fetchChartData(token!);
        },
    })

    if (!chartData || chartData.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Gasto Mensal com Infrações</CardTitle>
                    <CardDescription>Multa (azul) e Sem Parar (verde)</CardDescription>
                </CardHeader>
                <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                    <div className="flex items-center justify-center h-[250px]">
                        <p className="text-muted-foreground">Nenhum dado encontrado para o período</p>
                    </div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Gasto Mensal com Infrações</CardTitle>
                <CardDescription>
                    Multa (azul) e Sem Parar (verde)
                </CardDescription>
            </CardHeader>
            <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
                <ChartContainer config={chartConfig} className="aspect-auto h-[250px] w-full">
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="fillMulta" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={chartConfig.multa.color} stopOpacity={1.0} />
                                <stop offset="95%" stopColor={chartConfig.multa.color} stopOpacity={0.1} />
                            </linearGradient>
                            <linearGradient id="fillSemParar" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor={chartConfig.semParar.color} stopOpacity={1.0} />
                                <stop offset="95%" stopColor={chartConfig.semParar.color} stopOpacity={0.1} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="date"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            minTickGap={32}
                            tickFormatter={(value) => {
                                const [year, month] = value.split('-');
                                const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
                                    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
                                return `${monthNames[parseInt(month) - 1]} ${year}`;
                            }}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => {
                                        const [year, month] = value.split('-');
                                        const monthNames = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
                                            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
                                        return `${monthNames[parseInt(month) - 1]} de ${year}`;
                                    }}
                                    indicator="dot"
                                    formatter={(value, name) => [
                                        `R$ ${Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
                                        chartConfig[name as keyof typeof chartConfig]?.label || name
                                    ]}
                                />
                            }
                        />
                        <Area
                            dataKey="multa"
                            type="monotone"
                            fill="url(#fillMulta)"
                            stroke={chartConfig.multa.color}
                            strokeWidth={2}
                        />
                        <Area
                            dataKey="semParar"
                            type="monotone"
                            fill="url(#fillSemParar)"
                            stroke={chartConfig.semParar.color}
                            strokeWidth={2}
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}