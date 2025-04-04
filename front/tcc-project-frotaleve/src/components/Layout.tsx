import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/Sidebar"
import { Outlet } from "react-router"
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ModeToggle } from "./ui/mode-toggle";
import { Separator } from "./ui/separator";
import { BreadcrumbResponsive } from "./BreadCrumbsResponsive";

export default function Layout() {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <SidebarProvider>
                <AppSidebar variant="inset" />
                <SidebarInset>
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

                    <Outlet />
                </SidebarInset>
            </SidebarProvider>
        </ThemeProvider>
    )
}