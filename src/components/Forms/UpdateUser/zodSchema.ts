import { z } from 'zod';

export const schema = z.object({
    name: z.string().nonempty("Informe o seu nome"),
    email: z.string().email("E-mail inválido").nonempty("Informe o seu e-mail"),
    phoneNumber: z.number()
        .int("Contato inválido")
        .min(999999999, { message: "Contato deve ter no minimo 10 caracteres" })
        .max(99999999999, { message: "Contato deve ter no máximo 11 caracteres" })
        .refine(value => value > 0, "Contato inválido")
        .refine(value => Number.isInteger(value), "Contato deve ser numérico")
})

export type FormData = z.infer<typeof schema>;
