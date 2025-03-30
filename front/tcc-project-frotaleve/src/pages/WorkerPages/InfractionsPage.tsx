import { InfractionsTable } from "@/components/infractions-table";

export function InfractionsPage() {
    return (
        <div className="p-8 flex flex-col w-full">
            <label className="font-bold text-4xl">Infrações</label>
            <InfractionsTable />
        </div>
    )
}