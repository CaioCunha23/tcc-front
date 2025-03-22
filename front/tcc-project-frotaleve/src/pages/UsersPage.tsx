import { DataTable } from "@/components/data-table-worker";

export function UsersPage() {
    return (
        <div className="p-8 max-w-[80%] w-full">
            <label className="font-bold text-4xl">Colaboradores</label>
            <DataTable />
        </div>
    )
}