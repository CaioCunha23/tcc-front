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
import { workerFormSchema } from "../Schemas/workerFormSchema"
import { ClipboardCheckIcon } from "lucide-react";
import { Colaborador } from "@/types/Worker";

interface WorkerEditFormProps {
    defaultValues: Colaborador;
    onSubmit: (values: Partial<Colaborador>) => Promise<void>;
    onWorkerUpdated?: () => void;
}

export default function WorkerEditForm({ defaultValues, onSubmit, onWorkerUpdated }: WorkerEditFormProps) {
    console.log('defaultValues recebidos:', defaultValues);
    console.log('Tipo do defaultValues:', typeof defaultValues);
    const form = useForm<z.infer<typeof workerFormSchema>>({
        resolver: zodResolver(workerFormSchema),
        defaultValues,
    });

    const handleFormSubmit = async (values: Partial<Colaborador>) => {
        await onSubmit(values);
        onWorkerUpdated && onWorkerUpdated();
    };

    console.log('Valores do form:', form.getValues());

    return (
        <Card className="shadow-lg rounded-lg borderoverflow-hidden w-full">
            <CardContent className="p-3 md:p-4 lg:p-6">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(handleFormSubmit)}
                        className="space-y-4 md:space-y-6"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                            <FormField
                                control={form.control}
                                name="nome"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Nome</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Nome Completo"
                                                {...field}
                                                className="h-9 md:h-10 text-sm border-primary rounded-md shadow-sm"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="cpf"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">CPF</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="CPF"
                                                {...field}
                                                className="h-9 md:h-10 text-sm border-primary rounded-md shadow-sm"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">E-Mail</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="E-mail"
                                                {...field}
                                                className="h-9 md:h-10 text-sm border-primary rounded-md shadow-sm"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="uidMSK"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">UID MSK</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="UID (6 caracteres)"
                                                {...field}
                                                className="h-9 md:h-10 text-sm border-primary rounded-md shadow-sm"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                            <FormField
                                control={form.control}
                                name="localidade"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Cidade que trabalha</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="h-9 md:h-10 text-sm border-primary w-full rounded-md shadow-sm">
                                                    <SelectValue placeholder="Localidade" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="SSZ">SSZ</SelectItem>
                                                <SelectItem value="SPO">SPO</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="brand"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sm font-medium">Brand</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="h-9 md:h-10 text-sm border-primary w-full rounded-md shadow-sm">
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
                                        <FormMessage className="text-xs" />
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
                                        <FormLabel className="text-sm font-medium">Cargo / Área de Atuação</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Cargo / Área de atuação"
                                                {...field}
                                                className="h-9 md:h-10 text-sm border-primary rounded-md shadow-sm"
                                            />
                                        </FormControl>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 items-start sm:items-start">
                            <FormField
                                control={form.control}
                                name="usaEstacionamento"
                                render={({ field }) => (
                                    <FormItem className="flex items-center gap-2 sm:min-w-fit">
                                        <FormControl>
                                            <Checkbox
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                                className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                                            />
                                        </FormControl>
                                        <span className="text-sm font-medium">
                                            Utiliza Estacionamento?
                                        </span>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="cidadeEstacionamento"
                                render={({ field }) => (
                                    <FormItem className="flex-1 w-full sm:w-auto">
                                        <FormLabel className="text-sm font-medium">Cidade do Estacionamento</FormLabel>
                                        <Select onValueChange={field.onChange} value={field.value}>
                                            <FormControl>
                                                <SelectTrigger className="h-9 sm:h-10 md:h-11 text-sm border-primary w-full rounded-md shadow-sm focus:ring-2 focus:ring-primary/20 transition-all">
                                                    <SelectValue placeholder="Cidade Estacionamento" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="Santos">Santos</SelectItem>
                                                <SelectItem value="São Paulo">São Paulo</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage className="text-xs" />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-4 border-gray-100">
                            <DialogClose asChild>
                                <Button
                                    variant="outline"
                                    className="w-full sm:w-auto px-4 py-2 text-sm font-medium transition-all hover:bg-gray-50"
                                >
                                    Cancelar
                                </Button>
                            </DialogClose>
                            <Button
                                type="submit"
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium bg-primary hover:bg-primary/90 transition-all"
                            >
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