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
    FilterFn
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
import { Infracao } from "@/types/Infraction";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DateRangePicker } from "@/components/DateRangePicker"

export function InfractionsTable() {
    const [data, setData] = useState<Infracao[]>([]);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const [dateFilterField, setDateFilterField] = useState<"dataInfracao" | "dataEnvio" | "indicacaoLimite">("dataInfracao");
    const [dateFrom, setDateFrom] = useState<string>("");
    const [dateTo, setDateTo] = useState<string>("");
    const { token } = useTokenStore();

    const betweenDatesFn: FilterFn<Infracao> = (row, columnId, filterValue) => {
        const rowVal = row.getValue<string>(columnId)
        if (!filterValue || typeof filterValue !== 'object') return true

        const { from, to } = filterValue as { from: string; to: string }
        const d = new Date(rowVal)
        return (!from || d >= new Date(from)) && (!to || d <= new Date(to))
    }

    const fetchData = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/infracoes`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
            });
            if (!response.ok) throw new Error("Erro ao buscar dados");
            const data = await response.json();
            console.log("Dados recebidos:", data);
            setData(data);
        } catch (error) {
            console.error("Erro no fetch:", error);
        }
    }

    useEffect(() => {
        fetchData();
    }, [token]);

    const totalInfractions = data.reduce(
        (acc, infracao) => acc + Number(infracao.valor),
        0
    );

    const columns = useInfractionsColumns({ onInfractionUpdated: fetchData });

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        filterFns: {
            between: betweenDatesFn,
        },
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    function applyDateFilter() {
        table.getColumn(dateFilterField)
            ?.setFilterValue(dateFrom && dateTo ? { from: dateFrom, to: dateTo } : "")
    }

    return (
        <div className="w-full">
            <div className="flex flex-col sm:flex-row items-center justify-between py-4">
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

                    <AddInfractionDialog onInfractionAdded={fetchData} />

                    <div className="flex items-center gap-2">
                        <Select
                            onValueChange={(v) => setDateFilterField(v as any)}
                            value={dateFilterField}
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Selecione coluna" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Coluna de Data</SelectLabel>
                                    <SelectItem value="dataInfracao">Data Infração</SelectItem>
                                    <SelectItem value="dataEnvio">Data Envio</SelectItem>
                                    <SelectItem value="indicacaoLimite">Indicação Limite</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <div className="w-full sm:w-auto">
                            <DateRangePicker
                                dateFrom={dateFrom}
                                dateTo={dateTo}
                                setDateFrom={setDateFrom}
                                setDateTo={setDateTo}
                            />
                        </div>

                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <Button onClick={applyDateFilter} className="cursor-pointer">Filtrar</Button>
                            <Button
                                variant="outline"
                                onClick={() => {
                                    setDateFrom("")
                                    setDateTo("")
                                    table.getColumn(dateFilterField)?.setFilterValue("")
                                }}
                                className="cursor-pointer"
                            >
                                Limpar
                            </Button>
                        </div>
                    </div>

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

            <div className="max-w-lvw size-auto overflow-x-auto rounded border">
                <Table>
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
                <div className="flex-1 text-sm text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} de{" "}
                    {table.getFilteredRowModel().rows.length} linha(s) selecionada(s).
                </div>
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
