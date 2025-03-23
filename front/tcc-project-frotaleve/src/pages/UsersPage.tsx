import { DataTableWorker } from "@/components/data-table-workers";

export function UsersPage() {
    return (
        <div className="p-8 flex flex-col w-full">
            <label className="font-bold text-4xl">Colaboradores</label>
            <DataTableWorker />
        </div>
    )
}