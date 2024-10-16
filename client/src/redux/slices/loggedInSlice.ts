import { createSlice } from '@reduxjs/toolkit';

const loggedInSlice = createSlice({
  name: 'loggedIn',
  initialState: {
    loggedIn: false,
  },
  reducers: {
    logIn: (state:any) => {
      state.loggedIn = true;
    },
    logOut: (state:any) => {
      state.loggedIn = false;
    },
  },
});

export const { logIn, logOut } = loggedInSlice.actions;
export default loggedInSlice.reducer;