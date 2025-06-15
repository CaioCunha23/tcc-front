import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogClose
} from "@/components/ui/dialog";
import { VehicleFormDialog } from "./VehicleFormDialog";
import UploadCSVVehicle from "./UploadCSVVehicle";
import { FileUpIcon, CarFrontIcon, ArrowLeftIcon } from "lucide-react";

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

    const handleBack = () => {
        setMode("initial");
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button className="flex items-center gap-2 h-9 px-3 text-sm md:h-10 md:px-4">
                    <CarFrontIcon className="h-4 w-4" />
                    <span className="hidden sm:inline">Adicionar Veículo</span>
                    <span className="sm:hidden">Adicionar</span>
                </Button>
            </DialogTrigger>
            
            <DialogContent className={`
                ${mode === "manual" ? "max-w-[95vw] lg:max-w-5xl" : "max-w-[95vw] sm:max-w-2xl"} 
                max-h-[95vh] 
                w-full 
                overflow-y-auto
                p-4 sm:p-6
            `}>
                <DialogHeader className="pb-4">
                    <DialogTitle className="text-lg sm:text-xl font-semibold">
                        {mode === "initial" ? "Adicionar Veículo" : (
                            <div className="flex items-center">
                                <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="mr-2 p-1 h-8 w-8 sm:h-auto sm:w-auto sm:p-2" 
                                    onClick={handleBack}
                                >
                                    <ArrowLeftIcon size={16} />
                                </Button>
                                <span className="text-sm sm:text-xl">
                                    {mode === "manual" ? "Inserir Veículo Manualmente" : "Upload de Veículos via CSV"}
                                </span>
                            </div>
                        )}
                    </DialogTitle>
                    {mode === "initial" && (
                        <DialogDescription className="text-sm mt-2">
                            Escolha uma forma de cadastrar o veículo:
                        </DialogDescription>
                    )}
                </DialogHeader>

                {mode === "initial" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-4 sm:py-6">
                        <Button
                            onClick={() => setMode("manual")}
                            variant="outline"
                            className="flex flex-col items-center justify-center h-24 sm:h-32 p-4 sm:p-6 hover:bg-accent"
                        >
                            <CarFrontIcon size={20} className="mb-2 sm:mb-2" />
                            <span className="font-medium text-sm sm:text-base">Inserir manualmente</span>
                            <span className="text-xs text-muted-foreground mt-1 sm:mt-2 text-center">
                                Adicione um veículo por vez
                            </span>
                        </Button>
                        <Button
                            onClick={() => setMode("upload")}
                            variant="outline"
                            className="flex flex-col items-center justify-center h-24 sm:h-32 p-4 sm:p-6 hover:bg-accent"
                        >
                            <FileUpIcon size={20} className="mb-2 sm:mb-2" />
                            <span className="font-medium text-sm sm:text-base">Upload CSV</span>
                            <span className="text-xs text-muted-foreground mt-1 sm:mt-2 px-2 sm:px-4 text-center">
                                Importe múltiplos veículos
                            </span>
                        </Button>
                    </div>
                )}

                {mode === "manual" && (
                    <div className="px-0 py-2">
                        <VehicleFormDialog onVehicleAdded={onVehicleAdded} onCloseDialog={() => setOpen(false)} />
                    </div>
                )}

                {mode === "upload" && (
                    <div className="mt-4">
                        <UploadCSVVehicle />
                    </div>
                )}

                {mode === "initial" && (
                    <DialogFooter className="pt-4">
                        <DialogClose asChild>
                            <Button variant="ghost" className="w-full sm:w-auto">Cancelar</Button>
                        </DialogClose>
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    );
}