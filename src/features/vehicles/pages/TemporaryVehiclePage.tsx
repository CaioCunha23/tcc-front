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

  // Primeiro useEffect: validar e decodificar QR Code
  useEffect(() => {
    if (!dataParam) {
      toast.error("QR Code inválido ou faltando parâmetro 'data'.");
      navigate("/");
      return;
    }

    try {
      const payload: QRPayload = JSON.parse(decodeURIComponent(dataParam));
      const requiredFields = ['placa', 'modelo', 'renavam', 'chassi', 'status'];
      const missingFields = requiredFields.filter(field => !payload[field as keyof QRPayload]);

      if (missingFields.length > 0) {
        throw new Error(`Campos obrigatórios faltando: ${missingFields.join(', ')}`);
      }

      setVeiculoInfo(payload);
    } catch (error) {
      console.error('Erro ao decodificar QR:', error);
      toast.error("Não foi possível decodificar os dados do QR Code.");
      navigate("/");
    }
  }, [dataParam, navigate]);

  // Segundo useEffect: verificar autenticação quando veículoInfo estiver disponível
  useEffect(() => {
    if (!veiculoInfo || processingState !== 'idle') return;

    // Se não tem token e não tem UID validado, pedir UID
    if (!token && !validatedUid) {
      setUidDialogOpen(true);
      return;
    }

    // Se chegou aqui, está autenticado (por token ou UID validado)
    setShouldProcessVehicle(true);
  }, [veiculoInfo, token, validatedUid, processingState]);

  // Terceiro useEffect: processar veículo apenas quando autorizado
  useEffect(() => {
    if (!shouldProcessVehicle || !veiculoInfo) return;

    const processVehicleUse = async () => {
      setProcessingState('starting');
      setMainDialogOpen(true);

      // DEBUG: Log dos dados que serão enviados
      const requestBody = {
        placa: veiculoInfo.placa,
        modelo: veiculoInfo.modelo,
        renavam: veiculoInfo.renavam,
        chassi: veiculoInfo.chassi,
        status: veiculoInfo.status,
        ...(token ? {} : { colaboradorUid: validatedUid }),
      };

      console.log('=== DEBUG FRONTEND ===');
      console.log('Token existe:', !!token);
      console.log('ValidatedUid:', validatedUid);
      console.log('Request body que será enviado:', requestBody);
      console.log('Headers que serão enviados:', {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      });
      console.log('=====================');

      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/historico-utilizacao/iniciar`,
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

        console.log('=== RESPOSTA DO BACKEND ===');
        console.log('Status:', response.status);
        console.log('Resposta:', result);
        console.log('===========================');

        if (response.status === 201) {
          toast.success("Início de uso registrado com sucesso!");
          setHasActiveUse(true);
          setProcessingState('completed');
        } else if (response.status === 409) {
          if (result.action === 'finish') {
            await finalizarUso();
          } else {
            toast.error(result.error || "Veículo já está em uso por outro colaborador.");
            setProcessingState('completed');
          }
        } else {
          toast.error(result.error || "Erro ao iniciar uso do veículo.");
          setProcessingState('completed');
        }
      } catch (error) {
        console.error("Erro ao processar uso:", error);
        toast.error("Falha de comunicação com o servidor.");
        setProcessingState('completed');
      }
    };

    processVehicleUse();
    setShouldProcessVehicle(false); // Evitar reprocessamento
  }, [shouldProcessVehicle, veiculoInfo, token, validatedUid]);

  const finalizarUso = async () => {
    if (!veiculoInfo) return;

    setProcessingState('finishing');

    // DEBUG: Log dos dados que serão enviados
    const requestBody = {
      placa: veiculoInfo.placa,
      ...(token ? {} : { colaboradorUid: validatedUid }),
    };

    console.log('=== DEBUG FINALIZAR USO ===');
    console.log('Token existe:', !!token);
    console.log('ValidatedUid:', validatedUid);
    console.log('Request body finalizar:', requestBody);
    console.log('===========================');

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
        setProcessingState('idle'); // Volta para idle para permitir o processamento
        toast.success("UID validado. Processando uso do veículo...");
      } else if (response.status === 404) {
        toast.error("Colaborador não encontrado.");
        setProcessingState('idle'); // Volta para idle para permitir nova tentativa
      } else {
        const error = await response.json();
        toast.error(error.error || "Erro ao validar UID.");
        setProcessingState('idle'); // Volta para idle para permitir nova tentativa
      }
    } catch (error) {
      console.error("Erro na validação:", error);
      toast.error("Falha de comunicação ao validar UID.");
      setProcessingState('idle'); // Volta para idle para permitir nova tentativa
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
        <DialogContent className="max-w-sm">
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