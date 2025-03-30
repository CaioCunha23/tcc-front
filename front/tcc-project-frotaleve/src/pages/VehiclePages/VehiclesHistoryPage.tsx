import { DataTableVehiclesHistory } from "@/components/data-table-vehicles-history";

export function VehiclesHistoryPage() {
    return (
        <div className="p-8 flex flex-col w-full">
            <label className="font-bold text-4xl">Histórico de veículos</label>
            <DataTableVehiclesHistory />
        </div>
    )
}