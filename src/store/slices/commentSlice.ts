import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { commentApiRequest } from '../../api/commentRequests';

export interface Comment {
  id: number
  idComentario: number
  estabelecimento: Estabelecimento
  usuario: number
  complemento: string
  rua: string
  numero: number
  bairro: string
  estado: string
  cidade: string
  cep: string
  nivelSatisfacao: number
  comentario: string
  curtidas: number
  dataCriacao: string
  acessibilidade: Acessibilidade[]
}

export interface Estabelecimento {
  id: number
  descricao: string
  dataCriacao: string
  icon: string
}

export interface Acessibilidade {
  id: number
  descricao: string
  icon: string
}

export interface CommentState {
  comment: Comment[] | null;
  loading: 'idle' | 'pending';
  error: any | boolean;
  sucess: any | boolean;
}

const initialState: CommentState = {
  comment: null,
  loading: 'idle',
  error: false,
  sucess: false
}

export const listComment = createAsyncThunk('comment/list', async (_, { rejectWithValue }) => {
  try {
    const response = await commentApiRequest()
    return response;
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const commentSlice = createSlice({
  name: 'comment',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listComment.pending, (state) => {
        state.loading = 'pending';
        state.error = false;
        state.sucess = false;
      })
      .addCase(listComment.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.comment = action.payload;
        state.sucess = true;
      })
      .addCase(listComment.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload ? action.payload : 'Erro desconhecido';
        state.sucess = false;
      })
  }
})

export default commentSlice.reducer