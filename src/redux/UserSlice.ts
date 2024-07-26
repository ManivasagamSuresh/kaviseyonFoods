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
      console.log("AddUserCart action.payload:", action.payload);
      if (state.kaviFoodUser) {
        const indexCart = state.kaviFoodUser.cart.items.findIndex(
          (prod) => prod._id === action.payload._id
        );
        console.log("indexCart:", indexCart);
        if (indexCart !== -1) {
          state.kaviFoodUser.cart.items[indexCart].quantity += 1;
        } else {
          state.kaviFoodUser.cart.items.push(action.payload);
        }
        state.kaviFoodUser.cart.totalPrice += action.payload.price;
      }
    },
    ReduceUserCartQuantity: (state, action) => {
      if (state.kaviFoodUser) {
        const indexCart = state.kaviFoodUser.cart.items.findIndex(
          (prod) => prod._id === action.payload._id
        );
        if (indexCart !== -1) {
          if (state.kaviFoodUser.cart.items[indexCart].quantity > 1) {
            state.kaviFoodUser.cart.items[indexCart].quantity -= 1;
            state.kaviFoodUser.cart.totalPrice -= state.kaviFoodUser.cart.items[indexCart].price;
          }
        }
      }
    },
    RemoveUserCart: (state, action) => {
      if (state.kaviFoodUser) {
        const indexCart = state.kaviFoodUser.cart.items.findIndex((prod) => {
          return prod._id === action.payload._id;
        });
        if (indexCart !== -1) {
          state.kaviFoodUser.cart.totalPrice -= state.kaviFoodUser.cart.items[indexCart].price * state.kaviFoodUser.cart.items[indexCart].quantity;
          state.kaviFoodUser.cart.items.splice(indexCart, 1);
        }
      }
    },
    EmptyUserCart: (state) => {
      if (state.kaviFoodUser) {
        state.kaviFoodUser.cart.items.length = 0;
        state.kaviFoodUser.cart.totalPrice = 0;
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
  ReduceUserCartQuantity,
  RemoveUserCart,
  EmptyUserCart,
} = userSlice.actions;

export default userSlice.reducer;
