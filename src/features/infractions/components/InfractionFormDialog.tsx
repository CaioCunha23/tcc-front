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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useTokenStore } from "@/hooks/useTokenStore";
import { InfractionFormSchema } from "../schemas/infractionFormSchema";
import { useState } from "react";
import { RefreshCcwIcon, SendIcon, Calendar } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

interface InfractionFormDialogProps {
    onInfractionAdded: () => void;
    onCloseDialog: () => void;
}

export function InfractionFormDialog({ onInfractionAdded, onCloseDialog }: InfractionFormDialogProps) {
    const { token } = useTokenStore();
    const [alertOpen, setAlertOpen] = useState(false);

    const form = useForm<z.infer<typeof InfractionFormSchema>>({
        resolver: zodResolver(InfractionFormSchema),
        defaultValues: {
            tipo: "",
            colaboradorUid: "",
            placaVeiculo: "",
            costCenter: "",
            dataInfracao: undefined,
            tag: "",
            hora: "",
            valor: undefined,
            prefixo: "",
            marca: "",
            categoria: "",
            rodovia: "",
            praca: "",
            nome: "",
            dataEnvio: undefined,
            codigoMulta: "",
            indicacaoLimite: undefined,
            statusResposta: "",
            reconhecimento: false,
            enviadoParaRH: false,
        },
    });

    async function onSubmit(values: z.infer<typeof InfractionFormSchema>) {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}infracao`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(values),
            });

            const result = await response.json();

            if (!response.ok) {
                console.log("Enviando para o backend:", values);
                console.error("Resposta de erro completa:", result);
                throw new Error(result.message || "Erro ao adicionar Infração");
            }


            console.log("Infração adicionada com sucesso:", result);
            setAlertOpen(true);
        } catch (error) {
            console.error("Erro ao adicionar Infração:", error);
            toast.error(
                error instanceof Error ? error.message : "Erro ao adicionar infração"
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
            onInfractionAdded();
            toast.success(`Infração adicionada (às ${new Date().toLocaleTimeString()})`);
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
                            Deseja inserir outra infração?
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
                            Inserir outra
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