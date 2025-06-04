import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

interface StartUsePayload {
  placa: string;
  modelo: string;
  renavam: string;
  chassi: string;
  status: string;
  colaboradorUid?: string;
}

interface FinishUsePayload {
  placa: string;
  colaboradorUid?: string;
}

export function useValidateCollaborator() {
  return useMutation({
    mutationFn: async (uid: string) => {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/colaborador/uid/${uid}`);
      
      if (response.status === 404) {
        throw new Error('Colaborador não encontrado.');
      }
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao validar UID.');
      }
      
      return response.json();
    },
    onSuccess: () => {
      toast.success("UID validado com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });
}

export function useStartVehicleUse(token?: string) {
  return useMutation({
    mutationFn: async (payload: StartUsePayload) => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/historico-utilizacao/iniciar`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json();
      
      return {
        status: response.status,
        data: result
      };
    },
    onSuccess: (result) => {
      if (result.status === 201) {
        toast.success("Uso do veículo iniciado com sucesso!");
      } else if (result.status === 409 && result.data.action === "finish") {
        toast.info("Você já está usando este veículo. Clique em 'Finalizar Uso' se desejar parar.");
      } else if (result.status === 409) {
        toast.error(result.data.error || "Veículo já está em uso por outro colaborador.");
      }
    },
    onError: () => {
      toast.error("Falha de comunicação com o servidor.");
    }
  });
}

export function useFinishVehicleUse(token?: string) {
  return useMutation({
    mutationFn: async (payload: FinishUsePayload) => {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/historico-utilizacao/finalizar`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erro ao finalizar uso do veículo.');
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success("Uso finalizado com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });
}