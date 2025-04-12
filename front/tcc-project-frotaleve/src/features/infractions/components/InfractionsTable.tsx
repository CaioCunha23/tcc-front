import { useState, useEffect } from "react";
import {
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableFooter,
} from "@/components/ui/table";
import { useTokenStore } from "@/hooks/useTokenStore";
import { useInfractionsColumns } from "@/hooks/useInfractionsColumns";
import AddInfractionDialog from "./AddInfractionDialog";

export interface Infracao {
    id: number;
    tipo: string;
    placaVeiculo: string;
    colaboradorUid: string;
    veiculoId: number;
    costCenter: string;
    dataInfracao: string;
    tag: string;
    hora: string;
    valor: number;
    prefixo: string;
    marca: string;
    categoria: string;
    rodovia: string;
    praca: string;
    nome: string;
    dataEnvio: string;
    valorMulta: number;
    codigoMulta: string;
    indicacaoLimite: string;
    statusResposta: string;
    reconhecimento: boolean;
    enviadoParaRH: boolean;
}

export function InfractionsTable() {
    const [data, setData] = useState<Infracao[]>([]);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const { token } = useTokenStore();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("http://localhost:3000/infracoes", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) throw new Error("Erro ao buscar dados");
                const infracoes: Infracao[] = await response.json();
                console.log("Dados recebidos:", infracoes);
                setData(infracoes);
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            }
        }
        fetchData();
    }, [token]);

    const totalInfractions = data.reduce(
        (acc, infracao) => acc + Number(infracao.valor),
        0
    );

    const columns = useInfractionsColumns();

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination: { pageIndex: 0, pageSize: 20 }
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className="w-full">
            <div className="flex flex-col sm:flex-row items-center justify-between py-4 px-4">
                <div className="flex gap-2">
                    <Input
                        placeholder="Pesquisar UID..."
                        value={
                            (table.getColumn("colaboradorUid")?.getFilterValue() as string) ??
                            ""
                        }
                        onChange={(event) =>
                            table.getColumn("colaboradorUid")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm mb-4 sm:mb-0"
                    />

                    <AddInfractionDialog />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline">
                            Colunas <ChevronDown />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => (
                                <DropdownMenuCheckboxItem
                                    key={column.id}
                                    className="capitalize"
                                    checked={column.getIsVisible()}
                                    onCheckedChange={(value) =>
                                        column.toggleVisibility(!!value)
                                    }
                                >
                                    {column.id}
                                </DropdownMenuCheckboxItem>
                            ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="flex rounded border mx-4">
                <Table className="min-w-full">
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow
                                key={headerGroup.id}
                                className="bg-gray-100 dark:bg-gray-800"
                            >
                                {headerGroup.headers.map((header) => (
                                    <TableHead
                                        key={header.id}
                                        className="px-4 py-2 text-center text-sm font-medium"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="border-b last:border-0"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell
                                            key={cell.id}
                                            className="px-4 py-2 text-center text-sm"
                                        >
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Sem resultados.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell
                                colSpan={columns.length - 1}
                                className="px-4 py-2 text-right text-sm font-semibold"
                            >
                                Total
                            </TableCell>
                            <TableCell className="px-4 py-2 text-right text-sm font-semibold">
                                {(totalInfractions / 100).toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                })}
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end space-y-2 sm:space-y-0 sm:space-x-2 py-4 px-4 sm:px-6">
                <div className="flex space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Anterior
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Próxima
                    </Button>
                </div>
            </div>
        </div>
    );
}
