interface Product {
  _id?: string;
  name: string;
  price: number;
  category: string;
  weight_in_grams: number;
  image: string;
  description: string;
  productImage:string
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
  name: string;
  orderDate: string;
  mobile: string;
  email: string;
  products: OrderProduct[];
  razorpay_order_id: string;
  razorpay_paymentId: string;
}

interface OrderPaymentData {
  amount: number; 
  currency: string; 
  receipt: string;
}
