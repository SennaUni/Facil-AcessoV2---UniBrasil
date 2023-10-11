import * as Yup from 'yup';

const schema = Yup.object({
    email: Yup.string()
        .email("E-mail inválido")
        .required("Informe o seu e-mail"),
    password: Yup.string()
        .min(6, "A senha deve ter ao menos 6 dígitos")
        .required("Informe a sua senha"),
});

export { schema };