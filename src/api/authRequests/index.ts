import { api } from "../axios";

export type LoginApiParams = {
    login: string
    senha: string
}

export const loginApiRequest = async (data: LoginApiParams) => {
    try {
        const response = await api.post('/login', data)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.mensagem)
    }
}

export type CreateUserParams = {
    login: string
    senha: string
    telefone: string
    cpf: string
    acessibilidade: number[]
    email: string
    dataNascimento: string
}

export const createUserApiRequest = async (data: CreateUserParams) => {
    try {
        const response = await api.post('/usuario', data)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.mensagem)
    }
}

export type UpdatePasswordParams = {
    id: number
    senhaAtual: string
    senhaNova: string
}

export const updatePasswordApiRequest = async (data: UpdatePasswordParams) => {
    try {
        const response = await api.put('/usuario/senha', data)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.mensagem)
    }
}

export type UpdateProfileParams = {
    id: number
    data: UpdateProfilePayload
}   

export type UpdateProfilePayload = {
    login: string
    telefone: string
    cpf: string
    acessibilidade: number[]
    dataNascimento: string
    email: string
}

export const updateProfileApiRequest = async ({ id, data }: UpdateProfileParams) => {
    try {
        const response = await api.put(`/usuario/${id}`, data)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.mensagem)
    }
}