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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Car, User, Hash, FileText, Activity } from "lucide-react";

interface QRPayload {
  placa: string;
  modelo: string;
  renavam: string;
  chassi: string;
  status: string;
}

type ProcessingState = 'idle' | 'validating' | 'starting' | 'finishing' | 'completed';

export function TemporaryVehiclePage() {
  const navigate = useNavigate();
  const { token } = useTokenStore();
  const [searchParams] = useSearchParams();
  const dataParam = searchParams.get("data");
  const [veiculoInfo, setVeiculoInfo] = useState<QRPayload | null>(null);
  const [processingState, setProcessingState] = useState<ProcessingState>('idle');
  const [hasActiveUse, setHasActiveUse] = useState<boolean | null>(null);
  const [uidDialogOpen, setUidDialogOpen] = useState(false);
  const [uidInput, setUidInput] = useState("");
  const [validatedUid, setValidatedUid] = useState<string | null>(null);
  const [mainDialogOpen, setMainDialogOpen] = useState(false);
  const [shouldProcessVehicle, setShouldProcessVehicle] = useState(false);

  useEffect(() => {
    if (!dataParam) {
      toast.error("QR Code inválido ou faltando parâmetro 'data'.");
      navigate("/");
      return;
    }

    try {
      const decoded = decodeURIComponent(dataParam);
      const payload: QRPayload = JSON.parse(decoded);
      const requiredFields = ["placa", "modelo", "renavam", "chassi", "status"];
      const missingFields = requiredFields.filter((f) => !(payload as any)[f]);

      if (missingFields.length > 0) {
        throw new Error(`Campos obrigatórios faltando: ${missingFields.join(", ")}`);
      }

      setVeiculoInfo(payload);
    } catch (error) {
      toast.error("Não foi possível decodificar os dados do QR Code.");
      navigate("/");
    }
  }, [dataParam, navigate]);

  useEffect(() => {
    if (!veiculoInfo || processingState !== "idle") {
      console.log("Saindo early - veiculoInfo ou processingState");
      return;
    }

    if (!token && !validatedUid) {
      console.log("🔍 Não tem token nem validatedUid - abrindo diálogo para UID");
      setUidDialogOpen(true);
      return;
    }

    setShouldProcessVehicle(true);
  }, [veiculoInfo, token, validatedUid, processingState]);

  useEffect(() => {
    if (!shouldProcessVehicle || !veiculoInfo) {
      console.log("Saindo early - shouldProcessVehicle ou veiculoInfo");
      return;
    }
    if (uidDialogOpen) {
      console.log("UID dialog está aberto - não processando ainda");
      return;
    }

    const processVehicleUse = async () => {
      setProcessingState("starting");
      setMainDialogOpen(true);

      const commonHeaders: Record<string, string> = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      };

      try {
        // 3.1) Tenta iniciar o uso
        const bodyStart = {
          placa: veiculoInfo.placa,
          modelo: veiculoInfo.modelo,
          renavam: veiculoInfo.renavam,
          chassi: veiculoInfo.chassi,
          status: veiculoInfo.status,
          ...(token ? {} : { colaboradorUid: validatedUid }),
        };
        const resStart = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/historico-utilizacao/iniciar`,
          {
            method: "POST",
            headers: commonHeaders,
            body: JSON.stringify(bodyStart),
          }
        );
        const jsonStart = await resStart.json();

        if (resStart.status === 201) {
          // → Não havia uso ativo: backend criou o registro e virou “Em Uso”
          toast.success("Uso iniciado com sucesso!");
          // (Opcional) setHasActiveUse(true);
        }
        else if (resStart.status === 409 && jsonStart.action === "finish") {
          // → Já havia uso ativo (dataFim = null). Então devemos finalizar agora:
          const bodyFinish = {
            placa: veiculoInfo.placa,
            ...(token ? {} : { colaboradorUid: validatedUid }),
          };
          const resFinish = await fetch(
            `${import.meta.env.VITE_BACKEND_URL}/historico-utilizacao/finalizar`,
            {
              method: "POST",
              headers: commonHeaders,
              body: JSON.stringify(bodyFinish),
            }
          );
          const jsonFinish = await resFinish.json();

          if (resFinish.status === 200) {
            toast.success("Uso finalizado com sucesso!");
            // (Opcional) setHasActiveUse(false);
          } else {
            throw new Error(jsonFinish.error || "Erro ao finalizar uso");
          }
        }
        else {
          // Qualquer outro erro ao iniciar
          throw new Error(jsonStart.error || "Erro ao iniciar uso");
        }
      } catch (err: any) {
        console.error("Erro no processamento de uso:", err);
        toast.error(err.message || "Falha ao processar uso do veículo.");
      } finally {
        setProcessingState("completed");
      }
    };

    processVehicleUse();
    setShouldProcessVehicle(false);
  }, [
    shouldProcessVehicle,
    veiculoInfo,
    token,
    validatedUid,
    uidDialogOpen,
  ]);

  const finalizarUso = async () => {
    if (!veiculoInfo) return;

    setProcessingState('finishing');

    const requestBody = {
      placa: veiculoInfo.placa,
      ...(token ? {} : { colaboradorUid: validatedUid }),
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/historico-utilizacao/finalizar`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(requestBody),
        }
      );

      const result = await response.json();

      if (response.status === 200) {
        toast.success("Uso finalizado com sucesso!");
        setHasActiveUse(false);
        setProcessingState('completed');
      } else {
        toast.error(result.error || "Erro ao finalizar uso do veículo.");
        setProcessingState('completed');
      }
    } catch (error) {
      console.error("Erro ao finalizar uso:", error);
      toast.error("Falha de comunicação com o servidor.");
      setProcessingState('completed');
    }
  };

  const handleConfirmUid = useCallback(async () => {
    const uid = uidInput.trim();
    if (!uid) {
      toast.error("UID é obrigatório.");
      return;
    }

    setProcessingState('validating');

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/colaborador/${uid}`
      );

      if (response.status === 200) {
        setValidatedUid(uid);
        setUidDialogOpen(false);
        setProcessingState('idle');
        toast.success("UID validado. Processando uso do veículo...");
      } else if (response.status === 404) {
        toast.error("Colaborador não encontrado.");
        setProcessingState('idle');
      } else {
        const error = await response.json();
        toast.error(error.error || "Erro ao validar UID.");
        setProcessingState('idle');
      }
    } catch (error) {
      console.error("Erro na validação:", error);
      toast.error("Falha de comunicação ao validar UID.");
      setProcessingState('idle');
    }
  }, [uidInput]);

  const handleScanAnother = useCallback(() => {
    setMainDialogOpen(false);
    navigate("/");
  }, [navigate]);

  const getDialogTitle = () => {
    switch (processingState) {
      case 'validating':
        return "Validando usuário...";
      case 'starting':
        return "Iniciando uso...";
      case 'finishing':
        return "Finalizando uso...";
      case 'completed':
        return hasActiveUse === null
          ? "Processado"
          : hasActiveUse
            ? "Veículo em Uso"
            : "Uso Finalizado";
      default:
        return "Processando...";
    }
  };

  const getDialogDescription = () => {
    switch (processingState) {
      case 'validating':
        return "Verificando se o usuário existe no sistema...";
      case 'starting':
        return "Registrando início do uso do veículo...";
      case 'finishing':
        return "Registrando finalização do uso do veículo...";
      case 'completed':
        if (hasActiveUse === null) return "Processo concluído.";
        return hasActiveUse
          ? "Uso iniciado! Para finalizar, escaneie o mesmo QR novamente ou clique em 'Finalizar Uso'."
          : "Uso finalizado! Você pode escanear outro QR Code.";
      default:
        return "Aguarde enquanto processamos sua solicitação...";
    }
  };

  const isProcessing = ['validating', 'starting', 'finishing'].includes(processingState);

  if (!veiculoInfo) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">Uso Temporário de Veículo</h1>
        <p className="text-muted-foreground">
          Escaneou o QR Code do veículo? Vamos processar seu uso!
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="w-5 h-5" />
            Informações do Veículo
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">Placa:</span>
              <span>{veiculoInfo.placa}</span>
            </div>
            <div className="flex items-center gap-2">
              <Car className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">Modelo:</span>
              <span>{veiculoInfo.modelo}</span>
            </div>
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">Renavam:</span>
              <span>{veiculoInfo.renavam}</span>
            </div>
            <div className="flex items-center gap-2">
              <Hash className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">Chassi:</span>
              <span className="font-mono text-sm">{veiculoInfo.chassi}</span>
            </div>
            <div className="flex items-center gap-2 md:col-span-2">
              <Activity className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">Status:</span>
              <span className="px-2 py-1 bg-secondary rounded-md text-sm">
                {veiculoInfo.status}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={mainDialogOpen} onOpenChange={setMainDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {isProcessing && <Loader2 className="w-4 h-4 animate-spin" />}
              {getDialogTitle()}
            </DialogTitle>
            <DialogDescription>
              {getDialogDescription()}
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            {processingState === 'completed' && (
              <>
                <Button variant="outline" onClick={handleScanAnother}>
                  Escanear outro QR
                </Button>
                {hasActiveUse && (
                  <Button onClick={finalizarUso}>
                    Finalizar Uso
                  </Button>
                )}
              </>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={uidDialogOpen} onOpenChange={setUidDialogOpen}>
        <DialogContent className="max-w-sm mx-4 top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] fixed">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Informe seu UID
            </DialogTitle>
            <DialogDescription>
              Você não está logado. Para prosseguir, digite seu UIDMSK:
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              placeholder="Digite seu UIDMSK"
              value={uidInput}
              onChange={(e) => setUidInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleConfirmUid()}
              className="w-full"
            />
          </div>

          <DialogFooter>
            <Button
              onClick={handleConfirmUid}
              disabled={isProcessing || !uidInput.trim()}
              className="w-full"
            >
              {processingState === 'validating' && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
              {processingState === 'validating' ? "Validando..." : "Confirmar UID"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}