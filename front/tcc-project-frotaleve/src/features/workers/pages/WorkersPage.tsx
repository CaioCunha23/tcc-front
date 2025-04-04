import { DataTableWorker } from "@/features/workers/components/DataTableWorkers";

export function UsersPage() {
    return (
        <div className="p-8 flex flex-col w-full">
            <label className="font-bold text-4xl">Colaboradores</label>
            <DataTableWorker />
        </div>
    )
}