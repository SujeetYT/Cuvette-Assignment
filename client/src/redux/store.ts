import { configureStore } from '@reduxjs/toolkit'
import signUpReducer from './slices/signupStateSlice'
import isLoggedInReducer from './slices/loggedInSlice'

export const store = configureStore({
  reducer: {
    signupState: signUpReducer,
    isLoggedIn: isLoggedInReducer,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch