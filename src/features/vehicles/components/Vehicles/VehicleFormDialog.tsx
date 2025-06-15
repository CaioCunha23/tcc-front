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
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { useTokenStore } from "@/hooks/useTokenStore";
import { vehicleFormSchema } from "../../schemas/vehicleFormSchema";
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
import { CarFront, Calendar, DollarSign, ChevronLeft, ChevronRight, Check, AlertCircle, SendIcon } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

interface VehicleFormDialogProps {
    onVehicleAdded: () => void;
    onCloseDialog: () => void;
}

const steps = [
    {
        id: "identificacao",
        name: "Identificação",
        shortName: "ID",
        icon: <CarFront size={18} />,
        fields: ["fornecedor", "contrato", "placa", "renavam", "chassi", "modelo", "cor"]
    },
    {
        id: "utilizacao",
        name: "Utilização",
        shortName: "Uso",
        icon: <CarFront size={18} />,
        fields: ["status", "cliente", "centroCusto", "perfil", "franquiaKM", "carroReserva"]
    },
    {
        id: "contrato",
        name: "Contrato",
        shortName: "Contrato",
        icon: <Calendar size={18} />,
        fields: ["dataDisponibilizacao", "mesesContratados", "previsaoDevolucao", "mesesFaltantes", "proximaRevisao"]
    },
    {
        id: "financeiro",
        name: "Financeiro",
        shortName: "R$",
        icon: <DollarSign size={18} />,
        fields: ["mensalidade", "budget", "multa"]
    }
];

