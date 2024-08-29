"use client";
import OrderProduct from "@/Components/OrderProduct/OrderProduct";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import { toast } from "react-toastify";

function page() {
  const router = useRouter();
  const urlPath = usePathname();
  const [order, setOrder] = useState<Order>();
  // const { kaviFoodUser } = useSelector((state: any) => state.user);
  const [loading,setLoading] = useState<boolean>(false);

  const handleNavigation = (url: string) => {
    router.push(`/${url}`);
  };

  const handleGetOrderSummary = async () => {
    const orderId = urlPath.slice(14);
    try {
      setLoading(true);
      const payload = { params: { OrderId: orderId, action: "getOrder" } };
      const getOrder = await axios.get(`/api/OrdersAPI`, payload);
      if (getOrder) {
        setOrder(getOrder.data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      toast.error("Oops! Something Went Wrong. Please Go to Home");
    }
  };


  useEffect(() => {
    handleGetOrderSummary();
  }, []);
  
  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col gap-10 px-5 md:px-10 lg:px-40 xl:px-80 py-10 lg:py-10  min-h-[calc(100vh-88px)] lg:min-h-[calc(100vh-104px)] xl:min-h-[calc(100vh-120px)]  w-full max-w-[1850px]">
        
            <div className=" text-center w-full">
              <div className="text-lg md:text-2xl text-themeColorDark font-semibold">
                Order Confirmed! We’re Getting It Ready for You
              </div>
              <div
                onClick={() => {
                  handleNavigation("");
                }}
                className="underline cursor-pointer text-lightGrey text-sm"
              >
                Go to Home
              </div>
            </div>
            <div>
              <h1 className="text-2xl mb-4 text-themeColorDark">Order Summary</h1>
              {!loading && order ? (
                <OrderProduct order={order} />
              ) : (
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
              )}
            </div>
          
      </div>
    </div>
  );
}

export default page;
