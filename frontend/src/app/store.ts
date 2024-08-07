import { configureStore } from "@reduxjs/toolkit";
import { vehicleApi } from "../features/api/vehiclesApi";
import userLoginSlice from "../features/login/userLoginSlice";
import adminLoginSlice from "../features/login/adminLoginSlice";
export const store = configureStore({
  reducer: {
    loginUser: userLoginSlice,
    loginAdmin: adminLoginSlice,
    [vehicleApi.reducerPath]: vehicleApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(vehicleApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
