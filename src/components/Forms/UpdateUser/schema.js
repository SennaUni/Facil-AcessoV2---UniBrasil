import * as Yup from 'yup';

const schema = Yup.object({
    name: Yup.string()
        .required("Informe o seu nome"),
    email: Yup.string()
        .email("E-mail inválido")
        .required("Informe o seu e-mail"),
    phoneNumber: Yup.number()
        .typeError("Contato deve ser numérico")
        .positive("Contato inválido")
        .integer("Contato inválido")
        .min(999999999, "Contato deve ter no minimo 10 caracteres")
        .max(99999999999, "Contato deve ter no máximo 11 caracteres")
        .required("Informe o seu contato"),
});

export { schema };