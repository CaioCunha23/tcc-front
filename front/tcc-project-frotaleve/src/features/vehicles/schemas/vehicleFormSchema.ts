import { z } from "zod";

export const vehicleFormSchema = z.object({
    fornecedor: z.string().nonempty('Fornecedor é obrigatório'),

    contrato: z.string().nonempty('Contrato é obrigatório'),

    placa: z
        .string()
        .nonempty('Placa é obrigatória')
        .regex(/^[A-Za-z]{4}[0-9]{3}$/, 'Placa deve conter 4 letras seguidas de 3 números'),

    renavam: z
        .string()
        .nonempty('Renavam é obrigatório')
        .length(11, 'Renavam deve ter exatamente 11 caracteres'),

    chassi: z
        .string()
        .nonempty('Chassi é obrigatório')
        .length(17, 'Chassi deve ter exatamente 17 caracteres'),

    modelo: z.string().nonempty('Modelo é obrigatório'),

    cor: z.string().nonempty('Cor é obrigatória'),

    status: z.string().nonempty('Status é obrigatório'),

    cliente: z.string().nonempty('Cliente é obrigatório'),

    centroCusto: z.string().nonempty('Centro de custo é obrigatório'),

    franquiaKM: z.string().nonempty('Franquia KM é obrigatório'),

    carroReserva: z.boolean().optional(),

    dataDisponibilizacao: z.preprocess((arg) => {
        if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
    }, z.date({ required_error: 'Data de disponibilização é obrigatória' })),

    mesesContratados: z.number({ required_error: 'Meses contratados é obrigatório' }),

    previsaoDevolucao: z.preprocess((arg) => {
        if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
    }, z.date({ required_error: 'Previsão de devolução é obrigatória' })),

    mesesFaltantes: z.number({ required_error: 'Meses faltantes é obrigatório' }),

    mensalidade: z.number({ required_error: 'Mensalidade é obrigatória' }),

    budget: z.number({ required_error: 'Budget é obrigatório' }),

    multa: z.number().optional(),

    proximaRevisao: z.preprocess((arg) => {
        if (typeof arg === 'string' || arg instanceof Date) return new Date(arg);
    }, z.date({ required_error: 'Próxima revisão é obrigatória' })),
});