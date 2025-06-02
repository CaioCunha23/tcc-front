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

type ProcessingState = 'idle' | 'validating' | 'starting' | 'processing' | 'finishing' | 'completed';

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

  // CORREÇÃO 1: useEffect para decodificar QR (mantém como está)
  useEffect(() => {
    console.log("=== PRIMEIRO USEEFFECT (QR DECODE) ===");
    console.log("dataParam:", dataParam);
    console.log("dataParam existe:", !!dataParam);

    if (!dataParam) {
      toast.error("QR Code inválido ou faltando parâmetro 'data'.");
      navigate("/");
      return;
    }

    try {
      console.log("🔍 Tentando decodificar dataParam...");
      console.log("dataParam raw:", dataParam);
      
      const decoded = decodeURIComponent(dataParam);
      console.log("Depois do decodeURIComponent:", decoded);
      
      const payload = JSON.parse(decoded);
      console.log("Depois do JSON.parse:", payload);
      console.log("Tipo do payload:", typeof payload);
      
      const requiredFields = ['placa', 'modelo', 'renavam', 'chassi', 'status'];
      console.log("Campos obrigatórios:", requiredFields);
      
      const missingFields = requiredFields.filter(field => !payload[field]);
      console.log("Campos que faltam:", missingFields);

      if (missingFields.length > 0) {
        throw new Error(`Campos obrigatórios faltando: ${missingFields.join(', ')}`);
      }

      console.log("✅ Payload válido, definindo veiculoInfo");
      setVeiculoInfo(payload);
      console.log("veiculoInfo definido como:", payload);

    } catch (error) {
      console.error("❌ Erro ao decodificar QR:", error);
      toast.error("Não foi possível decodificar os dados do QR Code.");
      navigate("/");
    }
    console.log("=== FIM PRIMEIRO USEEFFECT ===");
  }, [dataParam, navigate]);

  // CORREÇÃO 2: useEffect para verificar se deve processar (CORRIGIDO)
  useEffect(() => {
    console.log("=== SEGUNDO USEEFFECT ===");
    console.log("veiculoInfo existe:", !!veiculoInfo);
    console.log("processingState:", processingState);
    console.log("token existe:", !!token);
    console.log("validatedUid:", validatedUid);
    console.log("shouldProcessVehicle:", shouldProcessVehicle);
    console.log("========================");

    // CORREÇÃO: Verifica se veiculoInfo é um objeto válido
    if (!veiculoInfo || typeof veiculoInfo !== 'object') {
      console.log("Saindo early - veiculoInfo inválido");
      return;
    }

    // CORREÇÃO: Só processa se estiver 'idle' E não estiver já processando
    if (processingState !== 'idle') {
      console.log("Saindo early - processingState não é idle:", processingState);
      return;
    }

    // CORREÇÃO: Evita reprocessamento se já foi processado
    if (shouldProcessVehicle) {
      console.log("Saindo early - já está marcado para processar");
      return;
    }

    // Se não tem token nem UID validado, abre dialog do UID
    if (!token && !validatedUid) {
      console.log("🔑 Sem autenticação - abrindo dialog UID");
      setUidDialogOpen(true);
      return;
    }

    // Se chegou aqui, pode processar
    console.log("✅ Usuário autenticado - processando veículo");
    setShouldProcessVehicle(true);
    
  }, [veiculoInfo, token, validatedUid, processingState, shouldProcessVehicle]);

  // CORREÇÃO 3: useEffect para executar processamento (CORRIGIDO)
  useEffect(() => {
    console.log("=== TERCEIRO USEEFFECT ===");
    console.log("shouldProcessVehicle:", shouldProcessVehicle);
    console.log("veiculoInfo existe:", !!veiculoInfo);
    console.log("uidDialogOpen:", uidDialogOpen);
    console.log("processingState:", processingState);
    console.log("=========================");

    // CORREÇÃO: Só executa se shouldProcessVehicle for true
    if (!shouldProcessVehicle) {
      console.log("Saindo early - shouldProcessVehicle é false");
      return;
    }

    // CORREÇÃO: Verifica se veiculoInfo é válido
    if (!veiculoInfo || typeof veiculoInfo !== 'object') {
      console.log("Saindo early - veiculoInfo inválido");
      return;
    }

    // Se o dialog UID estiver aberto, espera
    if (uidDialogOpen) {
      console.log("Saindo early - uidDialog está aberto");
      return;
    }

    // CORREÇÃO: Só executa uma vez
    if (processingState !== 'idle') {
      console.log("Saindo early - já está processando:", processingState);
      return;
    }

    console.log("🚀 Executando processamento do veículo...");
    
    const processVehicleUse = async () => {
      try {
        // Reset o flag ANTES de iniciar processamento
        setShouldProcessVehicle(false);
        setProcessingState('starting');
        setMainDialogOpen(true);

        // CORREÇÃO: Adicionar lógica de verificação de uso ativo
        console.log("🔍 Verificando uso ativo do veículo...");
        
        const requestBody = {
          placa: veiculoInfo.placa,
          ...(token ? {} : { colaboradorUid: validatedUid }),
        };

        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/historico-utilizacao/verificar-uso-ativo`,
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
          setHasActiveUse(result.hasActiveUse);
          setProcessingState('completed');
          console.log("✅ Verificação concluída - Uso ativo:", result.hasActiveUse);
        } else {
          toast.error(result.error || "Erro ao verificar uso do veículo.");
          setProcessingState('completed');
        }
        
      } catch (error) {
        console.error("❌ Erro no processamento:", error);
        toast.error("Falha de comunicação com o servidor.");
        setProcessingState('completed');
      }
    };

    processVehicleUse();
    
  }, [shouldProcessVehicle, veiculoInfo, uidDialogOpen, processingState, token, validatedUid]);

  // CORREÇÃO 4: Função para finalizar uso (mantém como está)
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

  // CORREÇÃO 5: Função de validação UID (CORRIGIDA)
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
        console.log("✅ UID validado com sucesso:", uid);
        setValidatedUid(uid);
        setUidDialogOpen(false);
        setProcessingState('idle'); // CORREÇÃO: Volta para idle para permitir processamento
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
    // CORREÇÃO: Reset completo do estado
    setMainDialogOpen(false);
    setVeiculoInfo(null);
    setHasActiveUse(null);
    setProcessingState('idle');
    setShouldProcessVehicle(false);
    navigate("/");
  }, [navigate]);

  const getDialogTitle = () => {
    switch (processingState) {
      case 'validating':
        return "Validando usuário...";
      case 'starting':
        return "Verificando veículo..."; // CORREÇÃO: Título mais específico
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
        return "Verificando se o veículo está em uso..."; // CORREÇÃO: Descrição mais específica
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