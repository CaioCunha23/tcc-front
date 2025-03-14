import * as React from "react"
import { Link, useLocation } from "react-router" // Importando useLocation de react-router-dom

import { useMediaQuery } from "@react-hook/media-query"
import {
    Breadcrumb,
    BreadcrumbEllipsis,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const items = [
    { href: "/home", label: "Home" },
    { href: "/usuarios", label: "Colaboradores" },
    { href: "/usuarios/adicionar", label: "Adicionar Colaborador" },
]

const ITEMS_TO_DISPLAY = 3

export function BreadcrumbResponsive() {
    const [open, setOpen] = React.useState(false)
    const isDesktop = useMediaQuery("(min-width: 768px)")
    const location = useLocation() // Obtendo a localização atual usando o useLocation

    // Função para gerar os itens de breadcrumb com base na URL atual
    const generateBreadcrumbs = () => {
        const pathParts = location.pathname.split("/").filter(Boolean); // Particiona o caminho da URL
        const breadcrumbs = pathParts.map((part, index) => {
            const href = `/${pathParts.slice(0, index + 1).join("/")}`; // Reconstrói o caminho para cada parte
            const label = items.find(item => item.href === href)?.label || part; // Encontra o label correspondente

            return { href, label };
        });

        return breadcrumbs;
    };

    const breadcrumbs = generateBreadcrumbs(); // Gerar breadcrumbs com base na URL atual

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {breadcrumbs.map((item, index) => (
                    <BreadcrumbItem key={index}>
                        {item.href ? (
                            <>
                                <BreadcrumbLink asChild className="max-w-20 truncate md:max-w-none">
                                    <Link to={item.href}>{item.label}</Link>
                                </BreadcrumbLink>
                                {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                            </>
                        ) : (
                            <span className="max-w-20 truncate md:max-w-none">{item.label}</span>
                        )}
                    </BreadcrumbItem>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}