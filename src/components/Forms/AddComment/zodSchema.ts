import { z } from 'zod';

export const schema = z.object({
    name: z.string({
        required_error: 'Informe o nome'
    })
        .min(3, "O nome deve ter ao menos 6 dígitos")
        .max(50, "O nome deve ter ao máximo 50 dígitos")
        .refine(value => value.trim() !== '', "Informe o nome"),
    address: z.string({
        required_error: 'Informe o endereço'
    })
        .min(3, "O endereço deve ter ao menos 6 dígitos")
        .max(50, "O endereço deve ter ao máximo 50 dígitos")
        .refine(value => value.trim() !== '', "Informe o endereço"),
    comment: z.string({
        required_error: 'Informe o comentario'
    })
        .max(255, "O comentario deve ter ao máximo 255 dígitos")
        .refine(value => value.trim() !== '', "Informe o comentario"),
    category: z.object({
        icon: z.string(),
        value: z.string(),
        id: z.number(),
    }, {
        required_error: 'Informe a categoria'
    }),
    satisfation: z.object({
        icon: z.string(),
        value: z.string(),
        id: z.number(),
    }, {
        required_error: 'Informe a safistação'
    })
})

export type FormData = z.infer<typeof schema>;
