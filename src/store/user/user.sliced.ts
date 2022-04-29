import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface UserState {
  address: string;
  balance: number,
}

const initialState: UserState = {
   address: '',
   balance: 0,
}

export const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      setUser: (state, action: PayloadAction<string>) => {
         state.address = action.payload
      },
   },
})

export const { setUser } = userSlice.actions

export default userSlice.reducer