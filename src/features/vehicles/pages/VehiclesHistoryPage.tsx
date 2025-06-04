import { DataTableVehiclesHistory } from "@/features/vehicles/components/Vehicles History/DataTableVehiclesHistory";
import { TableSkeleton } from "@/features/workers/components/TableSkeleton";
import { Suspense } from "react";

export function VehiclesHistoryPage() {
    return (
        <div className="w-full max-w-screen-xl mx-auto px-4 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <label className="font-bold text-2xl sm:text-3xl">Histórico de Veículos</label>
            </div>

            <div className="w-full overflow-x-hidden">
                <Suspense fallback={<TableSkeleton />}>
                    <DataTableVehiclesHistory />
                </Suspense>
            </div>
        </div>
    )
}