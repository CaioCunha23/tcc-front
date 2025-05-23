import { z } from "zod";

export const vehicleHistoryFormSchema = z.object({
    colaboradorUid: z.string({
        required_error: "Informe o UID do colaborador",
    }).regex(/^[A-Za-z]{3}[0-9]{3}$/, {
        message: "UID deve ter 6 caracteres: 3 letras e 3 números",
    }),

    veiculoPlaca: z.string({
        required_error: "Informe a placa do veículo",
    }).regex(/^[A-Za-z]{4}[0-9]{3}$/, {
        message: "A placa do veículo deve ter 7 caracteres: 4 letras e 3 números",
    }),

    dataInicio: z.preprocess((arg) => {
        if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
    }, z.date({ required_error: 'Data de Início é obrigatória' })),

    dataFim: z.preprocess((arg) => {
        if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
    }, z.date().optional()),

    tipoUso: z.string({
        required_error: "Informe o tipo de uso",
    }).min(1, "Informe o tipo de uso"),
});