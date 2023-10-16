import { z } from 'zod';

export const schema = z.object({
    accessibility: z.string()
        .min(3, "O nome deve ter ao menos 6 dígitos")
        .max(50, "O nome deve ter ao máximo 50 dígitos")
        .nonempty("Informe o nome do estabelecimento"),
});

export type FormData = z.infer<typeof schema>;
