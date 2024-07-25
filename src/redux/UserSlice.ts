"use client";

import { InitialUserStateRedux } from "@/types/profile";
import { createSlice } from "@reduxjs/toolkit";

const initialState: InitialUserStateRedux = {
  kaviFoodUser: null,
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
    changeAddress: (state, action) => {},
    AddwishlistR: (state, action) => {},
    RemovewishlistR: (state, action) => {},
    AddUserCart: (state, action) => {
      if (state.kaviFoodUser) {
        const indexCart = state.kaviFoodUser.cart.findIndex(
          (prod) => prod._id === action.payload._id
        );
        if (indexCart !== -1) {
          state.kaviFoodUser.cart[indexCart].quantity += 1;
        } else {
          state.kaviFoodUser.cart.push(action.payload);
        }
      }
    },
    ReduceUserCartQuantity: (state, action) => {
      if (state.kaviFoodUser) {
        const indexCart = state.kaviFoodUser.cart.findIndex(
          (prod) => prod._id === action.payload._id
        );
        if (indexCart !== -1) {
          if (state.kaviFoodUser.cart[indexCart].quantity > 1) {
            state.kaviFoodUser.cart[indexCart].quantity -= 1;
          }
          //  else {
          //   state.kaviFoodUser.cart.splice(indexCart, 1);
          // }
        }
      }
    },
    RemoveUserCart: (state, action) => {
      if (state.kaviFoodUser) {
        const indexCart = state.kaviFoodUser.cart.findIndex(
          (prod) => prod._id === action.payload._id
        );
        if (indexCart !== -1) {
          state.kaviFoodUser.cart.splice(indexCart, 1);
        }
      }
    },
    EmptyUserCart: (state) => {
      if (state.kaviFoodUser) {
        state.kaviFoodUser.cart.length = 0;
      }
    },
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
  AddUserCart,
  RemoveUserCart,
  EmptyUserCart,
} = userSlice.actions;

export default userSlice.reducer;
