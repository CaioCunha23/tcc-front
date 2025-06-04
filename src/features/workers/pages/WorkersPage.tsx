import { DataTableWorker } from "@/features/workers/components/DataTableWorkers"
import { Suspense } from "react"
import { TableSkeleton } from "@/features/workers/components/TableSkeleton"

export function UsersPage() {
  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <label className="font-bold text-2xl sm:text-3xl">Colaboradores</label>
      </div>

      <div className="w-full overflow-x-hidden">
        <Suspense fallback={<TableSkeleton />}>
          <DataTableWorker />
        </Suspense>
      </div>
    </div>
  )
}
