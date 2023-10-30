import { api } from "../axios";

export const commentApiRequest = async () => {
    try {
        const response = await api.get('/comentario')
        return response.data
    } catch (error) {
        throw new Error(error.response.data.mensagem)
    }
}
