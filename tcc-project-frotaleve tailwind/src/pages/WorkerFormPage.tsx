import { Card, CardContent } from "@/components/ui/card";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

const MAX_FILE_SIZE = 2 * 1024 * 1024;

const formSchema = z.object({
    fullName: z.string().min(2, {
        message: "Fullname must be at least 2 characters.",
    }),
    cpf: z.string().length(11, {
        message: "CPF must have 11 characters.",
    }),
    city: z.string({
        required_error: "Please select a city to display.",
    }),
    email: z.string().endsWith("@maersk.com", {
        message: "The e-mail should be a valid coorporative e-mail.",
    }),
    area: z.string({
        required_error: "Please select the area to display.",
    }),
    uid: z.string().length(6, {
        message: "The UID should be 6 characters, being 3 letters and 3 numbers.",
    }),
    brand: z.string({
        required_error: "Please select the brand to display.",
    }),
    cnh: z.string().length(9, {
        message: "CNH must have 9 characters.",
    }),
    catCnh: z.string().min(1, {
        message: "Categoria CNH must have at least 1 character.",
    }),
    attachCnh: z.any().refine((files) => files?.length > 0, {
        message: "File is required.",
    }).refine((files) => files?.[0]?.size <= MAX_FILE_SIZE,
        {
            message: "File size must be less than 2MB.",
        }
    ).refine((files) => ["image/jpeg", "image/png", "application/pdf"].includes(files?.[0]?.type),
        {
            message: "Only PNG, JPEG, or PDF files are allowed.",
        }
    ),
})

export function WorkerFormPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullName: "",
            cpf: "",
            email: "",
            uid: "",
            cnh: "",
            catCnh: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
    return (
        <div className="flex flex-col gap-3 mx-auto mt-10">
            <label className="font-bold text-4xl">Cadastrar Colaborador</label>

            <Card className="border-primary">
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="flex justify-evenly gap-2">
                                <FormField
                                    control={form.control}
                                    name="fullName"
                                    render={({ field }) => (
                                        <FormItem
                                            className="w-[60%]"
                                        >
                                            <FormControl>
                                                <Input className="border-primary" placeholder="Nome Completo" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="cpf"
                                    render={({ field }) => (
                                        <FormItem
                                            className="w-[40%]"
                                        >
                                            <FormControl>
                                                <Input className="border-primary" placeholder="CPF" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex justify-evenly">
                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({ field }) => (
                                        <FormItem
                                            className="w-[30%]"
                                        >
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="border-primary">
                                                        <SelectValue placeholder="Selecione uma Cidade" />
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

                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem
                                            className="w-[70%]"
                                        >
                                            <FormControl>
                                                <Input className="border-primary" placeholder="E-mail" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex justify-evenly gap-2">
                                <FormField
                                    control={form.control}
                                    name="area"
                                    render={({ field }) => (
                                        <FormItem
                                            className="w-[36%]"
                                        >
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="border-primary">
                                                        <SelectValue placeholder="Selecione sua área de atuação" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Sales">Sales</SelectItem>
                                                    <SelectItem value="Depot">Depot</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="uid"
                                    render={({ field }) => (
                                        <FormItem
                                            className="w-[33%]"
                                        >
                                            <FormControl>
                                                <Input className="border-primary" placeholder="UID" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="brand"
                                    render={({ field }) => (
                                        <FormItem
                                            className="w-[33%]"
                                        >
                                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                <FormControl>
                                                    <SelectTrigger className="w-full border-primary">
                                                        <SelectValue placeholder="Selecione a Brand" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent>
                                                    <SelectItem value="Maersk Brasil">Maersk Brasil</SelectItem>
                                                    <SelectItem value="Aliança">Aliança</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex justify-evenly gap-2">
                                <FormField
                                    control={form.control}
                                    name="cnh"
                                    render={({ field }) => (
                                        <FormItem
                                            className="w-[33%]"
                                        >
                                            <FormControl>
                                                <Input className="border-primary" placeholder="CNH" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="catCnh"
                                    render={({ field }) => (
                                        <FormItem
                                            className="w-[33%]"
                                        >
                                            <FormControl>
                                                <Input className="border-primary" placeholder="Categoria CNH" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="attachCnh"
                                    render={({ field }) => (
                                        <FormItem
                                            className="w-[33%]"
                                        >
                                            <FormControl>
                                                <Input className="border-primary" type="file" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>

                            <div className="flex flex-row-reverse gap-2.5">
                                <Button type="submit">Submit</Button>
                                <Button className="bg-red-500" type="reset">Clear</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
}