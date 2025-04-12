import { z } from "zod";

export const InfractionFormSchema = z.object({
    tipo: z.string({
        required_error: "Informe o tipo de infração.",
    }),
    colaboradorUid: z.string().length(6, {
        message: "UID deve ter 6 caracteres.",
    }),
    placaVeiculo: z.string().length(7, {
        message: "A placa do veículo deve ter 7 caracteres.",
    }),
    costCenter: z.string({
        required_error: "Informe o centro de custo.",
    }),
    dataInfracao: z.string().min(1, {
        message: "Data de infração é obrigatória.",
    }),
    tag: z.string().min(1, {
        message: "Tag é obrigatória.",
    }),
    hora: z.string().min(1, {
        message: "Hora é obrigatória.",
    }),

    valor: z.number().optional(),
    prefixo: z.string().optional(),
    marca: z.string().optional(),
    categoria: z.string().optional(),
    rodovia: z.string().optional(),
    praca: z.string().optional(),
    nome: z.string().optional(),
    dataEnvio: z.string().optional(),
    codigoMulta: z.string().optional(),
    indicacaoLimite: z.string().optional(),
    statusResposta: z.string().optional(),
    reconhecimento: z.boolean().optional(),
    enviadoParaRH: z.boolean().optional(),
});