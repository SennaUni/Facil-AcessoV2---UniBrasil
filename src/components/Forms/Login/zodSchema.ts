import { z } from 'zod';

export const schema = z.object({
    user: z.string({
        required_error: 'Favor informar o usuário',
        invalid_type_error: 'Favor informar o usuário',
    }),
    password: z.string({
        required_error: 'Favor informar a senha',
        invalid_type_error: 'Favor informar a senha',
    })
        .min(3, "A senha deve ter ao menos 3 dígitos")
});

export type FormData = z.infer<typeof schema>;
