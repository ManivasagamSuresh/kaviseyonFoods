"use client";

import { GuestReduxInitial } from "@/types/profile";
import { createSlice } from "@reduxjs/toolkit";

const initialState: GuestReduxInitial = {
  name: null,
  mobile: null,
  email: null,
  shippingAddress: null,
  cart: {
    totalPrice: 0,
    items: [],
  }, 
};

export const GuestSlice = createSlice({
  name: "guestUser",
  initialState,
  reducers: {
    AddPersonalDetails: (state, action) => {
      state.name = action.payload.name;
      state.mobile = action.payload.mobile;
      state.email = action.payload.email;
    },
    AddGuestCart: (state, action) => {
      const cartIndex = state.cart.items.findIndex((prod) => prod._id === action.payload._id);
      if (cartIndex !== -1) {
        state.cart.items[cartIndex].quantity += 1;
      } else {
        state.cart.items.push(action.payload);
      }
      state.cart.totalPrice += Number(action.payload.price); // Update totalPrice
    },
    ReduceGuestCartQuantity: (state, action) => {
      if (state.cart.items) {
        const cartIndex = state.cart.items.findIndex((prod) => prod._id === action.payload._id);
        if (cartIndex !== -1) {
          if (state.cart.items[cartIndex].quantity > 1) {
            state.cart.items[cartIndex].quantity -= 1;
            state.cart.totalPrice -= Number(state.cart.items[cartIndex].price); // Update totalPrice
          }
        }
      }
    },
    RemoveGuestCart: (state, action) => {
      if (state.cart.items) {
        const cartIndex = state.cart.items.findIndex((prod) => prod._id === action.payload._id);
        if (cartIndex !== -1) {
          state.cart.totalPrice -=
            +state.cart.items[cartIndex].price * state.cart.items[cartIndex].quantity; // Update totalPrice
          state.cart.items.splice(cartIndex, 1);
        }
      }
    },
    clearGuestUser: (state) => {
      state.name = null;
      state.mobile = null;
      state.email = null;
      state.shippingAddress = null;
      state.cart.totalPrice = 0;
      state.cart.items.length = 0;
    },
    EmptyGuestCart: (state) => {
      state.cart.totalPrice = 0;
      state.cart.items.length = 0;
    },
  },
});

export const {
  AddGuestCart,
  RemoveGuestCart,
  clearGuestUser,
  AddPersonalDetails,
  ReduceGuestCartQuantity,
  EmptyGuestCart,
} = GuestSlice.actions;

export default GuestSlice.reducer;
