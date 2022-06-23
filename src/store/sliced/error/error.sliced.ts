import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface errorState {
  message: string;
}

const initialState: errorState = {
   message: '',
}

export const errorSlice = createSlice({
   name: 'error',
   initialState,
   reducers: {
      setError: (state, action: PayloadAction<string>) => {
         state.message = action.payload
      },
   },
})

export const { setError } = errorSlice.actions

export default errorSlice.reducer