import { z } from 'zod';

export const schema = z.object({
    address: z.string({
        required_error: 'Informe o endereço'
    })
        .refine(value => value.trim() !== '', "Informe o endereço"),
    number: z.string({
        required_error: 'Informe o numero'
    })
        .refine(value => value.trim() !== '', "Informe o número")
        .refine(value => !isNaN(Number(value)), "Número deve ser numérico"),
    neighborhood: z.string({
        required_error: 'Informe o bairro'
    })
        .refine(value => value.trim() !== '', "Informe o bairro"),
    city: z.string({
        required_error: 'Informe a cidade'
    })
        .refine(value => value.trim() !== '', "Informe a cidade"),

    zipCode: z.string({
        required_error: 'Informe o cep'
    })
        .refine(value => value.trim() !== '', "Informe o cep"),
    state: z.object({
        icon: z.string(),
        value: z.string(),
        id: z.string(),
    }, {
        required_error: 'Informe o estado'
    }),
})

export type FormData = z.infer<typeof schema>;
