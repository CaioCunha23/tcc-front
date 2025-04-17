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
import { workerFormSchema } from "../schemas/workerFormSchema";
import { ClipboardCheckIcon } from "lucide-react";
import { Colaborador } from "@/hooks/useColaboradoresColumns";

interface WorkerEditFormProps {
    defaultValues: Colaborador;
    onSubmit: (values: Partial<Colaborador>) => Promise<void>;
    onWorkerUpdated?: () => void;
}

export default function WorkerEditForm({ defaultValues, onSubmit, onWorkerUpdated }: WorkerEditFormProps) {
    const form = useForm<z.infer<typeof workerFormSchema>>({
        resolver: zodResolver(workerFormSchema),
        defaultValues,
    });

    const handleFormSubmit = async (values: Partial<Colaborador>) => {
        await onSubmit(values);
        onWorkerUpdated && onWorkerUpdated();
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
                                name="nome"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormLabel>Nome</FormLabel>
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
                                        <FormLabel>CPF</FormLabel>
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
                                        <FormLabel>E-Mail</FormLabel>
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
                                        <FormLabel>UID MSK</FormLabel>
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
                                        <FormLabel>Cidade que trabalha</FormLabel>
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
                                        <FormLabel>Brand</FormLabel>
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
                                name="jobTitle"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cargo / Área de Atuação</FormLabel>
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
                                        <FormLabel>Cidade do Estacionamento</FormLabel>
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
    );
}