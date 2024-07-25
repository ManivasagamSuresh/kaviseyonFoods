// src/types.ts
import { ObjectId } from 'mongodb';

export interface SignUpFormValues {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmpassword: string;
}

export interface SignInFormValues {
  email: string;
  password: string;
}

export interface User {
  name: string;
  email: string;
  password: string;
  phone: string;
  wishlist: any[];   // Replace 'any' with the specific type if known
  cart: CartItem[];
  myOrder: any[];    // Replace 'any' with the specific type if known
  isAdmin: boolean;
  _id?: ObjectId;    // Use ObjectId type from mongodb package
}

export interface InitialUserStateRedux {
  kaviFoodUser: User | null;
  loading: boolean;
  error: boolean;
}

export interface ShippingAddress {
  doorNo: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country?: string;
  landmark?: string;
}

export interface CartItem {
  name: string;
  price: number;
  image: string;
  quantity: number;
  _id: ObjectId;      // Use ObjectId type from mongodb package
  category: string;
  description: string;
  weight_in_grams: number;
}

export interface GuestReduxInitial {
  name: string | null;
  mobile: string | null;
  email: string | null;
  shippingAddress: ShippingAddress | null;
  cart: CartItem[];
}

export interface GuestUser {
  name: string | null;
  mobile: string;
  email: string;
  shippingAddress: ShippingAddress;
  cart: CartItem[];
}
