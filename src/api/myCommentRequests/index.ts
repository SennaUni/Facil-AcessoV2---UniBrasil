import { api } from "../axios";

export const commentApiRequest = async (id: number) => {
    try {
        const response = await api.get(`/comentario/usuario/${id}`)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.mensagem)
    }
}
