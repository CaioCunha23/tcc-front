import * as React from "react"
import { ChevronRight, LifeBuoy, Send } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { NavUser } from "./ui/nav-user"
import { NavSecondary } from "./ui/nav-secondary"
import { Link, useLocation } from "react-router"

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Colaboradores",
      url: "#",
      items: [
        {
          title: "Time de colaboradores",
          url: "/colaboradores",
        },
        {
          title: "Verificação de multas",
          url: "/colaboradores/multas",
        },
      ],
    },
    {
      title: "Automóveis",
      url: "#",
      items: [
        {
          title: "Frota de carros",
          url: "/veiculos",
        },
        {
          title: "Histórico de Utilização",
          url: "/veiculo_colaborador",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: Send,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/home">
                <div className="flex size-8 items-center rounded-lg bg-white text-sidebar-primary-foreground">
                  <img src="/maersk_star.png" alt="Company Logo" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Fleet Guard</span>
                  <span className="truncate text-xs">Maersk Brasil</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="gap-0">
        {data.navMain.map((item) => (
          <Collapsible
            key={item.title}
            title={item.title}
            defaultOpen
            className="group/collapsible"
          >
            <SidebarGroup>
              <SidebarGroupLabel
                asChild
                className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
              >
                <CollapsibleTrigger>
                  {item.title}{" "}
                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                </CollapsibleTrigger>
              </SidebarGroupLabel>
              <CollapsibleContent>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {item.items.map((subItem) => {
                      const isActive = location.pathname === subItem.url; // Verifica se o item está ativo
                      return (
                        <SidebarMenuItem key={subItem.title}>
                          <SidebarMenuButton
                            asChild
                            isActive={isActive}
                            className={isActive ? "text-bold text-blue-500" : ""}
                          >
                            <Link to={subItem.url}>{subItem.title}</Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </CollapsibleContent>
            </SidebarGroup>
          </Collapsible>
        ))}
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}