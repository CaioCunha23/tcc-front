import { DataTable } from "@/components/ui/data-table";

export function UsersPage() {
    return (
        <div className="p-10">
            <label className="font-bold text-4xl">Colaboradores</label>
            <DataTable/>
        </div>
    )
}