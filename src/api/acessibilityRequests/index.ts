import { api } from "../axios";

export const acessibilityApiRequest = async () => {
    try {
        const response = await api.get('/acessibilidade')
        return response.data
    } catch (error) {
        throw new Error(error.response.data.mensagem)
    }
}
