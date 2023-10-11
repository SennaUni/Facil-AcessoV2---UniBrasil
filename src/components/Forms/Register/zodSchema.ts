import { z } from 'zod';

export const schema = z.object({
    name: z.string()
        .nonempty("Informe o seu nome"),
    email: z.string()
        .email("E-mail inválido")
        .nonempty("Informe o seu e-mail"),
    phoneNumber: z.number()
        .int("Contato inválido")
        .min(999999999, "Contato deve ter no minimo 10 caracteres")
        .max(99999999999, "Contato deve ter no máximo 11 caracteres")
        .nonnegative("Contato inválido")
        .refine(value => value > 0, "Contato deve ser numérico"),
    password: z.string()
        .min(6, "A senha deve ter ao menos 6 dígitos")
        .nonempty("Informe a sua senha"),
    // passwordConfirm: z.string()
    //     .refine((val, ctx) => val === ctx.parent.password, "A senha de confirmação não confere")
    //     .nonempty("Informe a confirmação da sua senha"),
});

export type FormData = z.infer<typeof schema>;