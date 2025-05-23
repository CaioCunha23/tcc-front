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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogClose } from "@/components/ui/dialog";
import { vehicleFormSchema } from "../../schemas/vehicleFormSchema";
import { useState } from "react";
import {
    CarFront,
    Calendar,
    DollarSign,
    ChevronLeft,
    ChevronRight,
    Check,
    AlertCircle,
    ClipboardCheckIcon,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Veiculo } from "@/types/Vehicle";

interface VehicleEditFormProps {
    defaultValues: Veiculo;
    onSubmit: (values: Partial<Veiculo>) => Promise<void>;
    onVehicleUpdated?: () => void;
}

const steps = [
    {
        id: "identificacao",
        name: "Identificação",
        icon: <CarFront size={18} />,
        fields: ["fornecedor", "contrato", "placa", "renavam", "chassi", "modelo", "cor"],
    },
    {
        id: "utilizacao",
        name: "Utilização",
        icon: <CarFront size={18} />,
        fields: ["status", "cliente", "centroCusto", "perfil", "franquiaKM", "carroReserva"],
    },
    {
        id: "contrato",
        name: "Contrato",
        icon: <Calendar size={18} />,
        fields: ["dataDisponibilizacao", "mesesContratados", "previsaoDevolucao", "mesesFaltantes", "proximaRevisao"],
    },
    {
        id: "financeiro",
        name: "Financeiro",
        icon: <DollarSign size={18} />,
        fields: ["mensalidade", "budget", "multa"],
    },
];

