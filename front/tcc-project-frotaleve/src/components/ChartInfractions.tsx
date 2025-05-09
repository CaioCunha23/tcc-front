import { useEffect, useState } from "react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { useTokenStore } from "@/hooks/useTokenStore"

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

export function ChartInfracoes() {
    const [chartData, setChartData] = useState([]);
    const { token } = useTokenStore();

    useEffect(() => {
        async function fetchChartData() {
            try {
                const response = await fetch("http://10.21.120.176:3000/infracoes-chart-data", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                })
                if (!response.ok) {
                    throw new Error("Erro ao buscar dados do gráfico")
                }
                const data = await response.json()
                setChartData(data)
            } catch (error) {
                console.error(error)
            }
        }
        fetchChartData()
    }, [])

    return (
        <Card>
            <CardHeader>
                <CardTitle>Gasto Mensal com Infrações</CardTitle>
                <CardDescription>Multa (azul) e Sem Parar (verde)</CardDescription>
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
                            tickFormatter={(value) => value}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={
                                <ChartTooltipContent
                                    labelFormatter={(value) => `Mês: ${value}`}
                                    indicator="dot"
                                />
                            }
                        />
                        <Area
                            dataKey="multa"
                            type="monotone"
                            fill="url(#fillMulta)"
                            stroke={chartConfig.multa.color}
                        />
                        <Area
                            dataKey="semParar"
                            type="monotone"
                            fill="url(#fillSemParar)"
                            stroke={chartConfig.semParar.color}
                        />
                    </AreaChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}