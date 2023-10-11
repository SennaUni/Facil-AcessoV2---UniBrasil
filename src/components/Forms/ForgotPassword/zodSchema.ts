import { z } from 'zod';

export const schema = z.object({
    email: z.string()
        .email("E-mail inválido")
        .nonempty("Informe o seu e-mail"),
});

export type FormData = z.infer<typeof schema>;