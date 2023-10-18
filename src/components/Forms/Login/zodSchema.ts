import { z } from 'zod';

export const schema = z.object({
    // email: z.string({
    //     invalid_type_error: 'Favor informar o e-mail',
    //     required_error: 'Favor informar o e-mail'
    // })
    //     .email("E-mail inválido"),
    user: z.string({
        required_error: 'Favor informar o usuário',
        invalid_type_error: 'Favor informar o usuário',
    }),
    password: z.string()
        .min(3, "A senha deve ter ao menos 3 dígitos")
});

export type FormData = z.infer<typeof schema>;
