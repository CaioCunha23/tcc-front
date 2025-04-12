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
import { useTokenStore } from "@/hooks/useTokenStore";
import { vehicleFormSchema } from "../schemas/vehicleFormSchema";

export function VehicleFormDialog() {
    const { token } = useTokenStore();

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
            centroCusto: "",
            franquiaKM: "",
            carroReserva: false,
            dataDisponibilizacao: "",
            mesesContratados: 0,
            previsaoDevolucao: "",
            mesesFaltantes: 0,
            mensalidade: 0,
            budget: 0,
            multa: 0,
            proximaRevisao: "",
        },
    });

    async function onSubmit(values: z.infer<typeof vehicleFormSchema>) {
        try {
            const response = await fetch("http://localhost:3000/veiculo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Erro ao adicionar veículo");
            }

            const data = await response.json();
            console.log("Veículo adicionado com sucesso:", data);
            alert("Veículo adicionado com sucesso!");
        } catch (error) {
            console.error("Erro ao adicionar veículo:", error);
            alert(error instanceof Error ? error.message : "Erro desconhecido");
        }
    }

    const { reset } = form;

    return (
        <main className="flex-1 p-4 md:p-8">
            <div className="mx-auto w-full max-w-full md:max-w-[60%]">
                <h1 className="block text-4xl font-bold mb-6 text-center">
                    Cadastrar Veículo
                </h1>
                <Card className="shadow-lg rounded-lg border overflow-y-auto max-h-[45rem]">
                    <CardContent className="p-6">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-6"
                            >

                                <div className="flex flex-col md:flex-row gap-4">
                                    <FormField
                                        control={form.control}
                                        name="fornecedor"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <Input
                                                        placeholder="Fornecedor"
                                                        {...field}
                                                        className="border-primary rounded-md shadow-sm"
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
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <Input
                                                        placeholder="Contrato"
                                                        {...field}
                                                        className="border-primary rounded-md shadow-sm"
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
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <Input
                                                        placeholder="Placa"
                                                        {...field}
                                                        className="border-primary rounded-md shadow-sm"
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
                                        name="renavam"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <Input
                                                        placeholder="Renavam"
                                                        {...field}
                                                        className="border-primary rounded-md shadow-sm"
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
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <Input
                                                        placeholder="Chassi"
                                                        {...field}
                                                        className="border-primary rounded-md shadow-sm"
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
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <Input
                                                        placeholder="Modelo"
                                                        {...field}
                                                        className="border-primary rounded-md shadow-sm"
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
                                        name="cor"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <Input
                                                        placeholder="Cor"
                                                        {...field}
                                                        className="border-primary rounded-md shadow-sm"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="status"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <Select
                                                        onValueChange={field.onChange}
                                                        defaultValue={field.value}
                                                    >
                                                        <SelectTrigger className="border-primary w-full rounded-md shadow-sm">
                                                            <SelectValue placeholder="Status" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Disponível">
                                                                Disponível
                                                            </SelectItem>
                                                            <SelectItem value="Em uso">
                                                                Em uso
                                                            </SelectItem>
                                                            <SelectItem value="Em manutenção">
                                                                Em manutenção
                                                            </SelectItem>
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
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <Input
                                                        placeholder="Cliente"
                                                        {...field}
                                                        className="border-primary rounded-md shadow-sm"
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
                                        name="centroCusto"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <Input
                                                        placeholder="Centro de Custo"
                                                        {...field}
                                                        className="border-primary rounded-md shadow-sm"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="flex flex-col md:flex-row gap-4 items-center">
                                    <FormField
                                        control={form.control}
                                        name="franquiaKM"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="Franquia KM"
                                                        {...field}
                                                        className="border-primary rounded-md shadow-sm"
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
                                            <FormItem className="flex items-center gap-2">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <span className="text-sm">Carro Reserva?</span>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="flex flex-col md:flex-row gap-4">
                                    <FormField
                                        control={form.control}
                                        name="dataDisponibilizacao"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <Input
                                                        type="date"
                                                        placeholder="Data Disponibilização"
                                                        {...field}
                                                        className="border-primary rounded-md shadow-sm"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="mesesContratados"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="Meses Contratados"
                                                        {...field}
                                                        className="border-primary rounded-md shadow-sm"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="previsaoDevolucao"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <Input
                                                        type="date"
                                                        placeholder="Previsão Devolução"
                                                        {...field}
                                                        className="border-primary rounded-md shadow-sm"
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
                                        name="mesesFaltantes"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="Meses Faltantes"
                                                        {...field}
                                                        className="border-primary rounded-md shadow-sm"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="mensalidade"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="Mensalidade"
                                                        {...field}
                                                        className="border-primary rounded-md shadow-sm"
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
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="Budget"
                                                        {...field}
                                                        className="border-primary rounded-md shadow-sm"
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
                                        name="multa"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <Input
                                                        type="number"
                                                        placeholder="Multa"
                                                        {...field}
                                                        className="border-primary rounded-md shadow-sm"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="proximaRevisao"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <Input
                                                        type="date"
                                                        placeholder="Próxima Revisão"
                                                        {...field}
                                                        className="border-primary rounded-md shadow-sm"
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row-reverse gap-3">
                                    <Button type="submit" className="w-full sm:w-auto">
                                        Submit
                                    </Button>
                                    <Button
                                        type="button"
                                        variant={"destructive"}
                                        onClick={() => reset()}
                                        className="w-full sm:w-auto"
                                    >
                                        Clear
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </main>
    );
}