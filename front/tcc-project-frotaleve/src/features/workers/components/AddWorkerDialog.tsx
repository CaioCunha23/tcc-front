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
import { WorkerFormPage } from "../pages/WorkerFormPage";

function UploadCSVContent() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);
    const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            setSelectedFile(e.target.files[0]);
            setUploadError(null);
            setUploadSuccess(null);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Selecione um arquivo CSV antes de enviar.");
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append("file", selectedFile);

        try {
            const response = await fetch("http://localhost:3000/colaboradores/import", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.error || "Falha no upload do arquivo.");
            }
            setUploadSuccess("Arquivo carregado com sucesso!");
        } catch (error: any) {
            setUploadError(error.message);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <label className="block">
                Selecione um arquivo CSV:
                <input type="file" accept=".csv" onChange={handleFileChange} className="mt-2" />
            </label>
            {uploadError && <p className="text-red-500">{uploadError}</p>}
            {uploadSuccess && <p className="text-green-500">{uploadSuccess}</p>}
            <div className="flex gap-2">
                <Button onClick={handleUpload} disabled={isUploading}>
                    {isUploading ? "Enviando..." : "Enviar"}
                </Button>
                <DialogClose asChild>
                    <Button variant="outline">Fechar</Button>
                </DialogClose>
            </div>
        </div>
    );
}

function AddWorkerDialog() {
    const [mode, setMode] = useState<"initial" | "manual" | "upload">("initial");

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button>Adicionar</Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Adicionar Colaborador</DialogTitle>
                    <DialogDescription>
                        Escolha uma forma de cadastrar o colaborador:
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
                        <WorkerFormPage />
                    </div>
                )}

                {mode === "upload" && (
                    <div className="mt-4">
                        <UploadCSVContent />
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

export default AddWorkerDialog;