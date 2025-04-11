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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Toaster, toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useTokenStore } from "@/hooks/useTokenStore";
import { useState } from "react";
import { workerFormSchema } from "../Schemas/workerFormSchema"


export function WorkerFormPage() {
  const { token } = useTokenStore();
  const [alertOpen, setAlertOpen] = useState(false);

  const form = useForm<z.infer<typeof workerFormSchema>>({
    resolver: zodResolver(workerFormSchema),
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

  async function onSubmit(values: z.infer<typeof workerFormSchema>) {
    try {
      const response = await fetch("http://localhost:3000/colaborador", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.log("Enviando para o backend:", values);
        throw new Error(errorData.message || "Erro ao adicionar colaborador");
      }

      const data = await response.json();
      console.log("Colaborador adicionado com sucesso:", data);

      toast.success(`Colaborador adicionado! (às ${new Date().toLocaleTimeString()})`);

      setAlertOpen(true);
    } catch (error) {
      console.error("Erro ao adicionar colaborador:", error);
      toast.error(
        error instanceof Error ? error.message : "Erro desconhecido"
      );
    }
  }

  function handleDialogResponse(insertMore: boolean) {
    if (insertMore) {
      form.reset();
      setAlertOpen(false);
    } else {
      setAlertOpen(false);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  }

  const { reset } = form;

  return (
    <main className="flex-1 p-4 md:p-8">

      <Toaster position="top-center" />

      <div className="mx-auto w-full max-w-3xl">
        <h1 className="text-4xl font-bold mb-6 text-center">
          Cadastrar Colaborador
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
                    name="nome"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            placeholder="Nome Completo"
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
                    name="cpf"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            placeholder="CPF"
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
                    name="email"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            placeholder="E-mail"
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
                    name="uidMSK"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            placeholder="UID (6 caracteres)"
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
                    name="localidade"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
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
                    name="jobTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="Cargo / Área de atuação"
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
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="border-primary w-full">
                              <SelectValue placeholder="Cidade Estacionamento" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Santos">Santos</SelectItem>
                            <SelectItem value="São Paulo">
                              São Paulo
                            </SelectItem>
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
                          <Input
                            placeholder="CNH (9 caracteres)"
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
                    name="tipoCNH"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input
                            placeholder="Tipo CNH"
                            {...field}
                            className="border-primary"
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

      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Deseja inserir outro colaborador?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Se optar por não inserir, a página será recarregada para atualizar a tabela.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end space-x-2 mt-4">
            <AlertDialogAction onClick={() => handleDialogResponse(true)}>
              Inserir outro
            </AlertDialogAction>
            <AlertDialogCancel onClick={() => handleDialogResponse(false)}>
              Fechar
            </AlertDialogCancel>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  );
}