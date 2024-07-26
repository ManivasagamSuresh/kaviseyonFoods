import { AddGuestCart, ReduceGuestCartQuantity, RemoveGuestCart } from "@/redux/GuestSlice";
import { AddUserCart, ReduceUserCartQuantity, RemoveUserCart } from "@/redux/UserSlice";
import { CartItem } from "@/types/profile";
import Image from "next/image";
import React from "react";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

interface ProductComponentProps {
  prod: CartItem;
}

const CartProduct: React.FC<ProductComponentProps> = ({ prod }) => {
  const dispatch = useDispatch();
  const { kaviFoodUser } = useSelector((state: any) => state.user);

  const getImageSrc = (url: string) => {
    const id = url.match(/[-\w]{25,}/);
    return id ? `https://drive.google.com/uc?export=view&id=${id[0]}` : url;
  };

  const reduceQuantityCount = () => {
    if (kaviFoodUser) {
      if (prod.quantity > 1) {
        dispatch(ReduceUserCartQuantity(prod));
      }
    } else {
      if (prod.quantity > 1) {
        dispatch(ReduceGuestCartQuantity(prod));
      }
    }
  };

  const addQuantityCount = () => {
    if (kaviFoodUser) {
      dispatch(AddUserCart({ ...prod, quantity: 1 }));
    } else {
      dispatch(AddGuestCart({ ...prod, quantity: 1 }));
    }
  };

  const removeCart = () => {
    if (kaviFoodUser) {
      dispatch(RemoveUserCart(prod));
    } else {
      dispatch(RemoveGuestCart(prod));
    }
  };

  return (
    <div className="flex my-2 lg:my-4">
      <div className="w-9/12 md:w-6/12 lg:w-7/12 flex gap-5 lg:gap-6">
        <div className="w-4/12 lg:w-3/12">
          <div className="w-24 h-28 lg:w-24 lg:h-28 2xl:w-32 2xl:h-40 relative">
            <Image src={getImageSrc(prod.image)} alt="Product Image" fill={true} />
          </div>
        </div>
        <div className="flex flex-col gap-4 px-1">
          <div className="flex flex-col gap-1 pr-1 md:pr-0">
            <div className="text-sm md:text-base 2xl:text-lg">{prod.name}</div>
            <div className="flex text-sm md:text-base 2xl:text-lg items-center">
              <LiaRupeeSignSolid className="w-[14px] h-[14px] lg:w-4 lg:h-4" /> {prod.price}
            </div>
          </div>
          <div className="flex gap-4 items-center h-fit md:hidden">
            <div className="border flex items-center justify-around h-fit py-0 w-20">
              <span className="cursor-pointer">-</span>
              <span className="text-base 2xl:text-lg">{prod.quantity}</span>
              <span className="cursor-pointer">+</span>
            </div>
            <RiDeleteBin6Line className="" />
          </div>
        </div>
      </div>
      <div className="hidden md:flex md:w-4/12 lg:w-3/12 px-2 gap-2 items-center h-fit">
        <div className="border flex items-center justify-around h-fit py-1 w-16 md:w-20 lg:w-24">
          <span className="cursor-pointer text-xl" onClick={reduceQuantityCount}>
            -
          </span>
          <span className="text-base 2xl:text-lg">{prod.quantity}</span>
          <span className="cursor-pointer" onClick={addQuantityCount}>
            +
          </span>
        </div>
        <RiDeleteBin6Line className="" onClick={removeCart}/>
      </div>
      <div className="w-3/12 md:w-2/12 flex items-center h-fit">
        <LiaRupeeSignSolid className="w-[14px] h-[14px] lg:w-4 lg:h-4" />{" "}
        <span className="xl:text-lg 2xl:text-xl">{prod.price * prod.quantity }</span>
      </div>
    </div>
  );
};

export default CartProduct;
