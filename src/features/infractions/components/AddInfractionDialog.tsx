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
    DialogFooter,
} from "@/components/ui/dialog";
import { InfractionFormDialog } from "./InfractionFormDialog";
import UploadCSVInfraction from "./UploadCSVInfraction";
import { FileUpIcon, FileWarning, ArrowLeftIcon } from "lucide-react";

interface AddInfractionDialogProps {
    onInfractionAdded: () => void;
}

export default function AddInfractionDialog({ onInfractionAdded }: AddInfractionDialogProps) {
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
                    <FileWarning className="h-4 w-4" />
                    <span className="hidden sm:inline">Adicionar Infração</span>
                    <span className="sm:hidden">Adicionar</span>
                </Button>
            </DialogTrigger>

            <DialogContent className="w-[95vw] max-w-2xl max-h-[90vh] overflow-y-auto p-4 md:p-6">
                <DialogHeader className="pb-4">
                    <DialogTitle className="text-lg md:text-xl font-semibold flex items-center">
                        {mode === "initial" ? "Adicionar Infração" : (
                            <div className="flex items-center w-full">
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    className="mr-2 p-1 h-auto hover:bg-accent"
                                    onClick={handleBack}
                                >
                                    <ArrowLeftIcon className="h-4 w-4" />
                                </Button>
                                <span className="text-sm md:text-lg">
                                    {mode === "manual" ? "Inserir Infração Manualmente" : "Upload de Infrações via CSV"}
                                </span>
                            </div>
                        )}
                    </DialogTitle>

                    {mode === "initial" && (
                        <DialogDescription className="text-sm text-muted-foreground">
                            Escolha uma forma de cadastrar a infração:
                        </DialogDescription>
                    )}
                </DialogHeader>

                {mode === "initial" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 py-4">
                        <Button
                            onClick={() => setMode("manual")}
                            variant="outline"
                            className="flex flex-col items-center justify-center h-24 md:h-32 p-4 md:p-6 hover:bg-accent border-2 hover:border-primary/50 transition-all"
                        >
                            <FileWarning className="h-6 w-6 md:h-8 md:w-8 mb-2 text-primary" />
                            <span className="font-medium text-sm md:text-base">Inserir manualmente</span>
                            <span className="text-xs text-muted-foreground mt-1 text-center">Adicione uma infração por vez</span>
                        </Button>

                        <Button
                            onClick={() => setMode("upload")}
                            variant="outline"
                            className="flex flex-col items-center justify-center h-24 md:h-32 p-4 md:p-6 hover:bg-accent border-2 hover:border-primary/50 transition-all"
                        >
                            <FileUpIcon className="h-6 w-6 md:h-8 md:w-8 mb-2 text-primary" />
                            <span className="font-medium text-sm md:text-base">Upload CSV</span>
                            <span className="text-xs text-muted-foreground mt-1 text-center px-2">
                                Importe múltiplas infrações
                            </span>
                        </Button>
                    </div>
                )}

                {mode === "manual" && (
                    <div className="py-2">
                        <InfractionFormDialog
                            onInfractionAdded={onInfractionAdded}
                            onCloseDialog={() => setOpen(false)}
                        />
                    </div>
                )}

                {mode === "upload" && (
                    <div className="py-2">
                        <UploadCSVInfraction
                            onUploadSuccess={() => {
                                onInfractionAdded();
                                setOpen(false);
                            }}
                        />
                    </div>
                )}

                <DialogFooter className="flex-col-reverse sm:flex-row gap-2 pt-4">
                    {mode !== "initial" ? (
                        <>
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleBack}
                                className="w-full sm:w-auto"
                            >
                                Voltar
                            </Button>
                            <DialogClose asChild>
                                <Button variant="outline" className="w-full sm:w-auto">
                                    Cancelar
                                </Button>
                            </DialogClose>
                        </>
                    ) : (
                        <DialogClose asChild>
                            <Button variant="outline" className="w-full sm:w-auto">
                                Cancelar
                            </Button>
                        </DialogClose>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}