import { z } from "zod";

export const InfractionFormSchema = z.object({
    tipo: z.string({
        required_error: "Informe o tipo de infração.",
    }).min(1, "Informe o tipo de infração."),

    colaboradorUid: z.string({
        required_error: "Informe o UID do colaborador.",
    }).regex(/^[A-Za-z]{3}[0-9]{3}$/, {
        message: "UID deve ter 6 caracteres: 3 letras e 3 números.",
    }),

    placaVeiculo: z.string({
        required_error: "Informe a placa do veículo.",
    }).regex(/^[A-Za-z]{4}[0-9]{3}$/, {
        message: "A placa do veículo deve ter 7 caracteres: 4 letras e 3 números.",
    }),

    costCenter: z.string({
        required_error: "Informe o centro de custo.",
    }).min(1, "Informe o centro de custo."),

    dataInfracao: z.string({
        required_error: "Data de infração é obrigatória.",
    }).min(1, "Data de infração é obrigatória."),

    tag: z.string({
        required_error: "Tag é obrigatória.",
    }).min(1, "Tag é obrigatória."),

    hora: z.string().optional(),

    valor: z.number({
        required_error: "Informe o valor da infração.",
    }),

    prefixo: z.string().optional(),

    marca: z.string({
        required_error: "Informe a marca do veículo.",
    }).min(1, "Informe a marca do veículo."),

    categoria: z.string().optional(),

    rodovia: z.string().optional(),

    praca: z.string().optional(),

    nome: z.string().optional(),

    dataEnvio: z.string({
        required_error: "Data de envio é obrigatória.",
    }).min(1, "Data de envio é obrigatória."),

    codigoMulta: z.string().optional(),

    indicacaoLimite: z.string({
        required_error: "Informe a data limite de indicação.",
    }).min(1, "Informe a data limite de indicação."),

    statusResposta: z.string({
        required_error: "Informe o status da resposta.",
    }).min(1, "Informe o status da resposta."),

    reconhecimento: z.boolean().optional(),

    enviadoParaRH: z.boolean().optional(),
});