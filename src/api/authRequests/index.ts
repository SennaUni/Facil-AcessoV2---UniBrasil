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
}

export const createUserApiRequest = async (data: CreateUserParams) => {
    try {
        const response = await api.post('/usuario', data)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.mensagem)
    }
}