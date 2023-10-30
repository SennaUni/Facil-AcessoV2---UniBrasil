import { z } from 'zod';

export const schema = z.object({
    oldPassword: z.string({
        required_error: 'Informe a senha atual'
    })
        .min(6, "A senha deve ter ao menos 6 dígitos")
        .refine(value => value.trim() !== '', "Informe a senha atual"),
    newPassword: z.string({
        required_error: 'Informe a nova atual'
    })
        .min(6, "A senha deve ter ao menos 6 dígitos")
        .refine(value => value.trim() !== '', "Informe a senha nova"),
    newPasswordConfirm: z.string({
        required_error: 'Informe a confirmação de senha'
    })
        .min(6, "A senha deve ter ao menos 6 dígitos")
        .refine(value => value.trim() !== '', "Informe a confirmação de senha"),
}).refine(value => value.newPasswordConfirm === value.newPassword, {
    message: "A senha de confirmação não confere",
    path: ['newPasswordConfirm']
})

export type FormData = z.infer<typeof schema>;
