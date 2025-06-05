import { InfractionsTable } from "@/features/infractions/components/InfractionsTable"
import { TableSkeleton } from "@/features/workers/components/TableSkeleton"
import { Suspense } from "react"

export function InfractionsPage() {
    return (
        <div className="grid grid-rows-[auto_1fr] h-full gap-6 p-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <label className="font-bold text-2xl sm:text-3xl">Infrações</label>
            </div>

            <div className="min-h-0 overflow-auto">
                <Suspense fallback={<TableSkeleton />}>
                    <InfractionsTable />
                </Suspense>
            </div>
        </div>
    )
}