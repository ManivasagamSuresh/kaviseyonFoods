"use client";
import OrderProduct from "@/Components/OrderProduct/OrderProduct";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { SyncLoader } from "react-spinners";
import { toast } from "react-toastify";

function Page() {
  const { kaviFoodUser } = useSelector((state: any) => state.user);
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [orders, setOrders] = useState<Order[]>([]);

  const getAllOrders = async () => {
    try {
      setLoading(true);
      const payload = { params: { action: "getAllOrders" } };
      const orders = await axios.get("api/OrdersAPI", payload);
      setOrders(orders.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error("Something Went Wrong Please try Again");
      router.push("/");
    }
  };

  useEffect(() => {
    if (!kaviFoodUser?.isAdmin) {
      router.push("/");
    }
  }, [kaviFoodUser]);

  useEffect(() => {
    if (kaviFoodUser?.isAdmin) {
      getAllOrders();
    }
  }, []);

  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col gap-10  px-5 md:px-10 lg:px-40 xl:px-80 py-10 lg:py-10 min-h-[calc(100vh-88px)] lg:min-h-[calc(100vh-104px)] xl:min-h-[calc(100vh-120px)] pageMountAnimation w-full max-w-[1850px]">
        <div className="text-2xl font-semibold tracking-wide">All Orders</div>
        {loading ? (
          <div className="h-96 w-full flex mt-28 lg:mt-20 justify-center">
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
            {orders.length === 0 ? (
              <div className="text-base text-themeColorDark h-96 w-full text-center ">
                Hang in there, Dhana! Your orders are like fine wine—they just need a little time,
                and then they'll bring a big smile!
              </div>
            ) : (
              <>
                {orders.map((order: Order) => {
                  return <OrderProduct order={order} key={`${order._id}`} setOrders={setOrders} />;
                })}
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Page;
