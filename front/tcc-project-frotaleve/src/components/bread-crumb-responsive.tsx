import { Link, useLocation } from "react-router" // Importando useLocation de react-router-dom

import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const items = [
    { href: "/home", label: "Home" },
    { href: "/usuarios", label: "Colaboradores" },
    { href: "/usuarios/adicionar", label: "Adicionar Colaborador" },
]

export function BreadcrumbResponsive() {
    const location = useLocation()

    const generateBreadcrumbs = () => {
        const pathParts = location.pathname.split("/").filter(Boolean);
        const breadcrumbs = pathParts.map((part, index) => {
            const href = `/${pathParts.slice(0, index + 1).join("/")}`;
            const label = items.find(item => item.href === href)?.label || part;

            return { href, label };
        });

        return breadcrumbs;
    };

    const breadcrumbs = generateBreadcrumbs();

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