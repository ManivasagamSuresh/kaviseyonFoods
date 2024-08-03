import OrderProduct from "@/Components/OrderProduct/OrderProduct";
import React from "react";

function Page() {
  const orders: Order[] =[{
    _id:'1',
    name:"ragi",
    quantity: 2,
    deliveryAddress:'anna nagar madurai',
    orderTotal:"2300",
    orderStatus:"Shipped",
    image:"https://drive.google.com/file/d/1yP3s8ECiotn7caN4QhWzs8jSBVWSNDPV/view?usp=sharing",
    productId:"1",
    weight_in_grams:"200",
    trackingId:"27147657398",
    shippedToName:"Dhanalaksmi",
    orderDate:"03-08-2024",
  },
  {
    _id:'2',
    name:"ragi2",
    quantity: 1,
    deliveryAddress:'anna nagar madurai',
    orderTotal:"2300",
    orderStatus:"Not yet dispatched",
    image:"https://drive.google.com/file/d/1yP3s8ECiotn7caN4QhWzs8jSBVWSNDPV/view?usp=sharing",
    productId:"1",
    weight_in_grams:"200",
    trackingId:"",
    shippedToName:"Dhanalaksmi",
    orderDate:"03-08-2024",
  },
  {
    _id:'3',
    name:"ragi3",
    quantity: 1,
    deliveryAddress:'marathahalli, banglore',
    orderTotal:"123",
    orderStatus:"Delivered",
    image:"https://drive.google.com/file/d/1yP3s8ECiotn7caN4QhWzs8jSBVWSNDPV/view?usp=sharing",
    productId:"2",
    weight_in_grams:"150",
    trackingId:"234132332434",
    shippedToName:"Mani",
    orderDate:"03-08-2024"
  },
]
  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col gap-10 px-5 lg:px-60 py-10 lg:py-10 min-h-[calc(100vh-88px)] lg:min-h-[calc(100vh-104px)] xl:min-h-[calc(100vh-120px)] pageMountAnimation w-full max-w-[1850px]">
        <div className="text-2xl font-semibold tracking-wide">My Orders</div>
      {
        orders.map((order:Order)=>{
          return <OrderProduct order={order} key={`${order._id}`}/>
        })
      }
      </div>
    </div>
  );
}

export default Page;
