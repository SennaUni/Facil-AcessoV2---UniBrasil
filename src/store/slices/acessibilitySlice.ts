import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { acessibilityApiRequest } from '../../api/acessibilityRequests';

export interface Acessibility {
  id: number
  descricao: string
  icon: string
}

export interface AcessibilityState {
  acessibility: Acessibility[] | null;
  loading: 'idle' | 'pending';
  error: any | boolean;
  sucess: any | boolean;
}

const initialState: AcessibilityState = {
  acessibility: null,
  loading: 'idle',
  error: false,
  sucess: false
}

export const listAcessibility = createAsyncThunk('acessibility/list', async (_, { rejectWithValue }) => {
  try {
    console.log('Entrei')
    const response = await acessibilityApiRequest()
    return response;
  } catch (error) {
    console.log('Dei erro', error.message)
    return rejectWithValue(error.message)
  }
})

const acessibilitySlice = createSlice({
  name: 'acessibility',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listAcessibility.pending, (state) => {
        state.loading = 'pending';
        state.error = false;
        state.sucess = false;
      })
      .addCase(listAcessibility.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.acessibility = action.payload;
        state.sucess = true;
      })
      .addCase(listAcessibility.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload ? action.payload : 'Erro desconhecido';
        state.sucess = false;
      })
  }
})

export default acessibilitySlice.reducer