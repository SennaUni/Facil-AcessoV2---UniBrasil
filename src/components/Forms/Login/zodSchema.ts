import { z } from 'zod';

export const schema = z.object({
    email: z.string()
        .email("E-mail inválido")
        .nonempty("Informe o seu e-mail"),
    password: z.string()
        .min(6, "A senha deve ter ao menos 6 dígitos")
        .nonempty("Informe a sua senha"),
});

export type FormData = z.infer<typeof schema>;
