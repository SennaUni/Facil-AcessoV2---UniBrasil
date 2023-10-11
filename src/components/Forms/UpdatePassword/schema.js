import * as Yup from 'yup';

const schema = Yup.object({
    oldPassword: Yup.string()
        .min(6, "A senha deve ter ao menos 6 dígitos")
        .required("Informe a sua senha atual"),
    newPassword: Yup.string()
        .min(6, "A senha deve ter ao menos 6 dígitos")
        .required("Informe a sua nova senha"),
    newPasswordConfirm: Yup.string()
        .min(6, "A senha deve ter ao menos 6 dígitos")
        .required("Informe a confirmação de senha")
        .oneOf([ Yup.ref('newPassword'), null ], 'A confirmação esta incorreta'),
});

export { schema };