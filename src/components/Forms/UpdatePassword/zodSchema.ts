import { z } from 'zod';

export const schema = z.object({
    oldPassword: z.string()
        .min(6, "A senha deve ter ao menos 6 dígitos")
        .nonempty("Informe a sua senha atual"),
    newPassword: z.string()
        .min(6, "A senha deve ter ao menos 6 dígitos")
        .nonempty("Informe a sua nova senha"),
    newPasswordConfirm: z.string()
        .min(6, "A senha deve ter ao menos 6 dígitos")
        .nonempty("Informe a confirmação de senha")
        // .refine((val, ctx) => val === ctx.parent.newPassword, 'A confirmação esta incorreta'),
})

export type FormData = z.infer<typeof schema>;
