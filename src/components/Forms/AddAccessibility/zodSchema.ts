import { z } from 'zod';

export const schema = z.object({
    accessibilityText: z.string()
        .min(3, "A descrição deve ter ao menos 6 dígitos")
        .max(50, "A descrição deve ter ao máximo 50 dígitos")
        .refine(value => value.trim() !== '', "Informe a descrição"),
    acessibilityOption: z.object({
        icon: z.string(),
        value: z.string(),
        id: z.number(),
    }, {
        required_error: 'Informe a acessibilidade'
    })
});

export type FormData = z.infer<typeof schema>;
