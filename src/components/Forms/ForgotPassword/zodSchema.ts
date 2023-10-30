import { z } from 'zod';

export const schema = z.object({
    email: z.string({
        required_error: 'Favor informar o e-mail'
    })
        .email("E-mail inválido")
        .refine(value => value.trim() !== '', "Informe o seu e-mail"),
});

export type FormData = z.infer<typeof schema>;