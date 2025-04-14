import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogClose,
} from "@/components/ui/dialog";
import { VehicleFormDialog } from "./VehicleFormDialog";
import UploadCSVVehicle from "./UploadCSVVehicle";

interface AddVehicleDialogProps {
    onVehicleAdded: () => void;
}

export default function AddVehicleDialog({ onVehicleAdded }: AddVehicleDialogProps) {
    const [mode, setMode] = useState<"initial" | "manual" | "upload">("initial");
    const [open, setOpen] = useState(false);

    const handleOpenChange = (open: boolean) => {
        setOpen(open);
        if (!open) {
            setMode("initial");
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button>Adicionar</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Adicionar Veículo</DialogTitle>
                    <DialogDescription>
                        Escolha uma forma de cadastrar o veículo:
                    </DialogDescription>
                </DialogHeader>

                {mode === "initial" && (
                    <div className="flex gap-4 my-4">
                        <Button onClick={() => setMode("manual")}>Inserir manualmente</Button>
                        <Button onClick={() => setMode("upload")}>Upload CSV</Button>
                    </div>
                )}

                {mode === "manual" && (
                    <div className="mt-4">
                        <VehicleFormDialog onVehicleAdded={onVehicleAdded} onCloseDialog={() => setOpen(false)} />
                    </div>
                )}

                {mode === "upload" && (
                    <div className="mt-4">
                        <UploadCSVVehicle />
                    </div>
                )}

                <div className="mt-4 flex justify-end">
                    <DialogClose asChild>
                        <Button variant="ghost">Fechar</Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    );
}