import { z } from 'zod';

export const schema = z.object({
    name: z.string({
        required_error: 'Informe o seu nome'
    })
        .refine(value => value.trim() !== '', "Informe o seu nome"),
    email: z.string({
        required_error: 'Informe o seu e-mail'
    })
        .email("E-mail inválido")
        .refine(value => value.trim() !== '', "Informe o seu e-mail"),
    phoneNumber: z.string({
        required_error: 'Informe o seu números',
    })
        .min(10, "Contato deve ter no minimo 10 caracteres")
        .max(11, "Contato deve ter no máximo 11 caracteres")
        .refine(value => Number(value) > 0, "Contato deve ser numérico"),
    document: z.string({
        required_error: 'Informe o seu cpf',
    })
        .refine(value => Number(value) > 0, "Cpf deve ser numérico")
        .refine(value => value.length === 11, "Cpf inválido"),
    acessibility: z.object({
        icon: z.string(),
        value: z.string(),
        id: z.number(),
    })
    .optional(),
    password: z.string({
        required_error: 'Informe a sua senha'
    })
        .min(6, "A senha deve ter ao menos 6 dígitos")
        .refine(value => value.trim() !== '', "Informe a sua senha"),
    passwordConfirm: z.string({
        required_error: 'Confirme sua senha'
    })
        .min(6, "A senha deve ter ao menos 6 dígitos")
        .refine(value => value.trim() !== '', "Confirme sua senha")
}).refine(value => value.passwordConfirm === value.password, {
    message: "A senha de confirmação não confere",
    path: ['passwordConfirm']
})

export type FormData = z.infer<typeof schema>