export function VehicleFormDialog({ onVehicleAdded, onCloseDialog }: VehicleFormDialogProps) {
    const { token } = useTokenStore();
    const [alertOpen, setAlertOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [validationError, setValidationError] = useState("");
    const [progress, setProgress] = useState((currentStep / (steps.length - 1)) * 100);

    const form = useForm<z.infer<typeof vehicleFormSchema>>({
        resolver: zodResolver(vehicleFormSchema),
        defaultValues: {
            fornecedor: "",
            contrato: "",
            placa: "",
            renavam: "",
            chassi: "",
            modelo: "",
            cor: "",
            status: "",
            cliente: "",
            perfil: "",
            centroCusto: "",
            franquiaKM: 0,
            carroReserva: false,
            dataDisponibilizacao: undefined,
            mesesContratados: 0,
            previsaoDevolucao: undefined,
            mesesFaltantes: 0,
            mensalidade: 0,
            budget: 0,
            multa: 0,
            proximaRevisao: undefined,
        },
        mode: "onChange",
    });

    async function onSubmit(values: z.infer<typeof vehicleFormSchema>) {
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/veiculo`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log("Enviando para o backend:", values);
                throw new Error(errorData.message || "Erro ao adicionar veículo");
            }

            const data = await response.json();
            console.log("Veículo adicionado com sucesso:", data);

            setAlertOpen(true);
        } catch (error) {
            console.error("Erro ao adicionar veículo:", error);
            toast.error(
                error instanceof Error ? error.message : "Erro ao adicionar veículo"
            );
        }
    }

    function handleDialogResponse(insertMore: boolean) {
        if (insertMore) {
            form.reset();
            setCurrentStep(0);
            setProgress(0);
            setAlertOpen(false);
            setValidationError("");
        } else {
            setAlertOpen(false);
            onCloseDialog();
            onVehicleAdded();
            toast.success(`Veículo adicionado! (às ${new Date().toLocaleTimeString()})`);
        }
    }

    const nextStep = async () => {
        const currentFields = steps[currentStep].fields;
        const isValid = await form.trigger(currentFields as any);

        if (!isValid) {
            setValidationError("Preencha todos os campos obrigatórios antes de continuar.");
            return;
        }
        const next = currentStep + 1;
        setCurrentStep(next);
        setProgress((next / (steps.length - 1)) * 100);
        setValidationError("");
    };

    const prevStep = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            setProgress(((currentStep - 1) / (steps.length - 1)) * 100);
            setValidationError("");
        }
    };

    const handleFinalSubmit = async () => {
        const isValid = await form.trigger();
        if (!isValid) {
            setValidationError("Existem campos inválidos. Revise o formulário.");
            return;
        }

        form.handleSubmit(onSubmit)();
    };

    const isLastStep = currentStep === steps.length - 1;

    const renderFormFields = () => {

        return (
            <div className="space-y-4 sm:space-y-6">
                {currentStep === 0 && (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <FormField
                                control={form.control}
                                name="fornecedor"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Fornecedor</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Fornecedor"
                                                {...field}
                                                className="h-9 text-sm"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="contrato"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Contrato</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Contrato"
                                                {...field}
                                                className="h-9 text-sm"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="placa"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Placa</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Placa"
                                                {...field}
                                                className="h-9 text-sm"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <FormField
                                control={form.control}
                                name="renavam"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Renavam</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Renavam"
                                                {...field}
                                                className="h-9 text-sm"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="chassi"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Chassi</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Chassi"
                                                {...field}
                                                className="h-9 text-sm"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="modelo"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Modelo</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Modelo"
                                                {...field}
                                                className="h-9 text-sm"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="cor"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Cor</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Cor"
                                                {...field}
                                                className="h-9 text-sm"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </>
                )}

                {currentStep === 1 && (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="status"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Status</FormLabel>
                                        <FormControl>
                                            <Select
                                                onValueChange={field.onChange}
                                                defaultValue={field.value}
                                            >
                                                <SelectTrigger className="h-9 text-sm">
                                                    <SelectValue placeholder="Status" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Disponível">Disponível</SelectItem>
                                                    <SelectItem value="Em uso">Em uso</SelectItem>
                                                    <SelectItem value="Em manutenção">Em manutenção</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="cliente"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Cliente</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Cliente"
                                                {...field}
                                                className="h-9 text-sm"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="centroCusto"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Centro de Custo</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Centro de Custo"
                                                {...field}
                                                className="h-9 text-sm"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="perfil"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Perfil</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Perfil"
                                                {...field}
                                                className="h-9 text-sm"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-end">
                            <FormField
                                control={form.control}
                                name="franquiaKM"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Franquia KM</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Franquia KM"
                                                {...field}
                                                className="h-9 text-sm"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="carroReserva"
                                render={({ field }) => (
                                    <FormItem className="flex items-center space-x-2 pb-2">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <FormLabel className="text-sm font-medium cursor-pointer">
                                            Carro Reserva?
                                        </FormLabel>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </>
                )}

                {currentStep === 2 && (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="dataDisponibilizacao"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Data Disponibilização</FormLabel>
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
                                name="mesesContratados"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Meses Contratados</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Meses Contratados"
                                                {...field}
                                                className="h-9 text-sm"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="previsaoDevolucao"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Previsão Devolução</FormLabel>
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
                                name="mesesFaltantes"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Meses Faltantes</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Meses Faltantes"
                                                {...field}
                                                className="h-9 text-sm"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <FormField
                                control={form.control}
                                name="proximaRevisao"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Próxima Revisão</FormLabel>
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
                    </>
                )}

                {currentStep === 3 && (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            <FormField
                                control={form.control}
                                name="mensalidade"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Mensalidade</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Mensalidade"
                                                {...field}
                                                className="h-9 text-sm"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="budget"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Budget</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Budget"
                                                {...field}
                                                className="h-9 text-sm"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="multa"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Multa</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                placeholder="Multa"
                                                {...field}
                                                className="h-9 text-sm"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </>
                )}
            </div>
        );
    };

    return (
        <div className="w-full">
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    onKeyDown={(e) => {
                        if ((e.key === "Enter" || e.key === "NumpadEnter") && !isLastStep) {
                            e.preventDefault();
                        }
                    }}
                    className="space-y-4 sm:space-y-6">

                    <div className="px-2 sm:px-4">
                        <div className="flex justify-between items-center mb-4 overflow-x-auto">
                            <div className="flex justify-between items-center w-full min-w-[280px]">
                                {steps.map((step, index) => (
                                    <div key={step.id} className="flex flex-col items-center flex-1">
                                        <div
                                            className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm
                                              ${index === currentStep
                                                    ? "bg-primary text-primary-foreground"
                                                    : index < currentStep
                                                        ? "bg-primary/20 text-primary"
                                                        : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                                                } mb-1 sm:mb-2 cursor-pointer transition-colors`}
                                            onClick={() => {
                                                if (index < currentStep) {
                                                    setCurrentStep(index);
                                                    setProgress((index / (steps.length - 1)) * 100);
                                                }
                                            }}
                                        >
                                            {index < currentStep ? <Check size={14} /> : step.icon}
                                        </div>
                                        <span className="text-xs text-center block sm:hidden font-medium">
                                            {step.shortName}
                                        </span>
                                        <span className="text-xs text-center hidden sm:block font-medium">
                                            {step.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <Progress value={progress} className="h-1 sm:h-2" />
                    </div>

                    {validationError && (
                        <Alert variant="destructive" className="mx-2 sm:mx-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription className="text-sm">
                                {validationError}
                            </AlertDescription>
                        </Alert>
                    )}

                    <Card className="mx-2 sm:mx-4 shadow-sm border">
                        <CardContent className="p-4 sm:p-6">
                            <h2 className="text-lg sm:text-xl font-semibold mb-4 sm:mb-6">
                                {steps[currentStep].name}
                            </h2>

                            {renderFormFields()}

                            <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6 sm:mt-8">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={prevStep}
                                    disabled={currentStep === 0}
                                    className="flex items-center justify-center gap-2 order-2 sm:order-1 h-9 sm:h-10"
                                >
                                    <ChevronLeft size={16} />
                                    <span className="hidden sm:inline">Anterior</span>
                                    <span className="sm:hidden">Voltar</span>
                                </Button>

                                {isLastStep ? (
                                    <Button
                                        type="button"
                                        onClick={handleFinalSubmit}
                                        className="flex items-center justify-center gap-2 order-1 sm:order-2 h-9 sm:h-10"
                                    >
                                        <SendIcon size={16} />
                                        <span>Enviar</span>
                                    </Button>
                                ) : (
                                    <Button
                                        type="button"
                                        onClick={nextStep}
                                        className="flex items-center justify-center gap-2 order-1 sm:order-2 h-9 sm:h-10"
                                    >
                                        <span className="hidden sm:inline">Próximo</span>
                                        <span className="sm:hidden">Avançar</span>
                                        <ChevronRight size={16} />
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </form>
            </Form>

            <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                <AlertDialogContent className="max-w-[90vw] sm:max-w-md mx-4">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-base sm:text-lg">
                            Deseja inserir outro veículo?
                        </AlertDialogTitle>
                        <AlertDialogDescription className="text-sm">
                            Se optar por não inserir, o pop-up será fechado e a tabela será atualizada.
                        </AlertDialogDescription>
                    </AlertDialogHeader>

                    <div className="flex flex-col sm:flex-row justify-end gap-3 mt-4">
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
    );
}