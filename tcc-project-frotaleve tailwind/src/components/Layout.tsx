import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"
import { Outlet } from "react-router"

export default function Layout() {
    return (
        <div>
            <SidebarProvider>
                <AppSidebar />
                <main>
                    <SidebarTrigger />
                    <Outlet />
                </main>
            </SidebarProvider>
        </div>
    )
}