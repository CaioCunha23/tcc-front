import { InfractionsTable } from "@/features/workers/components/InfractionsTable";

export function InfractionsPage() {
    return (
        <div className="p-8 flex flex-col w-full gap-3">
            <label className="font-bold text-4xl">Infrações</label>
            <InfractionsTable />
        </div>
    )
}