"use client";

import { GuestReduxInitial } from "@/types/profile";
import { createSlice } from "@reduxjs/toolkit";

const initialState: GuestReduxInitial = {
  name: null,
  mobile: null,
  email: null,
  shippingAddress: null,
  cart: [],
};

export const GuestSlice = createSlice({
  name: "guestUser",
  initialState,
  reducers: {
    AddPersonalDetails: (state, action) => {},
    AddGuestCart: (state, action) => {
      console.log(action.payload);
      const cartIndex = state.cart.findIndex((prod) => prod._id === action.payload._id);
      if (cartIndex !== -1) {
        state.cart[cartIndex].quantity += 1;
      } else {
        state.cart.push(action.payload);
      }
    },
    ReduceGuestCartQuantity: (state, action) => {
      if (state.cart) {
        const cartIndex = state.cart.findIndex((prod) => prod._id === action.payload._id);
        if (cartIndex !== -1) {
          if (state.cart[cartIndex].quantity > 1) {
            state.cart[cartIndex].quantity -= 1;
          }
        }
      }
    },
    RemoveGuestCart: (state, action) => {
      if (state.cart) {
        const cartIndex = state.cart.findIndex((prod) => prod._id === action.payload._id);
        if (cartIndex !== -1) {
          state.cart.splice(cartIndex, 1);
        }
      }
    },
    EmptyGuestCart: (state) => {
      state.cart.length = 0;
    },
  },
});

export const {
  AddGuestCart,
  RemoveGuestCart,
  EmptyGuestCart,
  AddPersonalDetails,
  ReduceGuestCartQuantity,
} = GuestSlice.actions;

export default GuestSlice.reducer;
