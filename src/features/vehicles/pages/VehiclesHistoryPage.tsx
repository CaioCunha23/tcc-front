import { DataTableVehiclesHistory } from "@/features/vehicles/components/Vehicles History/DataTableVehiclesHistory";
import { TableSkeleton } from "@/features/workers/components/TableSkeleton";
import { Suspense } from "react";

export function VehiclesHistoryPage() {
    return (
        <div className="grid grid-rows-[auto_1fr] h-full gap-6 p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <label className="font-bold text-2xl sm:text-3xl">Histórico de Veículos</label>
            </div>

            <div className="min-h-0 overflow-auto">
                <Suspense fallback={<TableSkeleton />}>
                    <DataTableVehiclesHistory />
                </Suspense>
            </div>
        </div>
    )
}