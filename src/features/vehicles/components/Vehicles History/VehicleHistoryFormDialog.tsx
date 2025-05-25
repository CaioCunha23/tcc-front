import { Card, CardContent } from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useTokenStore } from "@/hooks/useTokenStore";
import { useState } from "react";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog";
import { Calendar, SendIcon, RefreshCcwIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { vehicleHistoryFormSchema } from "../../schemas/vehicleHistoryFormSchema";

interface VehicleHistoryFormDialogProps {
    onVehicleHistoryAdded: () => void;
    onCloseDialog: () => void;
}

export function VehicleHistoryFormDialog({ onVehicleHistoryAdded, onCloseDialog }: VehicleHistoryFormDialogProps) {
    const { token } = useTokenStore();
    const [alertOpen, setAlertOpen] = useState(false);

    const form = useForm<z.infer<typeof vehicleHistoryFormSchema>>({
        resolver: zodResolver(vehicleHistoryFormSchema),
        defaultValues: {
            colaboradorUid: "",
            veiculoPlaca: "",
            dataInicio: undefined,
            dataFim: undefined,
            tipoUso: "",
        },
    });

    async function onSubmit(values: z.infer<typeof vehicleHistoryFormSchema>) {
        try {
            const response = await fetch(`http://localhost:3000/historico`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log("Enviando para o backend:", values);
                throw new Error(errorData.message || "Erro ao adicionar histórico");
            }

            const data = await response.json();
            console.log("histórico adicionado com sucesso:", data);

            setAlertOpen(true);
        } catch (error) {
            console.error("Erro ao adicionar colahistóricoborador:", error);
            toast.error(
                error instanceof Error ? error.message : "Erro ao adicionar histórico"
            );
        }
    }

    function handleDialogResponse(insertMore: boolean) {
        if (insertMore) {
            form.reset();
            setAlertOpen(false);
        } else {
            setAlertOpen(false);
            onCloseDialog();
            onVehicleHistoryAdded();
            toast.success(`Colaborador adicionado (às ${new Date().toLocaleTimeString()})`);
        }
    }

    const { reset } = form;

    return (
        <div className="w-full max-w-3xl mx-auto">
            <Card className="shadow border border-border">
                <CardContent className="p-4 md:p-6">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-5"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="colaboradorUid"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>UID MSK</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="UID MSK"
                                                    {...field}
                                                    className="border-input focus:ring-2 focus:ring-offset-0 focus:ring-ring/30"
                                                />
                                            </FormControl>
                                            <FormMessage className="text-xs font-medium" />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="veiculoPlaca"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Placa do Veículo</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Placa do veículo"
                                                    {...field}
                                                    className="border-input focus:ring-2 focus:ring-offset-0 focus:ring-ring/30"
                                                />
                                            </FormControl>
                                            <FormMessage className="text-xs font-medium" />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="dataInicio"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Data de Início</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full pl-3 text-left font-normal border-primary",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(new Date(field.value), "dd/MM/yyyy")
                                                            ) : (
                                                                <span>Selecione uma data</span>
                                                            )}
                                                            <Calendar className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                                                    <CalendarComponent
                                                        mode="single"
                                                        selected={field.value ? new Date(field.value) : undefined}
                                                        onSelect={(date) => {
                                                            field.onChange(date ?? undefined);
                                                        }}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="dataFim"
                                    render={({ field }) => (
                                        <FormItem className="flex-1">
                                            <FormLabel>Data Finalização</FormLabel>
                                            <Popover>
                                                <PopoverTrigger asChild>
                                                    <FormControl>
                                                        <Button
                                                            variant={"outline"}
                                                            className={cn(
                                                                "w-full pl-3 text-left font-normal border-primary",
                                                                !field.value && "text-muted-foreground"
                                                            )}
                                                        >
                                                            {field.value ? (
                                                                format(new Date(field.value), "dd/MM/yyyy")
                                                            ) : (
                                                                <span>Selecione uma data</span>
                                                            )}
                                                            <Calendar className="ml-auto h-4 w-4 opacity-50" />
                                                        </Button>
                                                    </FormControl>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                                                    <CalendarComponent
                                                        mode="single"
                                                        selected={field.value ? new Date(field.value) : undefined}
                                                        onSelect={(date) => {
                                                            field.onChange(date ?? undefined);
                                                        }}
                                                        initialFocus
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <FormField
                                    control={form.control}
                                    name="tipoUso"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tipo de Uso</FormLabel>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <FormControl>
                                                    <SelectTrigger className="border-input focus:ring-2 focus:ring-offset-0 focus:ring-ring/30">
                                                        <SelectValue placeholder="Tipo de uso" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Fixo">Fixo</SelectItem>
                                                    <SelectItem value="Temporário">Temporário</SelectItem>
                                                    <SelectItem value="Veículo Reserva">Veículo Reserva</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage className="text-xs font-medium" />
                                        </FormItem>
                                    )}
                                />

                            </div>

                            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end pt-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => reset()}
                                    className="flex items-center gap-2"
                                >
                                    <RefreshCcwIcon size={16} />
                                    <span>Limpar</span>
                                </Button>
                                <Button type="submit" className="flex items-center gap-2">
                                    <SendIcon size={16} />
                                    <span>Enviar</span>
                                </Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                <AlertDialogContent className="max-w-md">
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Deseja inserir outro histórico?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Se optar por não inserir, o pop-up será fechado e a tabela será atualizada.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className="flex justify-end space-x-3 mt-4">
                        <AlertDialogAction
                            onClick={() => handleDialogResponse(true)}
                            className="bg-primary hover:bg-primary/90"
                        >
                            Inserir outro
                        </AlertDialogAction>
                        <AlertDialogCancel onClick={() => handleDialogResponse(false)}>
                            Fechar
                        </AlertDialogCancel>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}