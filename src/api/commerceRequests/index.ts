import { api } from "../axios";

export const commerceApiRequest = async () => {
    try {
        const response = await api.get('/estabelecimento')
        return response.data
    } catch (error) {
        throw new Error(error.response.data.mensagem)
    }
}
