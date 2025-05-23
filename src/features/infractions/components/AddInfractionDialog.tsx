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
                <Button className="flex items-center gap-2">
                    <FileWarning size={16} />
                    <span>Adicionar Infração</span>
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                        {mode === "initial" ? "Adicionar Infração" : (
                            <div className="flex items-center">
                                <Button variant="ghost" size="sm" className="mr-2 p-0 h-auto" onClick={handleBack}>
                                    <ArrowLeftIcon size={16} />
                                </Button>
                                {mode === "manual" ? "Inserir Infração Manualmente" : "Upload de Infrações via CSV"}
                            </div>
                        )}
                    </DialogTitle>

                    {mode === "initial" && (
                        <DialogDescription className="text-sm mt-2">
                            Escolha uma forma de cadastrar a infração:
                        </DialogDescription>
                    )}
                </DialogHeader>

                {mode === "initial" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-6">
                        <Button
                            onClick={() => setMode("manual")}
                            variant="outline"
                            className="flex flex-col items-center justify-center h-32 p-6 hover:bg-accent"
                        >
                            <FileWarning size={24} className="mb-2" />
                            <span className="font-medium">Inserir manualmente</span>
                            <span className="text-xs text-muted-foreground mt-2">Adicione uma infração por vez</span>
                        </Button>

                        <Button
                            onClick={() => setMode("upload")}
                            variant="outline"
                            className="flex flex-col items-center justify-center h-32 p-6 hover:bg-accent"
                        >
                            <FileUpIcon size={24} className="mb-2" />
                            <span className="font-medium">Upload CSV</span>
                            <span className="text-xs text-muted-foreground mt-2 px-4">Importe múltiplas infrações</span>
                        </Button>
                    </div>
                )}

                {mode === "manual" && (
                    <div className="py-4">
                        <InfractionFormDialog
                            onInfractionAdded={onInfractionAdded}
                            onCloseDialog={() => setOpen(false)}
                        />
                    </div>
                )}

                {mode === "upload" && (
                    <div className="mt-4">
                        <UploadCSVInfraction
                            onUploadSuccess={() => {
                                onInfractionAdded();
                                setOpen(false);
                            }}
                        />
                    </div>
                )}

                {mode !== "initial" ? (
                    <DialogFooter className="mt-6 flex justify-between items-center">
                        <Button variant="ghost" size="sm" onClick={handleBack}>
                            Voltar
                        </Button>
                        <DialogClose asChild>
                            <Button variant="ghost">Cancelar</Button>
                        </DialogClose>
                    </DialogFooter>
                ) : (
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="ghost">Cancelar</Button>
                        </DialogClose>
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    );
}