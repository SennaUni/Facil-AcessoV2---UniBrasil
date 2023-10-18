import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { LoginApiParams, loginApiRequest } from '../../api/authRequests';
import { CreateUserParams, createUserApiRequest } from '../../api/authRequests';

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
  error: any | boolean;
  sucess: any | boolean;
}

const initialState: AuthState = {
  user: null,
  loading: 'idle',
  error: false,
  sucess: false
}

export const loginAsync = createAsyncThunk('auth/login', async (data: LoginApiParams, { rejectWithValue }) => {
  try {
    const response = await loginApiRequest(data)
    return response;
  } catch (error) {
    return rejectWithValue(error.message)
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
        state.sucess = false;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.user = action.payload;
        state.sucess = true;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload ? action.payload : 'Erro desconhecido';
        state.sucess = false;
      })
  }
})

export default authSlice.reducer

