import { useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ClockAlert, Eye, EyeOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { useTokenStore } from "@/hooks/useTokenStore";

interface VehicleMaintenance {
    tipo: string;
    codigoMulta: string;
    colaboradorUid: string;
    placaVeiculo: string;
    categoria: string;
    costCenter: string;
    valor: number | string;
    dataInfracao: string;
    statusResposta: string;
    indicacaoLimite: string;
}

export default function VeiculosProxManutencao() {
    const [data, setData] = useState<VehicleMaintenance[]>([]);
    const [loading, setLoading] = useState(true);
    const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
    const { token, colaborador } = useTokenStore();
    const isAdmin = colaborador?.type === "admin";

    useEffect(() => {
        fetch(`${import.meta.env.VITE_BACKEND_URL}/vencimento-multas`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((result: VehicleMaintenance[]) => {
                setData(result);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Erro ao buscar dados de veículos:", err);
                setLoading(false);
            });
    }, [token]);

    const filteredData = isAdmin
        ? data
        : data.filter((item) => item.colaboradorUid === colaborador?.uidMSK);

    const toggleRowExpansion = (codigoMulta: string) => {
        const newExpanded = new Set(expandedRows);
        if (newExpanded.has(codigoMulta)) {
            newExpanded.delete(codigoMulta);
        } else {
            newExpanded.add(codigoMulta);
        }
        setExpandedRows(newExpanded);
    };

    return (
        <Card className="w-full shadow-sm">
            <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                        <ClockAlert className="h-5 w-5 text-red-500" />
                        Multas próximas do Vencimento
                    </CardTitle>
                    <Badge variant="outline" className="text-orange-700 hover:bg-orange-100">
                        Vencimento
                    </Badge>
                </div>
            </CardHeader>
            <CardContent className="p-2">
                <div className="rounded-md border">
                    <div className="hidden lg:block">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/50 hover:bg-muted/50">
                                    <TableHead className="text-center font-medium">Tipo</TableHead>
                                    <TableHead className="text-center font-medium">Código da Multa</TableHead>
                                    <TableHead className="text-center font-medium">UID MSK</TableHead>
                                    <TableHead className="text-center font-medium">Placa</TableHead>
                                    <TableHead className="text-center font-medium">Categoria</TableHead>
                                    <TableHead className="text-center font-medium">Centro de Custo</TableHead>
                                    <TableHead className="text-center font-medium">Valor</TableHead>
                                    <TableHead className="text-center font-medium">Data da Infração</TableHead>
                                    <TableHead className="text-center font-medium">Status Resposta</TableHead>
                                    <TableHead className="text-right font-medium pr-6">
                                        Data Indicação Limite
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={10} className="h-24 text-center">
                                            Carregando dados...
                                        </TableCell>
                                    </TableRow>
                                ) : filteredData.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={10} className="h-24 text-center">
                                            Sem multas próximas do vencimento
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredData.map((item) => (
                                        <TableRow key={item.codigoMulta}>
                                            <TableCell className="text-center font-medium">{item.tipo}</TableCell>
                                            <TableCell className="text-center py-3">
                                                {item.codigoMulta}
                                            </TableCell>
                                            <TableCell className="text-center py-3">
                                                {item.colaboradorUid}
                                            </TableCell>
                                            <TableCell className="text-center py-3">
                                                {item.placaVeiculo}
                                            </TableCell>
                                            <TableCell className="text-center py-3">
                                                {item.categoria}
                                            </TableCell>
                                            <TableCell className="text-center py-3">
                                                {item.costCenter}
                                            </TableCell>
                                            <TableCell className="text-center py-3">
                                                R$ {Number(item.valor).toFixed(2)}
                                            </TableCell>
                                            <TableCell className="text-center py-3">
                                                {new Date(item.dataInfracao).toLocaleDateString("pt-BR")}
                                            </TableCell>
                                            <TableCell className="text-center py-3">
                                                <Badge
                                                    variant={
                                                        item.statusResposta === "Não"
                                                            ? "destructive"
                                                            : item.statusResposta === "Respondida"
                                                                ? "outline"
                                                                : "secondary"
                                                    }
                                                    className={`${item.statusResposta === "Não"
                                                        ? "bg-red-500 text-white hover:bg-red-200"
                                                        : item.statusResposta === "Respondida"
                                                            ? "bg-green-100 text-green-800 hover:bg-green-200"
                                                            : "bg-orange-100 text-orange-800 hover:bg-orange-200"
                                                        } text-center`}
                                                >
                                                    {item.statusResposta}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right py-3 pr-6">
                                                {new Date(item.indicacaoLimite).toLocaleDateString("pt-BR")}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    <div className="lg:hidden">
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-muted/50 hover:bg-muted/50">
                                    <TableHead className="text-center font-medium w-8"></TableHead>
                                    <TableHead className="text-center font-medium">Código</TableHead>
                                    <TableHead className="text-center font-medium">Placa</TableHead>
                                    <TableHead className="text-center font-medium">Valor</TableHead>
                                    <TableHead className="text-center font-medium">Status</TableHead>
                                    <TableHead className="text-right font-medium pr-6">Vencimento</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {loading ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-24 text-center">
                                            Carregando dados...
                                        </TableCell>
                                    </TableRow>
                                ) : filteredData.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="h-24 text-center">
                                            Sem multas próximas do vencimento
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredData.map((item) => (
                                        <>
                                            <TableRow key={item.codigoMulta}>
                                                <TableCell className="text-center p-2">
                                                    <Button
                                                        variant="ghost"
                                                        size="sm"
                                                        onClick={() => toggleRowExpansion(item.codigoMulta)}
                                                        className="p-1 h-8 w-8"
                                                    >
                                                        {expandedRows.has(item.codigoMulta) ? (
                                                            <EyeOff className="h-4 w-4" />
                                                        ) : (
                                                            <Eye className="h-4 w-4" />
                                                        )}
                                                    </Button>
                                                </TableCell>
                                                <TableCell className="text-center py-3 font-medium text-sm">
                                                    {item.codigoMulta}
                                                </TableCell>
                                                <TableCell className="text-center py-3 text-sm">
                                                    {item.placaVeiculo}
                                                </TableCell>
                                                <TableCell className="text-center py-3 text-sm font-semibold">
                                                    R$ {Number(item.valor).toFixed(2)}
                                                </TableCell>
                                                <TableCell className="text-center py-3">
                                                    <Badge
                                                        variant={
                                                            item.statusResposta === "Não"
                                                                ? "destructive"
                                                                : item.statusResposta === "Respondida"
                                                                    ? "outline"
                                                                    : "secondary"
                                                        }
                                                        className={`text-xs ${item.statusResposta === "Não"
                                                            ? "bg-red-500 text-white hover:bg-red-200"
                                                            : item.statusResposta === "Respondida"
                                                                ? "bg-green-100 text-green-800 hover:bg-green-200"
                                                                : "bg-orange-100 text-orange-800 hover:bg-orange-200"
                                                            }`}
                                                    >
                                                        {item.statusResposta}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right py-3 pr-6 text-sm">
                                                    {new Date(item.indicacaoLimite).toLocaleDateString("pt-BR")}
                                                </TableCell>
                                            </TableRow>

                                            {expandedRows.has(item.codigoMulta) && (
                                                <TableRow className="bg-muted/30">
                                                    <TableCell colSpan={6} className="py-3">
                                                        <div className="grid grid-cols-2 gap-3 text-sm">
                                                            <div>
                                                                <span className="font-medium text-gray-600">Tipo:</span>
                                                                <p className="mt-1">{item.tipo}</p>
                                                            </div>
                                                            <div>
                                                                <span className="font-medium text-gray-600">UID MSK:</span>
                                                                <p className="mt-1">{item.colaboradorUid}</p>
                                                            </div>
                                                            <div>
                                                                <span className="font-medium text-gray-600">Categoria:</span>
                                                                <p className="mt-1">{item.categoria}</p>
                                                            </div>
                                                            <div>
                                                                <span className="font-medium text-gray-600">Centro de Custo:</span>
                                                                <p className="mt-1">{item.costCenter}</p>
                                                            </div>
                                                            <div className="col-span-2">
                                                                <span className="font-medium text-gray-600">Data da Infração:</span>
                                                                <p className="mt-1">{new Date(item.dataInfracao).toLocaleDateString("pt-BR")}</p>
                                                            </div>
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            )}
                                        </>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}