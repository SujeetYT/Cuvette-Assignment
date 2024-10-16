import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SignupState {
  state: string;
}

const initialState:SignupState = {
  state: "signup", // signup or otpVerify
};

const signupStateSlice = createSlice({
  name: "signupState",
  initialState,
  reducers: {
    setSignupState: (state, action: PayloadAction<string>) => {
      state.state = action.payload;
    },
  },
});

export const { setSignupState } = signupStateSlice.actions;
export default signupStateSlice.reducer;