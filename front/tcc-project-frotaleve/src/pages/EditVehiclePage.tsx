import { Card, CardContent } from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";

export default function EditVehiclePage() {
    const { id } = useParams();
    const [vehicle, setVehicle] = useState(null);
    const navigate = useNavigate();

    const formSchema = z.object({
        fornecedor: z.string().min(1, {
            message: "Fornecedor é obrigatório."
        }),
        contrato: z.string().min(1, {
            message: "Contrato é obrigatório."
        }),
        placa: z.string().min(1, {
            message: "Placa é obrigatória."

        }),
        renavan: z.string().min(1, {
            message: "Renavan é obrigatório."
        }),
        chassi: z.string().min(1, {
            message: "Chassi é obrigatório."

        }),
        modelo: z.string().min(1, {
            message: "Modelo é obrigatório."
        }),
        cor: z.string().min(1, {
            message: "Cor é obrigatória."
        }),
        status: z.string().min(1, {
            message: "Status é obrigatório."
        }),
        cliente: z.string().min(1, {
            message: "Cliente é obrigatório."
        }),
        uidMSK: z.string().length(6, {
            message: "UID MSK deve ter 9 caracteres."
        }),
        perfil: z.string().min(1, {
            message: "Perfil é obrigatório."
        }),
        jobLevel: z.string().min(1, {
            message: "Job Level é obrigatório."
        }),
        descricaoCargo: z.string().min(1, {
            message: "Descrição do cargo é obrigatória."
        }),
        centroCusto: z.string().min(1, {
            message: "Centro de custo é obrigatório."
        }),
        franquiaKM: z.string({
            invalid_type_error: "Franquia KM deve ser um número."
        }),
        carroReserva: z.boolean(),
        dataDisponibilizacao: z.string().min(1, {
            message: "Data de disponibilização é obrigatória."
        }),
        mesesContratados: z.string({
            invalid_type_error: "Meses contratados deve ser um número."
        }),
        previsaoDevolucao: z.string().min(1, {
            message: "Previsão de devolução é obrigatória."
        }),
        mesesFaltantes: z.string({
            invalid_type_error: "Meses faltantes deve ser um número."
        }),
        mensalidade: z.string({
            invalid_type_error: "Mensalidade deve ser um número."
        }),
        budget: z.string({
            invalid_type_error: "Budget deve ser um número."
        }),
        multa: z.string({
            invalid_type_error: "Multa deve ser um número."
        }),
        proximaRevisao: z.string().min(1, {
            message: "Próxima revisão é obrigatória."
        }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fornecedor: "",
            contrato: "",
            placa: "",
            renavan: "",
            chassi: "",
            modelo: "",
            cor: "",
            status: "",
            cliente: "",
            uidMSK: "",
            perfil: "",
            jobLevel: "",
            descricaoCargo: "",
            centroCusto: "",
            franquiaKM: "",
            carroReserva: false,
            dataDisponibilizacao: "",
            mesesContratados: "",
            previsaoDevolucao: "",
            mesesFaltantes: "",
            mensalidade: "",
            budget: "",
            multa: "",
            proximaRevisao: "",
        },
    });

    useEffect(() => {
        console.log("ID do veículo:", id);
        async function fetchVehicle() {
            try {
                const response = await fetch(`http://localhost:3000/veiculo/${id}`);
                if (!response.ok) {
                    throw new Error("Erro ao carregar veículo");
                }
                const data = await response.json();
                console.log("Dados do veículo:", data);
                setVehicle(data);
                form.reset(data);
            } catch (error) {
                console.error(error);
            }
        }

        fetchVehicle();
    }, [id]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await fetch(`http://localhost:3000/veiculo/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Erro ao editar veículo");
            }

            alert("Veículo atualizado com sucesso!");
            navigate(-1);

        } catch (error) {
            console.error("Erro ao atualizar veículo:", error);
            alert(error instanceof Error ? error.message : "Erro desconhecido");
        }
    };

    return (
        <main className="flex-1 p-4 md:p-8">
            <div className="mx-auto w-full max-w-full md:max-w-[60%]">
                <label className="block text-4xl font-bold mb-6 text-center">Editar Veículo</label>

                <Card className="border-primary shadow-md max-h-[45rem] overflow-y-auto">
                    <CardContent>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                                <div className="flex flex-col md:flex-row gap-4">
                                    <FormField
                                        control={form.control}
                                        name="fornecedor"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <Input className="border-primary" placeholder="Fornecedor" {...field} />
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
                                                    <Input className="border-primary" placeholder="Contrato" {...field} />
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
                                                    <Input className="border-primary" placeholder="Placa" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="flex flex-col md:flex-row gap-4">
                                    <FormField
                                        control={form.control}
                                        name="renavan"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <Input className="border-primary" placeholder="Renavan" {...field} />
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
                                                    <Input className="border-primary" placeholder="Chassi" {...field} />
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
                                                    <Input className="border-primary" placeholder="Modelo" {...field} />
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
                                                    <Input className="border-primary" placeholder="Cor" {...field} />
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
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="border-primary w-full">
                                                            <SelectValue placeholder="Status" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Disponível">Disponível</SelectItem>
                                                        <SelectItem value="Em uso">Em uso</SelectItem>
                                                        <SelectItem value="Em manutenção">Em manutenção</SelectItem>
                                                    </SelectContent>
                                                </Select>
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
                                                    <Input className="border-primary" placeholder="Cliente" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="flex flex-col md:flex-row gap-4">
                                    <FormField
                                        control={form.control}
                                        name="uidMSK"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <Input className="border-primary" placeholder="UID MSK" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="perfil"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <Input className="border-primary" placeholder="Perfil" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="jobLevel"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <Input className="border-primary" placeholder="Job Level" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="flex flex-col md:flex-row gap-4">
                                    <FormField
                                        control={form.control}
                                        name="descricaoCargo"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <Input className="border-primary" placeholder="Descrição do Cargo" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="centroCusto"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <Input className="border-primary" placeholder="Centro de Custo" {...field} />
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
                                                    <Input type="number" className="border-primary" placeholder="Franquia KM" {...field} />
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
                                                <span>Carro Reserva?</span>
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
                                                    <Input type="date" className="border-primary" placeholder="Data Disponibilização" {...field} />
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
                                                    <Input type="number" className="border-primary" placeholder="Meses Contratados" {...field} />
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
                                                    <Input type="date" className="border-primary" placeholder="Previsão Devolução" {...field} />
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
                                                    <Input type="number" className="border-primary" placeholder="Meses Faltantes" {...field} />
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
                                                    <Input type="number" className="border-primary" placeholder="Mensalidade" {...field} />
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
                                                    <Input type="number" className="border-primary" placeholder="Budget" {...field} />
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
                                                    <Input type="number" className="border-primary" placeholder="Multa" {...field} />
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
                                                    <Input type="date" className="border-primary" placeholder="Próxima Revisão" {...field} />
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
                                        variant={"link"}
                                        onClick={() => navigate(-1)}
                                        className="w-full sm:w-auto"
                                    >
                                        Cancelar
                                    </Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}