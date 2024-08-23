"use client";
import OrderProduct from "@/Components/OrderProduct/OrderProduct";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";

function Page() {
  const { kaviFoodUser } = useSelector((state: any) => state.user);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);

  const orders: Order[] = [
    {
      _id: "1",
      deliveryAddress: {
        address: "anna nagar",
        city: "madurai",
        pincode: "600028",
        state: "Tamil Nadu",
        landmark: "near park",
      },
      orderTotal: "2300",
      orderStatus: "Shipped",
      trackingId: "27147657398",
      shippedToName: "Dhanalaksmi",
      orderDate: "03-08-2024",
      phoneNumber: "9566991210",
      email: "kaviseyonfoods@gmail.com",
      products: [
        {
          name: "ragi",
          image:
            "https://drive.google.com/file/d/1yP3s8ECiotn7caN4QhWzs8jSBVWSNDPV/view?usp=sharing",
          productId: "1",
          weight_in_grams: "200",
          quantity: 2,
        },
        {
          name: "Rice Moongdal Kichadi",
          image:
            "https://drive.google.com/file/d/1yP3s8ECiotn7caN4QhWzs8jSBVWSNDPV/view?usp=sharing",
          productId: "1",
          weight_in_grams: "200",
          quantity: 2,
        },
      ],
    },
    {
      _id: "1",
      deliveryAddress: {
        address: "anna nagar",
        city: "madurai",
        pincode: "600028",
        state: "Tamil Nadu",
        landmark: "near park",
      },
      orderTotal: "2300",
      orderStatus: "Shipped",
      trackingId: "27147657398",
      shippedToName: "Dhanalaksmi",
      orderDate: "03-08-2024",
      phoneNumber: "9566991210",
      email: "kaviseyonfoods@gmail.com",
      products: [
        {
          name: "Rice Moongdal Kichadi",
          image:
            "https://drive.google.com/file/d/1yP3s8ECiotn7caN4QhWzs8jSBVWSNDPV/view?usp=sharing",
          productId: "1",
          weight_in_grams: "200",
          quantity: 2,
        },
        {
          name: "Rice Moongdal Kichadi",
          image:
            "https://drive.google.com/file/d/1yP3s8ECiotn7caN4QhWzs8jSBVWSNDPV/view?usp=sharing",
          productId: "1",
          weight_in_grams: "200",
          quantity: 2,
        },
      ],
    },
    {
      _id: "132187878128939800564",
      deliveryAddress: {
        address: "anna nagar",
        city: "madurai",
        pincode: "600028",
        state: "Tamil Nadu",
        landmark: "near park",
      },
      orderTotal: "2300",
      orderStatus: "Shipped",
      trackingId: "27147657398",
      shippedToName: "Dhanalaksmi",
      orderDate: "03-08-2024",
      phoneNumber: "9566991210",
      email: "kaviseyonfoods@gmail.com",
      products: [
        {
          name: "ragi",
          image:
            "https://drive.google.com/file/d/1yP3s8ECiotn7caN4QhWzs8jSBVWSNDPV/view?usp=sharing",
          productId: "1",
          weight_in_grams: "200",
          quantity: 2,
        },
        {
          name: "ragi",
          image:
            "https://drive.google.com/file/d/1yP3s8ECiotn7caN4QhWzs8jSBVWSNDPV/view?usp=sharing",
          productId: "1",
          weight_in_grams: "200",
          quantity: 2,
        },
      ],
    },
  ];
  useEffect(() => {
    if (!kaviFoodUser?.isAdmin) {
      router.push("/");
    }
  }, [kaviFoodUser]);

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col gap-10  px-5 md:px-10 lg:px-40 xl:px-80 py-10 lg:py-10 min-h-[calc(100vh-88px)] lg:min-h-[calc(100vh-104px)] xl:min-h-[calc(100vh-120px)] pageMountAnimation w-full max-w-[1850px]">
        <div className="text-2xl font-semibold tracking-wide">All Orders</div>
        {loading ? (
          <div className="h-96 w-full flex mt-28 lg:mt-20  justify-center">
            {" "}
            <SyncLoader
              color="#a5c667"
              loading={loading}
              margin={6}
              size={16}
              speedMultiplier={0.7}
            />{" "}
          </div>
        ) : (
          <>
            {orders.map((order: Order) => {
              return <OrderProduct order={order} key={`${order._id}`} />;
            })}
          </>
        )}
      </div>
    </div>
  );
}

export default Page;
