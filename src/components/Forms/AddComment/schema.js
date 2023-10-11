import * as Yup from 'yup';

const schema = Yup.object({
    name: Yup.string()
        .min(3, "O nome deve ter ao menos 6 dígitos")
        .max(50, "O nome deve ter ao máximo 50 dígitos")
        .required("Informe o nome do estabelecimento"),  
    address: Yup.string()
        .min(3, "O endereço deve ter ao menos 6 dígitos")
        .max(50, "O endereço deve ter ao máximo 50 dígitos")
        .required("Informe o endereço do estabelecimento"),   
    comment: Yup.string()
        .max(255, "O comentario deve ter ao máximo 255 dígitos")
        .required("Informe o comentário"), 
});

export { schema };