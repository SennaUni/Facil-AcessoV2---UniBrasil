import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { commerceApiRequest } from '../../api/commerceRequests';

export interface Commerce {
  id: number
  descricao: string
  icon: string
}

export interface CommerceState {
  commerce: Commerce[] | null;
  loading: 'idle' | 'pending';
  error: any | boolean;
  sucess: any | boolean;
}

const initialState: CommerceState = {
  commerce: null,
  loading: 'idle',
  error: false,
  sucess: false
}

export const listCommerce = createAsyncThunk('commerce/list', async (_, { rejectWithValue }) => {
  try {
    const response = await commerceApiRequest()
    return response;
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const commerceSlice = createSlice({
  name: 'commerce',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(listCommerce.pending, (state) => {
        state.loading = 'pending';
        state.error = false;
        state.sucess = false;
      })
      .addCase(listCommerce.fulfilled, (state, action) => {
        state.loading = 'idle';
        state.commerce = action.payload;
        state.sucess = true;
      })
      .addCase(listCommerce.rejected, (state, action) => {
        state.loading = 'idle';
        state.error = action.payload ? action.payload : 'Erro desconhecido';
        state.sucess = false;
      })
  }
})

export default commerceSlice.reducer