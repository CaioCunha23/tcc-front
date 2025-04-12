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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DialogClose } from "@/components/ui/dialog";

export const formSchema = z.object({
    nome: z.string().refine(
      (val) => val.trim().split(/\s+/).length >= 2,
      { message: "Inclua nome e sobrenome." }
    ),
    cpf: z.string().length(11, {
      message: "CPF deve ter 11 caracteres.",
    }),
    email: z.string().refine(
      (val) => /@(lns\.maersk\.com|maersk\.com|alianca\.com\.br)$/.test(val),
      {
        message:
          "O e-mail deve ser corporativo (terminar com @lns.maersk.com, @maersk.com ou @alianca.com.br).",
      }
    ),
    uidMSK: z.string().regex(/^[A-Za-z]{3}\d{3}$/, {
      message:
        "UID deve ter 6 caracteres: 3 letras e 3 números.",
    }),
    localidade: z.string().min(1, {
      message: "Selecione uma localidade."
    }),
    brand: z.string().min(1, {
      message: "Selecione uma brand."
    }),
    jobTitle: z.string().min(1, {
      message: "Informe o cargo/área de atuação.",
    }),
    usaEstacionamento: z.boolean().optional(),
    cidadeEstacionamento: z.string().optional(),
    cnh: z.string().length(9, {
      message: "CNH deve ter 9 caracteres.",
    }),
    tipoCNH: z.string().min(1, {
      message: "Informe o tipo da CNH.",
    }),
  })
    .superRefine((data, ctx) => {
      if (data.usaEstacionamento && (!data.cidadeEstacionamento || data.cidadeEstacionamento.trim() === "")) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Cidade Estacionamento deve ser preenchido se usar estacionamento.",
          path: ["cidadeEstacionamento"],
        });
      }
    });

interface WorkerEditFormProps {
    defaultValues: z.infer<typeof formSchema>;
    onSubmit: (values: z.infer<typeof formSchema>) => Promise<void>;
    onCancel: () => void;
}

export default function WorkerEditForm({ defaultValues, onSubmit, onCancel }: WorkerEditFormProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues,
    });

    return (
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
                        <div className="flex justify-end gap-2 mt-4">
                            <DialogClose asChild>
                                <Button variant="outline" onClick={onCancel}>Cancelar</Button>
                            </DialogClose>
                            <Button type="submit">Salvar</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}