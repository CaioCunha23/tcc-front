import { DataTableVehicles } from "@/features/vehicles/components/Vehicles/DataTableVehicles";
import { TableSkeleton } from "@/features/workers/components/TableSkeleton";
import { Suspense } from "react";

export function VehiclesPage() {
    return (
        <div className="grid grid-rows-[auto_1fr] h-full gap-6 p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <label className="font-bold text-2xl sm:text-3xl">Automóveis</label>
            </div>

            <div className="min-h-0 overflow-auto">
                <Suspense fallback={<TableSkeleton />}>
                    <DataTableVehicles />
                </Suspense>
            </div>
        </div>
    )
}