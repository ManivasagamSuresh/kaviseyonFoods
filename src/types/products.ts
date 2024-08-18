interface Product {
    _id?:string
    name: string;
    price: number;
    category: string;
    weight_in_grams: number;
    image: string;
    description: string;
}


interface CartProduct {
    name: string;
    price: number;
    image: string;
    quantity: number;
  }


  interface OrderProduct {
    name: string;
    image: string;
    productId: string;
    weight_in_grams: string;
    quantity: number;
  }


  interface DelAddress {
    address: string;
    city: string;
    pincode: string;
    state: string;
    landmark?: string;
  }
  
  
  interface Order {
    _id: string;
    deliveryAddress: DelAddress;
    orderTotal: string;
    orderStatus: string;
    trackingId: string;
    shippedToName: string;
    orderDate: string;
    phoneNumber: string;
    email: string;
    products: OrderProduct[];
  }
  
  