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
  FormLabel,
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
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useTokenStore } from "@/hooks/useTokenStore";
import { useState } from "react";
import { workerFormSchema } from "../Schemas/workerFormSchema"
import { RefreshCcwIcon, SendIcon } from "lucide-react";

interface WorkerFormDialogProps {
  onWorkerAdded: () => void;
  onCloseDialog: () => void;
}

export function WorkerFormDialog({ onWorkerAdded, onCloseDialog }: WorkerFormDialogProps) {
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
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/colaborador`, {
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

      setAlertOpen(true);
    } catch (error) {
      console.error("Erro ao adicionar colaborador:", error);
      toast.error(
        error instanceof Error ? error.message : "Erro ao adicionar colaborador"
      );
    }
  }

  function handleDialogResponse(insertMore: boolean) {
    if (insertMore) {
      form.reset();
      setAlertOpen(false);
    } else {
      setAlertOpen(false);
      onCloseDialog();
      onWorkerAdded();
      toast.success(`Colaborador adicionado (às ${new Date().toLocaleTimeString()})`);
    }
  }

  const { reset } = form;

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="shadow border border-border">
        <CardContent className="p-4 md:p-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="nome"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nome Completo"
                          {...field}
                          className="border-input focus:ring-2 focus:ring-offset-0 focus:ring-ring/30"
                        />
                      </FormControl>
                      <FormMessage className="text-xs font-medium" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cpf"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CPF</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="CPF"
                          {...field}
                          className="border-input focus:ring-2 focus:ring-offset-0 focus:ring-ring/30"
                        />
                      </FormControl>
                      <FormMessage className="text-xs font-medium" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-Mail</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="E-mail"
                          {...field}
                          className="border-input focus:ring-2 focus:ring-offset-0 focus:ring-ring/30"
                        />
                      </FormControl>
                      <FormMessage className="text-xs font-medium" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="uidMSK"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>UID MSK</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="UID (6 caracteres)"
                          {...field}
                          className="border-input focus:ring-2 focus:ring-offset-0 focus:ring-ring/30"
                        />
                      </FormControl>
                      <FormMessage className="text-xs font-medium" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="localidade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cidade que trabalha</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-input focus:ring-2 focus:ring-offset-0 focus:ring-ring/30">
                            <SelectValue placeholder="Localidade" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="SSZ">SSZ</SelectItem>
                          <SelectItem value="SPO">SPO</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-xs font-medium" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="brand"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Brand</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-input focus:ring-2 focus:ring-offset-0 focus:ring-ring/30">
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
                      <FormMessage className="text-xs font-medium" />
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
                          placeholder="Ex: Customer Excellence"
                          {...field}
                          className="border-input focus:ring-2 focus:ring-offset-0 focus:ring-ring/30"
                        />
                      </FormControl>
                      <FormMessage className="text-xs font-medium" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <FormField
                  control={form.control}
                  name="usaEstacionamento"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                      </FormControl>
                      <span className="text-sm font-medium">Utiliza Estacionamento?</span>
                      <FormMessage className="text-xs font-medium" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cidadeEstacionamento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cidade do Estacionamento</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-input focus:ring-2 focus:ring-offset-0 focus:ring-ring/30">
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
                      <FormMessage className="text-xs font-medium" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="cnh"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número da CNH</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="CNH (9 caracteres)"
                          {...field}
                          className="border-input focus:ring-2 focus:ring-offset-0 focus:ring-ring/30"
                        />
                      </FormControl>
                      <FormMessage className="text-xs font-medium" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tipoCNH"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tipo da CNH</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Tipo CNH"
                          {...field}
                          className="border-input focus:ring-2 focus:ring-offset-0 focus:ring-ring/30"
                        />
                      </FormControl>
                      <FormMessage className="text-xs font-medium" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:justify-end pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => reset()}
                  className="flex items-center gap-2"
                >
                  <RefreshCcwIcon size={16} />
                  <span>Limpar</span>
                </Button>
                <Button type="submit" className="flex items-center gap-2">
                  <SendIcon size={16} />
                  <span>Enviar</span>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Deseja inserir outro colaborador?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Se optar por não inserir, o pop-up será fechado e a tabela será atualizada.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="flex justify-end space-x-3 mt-4">
            <AlertDialogAction
              onClick={() => handleDialogResponse(true)}
              className="bg-primary hover:bg-primary/90"
            >
              Inserir outro
            </AlertDialogAction>
            <AlertDialogCancel onClick={() => handleDialogResponse(false)}>
              Fechar
            </AlertDialogCancel>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}