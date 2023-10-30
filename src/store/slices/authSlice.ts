import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { LoginApiParams, loginApiRequest } from '../../api/authRequests';
import { UpdateProfileParams, updateProfileApiRequest } from '../../api/authRequests';

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
  icon: string
  dataCriacao: string
  dataRemocao: any
  dataEdicao: any
}


export interface AuthState {
  user: Usuario | null;
  token: string | null;

  loading: 'idle' | 'pending';
  error: any | boolean;
  sucess: any | boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,

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

export const updateProfileAsync = createAsyncThunk('auth/updateProfile', async (data: UpdateProfileParams, { rejectWithValue }) => {
  try {
    const response = await updateProfileApiRequest(data)
    return response;
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoff: (state) => {
      state.user = null;
      state.token = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.loading = 'pending';
        state.error = false;
        state.sucess = false;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.user = action.payload.usuario;
        state.token = action.payload.token;
        state.loading = 'idle';
        state.sucess = true;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload ? action.payload : 'Erro desconhecido';
        state.sucess = false;
      })

      .addCase(updateProfileAsync.fulfilled, (state, action) => {
        state.user = action.payload;
      })
  }
})

export default authSlice.reducer

export const { logoff } = authSlice.actions