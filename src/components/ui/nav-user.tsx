import {
    UserPen,
    Bell,
    ChevronsUpDown,
    CreditCard,
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
import { useState } from "react"
import WorkerEditForm from "@/features/workers/components/EditWorkerDialog"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { DialogHeader } from "./dialog"

export function NavUser({ user }: {
    user: {
        name: string
        email: string
        avatar: string
    }
}) {
    const { colaborador, token, logout } = useTokenStore();
    const [open, setOpen] = useState(false);
    const { isMobile } = useSidebar();
    const navigate = useNavigate();

    async function handleSave(values: Partial<typeof colaborador>) {
        if (!colaborador) return;

        const updatedWorker = { ...colaborador, ...values };

        const res = await fetch(`http://localhost:3000/colaborador/${colaborador.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(updatedWorker),
        });

        if (res.ok) {
            setOpen(false);
        } else {
            console.error("Erro ao atualizar o colaborador");
        }
    }

    const handleEditClick = (event: React.MouseEvent) => {
        event.stopPropagation();
        setOpen(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        logout();
        navigate("/");
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
                            <DropdownMenuItem>
                                <CreditCard />
                                Billing
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Bell />
                                Notifications
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleLogout}>
                            <LogOut />
                            Log out
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
                        {
                            colaborador && (
                                <WorkerEditForm defaultValues={colaborador} onSubmit={handleSave} />
                            )
                        }
                    </DialogContent>
                </Dialog>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}