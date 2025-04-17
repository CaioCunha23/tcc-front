import { z } from "zod";

export const InfractionFormSchema = z.object({
    tipo: z.string({
        required_error: "Informe o tipo de infração",
    }).min(1, "Informe o tipo de infração"),

    colaboradorUid: z.string({
        required_error: "Informe o UID do colaborador",
    }).regex(/^[A-Za-z]{3}[0-9]{3}$/, {
        message: "UID deve ter 6 caracteres: 3 letras e 3 números",
    }),

    placaVeiculo: z.string({
        required_error: "Informe a placa do veículo",
    }).regex(/^[A-Za-z]{4}[0-9]{3}$/, {
        message: "A placa do veículo deve ter 7 caracteres: 4 letras e 3 números",
    }),

    costCenter: z.string({
        required_error: "Informe o centro de custo",
    }).min(1, "Informe o centro de custo"),

    dataInfracao: z.preprocess((arg) => {
        if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
    }, z.date({ required_error: 'Data de infração é obrigatória' })),

    tag: z.string().optional(),

    hora: z.string().optional(),

    valor: z.preprocess(
        (val) => (typeof val === "string" ? parseInt(val, 10) : val),
        z.number({ required_error: 'Valor da Infração é obrigatório' })),

    prefixo: z.string().optional(),

    marca: z.string({
        required_error: "Informe a marca do veículo",
    }).min(1, "Informe a marca do veículo"),

    categoria: z.string().optional(),

    rodovia: z.string().optional(),

    praca: z.string().optional(),

    nome: z.string().optional(),

    dataEnvio: z.preprocess((arg) => {
        if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
    }, z.date({ required_error: 'Data de envio é obrigatória' })),

    codigoMulta: z.string().optional(),

    indicacaoLimite: z.preprocess((arg) => {
        if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
    }, z.date({ required_error: 'Informe a indicação limite' })),

    statusResposta: z.string({
        required_error: "Informe o status da resposta",
    }).min(1, "Informe o status da resposta"),

    reconhecimento: z.boolean().optional(),

    enviadoParaRH: z.boolean().optional(),
});