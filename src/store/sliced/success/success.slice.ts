import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface successState {
  messageSuccess: string;
}

const initialState: successState = {
   messageSuccess: '',
}

export const successSlice = createSlice({
   name: 'success',
   initialState,
   reducers: {
      setSuccess: (state, action: PayloadAction<string>) => {
         state.messageSuccess = action.payload
      },
   },
})

export const { setSuccess } = successSlice.actions

export default successSlice.reducer