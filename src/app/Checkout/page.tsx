"use client";
import CheckoutProduct from "@/Components/CheckoutProduct/CheckoutProduct";
import { changeAddress } from "@/redux/UserSlice";
import { CartItem } from "@/types/profile";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { LiaEditSolid } from "react-icons/lia";
import { LuSave } from "react-icons/lu";

function page() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { cart } = useSelector((state: any) => state.guestUser);
  const { kaviFoodUser } = useSelector((state: any) => state.user);
  const [address, setAddress] = useState({address:"", city:"", pincode:"", state:"", landmark:""})
  const [editAddress, setEditAddress] = useState<boolean>(false)
  

  const dispatch = useDispatch()
  //   const router = useRouter();

  //   const navigateToCheckout = () =>{
  //     router.push('/Checkout')
  //   }


  function handleAddressChange(e: any) {
    console.log(e.target.name, 
       e.target.value )
    setAddress({ ...address, [e.target.name]: e.target.value });
  }

  const handleProceedtoPay = () => {
    dispatch(changeAddress(address));
  };

  const handleEditAddress = ()=>{
    setEditAddress(!editAddress);
  }


  useEffect(() => {
    if (kaviFoodUser) {
      setCartItems(kaviFoodUser.cart.items);
    } else {
      setCartItems(cart.items);
    }
  }, [kaviFoodUser, cart]);

  return (
    <div className="flex justify-center  pageMountAnimation w-full ">
      <div className="flex  flex-col-reverse lg:flex-row p-4 lg:p-16 w-full max-w-[1850px] min-h-[calc(100vh-88px)] lg:min-h-[calc(100vh-104px)] xl:min-h-[calc(100vh-120px)]">
        <div className="w-full lg:w-1/2 flex flex-col gap-5 p-6 md:px-20 md:py-8  lg:py-4 lg:px-12 xl:pl-32 xl:pr-20">
          <div className="flex flex-col gap-4">
            <div className="text-lg lg:text-xl font-semibold">Contact :</div>
            {kaviFoodUser ?<div className=""> <div>Phone: {kaviFoodUser.phone} </div>  <div>Email: {kaviFoodUser.email} </div> </div>: <><input
              type="text"
              placeholder="Phone number"
              className="border border-themeColorDark py-2 px-5 rounded-md w-full outline-none"
            />
            <input
              type="text"
              placeholder="Email"
              className="border border-themeColorDark py-2 px-5 rounded-md w-full outline-none"
            />
            </>}
            
            <div className="text-xs text-lightGrey">You may receive text messages related to order confirmation and shipping updates.</div>
          </div>
          <div className="flex gap-4 flex-col">
            <div className="text-lg lg:text-xl font-semibold flex gap-2 items-center h-fit">Delivery Address {kaviFoodUser  && !editAddress ? <LiaEditSolid onClick={handleEditAddress}/>: <LuSave onClick={handleEditAddress}/> }</div>
            { 
            kaviFoodUser && !editAddress ? <>
              <div className="flex flex-col gap-1">
              <div>{ `${kaviFoodUser.address},  ${kaviFoodUser.city} ` } </div>
              <div>{`${kaviFoodUser.state} - ${kaviFoodUser.pincode}`}</div>
              <div>{`Landmark: ${kaviFoodUser.landmark}`}</div>
              </div>
            </> :
            <>
            <input
              type="text"
              placeholder="Address"
              name= "address"
              className="border border-themeColorDark py-2 px-5 rounded-md outline-none"
              onChange={handleAddressChange}
            />
            <input
              type="text"
              placeholder="Landmark (Optional)"
              name= "landmark"
              className="border border-themeColorDark py-2 px-5 rounded-md outline-none"
              onChange={handleAddressChange}
            />
            <div className="flex flex-col lg:flex-row  gap-4 lg:gap-2">
              <input
                type="text"
                name= "city"
                placeholder="City"
                className="border border-themeColorDark py-2 px-5 rounded-md w-full lg:w-1/3  outline-none"
                onChange={handleAddressChange}
              />
              <input
                type="text"
                placeholder="State"
                 name= "state"
                className="border border-themeColorDark py-2 px-5 rounded-md w-full lg:w-1/3 outline-none"
                onChange={handleAddressChange}
              />
              <input
                type="text"
                placeholder="Pincode"
                 name= "pincode"
                className="border border-themeColorDark py-2 px-5 rounded-md w-full lg:w-1/3 outline-none"
                onChange={handleAddressChange}
              />
              </div>
            </>
            }
            
          </div>
          <div className="bg-themeColorDark text-milkWhite text-center px-20 py-3 rounded-md text-lg lg:text-xl font-semibold" onClick={handleProceedtoPay}>
            Pay Now
          </div>
        </div>
        <div className="w-full lg:w-1/2 bg-themeColorLight flex flex-col gap-4 lg:gap-6 p-6 md:px-20 md:py-8  lg:py-4 lg:px-12 xl:pr-32 xl:pl-20">
          <div className="text-lg lg:text-xl font-semibold">Order Summary</div>
          <div className="flex flex-col gap-5">
          {cartItems.map((item: CartItem) => (
              <CheckoutProduct key={`${item._id}`} item={item} />
            ))}
          </div>
          <div className="flex flex-col gap-1 mt-5">

          <div className="flex justify-between"><span>Subtotal</span> <span className="flex items-center h-fit"><LiaRupeeSignSolid className="w-[14px] h-[14px] lg:w-4 lg:h-4" /> {kaviFoodUser ? kaviFoodUser.cart.totalPrice  : cart.totalPrice}</span></div>
          <div className="flex justify-between"><span>Shipping Cost</span> <span className="flex items-center h-fit"><LiaRupeeSignSolid className="w-[14px] h-[14px] lg:w-4 lg:h-4" /> 50</span></div>
        <div className="flex justify-between"><span className="text-xl font-semibold">Total</span> <span className="text-xl font-semibold flex items-center h-fit"><LiaRupeeSignSolid className="w-[14px] h-[14px] lg:w-4 lg:h-4" /> {kaviFoodUser ? kaviFoodUser.cart.totalPrice + 50  : cart.totalPrice + 50}</span> </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
