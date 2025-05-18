import { DataTableWorker } from "@/features/workers/components/DataTableWorkers";
import { Suspense } from 'react';
import { TableSkeleton } from '@/features/workers/components/TableSkeleton';

export function UsersPage() {
    return (
        <div className="p-4 sm:p-6 md:p-8 w-full max-w-full flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl">Colaboradores</h1>
            </div>

            <div className="w-full overflow-x-auto rounded-md">
                <Suspense fallback={<TableSkeleton />}>
                    <DataTableWorker />
                </Suspense>
            </div>
        </div>
    )
}