export default function VehicleEditFormDialog({ defaultValues, onSubmit, onVehicleUpdated }: VehicleEditFormProps) {
    const [currentStep, setCurrentStep] = useState(0);
    const [validationError, setValidationError] = useState("");
    const [progress, setProgress] = useState((currentStep / (steps.length - 1)) * 100);

    const form = useForm<z.infer<typeof vehicleFormSchema>>({
        resolver: zodResolver(vehicleFormSchema),
        defaultValues,
        mode: "onChange",
    });

    const handleFormSubmit = async (values: Partial<Veiculo>) => {
        await onSubmit(values);
        onVehicleUpdated && onVehicleUpdated();
    };

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
        const currentFields = steps[currentStep].fields;

        return (
            <>
                {currentFields.includes("fornecedor") && (
                    <div className="flex flex-col md:flex-row gap-6 mb-6">
                        <FormField
                            control={form.control}
                            name="fornecedor"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Fornecedor</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Fornecedor" {...field} className="border-primary rounded-md shadow-sm" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {currentFields.includes("contrato") && (
                            <FormField
                                control={form.control}
                                name="contrato"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Contrato</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Contrato" {...field} className="border-primary rounded-md shadow-sm" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                        {currentFields.includes("placa") && (
                            <FormField
                                control={form.control}
                                name="placa"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Placa</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Placa" {...field} className="border-primary rounded-md shadow-sm" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                    </div>
                )}

                {currentFields.includes("renavam") && (
                    <div className="flex flex-col md:flex-row gap-6 mb-6">
                        <FormField
                            control={form.control}
                            name="renavam"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Renavam</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Renavam" {...field} className="border-primary rounded-md shadow-sm" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {currentFields.includes("chassi") && (
                            <FormField
                                control={form.control}
                                name="chassi"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Chassi</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Chassi" {...field} className="border-primary rounded-md shadow-sm" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                        {currentFields.includes("modelo") && (
                            <FormField
                                control={form.control}
                                name="modelo"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Modelo</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Modelo" {...field} className="border-primary rounded-md shadow-sm" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                    </div>
                )}

                {currentFields.includes("cor") && (
                    <div className="flex flex-col md:flex-row gap-6 mb-6">
                        <FormField
                            control={form.control}
                            name="cor"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Cor</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Cor" {...field} className="border-primary rounded-md shadow-sm" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                )}

                {currentFields.includes("status") && (
                    <div className="flex flex-col md:flex-row gap-6 mb-6">
                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Status</FormLabel>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <SelectTrigger className="border-primary w-full rounded-md shadow-sm">
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
                        {currentFields.includes("cliente") && (
                            <FormField
                                control={form.control}
                                name="cliente"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Cliente</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Cliente" {...field} className="border-primary rounded-md shadow-sm" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                    </div>
                )}

                {currentFields.includes("centroCusto") && (
                    <div className="flex flex-col md:flex-row gap-6 mb-6">
                        <FormField
                            control={form.control}
                            name="centroCusto"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Centro de Custo</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Centro de Custo" {...field} className="border-primary rounded-md shadow-sm" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {currentFields.includes("perfil") && (
                            <FormField
                                control={form.control}
                                name="perfil"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Perfil</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Perfil"
                                                {...field}
                                                className="border-primary rounded-md shadow-sm"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                    </div>
                )}

                {currentFields.includes("franquiaKM") && (
                    <div className="flex flex-col md:flex-row gap-6 mb-6 items-end">
                        <FormField
                            control={form.control}
                            name="franquiaKM"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Franquia KM</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Franquia KM" {...field} className="border-primary rounded-md shadow-sm" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {currentFields.includes("carroReserva") && (
                            <FormField
                                control={form.control}
                                name="carroReserva"
                                render={({ field }) => (
                                    <FormItem className="flex items-center gap-2">
                                        <FormControl>
                                            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                                        </FormControl>
                                        <span className="text-sm">Carro Reserva?</span>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                    </div>
                )}

                {currentFields.includes("dataDisponibilizacao") && (
                    <div className="flex flex-col md:flex-row gap-6 mb-6">
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
                                                    {field.value ? format(new Date(field.value), "dd/MM/yyyy") : <span>Selecione uma data</span>}
                                                    <Calendar className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                                            <CalendarComponent
                                                mode="single"
                                                selected={field.value ? new Date(field.value) : undefined}
                                                onSelect={(date) =>
                                                    field.onChange(date ? format(date, "yyyy-MM-dd") : "")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {currentFields.includes("mesesContratados") && (
                            <FormField
                                control={form.control}
                                name="mesesContratados"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Meses Contratados</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Meses Contratados" {...field} className="border-primary rounded-md shadow-sm" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                    </div>
                )}

                {currentFields.includes("previsaoDevolucao") && (
                    <div className="flex flex-col md:flex-row gap-6 mb-6">
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
                                                    {field.value ? format(new Date(field.value), "dd/MM/yyyy") : <span>Selecione uma data</span>}
                                                    <Calendar className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                                            <CalendarComponent
                                                mode="single"
                                                selected={field.value ? new Date(field.value) : undefined}
                                                onSelect={(date) =>
                                                    field.onChange(date ? format(date, "yyyy-MM-dd") : "")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {currentFields.includes("mesesFaltantes") && (
                            <FormField
                                control={form.control}
                                name="mesesFaltantes"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Meses Faltantes</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Meses Faltantes" {...field} className="border-primary rounded-md shadow-sm" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                    </div>
                )}

                {currentFields.includes("proximaRevisao") && (
                    <div className="flex flex-col md:flex-row gap-6 mb-6">
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
                                                    {field.value ? format(new Date(field.value), "dd/MM/yyyy") : <span>Selecione uma data</span>}
                                                    <Calendar className="ml-auto h-4 w-4 opacity-50" />
                                                </Button>
                                            </FormControl>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                                            <CalendarComponent
                                                mode="single"
                                                selected={field.value ? new Date(field.value) : undefined}
                                                onSelect={(date) =>
                                                    field.onChange(date ? format(date, "yyyy-MM-dd") : "")
                                                }
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                )}

                {currentFields.includes("mensalidade") && (
                    <div className="flex flex-col md:flex-row gap-6 mb-6">
                        <FormField
                            control={form.control}
                            name="mensalidade"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Mensalidade</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Mensalidade" {...field} className="border-primary rounded-md shadow-sm" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {currentFields.includes("budget") && (
                            <FormField
                                control={form.control}
                                name="budget"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Budget</FormLabel>
                                        <FormControl>
                                            <Input type="number" placeholder="Budget" {...field} className="border-primary rounded-md shadow-sm" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        )}
                    </div>
                )}

                {currentFields.includes("multa") && (
                    <div className="flex flex-col md:flex-row gap-6 mb-6">
                        <FormField
                            control={form.control}
                            name="multa"
                            render={({ field }) => (
                                <FormItem className="flex-1">
                                    <FormLabel>Multa</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Multa" {...field} className="border-primary rounded-md shadow-sm" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                )}
            </>
        );
    };

    return (
        <main className="flex-1 p-4 md:p-8">
            <div className="w-full max-w-[90%] mx-auto">
                <label className="block text-4xl font-bold mb-6 text-center">Editar Veículo</label>

                <Card className="shadow-lg rounded-lg border">
                    <CardContent className="p-6">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(handleFormSubmit)}
                                onKeyDown={(e) => {
                                    if ((e.key === "Enter" || e.key === "NumpadEnter") && !isLastStep) {
                                        e.preventDefault();
                                    }
                                }}
                                className="space-y-6">
                                <div className="mb-8">
                                    <div className="flex justify-between items-center mb-4">
                                        {steps.map((step, index) => (
                                            <div key={step.id} className="flex flex-col items-center">
                                                <div
                                                    className={`w-10 h-10 rounded-full flex items-center justify-center
                            ${index === currentStep
                                                            ? "bg-primary text-primary-foreground"
                                                            : index < currentStep
                                                                ? "bg-primary/20 text-primary"
                                                                : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                                                        } mb-2 cursor-pointer`}
                                                    onClick={() => {
                                                        if (index < currentStep) {
                                                            setCurrentStep(index);
                                                            setProgress((index / (steps.length - 1)) * 100);
                                                        }
                                                    }}
                                                >
                                                    {index < currentStep ? <Check size={16} /> : step.icon}
                                                </div>
                                                <span className="text-xs text-center hidden md:block">{step.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <Progress value={progress} className="h-2" />
                                </div>

                                {validationError && (
                                    <Alert variant="destructive" className="mb-4">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>{validationError}</AlertDescription>
                                    </Alert>
                                )}

                                {renderFormFields()}

                                <div className="flex justify-between mt-8">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={prevStep}
                                        disabled={currentStep === 0}
                                        className="flex items-center gap-1"
                                    >
                                        <ChevronLeft size={16} /> Anterior
                                    </Button>

                                    {isLastStep ? (
                                        <>
                                            <DialogClose asChild>
                                                <Button
                                                    variant="outline"
                                                    className="mr-2">
                                                    Cancelar
                                                </Button>
                                            </DialogClose>
                                            <Button
                                                type="button"
                                                onClick={handleFinalSubmit}
                                                className="flex items-center gap-1"
                                            >
                                                <ClipboardCheckIcon size={16} />
                                                <span>Salvar</span>
                                            </Button>
                                        </>
                                    ) : (
                                        <Button
                                            type="button"
                                            onClick={nextStep}
                                            className="flex items-center gap-1">
                                            Próximo <ChevronRight size={16} />
                                        </Button>
                                    )}
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}