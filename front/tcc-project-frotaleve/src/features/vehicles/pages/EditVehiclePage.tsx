import { Card, CardContent } from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DialogClose } from "@/components/ui/dialog";

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
    mesesContratados: z.number({
        invalid_type_error: "Meses contratados deve ser um número."
    }),
    previsaoDevolucao: z.string().min(1, {
        message: "Previsão de devolução é obrigatória."
    }),
    mesesFaltantes: z.number({
        invalid_type_error: "Meses faltantes deve ser um número."
    }),
    mensalidade: z.number({
        invalid_type_error: "Mensalidade deve ser um número."
    }),
    budget: z.number({
        invalid_type_error: "Budget deve ser um número."
    }),
    multa: z.number({
        invalid_type_error: "Multa deve ser um número."
    }),
    proximaRevisao: z.string().min(1, {
        message: "Próxima revisão é obrigatória."
    }),
});

interface VehicleEditFormProps {
    defaultValues: z.infer<typeof formSchema>;
    onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
}

export default function VehicleEditForm({ defaultValues, onSubmit }: VehicleEditFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues,
    })

    return (
        <main className="flex-1 p-4 md:p-8">
            <div className="mx-auto w-full max-w-full md:max-w-[60%]">
                <label className="block text-4xl font-bold mb-6 text-center">
                    Editar Veículo
                </label>
                <Card className="shadow-lg rounded-lg border overflow-y-auto max-h-[45rem]">
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
                                                <Select onValueChange={field.onChange} value={field.value}>
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

                                <div className="flex justify-end gap-2 mt-4">
                                    <DialogClose asChild>
                                        <Button variant="outline">Cancelar</Button>
                                    </DialogClose>
                                    <Button type="submit">Salvar</Button>
                                </div>
                            </form>
                        </Form>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}