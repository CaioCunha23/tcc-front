import { useMemo, useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router";
import WorkerEditForm from "@/features/workers/components/EditWorkerDialog";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { useTokenStore } from "./useTokenStore";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogHeader
} from "@/components/ui/alert-dialog";
import { Colaborador } from "@/types/Worker";

interface UseColaboradoresColumnsOptions {
  onWorkerUpdated: () => void;
}

export function useColaboradoresColumns({ onWorkerUpdated }: UseColaboradoresColumnsOptions): ColumnDef<Colaborador>[] {
  const navigate = useNavigate();
  const { token } = useTokenStore();

  return useMemo(() => [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          className="dark:bg-gray-800 dark:border-gray-600"
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          className="dark:bg-gray-800 dark:border-gray-600"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "nome",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Nome
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="flex justify-center">{row.getValue("nome")}</div>,
    },
    {
      accessorKey: "status",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Status
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="flex justify-center">{row.getValue("status") ? "Ativo" : "Inativo"}</div>,
    },
    {
      accessorKey: "email",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Email
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="flex justify-center lowercase">{row.getValue("email")}</div>,
    },
    {
      accessorKey: "uidMSK",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            UID MSK
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="flex justify-center">{row.getValue("uidMSK")}</div>,
    },
    {
      accessorKey: "localidade",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Localidade
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="flex justify-center">{row.getValue("localidade")}</div>,
    },
    {
      accessorKey: "brand",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Brand
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="flex justify-center">{row.getValue("brand")}</div>,
    },
    {
      accessorKey: "jobTitle",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Job Title
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="flex justify-center">{row.getValue("jobTitle")}</div>,
    },
    {
      accessorKey: "cpf",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            CPF
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="flex justify-center">{row.getValue("cpf")}</div>,
    },
    {
      accessorKey: "usaEstacionamento",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Estacionamento
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="flex justify-center">{row.getValue("usaEstacionamento") ? "Sim" : "Não"}</div>,
    },
    {
      accessorKey: "cidadeEstacionamento",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Cidade Estacionamento
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="flex justify-center">{row.getValue("cidadeEstacionamento") || "N/A"}</div>,
    },
    {
      accessorKey: "cnh",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            CNH
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="flex justify-center">{row.getValue("cnh")}</div>,
    },
    {
      accessorKey: "tipoCNH",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Tipo CNH
            <ArrowUpDown />
          </Button>
        )
      },
      cell: ({ row }) => <div className="flex justify-center">{row.getValue("tipoCNH")}</div>,
    },
    {
      id: "infracaoValor",
      accessorFn: (row) =>
        row.infracaos?.length
          ? row.infracaos.reduce((acc, { valor }) => acc + +valor, 0)
          : 0,
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          Infrações
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => {
        const valorTotal = row.getValue("infracaoValor") as number;
        const worker = row.original;
        const [open, setOpen] = useState(false);
        const [infractions, setInfractions] = useState([]);

        const fetchInfractions = async (workerUidMSK: string) => {
          try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/infracoes/${workerUidMSK}?last30=true`);

            if (!response.ok) {
              throw new Error("Erro ao buscar infrações");
            }
            const data = await response.json();
            setInfractions(data);
          } catch (error) {
            console.error("Erro ao buscar infrações:", error);
          }
        };

        const handleCellClick = async (e: React.MouseEvent) => {
          e.stopPropagation();
          await fetchInfractions(worker.uidMSK);
          setOpen(true);
        };

        return (
          <>
            <div
              className="flex justify-center cursor-pointer"
              onClick={handleCellClick}
            >
              {valorTotal > 0 ? `R$ ${(valorTotal / 100).toFixed(2)}` : "Sem infrações"}
            </div>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetContent className="w-full max-w-md">
                <SheetHeader>
                  <SheetTitle>
                    Infrações dos Últimos 30 Dias
                  </SheetTitle>
                  <SheetDescription>
                    Listagem das infrações para {worker.nome}.
                  </SheetDescription>
                </SheetHeader>
                <div className="p-4">
                  {infractions.length > 0 ? (
                    infractions.map((infraction: any, index: number) => (
                      <div key={index} className="border-b py-2">
                        <div>
                          <strong>Valor:</strong> R$ {(infraction.valor / 100).toFixed(2)}
                        </div>
                        <div>
                          <strong>Data:</strong>{" "}
                          {new Date(infraction.dataInfracao).toLocaleDateString()}
                        </div>
                        <div>
                          <strong>Tipo de Infração:</strong>{" "}
                          {(infraction.tipo)}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div>Sem infrações nos últimos 30 dias.</div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </>
        );
      },
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const worker = row.original;
        const [open, setOpen] = useState(false);
        const [alertOpen, setAlertOpen] = useState(false);

        async function handleSave(values: Partial<Colaborador>) {
          const updatedWorker: Colaborador = { ...worker, ...values };
          const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/colaborador/${worker.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(updatedWorker),
          });
          if (res.ok) {
            setOpen(false);
            toast.success(`Colaborador atualizado (às ${new Date().toLocaleTimeString()})`);
            onWorkerUpdated && onWorkerUpdated();
          } else {
            console.error("Erro ao atualizar");
            toast.error(`Erro ao atualizar colaborador.`);
          }
        }

        const handleEditClick = (event: React.MouseEvent) => {
          event.stopPropagation();
          setOpen(true);
        };

        const handleDeactivateClick = (event: React.MouseEvent) => {
          event.stopPropagation();
          setAlertOpen(true);
        };

        async function handleDeactivate() {
          const updatedWorker: Colaborador = { ...worker, status: false };

          try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/colaborador/${worker.id}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
              },
              body: JSON.stringify(updatedWorker),
            });

            if (res.ok) {
              const responseData = await res.json();
              setAlertOpen(false);

              if (responseData.veiculosLiberados && responseData.veiculosLiberados.finalizados > 0) {
                const veiculosInfo = responseData.veiculosLiberados.detalhes
                  .filter((d: any) => d.success)
                  .map((d: any) => d.veiculoPlaca)
                  .join(', ');

                toast.success(
                  `Colaborador desativado com sucesso! ${responseData.veiculosLiberados.finalizados} veículo(s) liberado(s): ${veiculosInfo}`,
                  { duration: 6000 }
                );
              } else {
                toast.success(`Colaborador desativado com sucesso!`);
              }

              if (responseData.veiculosLiberados && responseData.veiculosLiberados.erros > 0) {
                toast.warning(
                  `Atenção: ${responseData.veiculosLiberados.erros} veículo(s) não puderam ser liberados automaticamente. Verifique manualmente.`,
                  { duration: 8000 }
                );
              }

              onWorkerUpdated && onWorkerUpdated();

            } else {
              const errorData = await res.json();
              console.error("Erro ao desativar colaborador:", errorData);
              toast.error(`Erro ao tentar desativar colaborador: ${errorData.error || 'Erro desconhecido'}`);
            }
          } catch (error) {
            console.error("Erro na requisição:", error);
            toast.error(`Erro de conexão ao tentar desativar colaborador!`);
          }
        }

        return (
          <>
            <DropdownMenu modal={false}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Abrir Menu</span>
                  <MoreHorizontal />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Ações</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={(event) => {
                    event.stopPropagation();
                    navigator.clipboard.writeText(worker.uidMSK);
                  }}
                >
                  Copiar UID MSK
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleEditClick}>
                  Editar Colaborador
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleDeactivateClick}>
                  Desativar Colaborador
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
                <DialogHeader className="px-6 py-4">
                  <DialogTitle>Editar Colaborador</DialogTitle>
                  <DialogDescription>
                    Altere os dados do colaborador e salve.
                  </DialogDescription>
                </DialogHeader>

                <div>
                  <WorkerEditForm
                    defaultValues={worker}
                    onSubmit={handleSave}
                    onWorkerUpdated={onWorkerUpdated}
                  />
                </div>
              </DialogContent>
            </Dialog>

            <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
              <AlertDialogContent className="max-w-md">
                <AlertDialogHeader>
                  <AlertDialogTitle>Desativar Colaborador</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tem certeza de que deseja desativar esse colaborador?
                    Esta ação irá desativar o colaborador e liberar automaticamente
                    todos os veículos associados a ele.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 mt-6">
                  <AlertDialogCancel className="w-full sm:w-auto">
                    Cancelar
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeactivate}
                    className="w-full sm:w-auto bg-red-600 hover:bg-red-700 focus:ring-red-600"
                  >
                    Confirmar Desativação
                  </AlertDialogAction>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )
      },
    },
  ], [navigate]);
}