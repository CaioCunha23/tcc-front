import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useTokenStore } from "@/hooks/useTokenStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Car, Hash, FileText, Activity, User } from "lucide-react";
import {
  useValidateCollaborator,
  useStartVehicleUse,
  useFinishVehicleUse
} from "@/hooks/useVehicleOperations";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface QRPayload {
  placa: string;
  modelo: string;
  renavam: string;
  chassi: string;
  status: string;
}

type VehicleUseStatus = 'not_started' | 'in_use_by_user' | 'in_use_by_other' | 'finished';

export function TemporaryVehiclePage() {
  const navigate = useNavigate();
  const { token } = useTokenStore();
  const [searchParams] = useSearchParams();
  const dataParam = searchParams.get("data");
  const [veiculoInfo, setVeiculoInfo] = useState<QRPayload | null>(null);
  const [uidDialogOpen, setUidDialogOpen] = useState(false);
  const [uidInput, setUidInput] = useState("");
  const [validatedUid, setValidatedUid] = useState<string | null>(null);
  const [vehicleUseStatus, setVehicleUseStatus] = useState<VehicleUseStatus>('not_started');
  const validateCollaborator = useValidateCollaborator();
  const startVehicleUse = useStartVehicleUse(token);
  const finishVehicleUse = useFinishVehicleUse(token);

  useEffect(() => {
    if (!dataParam) {
      toast.error("QR Code inválido ou faltando parâmetro 'data'.");
      navigate("/");
      return;
    }

    try {
      const decoded = decodeURIComponent(dataParam);
      const payload = JSON.parse(decoded);
      const requiredFields = ['placa', 'modelo', 'renavam', 'chassi', 'status'];
      const missingFields = requiredFields.filter(field => !payload[field]);

      if (missingFields.length > 0) {
        throw new Error(`Campos obrigatórios faltando: ${missingFields.join(', ')}`);
      }

      setVeiculoInfo(payload);

      if (!token) {
        setUidDialogOpen(true);
      } else {
        processVehicleUse(payload);
      }

    } catch (error) {
      toast.error("Não foi possível decodificar os dados do QR Code.");
      navigate("/");
    }
  }, [dataParam, navigate, token]);

  const processVehicleUse = useCallback((vehicleData: QRPayload, uid?: string) => {
    const payload = {
      placa: vehicleData.placa,
      modelo: vehicleData.modelo,
      renavam: vehicleData.renavam,
      chassi: vehicleData.chassi,
      status: vehicleData.status,
      ...(uid ? { colaboradorUid: uid } : {})
    };

    startVehicleUse.mutate(payload, {
      onSuccess: (result) => {
        if (result.status === 201 || (result.status === 409 && result.data.action === "finish")) {
          setVehicleUseStatus('in_use_by_user');
          toast.success("Uso iniciado com sucesso.");
        } else if (result.status === 409) {
          setVehicleUseStatus('in_use_by_other');
        }
      },
      onError: () => {
        toast.error("Erro ao iniciar o uso do veículo.");
      }
    });
  }, [startVehicleUse]);

  const handleConfirmUid = useCallback(() => {
    const uid = uidInput.trim();
    if (!uid) {
      toast.error("UID é obrigatório.");
      return;
    }

    validateCollaborator.mutate(uid, {
      onSuccess: () => {
        setValidatedUid(uid);
        setUidDialogOpen(false);

        if (veiculoInfo) {
          processVehicleUse(veiculoInfo, uid);
        }
      },
      onError: () => {
        toast.error("UID inválido.");
      }
    });
  }, [uidInput, validateCollaborator, veiculoInfo, processVehicleUse]);

  const handleFinishUse = useCallback(() => {
    if (!veiculoInfo) return;

    const payload = {
      placa: veiculoInfo.placa,
      ...(validatedUid ? { colaboradorUid: validatedUid } : {})
    };

    finishVehicleUse.mutate(payload, {
      onSuccess: () => {
        setVehicleUseStatus('finished');
        toast.success("Uso finalizado com sucesso.");
      },
      onError: () => {
        toast.error("Erro ao finalizar o uso do veículo.");
      }
    });
  }, [veiculoInfo, validatedUid, finishVehicleUse]);

  const isValidatingUid = validateCollaborator.isPending;
  const isProcessingVehicle = startVehicleUse.isPending;
  const isFinishingUse = finishVehicleUse.isPending;

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

      {/* Ações de uso */}
      {isProcessingVehicle && (
        <div className="flex items-center justify-center">
          <Loader2 className="w-6 h-6 animate-spin" />
          <span className="ml-2">Processando solicitação...</span>
        </div>
      )}

      {vehicleUseStatus === 'in_use_by_user' && (
        <div className="mt-4 flex justify-center">
          <Button onClick={handleFinishUse} disabled={isFinishingUse}>
            {isFinishingUse && <Loader2 className="w-4 h-4 animate-spin mr-2" />}
            Finalizar Uso
          </Button>
        </div>
      )}

      {vehicleUseStatus === 'in_use_by_other' && (
        <p className="text-red-500 text-center mt-4">Veículo já está em uso por outro colaborador.</p>
      )}

      {vehicleUseStatus === 'finished' && (
        <p className="text-green-500 text-center mt-4">Uso finalizado com sucesso!</p>
      )}

      {/* Dialog para UID */}
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
              disabled={isValidatingUid}
            />
          </div>

          <DialogFooter>
            <Button
              onClick={handleConfirmUid}
              disabled={isValidatingUid || !uidInput.trim()}
              className="w-full"
            >
              {isValidatingUid ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Validando...
                </>
              ) : (
                "Confirmar"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
