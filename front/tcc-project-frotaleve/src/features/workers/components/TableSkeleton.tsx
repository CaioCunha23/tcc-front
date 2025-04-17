import { Skeleton } from '@/components/ui/skeleton';

export function TableSkeleton() {
    return (
        <div className="space-y-2 animate-pulse">
            <div className="flex space-x-4 mb-4">
                {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-6 w-1/5 rounded" />
                ))}
            </div>
            {[...Array(6)].map((_, row) => (
                <div key={row} className="flex space-x-4">
                    <Skeleton className="h-4 w-1/5 rounded" />
                    <Skeleton className="h-4 w-1/5 rounded" />
                    <Skeleton className="h-4 w-3/5 rounded" />
                </div>
            ))}
        </div>
    );
}