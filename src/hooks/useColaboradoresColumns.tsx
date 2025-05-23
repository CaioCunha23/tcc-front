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
            const response = await fetch(`/api/infracoes/${workerUidMSK}?last30=true`);

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
          const res = await fetch(`/api/colaborador/${worker.id}`, {
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
          const res = await fetch(`/api/colaborador/${worker.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(updatedWorker),
          });
          if (res.ok) {
            setAlertOpen(false);
            toast.success(`Colaborador desativado com sucesso!`);
            onWorkerUpdated && onWorkerUpdated();
          } else {
            console.error("Erro ao desativar colaborador");
            toast.error(`Erro ao tentar desativa colaborador!`);
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
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Editar Colaborador</DialogTitle>
                  <DialogDescription>
                    Altere os dados do colaborador e salve.
                  </DialogDescription>
                </DialogHeader>

                <WorkerEditForm
                  defaultValues={worker}
                  onSubmit={handleSave}
                  onWorkerUpdated={onWorkerUpdated}
                />
              </DialogContent>
            </Dialog>

            <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
              <AlertDialogContent className="max-w-sm">
                <AlertDialogHeader>
                  <AlertDialogTitle>Desativar Colaborador</AlertDialogTitle>
                  <AlertDialogDescription>
                    Tem certeza de que deseja desativar esse colaborador?
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <div className="flex justify-end space-x-2 mt-4">
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeactivate}>Confirmar</AlertDialogAction>
                </div>
              </AlertDialogContent>
            </AlertDialog>
          </>
        )
      },
    },
  ], [navigate]);
}