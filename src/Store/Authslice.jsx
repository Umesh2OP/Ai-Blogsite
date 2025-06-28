import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: false,
  userData: null,
    loading: true,

};

export const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    Login: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
        state.loading = false;

    },
    Logout: (state) => {
      state.status = false;
      state.userData = null;
        state.loading = false;

    },
  },
});

export const { Login, Logout } = authSlice.actions;

export default authSlice.reducer;
