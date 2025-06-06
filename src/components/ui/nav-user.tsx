import {
    UserPen,
    ChevronsUpDown,
    LogOut,
} from "lucide-react"
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import { useTokenStore } from "@/hooks/useTokenStore"
import { useNavigate } from "react-router"
import { useState, useEffect } from "react"
import WorkerEditForm from "@/features/workers/components/EditWorkerDialog"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { DialogHeader } from "./dialog"
import { useQueryClient } from "@tanstack/react-query"
import { Colaborador } from "@/types/Worker"

export function NavUser({ user }: {
    user: {
        name: string
        email: string
        avatar: string
    }
}) {
    const { colaborador, token, logout } = useTokenStore();
    const [open, setOpen] = useState(false);
    const [fullWorkerData, setFullWorkerData] = useState<Colaborador | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { isMobile } = useSidebar();
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    useEffect(() => {
        if (open && colaborador?.uidMSK && !fullWorkerData) {
            fetchWorkerData();
        }
    }, [open, colaborador?.uidMSK]);

    const fetchWorkerData = async () => {
        if (!colaborador?.uidMSK || !token) return;

        setIsLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/colaborador/uid/${colaborador.uidMSK}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const workerData = await response.json();
                setFullWorkerData(workerData);
            } else {
                console.error("Erro ao buscar dados do colaborador");
            }
        } catch (error) {
            console.error("Erro ao buscar dados do colaborador:", error);
        } finally {
            setIsLoading(false);
        }
    };

    async function handleSave(values: Partial<Colaborador>) {
        if (!fullWorkerData) return;

        const updatedWorker = { ...fullWorkerData, ...values };

        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/colaborador/${fullWorkerData.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedWorker),
        });

        if (res.ok) {
            setOpen(false);
            setFullWorkerData(updatedWorker as Colaborador);
        } else {
            console.error("Erro ao atualizar o colaborador");
        }
    }

    const handleEditClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        setOpen(true);
    };

    const handleLogout = () => {
        logout(queryClient);
        navigate("/");
    };

    const handleDialogClose = (isOpen: boolean) => {
        setOpen(isOpen);
        if (!isOpen) {
            setFullWorkerData(null);
        }
    };

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage src={user.avatar} alt={user.name} />
                                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">{user.name}</span>
                                <span className="truncate text-xs">{user.email}</span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage src={user.avatar} alt={user.name} />
                                    <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">{user.name}</span>
                                    <span className="truncate text-xs">{user.email}</span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuGroup>
                            <DropdownMenuItem onClick={handleEditClick}>
                                <UserPen />
                                Editar Dados
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                            <LogOut />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Dialog open={open} onOpenChange={handleDialogClose}>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Editar Colaborador</DialogTitle>
                            <DialogDescription>
                                Altere os dados do colaborador e salve.
                            </DialogDescription>
                        </DialogHeader>
                        {isLoading ? (
                            <div className="flex justify-center py-8">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                            </div>
                        ) : fullWorkerData ? (
                            <WorkerEditForm defaultValues={fullWorkerData} onSubmit={handleSave} />
                        ) : (
                            <div className="text-center py-8 text-muted-foreground">
                                Erro ao carregar dados do colaborador
                            </div>
                        )}
                    </DialogContent>
                </Dialog>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}