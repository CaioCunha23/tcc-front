import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";
import { FileUpIcon, SendIcon, XIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface UploadCSVInfractionProps {
    onUploadSuccess?: () => void;
}

export default function UploadCSVInfraction({ onUploadSuccess }: UploadCSVInfractionProps) {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadError, setUploadError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const file = e.target.files[0];
            setSelectedFile(file);
            setUploadError(null);
        }
    };

    const handleUpload = async () => {
        if (!selectedFile) {
            alert("Selecione um arquivo CSV antes de enviar.");
            return;
        }

        setIsUploading(true);
        setUploadError(null);

        const formData = new FormData();
        formData.append("infractionsUpload", selectedFile);

        try {
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/infracoes/import`, {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Falha no upload do arquivo.");
            }

            toast.success(`Arquivo carregado com sucesso! (às ${new Date().toLocaleTimeString()})`);

            if (onUploadSuccess) onUploadSuccess();

        } catch (error: any) {
            setUploadError(error.message);
            toast.error(
                error instanceof Error ? error.message : "Erro ao submeter arquivo."
            );
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="flex flex-col gap-6 p-2">
            <div className="border-2 border-dashed border-border rounded-lg p-8 text-center flex flex-col items-center justify-center gap-4 bg-muted/30 hover:bg-muted/50 transition-colors">
                <div className="p-4 rounded-full bg-primary/10">
                    <FileUpIcon className="h-8 w-8 text-primary" />
                </div>

                <div className="flex flex-col gap-1">
                    <label
                        htmlFor="upload-csv-infraction"
                        className={cn(
                            "cursor-pointer font-medium text-primary hover:text-primary/90 transition-colors",
                            selectedFile && "text-foreground hover:text-foreground/90"
                        )}
                    >
                        {selectedFile ? selectedFile.name : "Clique para selecionar um arquivo CSV de infrações"}
                    </label>
                    <p className="text-xs text-muted-foreground">
                        {selectedFile
                            ? `Tamanho: ${(selectedFile.size / 1024).toFixed(2)} KB`
                            : "Formatos aceitos: CSV com infrações"}
                    </p>
                </div>

                <input
                    id="upload-csv-infraction"
                    type="file"
                    accept=".csv"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>

            {uploadError && (
                <div className="bg-destructive/10 border border-destructive/30 text-destructive rounded-md p-3 text-sm flex items-start gap-2">
                    <XIcon className="h-5 w-5 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                        <p className="font-medium">Erro no upload:</p>
                        <p>{uploadError}</p>
                        <p className="mt-2 text-xs">Verifique o console do navegador para mais detalhes.</p>
                    </div>
                </div>
            )}

            <div className="flex gap-3 justify-end">
                <DialogClose asChild>
                    <Button variant="outline" className="px-4">
                        Cancelar
                    </Button>
                </DialogClose>

                <Button
                    onClick={handleUpload}
                    disabled={isUploading || !selectedFile}
                    className="flex items-center gap-2"
                >
                    <SendIcon size={16} className={isUploading ? "animate-pulse" : ""} />
                    {isUploading ? "Enviando..." : "Enviar"}
                </Button>
            </div>
        </div>
    );
}