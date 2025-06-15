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
    <div className="w-full">
      <Card className="shadow border border-border">
        <CardContent className="p-4 md:p-6 lg:p-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 md:space-y-5"
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
                          className="h-9 md:h-10 text-sm border-input focus:ring-2 focus:ring-offset-0 focus:ring-ring/30"
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
                          className="h-9 md:h-10 text-sm border-input focus:ring-2 focus:ring-offset-0 focus:ring-ring/30"
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
                          className="h-9 md:h-10 text-sm border-input focus:ring-2 focus:ring-offset-0 focus:ring-ring/30"
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
                          className="h-9 md:h-10 text-sm border-input focus:ring-2 focus:ring-offset-0 focus:ring-ring/30"
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-9 md:h-10 text-sm border-input focus:ring-2 focus:ring-offset-0 focus:ring-ring/30">
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
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-9 md:h-10 text-sm border-input focus:ring-2 focus:ring-offset-0 focus:ring-ring/30">
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
                          placeholder="Ex: Customer Excellence"
                          {...field}
                          className="h-9 md:h-10 text-sm border-input focus:ring-2 focus:ring-offset-0 focus:ring-ring/30"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 items-start">
                <FormField
                  control={form.control}
                  name="usaEstacionamento"
                  render={({ field }) => (
                    <FormItem className="flex items-center space-x-3 space-y-0 pt-6">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          className="data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                      </FormControl>
                      <span className="text-sm font-medium">Utiliza Estacionamento?</span>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cidadeEstacionamento"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Cidade do Estacionamento</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-9 md:h-10 text-sm border-input focus:ring-2 focus:ring-offset-0 focus:ring-ring/30">
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
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                <FormField
                  control={form.control}
                  name="cnh"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Número da CNH</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="CNH (9 caracteres)"
                          {...field}
                          className="h-9 md:h-10 text-sm border-input focus:ring-2 focus:ring-offset-0 focus:ring-ring/30"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tipoCNH"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Tipo da CNH</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Tipo CNH"
                          {...field}
                          className="h-9 md:h-10 text-sm border-input focus:ring-2 focus:ring-offset-0 focus:ring-ring/30"
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:justify-end pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => reset()}
                  className="w-full sm:w-auto h-9 md:h-10 text-sm flex items-center gap-2"
                >
                  <RefreshCcwIcon className="h-4 w-4" />
                  <span>Limpar</span>
                </Button>
                <Button
                  type="submit"
                  className="w-full sm:w-auto h-9 md:h-10 text-sm flex items-center gap-2"
                >
                  <SendIcon className="h-4 w-4" />
                  <span>Enviar</span>
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        <AlertDialogContent className="w-[90vw] max-w-md mx-auto">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-lg">
              Deseja inserir outro colaborador?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm">
              Se optar por não inserir, o pop-up será fechado e a tabela será atualizada.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <div className="flex flex-col-reverse sm:flex-row gap-2 sm:gap-3 sm:justify-end mt-4">
            <AlertDialogCancel className="w-full sm:w-auto">
              Fechar
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => handleDialogResponse(true)}
              className="w-full sm:w-auto bg-primary hover:bg-primary/90"
            >
              Inserir outro
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}