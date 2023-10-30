import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { favoriteApiRequest } from '../../api/myFavoriteRequests';

export interface MyFavorite {
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
  comment: MyFavorite[] | null;
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

export const listMyFavorite = createAsyncThunk('myFavorite/list', async (id: number, { rejectWithValue }) => {
  try {
    const response = await favoriteApiRequest(id)
    return response
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const myCommentSlice = createSlice({
  name: 'myFavorite',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listMyFavorite.pending, (state) => {
        state.loading = 'pending';
        state.error = false;
        state.sucess = false;
      })
      .addCase(listMyFavorite.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.comment = action.payload;
        state.sucess = true;
      })
      .addCase(listMyFavorite.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload ? action.payload : 'Erro desconhecido';
        state.sucess = false;
      })
  }
})

export default myCommentSlice.reducer