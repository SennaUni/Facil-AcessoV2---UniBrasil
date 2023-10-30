import { z } from 'zod';

export const schema = z.object({
    name: z.string()
        .min(3, "O nome deve ter ao menos 6 dígitos")
        .max(50, "O nome deve ter ao máximo 50 dígitos"),
        // .nonempty("Informe o nome do estabelecimento"),
    address: z.string()
        .min(3, "O endereço deve ter ao menos 6 dígitos")
        .max(50, "O endereço deve ter ao máximo 50 dígitos"),
        // .nonempty("Informe o endereço do estabelecimento"),
    comment: z.string()
        .max(255, "O comentario deve ter ao máximo 255 dígitos"),
        // .nonempty("Informe o comentário"),
})

export type FormData = z.infer<typeof schema>;
