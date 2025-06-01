import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useTokenStore } from "@/hooks/useTokenStore";

interface QRPayload {
  placa: string;
  modelo: string;
  renavam: string;
  chassi: string;
  status: string;
}

export function TemporaryVehiclePage() {
  const navigate = useNavigate();
  const { token } = useTokenStore();
  const [searchParams] = useSearchParams();
  const dataParam = searchParams.get("data");
  const [veiculoInfo, setVeiculoInfo] = useState<QRPayload | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [hasActiveUse, setHasActiveUse] = useState<boolean | null>(null);
  const [uidDialogOpen, setUidDialogOpen] = useState(false);
  const [uidInput, setUidInput] = useState("");
  const [validatedUid, setValidatedUid] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (!dataParam) {
      toast.error("QR Code inválido ou faltando parâmetro “data”.");
      navigate("/");
      return;
    }
    try {
      const payload: QRPayload = JSON.parse(decodeURIComponent(dataParam));
      if (
        payload.placa &&
        payload.modelo &&
        payload.renavam &&
        payload.chassi &&
        payload.status
      ) {
        setVeiculoInfo(payload);
      } else {
        throw new Error("Campos faltando");
      }
    } catch {
      toast.error("Não foi possível decodificar os dados do QR Code.");
      navigate("/");
    }
  }, [dataParam]);

  useEffect(() => {
    if (!veiculoInfo || isProcessing) return;

    const processar = async () => {
      setIsProcessing(true);

      const iniciarUso = async (uidToUse: string) => {
        try {
          const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/historico-utilizacao/iniciar`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
              },
              body: JSON.stringify({
                placa: veiculoInfo.placa,
                modelo: veiculoInfo.modelo,
                renavam: veiculoInfo.renavam,
                chassi: veiculoInfo.chassi,
                status: veiculoInfo.status,
                ...(token ? {} : { uidMSK: uidToUse }),
              }),
            }
          );

          if (res.status === 201) {
            toast.success("Início de uso registrado com sucesso!");
            setHasActiveUse(true);
          } else if (res.status === 409) {
            await finalizarUso(uidToUse);
          } else {
            const erro = await res.json();
            toast.error(erro.error || "Erro ao iniciar uso.");
          }
        } catch (err) {
          console.error(err);
          toast.error("Falha de comunicação com o servidor.");
        }
      };

      const finalizarUso = async (uidToUse: string) => {
        try {
          const res = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/historico-utilizacao/finalizar`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
              },
              body: JSON.stringify({
                placa: veiculoInfo.placa,
                ...(token ? {} : { uidMSK: uidToUse }),
              }),
            }
          );

          if (res.status === 200) {
            toast.success("Uso finalizado com sucesso!");
            setHasActiveUse(false);
          } else {
            const erro = await res.json();
            toast.error(erro.error || "Erro ao finalizar uso.");
          }
        } catch (err) {
          console.error(err);
          toast.error("Falha de comunicação com o servidor.");
        }
      };

      if (token) {
        await iniciarUso("");
      } else {
        if (validatedUid) {
          await iniciarUso(validatedUid);
        } else {
          setUidDialogOpen(true);
          setIsProcessing(false);
          return;
        }
      }

      setIsProcessing(false);
      setModalOpen(true);
    };

    processar();
  }, [veiculoInfo, token, validatedUid]);

  const handleConfirmUid = useCallback(async () => {
    const uid = uidInput.trim();
    if (!uid) {
      toast.error("UID é obrigatório.");
      return;
    }
    setIsProcessing(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/colaborador/${uid}`
      );
      if (res.status === 200) {
        setValidatedUid(uid);
        setUidDialogOpen(false);
        toast.success("UID validado. Prosseguindo...");
      } else if (res.status === 404) {
        toast.error("Colaborador não encontrado.");
      } else {
        const err = await res.json();
        toast.error(err.error || "Erro ao validar UID.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Falha de comunicação ao validar UID.");
    } finally {
      setIsProcessing(false);
    }
  }, [uidInput]);

  const handleManualFinish = useCallback(async () => {
    if (!veiculoInfo) return;
    setIsProcessing(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/historico-utilizacao/finalizar`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({
            placa: veiculoInfo.placa,
            ...(token ? {} : { uidMSK: validatedUid }),
          }),
        }
      );

      if (res.status === 200) {
        toast.success("Uso finalizado com sucesso!");
        setHasActiveUse(false);
      } else {
        const erro = await res.json();
        toast.error(erro.error || "Erro ao finalizar uso.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Falha de comunicação com o servidor.");
    } finally {
      setIsProcessing(false);
    }
  }, [veiculoInfo, token, validatedUid]);

  const handleScanAnother = useCallback(() => {
    setModalOpen(false);
    navigate("/");
  }, [navigate]);

  if (!veiculoInfo) {
    return null;
  }

  return (
    <div className="flex flex-col items-center p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Uso Temporário de Veículo</h1>

      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {isProcessing
                ? "Aguarde..."
                : hasActiveUse === null
                  ? "Processando..."
                  : hasActiveUse
                    ? "Veículo em Uso"
                    : "Uso Finalizado"}
            </DialogTitle>
            <DialogDescription>
              {isProcessing
                ? "Estamos registrando sua solicitação..."
                : hasActiveUse === null
                  ? ""
                  : hasActiveUse
                    ? "Uso iniciado! Para finalizar, escaneie o mesmo QR novamente ou clique em “Finalizar Uso”."
                    : "Uso finalizado! Caso queira, pode escanear outro QR."}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-2 mt-4">
            <p>
              <strong>Placa:</strong> {veiculoInfo.placa}
            </p>
            <p>
              <strong>Modelo:</strong> {veiculoInfo.modelo}
            </p>
            <p>
              <strong>Renavam:</strong> {veiculoInfo.renavam}
            </p>
            <p>
              <strong>Chassi:</strong> {veiculoInfo.chassi}
            </p>
            <p>
              <strong>Status:</strong> {veiculoInfo.status}
            </p>
          </div>

          <DialogFooter className="mt-6 flex justify-between">
            {!isProcessing && hasActiveUse !== null && (
              <Button variant="outline" onClick={handleScanAnother}>
                Escanear outro QR
              </Button>
            )}
            {!isProcessing && hasActiveUse && (
              <Button onClick={handleManualFinish}>Finalizar Uso</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={uidDialogOpen} onOpenChange={setUidDialogOpen}>
        <DialogContent className="max-w-xs">
          <DialogHeader>
            <DialogTitle>Informe seu UID</DialogTitle>
            <DialogDescription>
              Você não está logado. Para prosseguir, digite seu UIDMSK:
            </DialogDescription>
          </DialogHeader>
          <div className="mt-2">
            <Input
              placeholder="UIDMSK"
              value={uidInput}
              onChange={(e) => setUidInput(e.target.value)}
            />
          </div>
          <DialogFooter className="mt-4">
            <Button
              onClick={handleConfirmUid}
              disabled={isProcessing || !uidInput.trim()}
            >
              {isProcessing ? "Validando..." : "Confirmar UID"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}