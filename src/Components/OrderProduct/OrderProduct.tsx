"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { TbEdit } from "react-icons/tb";
import { LuSave } from "react-icons/lu";
import { LiaRupeeSignSolid } from "react-icons/lia";

import { useSelector } from "react-redux";
import axios from "axios";

const OrderProduct: React.FC<OrderProductProps> = ({ order, setOrders }) => {
  const [orderState, setOrderState] = useState<Order>(order);
  const [editmode, setEditMode] = useState<boolean>(false);
  const { kaviFoodUser } = useSelector((state: any) => state.user);

  const getImageSrc = (url: string) => {
    const id = url.match(/[-\w]{25,}/);
    return id ? `https://drive.google.com/uc?export=view&id=${id[0]}` : url;
  };

  const setStatusValue = (e: any) =>{
        setOrderState({...orderState,orderStatus: e.target.value })
   
  }
  const updateTrackingId = (e: any)=>{
    // console.log(e.target.value);
    setOrderState({...orderState, trackingId: e.target.value })
  }

  const handleSaveOrderStatus = async() => {
    try {
      setEditMode(false);
      const payload =  {_id: orderState._id , orderStatus: orderState.orderStatus, trackingId:
        orderState.orderStatus === "Shipped" && orderState.trackingId }
      const updateStatus = await axios.patch("api/OrdersAPI",payload)
      console.log(updateStatus);
      setOrders((prevOrders: Order[]) =>
        prevOrders.map((o) =>
          o._id === orderState._id
            ? {
                ...o,
                orderStatus: orderState.orderStatus,
                trackingId:
                  orderState.orderStatus === "Shipped" ? orderState.trackingId : o.trackingId,
              }
            : o
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setOrderState(order);
  }, []);

  return (
    <div className="border rounded-lg shadow-lg">
      <div className="top bg-themeColorLight px-3 md:px-5 py-2 flex justify-between rounded-t-lg">
        <div className="w-full md:w-1/2  flex flex-col md:flex-row gap-2 md:gap-10 py-1">
        <div className="flex gap-8">
          <div className="flex flex-row text-xs md:text-base gap-1 ">
            <span className="font-semibold ">ORDER PLACED: </span>
            <span>{orderState.orderDate}</span>
          </div>
          <div className="flex flex-row text-xs md:text-base gap-0 md:gap-1">
            <span className="font-semibold">TOTAL: </span>
            <span className="flex items-center "><LiaRupeeSignSolid className="text-xs ml-2 md:ml-0"/> {orderState.orderTotal}</span>
          </div>
          </div>
          <div className="w-full text-[10px] md:text-base md:hidden">Order Id: {orderState._id}</div>          
        </div>
        <div className="text-[10px] md:text-base hidden md:block">Order Id: {orderState._id}</div>
      </div>
      <div className="flex flex-col gap-2 py-3 px-3 md:px-5">
        <div className="flex justify-between">
        <div className="flex gap-5">
          { !editmode ? (
            <div>
              <div><span className="font-semibold">Order Status: </span>{orderState.orderStatus}</div>
              {orderState.orderStatus !== "Delivered" && (
                <div className="text-sm w-64 overflow-hidden">
                  {orderState.trackingId && orderState.orderStatus === "Shipped"
                    ? <a href={`${orderState.trackingId}`} target="_blank" className="underline">{`Tracking Link: ${orderState.trackingId}`}</a>
                    : "Tracking Link Will be updated Soon"}
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="">
                 <span className="font-semibold">Order Status:{" "}</span> 
                
                  <select name="" id="" value={orderState.orderStatus} onChange={setStatusValue}>
                    <option value="Delivered">Delivered</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Yet To Dispatch">Yet To Dispatch</option>
                  </select>
            
              </div>
              {orderState.orderStatus === 'Shipped' && <div className="text-sm md:text-base " >Tracking Link: <input type="text" className="border-b border-themeColorDark px-4 py-1" onChange={updateTrackingId} value={orderState.trackingId? orderState.trackingId : ''}/></div>}
            </div>
          )}
        {
            kaviFoodUser?.isAdmin && editmode === false ?  <TbEdit className="cursor-pointer" onClick={()=>setEditMode(true)}/> : <></>
        }
        {
                kaviFoodUser?.isAdmin && editmode ? <LuSave className="cursor-pointer" onClick={()=>handleSaveOrderStatus()}/> : <></>
        }
        
          </div>
          <div className="md:flex flex-col w-48 hidden">
            <span className="font-semibold">Ship To</span>
            <span>{orderState.name}</span>
          </div>
        </div>
        <div className="flex justify-between md:flex-row flex-col gap-2 md:gap-0">
            <div className="flex flex-col gap-5">
         {
            orderState.products.map((prod)=>{
              console.log(prod)
                return <div className="flex gap-4">
                <div className="w-16 h-20 relative">
                  <Image src={getImageSrc(prod.image)} alt="Product Image" fill={true} />
                </div>
                <div className="flex flex-col gap-1">
                  <div>{prod.name}   <span className="text-xs text-lightGrey ml-2">{prod.weight_in_grams}gms </span></div>
                  <div className="text-sm text-lightGrey"> Quantity: {prod.quantity}</div>
                </div>
              </div> 
            })
         }  
         </div>
          <div className="text-sm w-full  md:w-48">
          <div className="flex gap-2 md:gap-0 md:flex-col md:hidden">
            <span className="font-semibold">Ship to</span>
            <span>{orderState.name}</span>
          </div>
            <div className="flex md:flex-col flex-wrap"> <span className="font-semibold mr-2">Delivery Address:  </span><span className="flex flex-wrap">{`${orderState.deliveryAddress.address} ${orderState.deliveryAddress.city} - ${orderState.deliveryAddress.pincode} ${orderState.deliveryAddress.state}`}</span> </div>
            
            <div> <span className="font-semibold"> Contact No: </span> {orderState.mobile}</div>
            <div> <span className="font-semibold"> Email: </span> {orderState.email}</div>
          </div>
        </div>
      </div>
      {/* <div></div> */}
    </div>
  );
};

export default OrderProduct;
