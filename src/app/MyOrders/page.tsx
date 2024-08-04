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
    phoneNumber: "9566991210",
    email: "kaviseyonfoods@gmail.com"
  },
  {
    _id:'2',
    name:"ragi2",
    quantity: 1,
    deliveryAddress:'anna nagar madurai',
    orderTotal:"2300",
    orderStatus:"Yet To Dispatch",
    image:"https://drive.google.com/file/d/1yP3s8ECiotn7caN4QhWzs8jSBVWSNDPV/view?usp=sharing",
    productId:"1",
    weight_in_grams:"200",
    trackingId:"",
    shippedToName:"Dhanalaksmi",
    orderDate:"03-08-2024",
    phoneNumber: "9566991210",
    email: "kaviseyonfoods@gmail.com"
  },
  {
    _id:'66a338284feff3439b080215',
    name:"ragi3 powder for kids",
    quantity: 1,
    deliveryAddress:'marathahalli, spice garden, banglore',
    orderTotal:"123",
    orderStatus:"Delivered",
    image:"https://drive.google.com/file/d/1yP3s8ECiotn7caN4QhWzs8jSBVWSNDPV/view?usp=sharing",
    productId:"2",
    weight_in_grams:"150",
    trackingId:"234132332434",
    shippedToName:"Mani",
    orderDate:"03-08-2024",
    phoneNumber: "+919566991210",
    email: "kaviseyonfoods@gmail.com"
  },
]
  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col gap-10 px-5 md:px-10 lg:px-40 xl:px-80 py-10 lg:py-10 min-h-[calc(100vh-88px)] lg:min-h-[calc(100vh-104px)] xl:min-h-[calc(100vh-120px)] pageMountAnimation w-full max-w-[1850px]">
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
