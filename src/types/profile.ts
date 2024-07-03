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
    cart: any[];       // Replace 'any' with the specific type if known
    myOrder: any[];    // Replace 'any' with the specific type if known
    isAdmin: boolean;
  }
  

  interface InitialUserStateRedux {
    kaviFoodUser: User | null;
    loading: boolean;
    error: boolean;
  }