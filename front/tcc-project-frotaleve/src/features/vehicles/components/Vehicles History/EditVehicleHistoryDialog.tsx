import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    FormField,
    FormItem,
    FormControl,
    FormMessage,
    Form,
    FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DialogClose } from "@/components/ui/dialog";
import { ClipboardCheckIcon } from "lucide-react";
import { VehiclesHistory } from "@/hooks/useVehiclesHistoryColumns";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { vehicleHistoryFormSchema } from "../../schemas/vehicleHistoryFormSchema";

interface VehicleHistoryEditFormProps {
    defaultValues: VehiclesHistory;
    onSubmit: (values: Partial<VehiclesHistory>) => Promise<void>;
    onVehicleHistoryUpdated?: () => void;
}

export default function VehicleHistoryEditFormDialog({ defaultValues, onSubmit, onVehicleHistoryUpdated }: VehicleHistoryEditFormProps) {
    const form = useForm<z.infer<typeof vehicleHistoryFormSchema>>({
        resolver: zodResolver(vehicleHistoryFormSchema),
        defaultValues,
    });

    const handleFormSubmit = async (values: Partial<VehiclesHistory>) => {
        await onSubmit(values);
        onVehicleHistoryUpdated && onVehicleHistoryUpdated();
    };

    return (
        <Card className="shadow border border-border">
            <CardContent className="p-4 md:p-6">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleFormSubmit)}
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
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            <DialogClose asChild>
                                <Button variant="outline" >Cancelar</Button>
                            </DialogClose>
                            <Button type="submit" className="flex items-center gap-2">
                                <ClipboardCheckIcon size={16} />
                                <span>Salvar</span>
                            </Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>

    )
}