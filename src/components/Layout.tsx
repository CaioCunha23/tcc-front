import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/Sidebar";
import { Navigate, Outlet } from "react-router";
import { ModeToggle } from "./mode-toggle";
import { Separator } from "./ui/separator";
import { BreadcrumbResponsive } from "./BreadCrumbsResponsive";
import { useTokenStore } from "@/hooks/useTokenStore";

export default function Layout() {
    const { token } = useTokenStore();
    return (
        <SidebarProvider>
            <AppSidebar variant="sidebar" />
            <SidebarInset className="flex flex-col">
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <BreadcrumbResponsive />
                    </div>

                    <div className="absolute top-4 right-4">
                        <ModeToggle />
                    </div>
                </header>
                
                <main className="flex-1 min-h-0">
                    {token ? <Outlet /> : <Navigate to="/" replace  />}
                </main>
            </SidebarInset>
        </SidebarProvider>
    )
}