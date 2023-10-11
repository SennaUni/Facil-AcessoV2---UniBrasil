import { api } from "../axios";

export type LoginApiParams = {
    login: string
    senha: string
}

export const loginApiRequest = async (data: LoginApiParams) => {
    try {
        const response = await api.post('/login', data);
        return response.data
    } catch (error) {
        console.log(error) // possível throw new error
    }
}