import Image from "next/image";
import React from "react";

const OrderProduct: React.FC<OrderProductProps> = ({ order }) => {
  const getImageSrc = (url: string) => {
    const id = url.match(/[-\w]{25,}/);
    return id ? `https://drive.google.com/uc?export=view&id=${id[0]}` : url;
  };

  return (
    <div className="border rounded-lg">
      <div className="top bg-themeColorLight px-5 py-1">
        <div className="w-1/2 flex gap-10">
          <div className="flex flex-col">
            <span>ORDER PLACED</span>
            <span>{order.orderDate}</span>
          </div>
          <div className="flex flex-col">
            <span>TOTAL</span>
            <span>{order.orderTotal}</span>
          </div>
          <div className="flex flex-col">
            <span>SHIP TO</span>
            <span>{order.shippedToName}</span>
          </div>
        </div>
      </div>
      <div className="bottom flex flex-col gap-2 py-3 px-5">
        <div>
          <div className="">Order Status: {order.orderStatus}</div>
          {order.orderStatus !== "Delivered" && (
            <div>
              
              {order.trackingId ? `Tracking ID: ${order.trackingId}` : "Tracking Id Will be updated Soon"}
            </div>
          )}
        </div>
        <div className="flex justify-between">

        <div className="flex ">
          <div className="w-12 h-16 relative">
            <Image src={getImageSrc(order.image)} alt="Product Image" fill={true} />
          </div>
          <div className="flex flex-col gap-2">
          <div>{order.name}</div>
          <div>Quantity: {order.quantity}</div>
          </div>
        </div>
        <div>
          <div>Delivery Address</div>
          <div>{order.deliveryAddress}</div>
        </div>
      </div>
        </div>
      {/* <div></div> */}
    </div>
  );
};

export default OrderProduct;
