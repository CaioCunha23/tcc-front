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

export function WorkerFormPage() {
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await fetch("http://localhost:3000/colaborador", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao adicionar veículo");
      }

      const data = await response.json();
      console.log("Veículo adicionado com sucesso:", data);
      alert("Colaborador adicionado com sucesso!");
      reset()

    } catch (error) {
      console.error("Erro ao adicionar veículo:", error);
      alert(error instanceof Error ? error.message : "Erro desconhecido");
    }
  }

  const { reset } = form;

  return (
    <main className="flex-1 p-4 md:p-8">
      <div className="mx-auto w-full max-w-full md:max-w-[60%]">
        <label className="block text-4xl font-bold mb-6 text-center">Cadastrar Colaborador</label>

        <Card className="border-primary shadow-md max-h-[40rem] overflow-y-auto">
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                <div className="flex flex-col md:flex-row gap-4">
                  <FormField
                    control={form.control}
                    name="nome"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder="Nome Completo" {...field} className="border-primary" />
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
                          <Input placeholder="CPF" {...field} className="border-primary" />
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
                          <Input placeholder="E-mail" {...field} className="border-primary" />
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
                          <Input placeholder="UID (6 caracteres)" {...field} className="border-primary" />
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
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-primary w-full">
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
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-primary w-full">
                              <SelectValue placeholder="Brand" />
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

                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="jobTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="Cargo / Área de atuação" {...field} className="border-primary" />
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
                        <span>Utiliza Estacionamento?</span>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="cidadeEstacionamento"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="border-primary w-full">
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

                <div className="flex flex-col md:flex-row gap-4">
                  <FormField
                    control={form.control}
                    name="cnh"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder="CNH (9 caracteres)" {...field} className="border-primary" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="tipoCNH"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder="Tipo CNH" {...field} className="border-primary" />
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