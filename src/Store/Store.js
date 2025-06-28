import { configureStore } from '@reduxjs/toolkit'
import authReducer from "./Authslice"

export const store = configureStore({
  reducer: {
        Auth: authReducer,

    
  },
});

export default store;