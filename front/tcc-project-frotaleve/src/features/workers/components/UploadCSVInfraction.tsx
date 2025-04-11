import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DialogClose } from "@/components/ui/dialog";

export default function UploadCSVInfraction() {
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
            const response = await fetch("http://localhost:3000/infracoes/import", {
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
            <label
                htmlFor="upload-csv"
                className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
                {selectedFile ? selectedFile.name : "Clique para selecionar um arquivo CSV"}
            </label>
            <input
                id="upload-csv"
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="hidden"
            />

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