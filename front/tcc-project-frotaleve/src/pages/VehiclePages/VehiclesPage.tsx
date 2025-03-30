import { DataTableVehicles } from "@/components/data-table-vehicles";

export function VehiclesPage() {
    return (
        <div className="p-8 flex flex-col w-full">
            <label className="font-bold text-4xl">Automóveis</label>

            <DataTableVehicles />
        </div>
    )
}