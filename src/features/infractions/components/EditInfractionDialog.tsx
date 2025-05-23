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
import { Checkbox } from "@/components/ui/checkbox";
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
import { InfractionFormSchema } from "../schemas/infractionFormSchema";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Calendar } from "lucide-react";
import { Infracao } from "@/types/Infraction";

interface InfractionEditFormProps {
    defaultValues: Infracao;
    onSubmit: (values: Partial<Infracao>) => Promise<void>;
    onInfractionUpdated?: () => void;
}

export default function InfractionEditForm({ defaultValues, onSubmit, onInfractionUpdated }: InfractionEditFormProps) {
    const form = useForm<z.infer<typeof InfractionFormSchema>>({
        resolver: zodResolver(InfractionFormSchema),
        defaultValues,
    });

    const handleFormSubmit = async (values: Partial<Infracao>) => {
        await onSubmit(values);
        onInfractionUpdated && onInfractionUpdated();
    };

    return (
        <Card className="shadow-lg rounded-lg border overflow-hidden">
            <CardContent className="p-6">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleFormSubmit)}
                        className="space-y-6"
                    >
                        <div className="flex flex-col md:flex-row gap-4">
                            <FormField
                                control={form.control}
                                name="tipo"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Tipo de Infração</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Tipo de Infração"
                                                {...field}
                                                className="border-primary"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="colaboradorUid"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>UID MSK</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="UID do Colaborador (6 caracteres)"
                                                {...field}
                                                className="border-primary"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex flex-col md:flex-row gap-4">
                            <FormField
                                control={form.control}
                                name="placaVeiculo"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Placa do Veículo</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Placa do Veículo (7 caracteres)"
                                                {...field}
                                                className="border-primary"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="costCenter"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Centro de Custo</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Centro de Custo"
                                                {...field}
                                                className="border-primary"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex flex-col md:flex-row gap-4">
                            <FormField
                                control={form.control}
                                name="dataInfracao"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Data da Infração</FormLabel>
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
                                                    onSelect={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : "")}
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
                                name="tag"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Tag Sem Parar</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Tag"
                                                {...field}
                                                className="border-primary"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="marca"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Brand</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="border-primary w-full">
                                                    <SelectValue placeholder="Brand" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Maersk Brasil">
                                                    Maersk Brasil
                                                </SelectItem>
                                                <SelectItem value="Aliança">
                                                    Aliança
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex flex-col md:flex-row gap-4">
                            <FormField
                                control={form.control}
                                name="hora"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Hora</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Hora da Infração"
                                                {...field}
                                                className="border-primary"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="dataEnvio"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Data de Envio</FormLabel>
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
                                                    onSelect={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : "")}
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
                                name="statusResposta"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Status da Resposta</FormLabel>
                                        <Select
                                            onValueChange={field.onChange}
                                            defaultValue={field.value}
                                        >
                                            <FormControl>
                                                <SelectTrigger className="border-primary w-full">
                                                    <SelectValue placeholder="Status da Resposta" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Respondido">
                                                    Respondido
                                                </SelectItem>
                                                <SelectItem value="Pendente">
                                                    Pendente
                                                </SelectItem>
                                                <SelectItem value="Não reconhecido">
                                                    Não reconhecido
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex flex-col md:flex-row gap-4">
                            <FormField
                                control={form.control}
                                name="valor"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Valor (R$)</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Valor"
                                                {...field}
                                                className="border-primary"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="prefixo"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Prefixo</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Prefixo"
                                                {...field}
                                                className="border-primary"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="indicacaoLimite"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Indicação Limite</FormLabel>
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
                                                    onSelect={(date) => field.onChange(date ? format(date, "yyyy-MM-dd") : "")}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex flex-col md:flex-row gap-4 items-center">
                            <FormField
                                control={form.control}
                                name="reconhecimento"
                                render={({ field }) => (
                                    <FormItem className="flex items-center gap-2">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <span className="text-sm">Reconhecimento?</span>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="enviadoParaRH"
                                render={({ field }) => (
                                    <FormItem className="flex items-center gap-2">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <span className="text-sm">Enviado para RH?</span>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                            <DialogClose asChild>
                                <Button variant="outline" >Cancelar</Button>
                            </DialogClose>
                            <Button type="submit">Salvar</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}