import { api } from "../axios";

export const favoriteApiRequest = async (id: number) => {
    try {
        const response = await api.get(`/comentario/favorito/${id}`)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.mensagem)
    }
}
