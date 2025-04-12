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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useTokenStore } from "@/hooks/useTokenStore";
import { InfractionFormSchema } from "../schemas/infractionFormSchema";

export function InfractionFormDialog() {
    const { token } = useTokenStore();

    const form = useForm<z.infer<typeof InfractionFormSchema>>({
        resolver: zodResolver(InfractionFormSchema),
        defaultValues: {
            tipo: "",
            colaboradorUid: "",
            placaVeiculo: "",
            costCenter: "",
            dataInfracao: "",
            tag: "",
            hora: "",
            valor: undefined,
            prefixo: "",
            marca: "",
            categoria: "",
            rodovia: "",
            praca: "",
            nome: "",
            dataEnvio: "",
            codigoMulta: "",
            indicacaoLimite: "",
            statusResposta: "",
            reconhecimento: false,
            enviadoParaRH: false,
        },
    });

    async function onSubmit(values: z.infer<typeof InfractionFormSchema>) {
        try {
            const response = await fetch("http://localhost:3000/infracao", {
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
                throw new Error(errorData.message || "Erro ao adicionar Infração");
            }

            const data = await response.json();
            console.log("Infração adicionada com sucesso:", data);
            alert("Infração adicionada com sucesso!");
            reset();
        } catch (error) {
            console.error("Erro ao adicionar Infração:", error);
            alert(error instanceof Error ? error.message : "Erro desconhecido");
        }
    }

    const { reset } = form;

    return (
        <main className="flex-1 p-4 md:p-8">
            <div className="mx-auto w-full max-w-3xl">
                <h1 className="text-4xl font-bold mb-6 text-center">
                    Cadastrar Infração
                </h1>

                <Card className="shadow-lg rounded-lg border overflow-hidden">
                    <CardContent className="p-6">
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
                                                <FormControl>
                                                    <Input
                                                        placeholder="Data de Infração"
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
                                        name="tag"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
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

                                <div className="w-full">
                                    <FormField
                                        control={form.control}
                                        name="hora"
                                        render={({ field }) => (
                                            <FormItem>
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
                                </div>

                                <div className="flex flex-col md:flex-row gap-4">
                                    <FormField
                                        control={form.control}
                                        name="valor"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
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
    )
}