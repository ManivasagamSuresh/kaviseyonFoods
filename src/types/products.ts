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


  interface Order {
    _id: string;
    name: string;
    quantity: number;
    deliveryAddress: string;
    orderTotal: string;
    orderStatus: string;
    image: string;
    productId: string;
    weight_in_grams: string;
    shippedToName:string;
    orderDate: string;
    trackingId?: string;
  }
  
  