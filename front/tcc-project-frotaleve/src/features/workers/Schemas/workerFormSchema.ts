import { z } from "zod";

export const workerFormSchema = z.object({
    nome: z.string().refine(
        (val) => val.trim().split(/\s+/).length >= 2,
        { message: "Inclua nome e sobrenome." }
    ),

    cpf: z.string().length(11, {
        message: "CPF deve ter 11 caracteres.",

    }),
    email: z.string().optional() /* z.string().refine(
        (val) => /@(lns\.maersk\.com|maersk\.com|alianca\.com\.br)$/.test(val),
        {
            message:
                "O e-mail deve ser corporativo (terminar com @lns.maersk.com, @maersk.com ou @alianca.com.br).",
        }
    )*/,

    uidMSK: z.string().regex(/^[A-Za-z]{3}\d{3}$/, {
        message:
            "UID deve ter 6 caracteres: 3 letras e 3 números.",
    }),

    localidade: z.string().min(1, {
        message: "Selecione uma localidade."
    }),

    brand: z.string().min(1, {
        message: "Selecione uma brand."
    }),

    jobTitle: z.string().min(1, {
        message: "Informe o cargo/área de atuação.",
    }),

    usaEstacionamento: z.boolean().optional(),

    cidadeEstacionamento: z.string().optional(),

    cnh: z.string().length(9, {
        message: "CNH deve ter 9 caracteres.",
    }),

    tipoCNH: z.string().min(1, {
        message: "Informe o tipo da CNH.",
    }),

}).superRefine((data, ctx) => {
    if (data.usaEstacionamento && (!data.cidadeEstacionamento || data.cidadeEstacionamento.trim() === "")) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Cidade Estacionamento deve ser preenchido se usar estacionamento.",
            path: ["cidadeEstacionamento"],
        });
    }
});