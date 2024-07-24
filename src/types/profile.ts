interface SignUpFormValues {
    name: string;
    email: string;
    phone: string;
    password: string;
    confirmpassword: string;
  }

  interface SignInFormValues {
    email: string;
    password: string;
  }

  interface User {
    name: string;
    email: string;
    password: string;  // Using 'password' for consistent naming convention
    phone: string;
    wishlist: any[];   // Replace 'any' with the specific type if known
    cart: CartItem[];       
    myOrder: any[];    // Replace 'any' with the specific type if known
    isAdmin: boolean;
    _id?: number;
  }
  

  interface InitialUserStateRedux {
    kaviFoodUser: User | null;
    loading: boolean;
    error: boolean;
  }


  
  interface ShippingAddress {
    doorNo:string,
    street: string;
    city: string;
    state: string;
    postalCode: string;
    country?: string;
    landmark?: string;
  }

  

  interface CartItem {
    name: string;
    price: number;
    image: string;
    quantity: number;
    _id: number
    category: string;
    description: string;
    weight_in_grams: number;
  }

  interface GuestReduxInital{
    name: string | null
    mobile: string | null ;
    email: string | null;
    shippingAddress: ShippingAddress | null;
    cart: CartItem[] ;
  }
  
  interface GuestUser {
    name: string | null
    mobile: string;
    email: string;
    shippingAddress: ShippingAddress;
    cart: CartItem[];
  }
  