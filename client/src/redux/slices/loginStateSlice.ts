import { createSlice, PayloadAction } from "@reduxjs/toolkit"


const initialState = {
  state: "login"
}

const loginStateSlice = createSlice({
  name: "loginState",
  initialState,
  reducers: {
    setLoginState: (state, action:PayloadAction<string>) => {
      state.state = action.payload
    }
  }
})

export const { setLoginState } = loginStateSlice.actions
export default loginStateSlice.reducer