import { api } from "../axios";

export const commentApiRequest = async (id: number) => {
    try {
        const response = await api.get(`/comentario/${id}`)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.mensagem)
    }
}

export type LikeCommentApiParams = {
    idComentario: number
    idUsuario: number
    curtido: boolean
}

export const likeCommentApiRequest = async (data: LikeCommentApiParams) => {
    try {
        const response = await api.post('/curtida', data)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.mensagem)
    }
}

export type createCommentApiParams = {
    estabelecimentoId: number
    nomeEstabelecimento: string
    rua: string
    numero: number
    complemento: string
    bairro: string
    estado: string
    cidade: string
    cep: string
    nivelSatisfacao: number
    comentario: string
    usuario: number
    acessibilidade: number[]
}

export const createCommentApiRequest = async (data: createCommentApiParams) => {
    try {
        const response = await api.post('/comentario', data)
        return response.data
    } catch (error) {
        throw new Error(error.response.data.mensagem)
    }
}

