import { DataTableWorker } from "@/features/workers/components/DataTableWorkers";
import { Suspense } from 'react';
import { TableSkeleton } from '@/features/workers/components/TableSkeleton';

export function UsersPage() {
    return (
        <div className="p-4 md:p-8 flex flex-col w-full">
            <label className="font-bold text-2xl md:text-4xl mb-4">Colaboradores</label>
            <div className="w-full overflow-hidden">
                <Suspense fallback={<TableSkeleton/>}>
                    <DataTableWorker />
                </Suspense>
            </div>
        </div>
    )
}