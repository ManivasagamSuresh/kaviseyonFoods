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
  const [Bufferloading,setBufferLoading] = useState<boolean>(false);

  const handleNavigation = (url: string) => {
    router.push(`/${url}`);
  };

  const handleGetOrderSummary = async () => {
    const orderId = urlPath.slice(14);
    try {
      const payload = { params: { OrderId: orderId, action: "getOrder" } };
      const getOrder = await axios.get(`/api/OrdersAPI`, payload);
      if (getOrder) {
        setOrder(getOrder.data);
      }
    } catch (error) {
      toast.error("Oops! Something Went Wrong. Please Go to Home");
    }
  };

  const handleBufferLoading = async()=>{
    const setLoading = await setTimeout(()=>{
      setBufferLoading(false)
    },3000)
  }

  useEffect(() => {
    // handleBufferLoading();
    handleGetOrderSummary();
  }, []);
// TODO FIX THAT ONLOADING API ISSUE
  // TODO add text like please signup to check your order details.
  return (
    <div className="w-full flex justify-center">
      <div className="flex flex-col gap-10 px-5 md:px-10 lg:px-40 xl:px-80 py-10 lg:py-10  min-h-[calc(100vh-88px)] lg:min-h-[calc(100vh-104px)] xl:min-h-[calc(100vh-120px)]  w-full max-w-[1850px]">
        
        {
Bufferloading ? <div>
  <SyncLoader
                color="#a5c667"
                loading={true}
                margin={6}
                size={16}
                speedMultiplier={0.7}
              />
</div> : <>
        
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
          {order ? (
            <OrderProduct order={order} />
          ) : (
            <div className="h-96 w-full flex mt-28 lg:mt-20  justify-center">
              {" "}
              <SyncLoader
                color="#a5c667"
                loading={true}
                margin={6}
                size={16}
                speedMultiplier={0.7}
              />{" "}
            </div>
          )}
        </div>
        </> 
        }
        
      </div>
    </div>
  );
}

export default page;
