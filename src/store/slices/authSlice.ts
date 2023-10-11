import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { LoginApiParams, loginApiRequest } from '../../api/authRequests';

export interface Root {
  usuario: Usuario
  token: string
  tipoAutenticacao: string
}

export interface Usuario {
  id: number
  login: string
  senha: string
  telefone: string
  email: string
  cpf: string
  acessibilidades: Acessibilidade[]
  dataNascimento: any
  dataCriacao: string
  dataEdicao: any
  dataRemocao: any
}

export interface Acessibilidade {
  id: number
  descricao: string
  dataCriacao: string
  dataRemocao: any
  dataEdicao: any
}


export interface AuthState {
  user: Usuario | null;
  loading: 'idle' | 'pending';
  error: any | false;
}

const initialState: AuthState = {
  user: null,
  loading: 'idle',
  error: false,
}

export const loginAsync = createAsyncThunk('auth/login', async (data: LoginApiParams, { rejectWithValue }) => {
  try {
    const response = await loginApiRequest(data)
    return response;
  } catch (error) {
    return rejectWithValue(error.response);
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = 'pending';
        state.error = false;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.user = action.payload;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload ? action.payload as string : 'Erro desconhecido';
      })
  }
})

export default authSlice.reducer

