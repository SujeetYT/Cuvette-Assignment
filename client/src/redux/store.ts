import { configureStore } from '@reduxjs/toolkit'
import signUpReducer from './slices/signupStateSlice'
import isLoggedInReducer from './slices/loggedInSlice'
import loginReducer from './slices/loginStateSlice'

export const store = configureStore({
  reducer: {
    signupState: signUpReducer,
    isLoggedIn: isLoggedInReducer,
    loginState: loginReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch