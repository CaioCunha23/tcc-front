import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    FormField,
    FormItem,
    FormControl,
    FormMessage,
    Form,
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
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { z } from "zod";

export default function EditWorkerPage() {
    const { id } = useParams();
    const [worker, setWorker] = useState(null);
    const navigate = useNavigate();

    const formSchema = z.object({
        nome: z.string().min(2, {
            message: "Nome deve ter pelo menos 2 caracteres.",
        }),
        cpf: z.string().length(11, {
            message: "CPF deve ter 11 caracteres.",
        }),
        email: z.string().endsWith("@maersk.com", {
            message: "O e-mail deve ser corporativo (terminar com @maersk.com).",
        }),
        uidMSK: z.string().length(6, {
            message: "UID deve ter 6 caracteres.",
        }),
        localidade: z.string({
            required_error: "Selecione a localidade.",
        }),
        brand: z.string({
            required_error: "Selecione a marca.",
        }),
        jobTitle: z.string({
            required_error: "Informe o cargo/área de atuação.",
        }),
        usaEstacionamento: z.boolean(),
        cidadeEstacionamento: z.string().optional(),
        cnh: z.string().length(9, {
            message: "CNH deve ter 9 caracteres.",
        }),
        tipoCNH: z.string().min(1, {
            message: "Informe o tipo da CNH.",
        }),
    });

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            nome: "",
            cpf: "",
            email: "",
            uidMSK: "",
            localidade: "",
            brand: "",
            jobTitle: "",
            usaEstacionamento: false,
            cidadeEstacionamento: "",
            cnh: "",
            tipoCNH: "",
        },
    });

    useEffect(() => {
        async function fetchWorker() {
            try {
                const response = await fetch(`http://localhost:3000/colaborador/${id}`);
                if (!response.ok) {
                    throw new Error("Erro ao carregar colaborador");
                }
                const data = await response.json();
                setWorker(data);
                form.reset(data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchWorker();
    }, [id]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await fetch(`http://localhost:3000/colaborador/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Erro ao editar colaborador");
            }

            alert("Colaborador atualizado com sucesso!");
            navigate(-1);
        } catch (error) {
            console.error("Erro ao atualizar colaborador:", error);
            alert(error instanceof Error ? error.message : "Erro desconhecido");
        }
    };

    return (
        <main className="flex-1 p-4 md:p-8">
            <div className="mx-auto w-full max-w-3xl">
                <h1 className="block text-4xl font-bold mb-6 text-center">
                    Editar Colaborador
                </h1>
                <Card className="shadow-lg rounded-lg border overflow-hidden">
                    <CardContent className="p-6">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <div className="flex flex-col md:flex-row gap-4">
                                    <FormField
                                        control={form.control}
                                        name="nome"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <Input
                                                        placeholder="Nome Completo"
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
                                        name="cpf"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <Input
                                                        placeholder="CPF"
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
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <Input
                                                        placeholder="E-mail"
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
                                        name="uidMSK"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <FormControl>
                                                    <Input
                                                        placeholder="UID (6 caracteres)"
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
                                        name="localidade"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="border-primary w-full rounded-md shadow-sm">
                                                            <SelectValue placeholder="Localidade" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="SSZ">SSZ</SelectItem>
                                                        <SelectItem value="SPO">SPO</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="brand"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="border-primary w-full rounded-md shadow-sm">
                                                            <SelectValue placeholder="Brand" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Maersk Brasil">
                                                            Maersk Brasil
                                                        </SelectItem>
                                                        <SelectItem value="Aliança">Aliança</SelectItem>
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
                                        name="jobTitle"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Cargo / Área de atuação"
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
                                        name="usaEstacionamento"
                                        render={({ field }) => (
                                            <FormItem className="flex items-center gap-2">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                    />
                                                </FormControl>
                                                <span className="text-sm">Utiliza Estacionamento?</span>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="cidadeEstacionamento"
                                        render={({ field }) => (
                                            <FormItem className="flex-1">
                                                <Select onValueChange={field.onChange} value={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger className="border-primary w-full rounded-md shadow-sm">
                                                            <SelectValue placeholder="Cidade Estacionamento" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Santos">Santos</SelectItem>
                                                        <SelectItem value="São Paulo">São Paulo</SelectItem>
                                                    </SelectContent>
                                                </Select>
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
    );
}