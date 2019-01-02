import * as yup from 'yup';

/* Isolations */
export const loginPasswordValidation = yup
    .string()
    .max(255)
    .required();

/* Compounds */
export const loginValidation = yup.object().shape({
    email: yup
        .string()
        .max(255)
        .email('dit is geen geldig email adres!')
        .required(),
    password: loginPasswordValidation
});
