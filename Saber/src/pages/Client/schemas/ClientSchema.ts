import * as yup from 'yup'

export const ClientSchema = yup
.object().shape({
    fullName: yup.string().required("Informe o nome"),
    birthDate: yup.date().required("Informe a data de Nascimento"),
    cpf: yup.string().required("Informe o CPF"),
    maritalStatus: yup.string().required("Informe o estado civil")
}).required()