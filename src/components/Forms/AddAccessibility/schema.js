import * as Yup from 'yup';

const schema = Yup.object({
    accessibility: Yup.string()
        .min(3, "O nome deve ter ao menos 6 dígitos")
        .max(50, "O nome deve ter ao máximo 50 dígitos")
        .required("Informe o nome do estabelecimento"), 
});

export { schema };