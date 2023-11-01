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
    phoneNumber: z.string()
        .refine(value => !isNaN(Number(value)), "Contato deve ser numérico")
        .refine(value => Number(value) > 0, "Contato inválido")
        .refine(value => value.length < 12, "Contato deve ter no máximo 11 caracteres")
        .refine(value => value.length > 9, "Contato deve ter no minimo 10 caracteres"),
    document: z.string({
        required_error: 'Informe o seu cpf',
    })
        .refine(value => Number(value) > 0, "Cpf deve ser numérico")
        .refine(value => value.length === 11, "Cpf inválido"),
    acessibility: z.object({
        icon: z.string(),
        value: z.string(),
        id: z.number(),
    }, {
        required_error: 'required',
        invalid_type_error: 'type',
    })
})

export type FormData = z.infer<typeof schema>;
