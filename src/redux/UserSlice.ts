'use client'

import { createSlice } from "@reduxjs/toolkit";

const initialState: InitialUserStateRedux = {
    kaviFoodUser:  null,
    loading: false,
    error: false,
  };

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.kaviFoodUser = action.payload;
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.kaviFoodUser = null;
      state.loading = false;
      state.error = false;
    },
    changeAddress: (state, action) => {
    },
    AddwishlistR: (state, action) => {
    },
    RemovewishlistR: (state, action) => {
    },
    AddcartR: (state, action) => {      
    },
    RemovecartR: (state, action) => {      
    },
    Emptycart: (state, action) => {      
    }
    
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  changeAddress,
  AddwishlistR,
  RemovewishlistR,
  AddcartR,
  RemovecartR,
} = userSlice.actions;

export default userSlice.reducer;