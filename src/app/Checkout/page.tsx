"use client";
import CheckoutProduct from "@/Components/CheckoutProduct/CheckoutProduct";
import { changeAddress, EmptyUserCart } from "@/redux/UserSlice";
import { CartItem } from "@/types/profile";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { useDispatch, useSelector } from "react-redux";
import { LiaEditSolid } from "react-icons/lia";
import { LuSave } from "react-icons/lu";
import { AddPersonalDetails, EmptyGuestCart } from "@/redux/GuestSlice";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import axios from "axios";

function page() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { cart, name, mobile, email } = useSelector((state: any) => state.guestUser);
  const { kaviFoodUser } = useSelector((state: any) => state.user);
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingAdd, setLoadingAdd] = useState<boolean>(false);
  const [contact, setContact] = useState({
    name: "",
    mobile: "",
    email: "",
  });
  const [address, setAddress] = useState({
    address: "",
    city: "",
    pincode: "",
    state: "",
    landmark: "",
  });
  const [editAddress, setEditAddress] = useState<boolean>(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleNavigation = (url: string) => {
    router.push(`/${url}`);
  };

  function handleAddressChange(e: any) {
    console.log(e.target.name, e.target.value);
    setAddress({ ...address, [e.target.name]: e.target.value });
    if (kaviFoodUser) {
    } else {
    }
  }

  const handleSaveAddress = async () => {
    try {
      if (handleAddressValidations()) {
        handleEditAddress();
        setLoadingAdd(true);
        //TODO
        // Add API for editing and adding address
        const saveAddress = await axios.patch("/api/AuthenticationApi", {
          ...address,
          _id: kaviFoodUser._id,
        });
        console.log(saveAddress);
        dispatch(changeAddress(address));
        toast.success(saveAddress.data.message);
        setLoadingAdd(false);
      } else {
        return;
      }
    } catch (error) {
      setLoadingAdd(false);
      toast.success("Something went wrong, Try again after sometime");
    }
  };

  const handleAddressValidations = () => {
    if (kaviFoodUser) {
      if (!address.address) {
        toast.error("Address is required.");
        return false;
      }
      if (!address.city) {
        toast.error("City is required.");
        return false;
      }
      if (!address.state) {
        toast.error("State is required.");
        return false;
      }
      if (!address.pincode) {
        toast.error("Pincode is required.");
        return false;
      }
      return true;
    }
  };

  const handleValidations = () => {
    const validateEmail = (email: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const validateMobile = (mobile: string) => {
      const mobileRegex = /^[0-9]{10}$/;
      return mobileRegex.test(mobile);
    };

    if (kaviFoodUser) {
      if (!kaviFoodUser.address) {
        toast.error("Address is required.");
        return false;
      }
      if (!kaviFoodUser.city) {
        toast.error("City is required.");
        return false;
      }
      if (!kaviFoodUser.state) {
        toast.error("State is required.");
        return false;
      }
      if (!kaviFoodUser.pincode) {
        toast.error("Pincode is required.");
        return false;
      }
      return true;
    } else {
      if (!contact.name) {
        toast.error("Name is required.");
        return false;
      }

      if (!contact.mobile) {
        toast.error("Mobile number is required.");
        return false;
      }
      if (!validateMobile(contact.mobile)) {
        toast.error("Please enter a valid 10-digit mobile number.");
        return false;
      }
      if (!contact.email) {
        toast.error("Email is required.");
        return false;
      }
      if (!validateEmail(contact.email)) {
        toast.error("Please enter a valid email.");
        return false;
      }
      if (!address.address) {
        toast.error("Address is required.");
        return false;
      }
      if (!address.city) {
        toast.error("City is required.");
        return false;
      }
      if (!address.state) {
        toast.error("State is required.");
        return false;
      }
      if (!address.pincode) {
        toast.error("Pincode is required.");
        return false;
      }
      return true;
    }
  };

  const HandleEmptyCart = async() =>{
    if(kaviFoodUser){
      dispatch(EmptyUserCart());
      try {
         const payload = {
          _id: kaviFoodUser._id,
          action: 'EmptyCart'
         }
      const addCart = await axios.patch('/api/CartAPI', payload);

      } catch (error) {
        console.log(error);
      }
     
    }
    else{
      dispatch(EmptyGuestCart());
      
    }
  }

  const handleProceedtoPay = async () => {
    try {
      if (editAddress) {
        toast.error("Please Save the Delivery Address");
        return;
      }
      setLoading(true);
      if (!handleValidations()) {
        setLoading(false);
        return;
      }
      console.log(contact, address);
      const payload = {
        name: "",
        email: "",
        mobile: "",
        deliveryAddress: {},
        orderTotal: "",
        orderStatus: "",
        trackingId: "",
        orderDate: new Date().toLocaleDateString(), 
        products: [],
        paymentStatus: "Successfull",
        razorpay_order_id: "",
        razorpay_paymentId: "",
      };
      if (kaviFoodUser) {
        console.log(kaviFoodUser);

        dispatch(changeAddress(address));
        payload.name = kaviFoodUser.name;
        payload.email = kaviFoodUser.email;
        payload.mobile = kaviFoodUser.phone;
        payload.deliveryAddress = {
          address: kaviFoodUser.address,
          city: kaviFoodUser.city,
          pincode: kaviFoodUser.pincode,
          state: kaviFoodUser.state,
          landmark: kaviFoodUser.landmark,
        };
        payload.orderTotal = kaviFoodUser.cart.totalPrice + 50;
        payload.products = kaviFoodUser.cart.items;
      } else {
        dispatch(
          AddPersonalDetails({ name: contact.name, mobile: contact.mobile, email: contact.email })
        );
        payload.name = contact.name;
        payload.email = contact.email;
        payload.mobile = contact.mobile;
        payload.deliveryAddress = address;
        payload.orderTotal = cart.totalPrice + 50;
        payload.products = cart.items;
      }

      const receipt = `${kaviFoodUser?._id || contact.email}_${Date.now()}`;
      const orderData: OrderPaymentData = {
        amount: Number(payload.orderTotal), // Amount in the smallest currency unit (paise for INR)
        currency: "INR",
        receipt: receipt,
      };
      const { data } = await axios.post("/api/PaymentAPI", orderData);
      console.log(data);
      const options = {
        key: process.env.RAZORPAY_KEYID, // Use your Razorpay Key ID
        amount: data.amount,
        currency: data.currency,
        name: "Kavi Seyon Foods",
        description: "Total Transaction Amount",
        order_id: data.id,
        handler: async (response: any) => {
          // Success callback
          // TODO modify the order payment status in future -> successfull.
          // console.log('Payment successful', response);
          (payload.razorpay_order_id = response.razorpay_order_id),
            (payload.razorpay_paymentId = response.razorpay_payment_id);
          const placeOrder = await axios.post("/api/OrdersAPI", payload);
          console.log(placeOrder);
          toast.success("Order placed Successfull");
          setLoading(false);
         HandleEmptyCart();
         handleNavigation('OrderSummary')
         // TODO NAVIGATE TO ORDER SUMMARY PAGE
          // TODO add nodemailer for sending mails to user and admin
          // Here you can update the payment status in your database
        },
        prefill: {
          name: kaviFoodUser ? kaviFoodUser.name : contact.name,
          email: kaviFoodUser ? kaviFoodUser.email : contact.email,
          contact: kaviFoodUser ? kaviFoodUser.phone : contact.mobile,
        },
        notes: {
          address: "Kaviseyon Foods Office",
        },
        theme: {
          color: "#3399cc",
        },
        modal: {
          ondismiss: () => {
            setLoading(false);
            toast.error("Payment was cancelled or failed. Please try again.");
          },
        },
      };

      var pay = new window.Razorpay(options);
      pay.on("payment.failed", function (response: any) {
        setLoading(false);
        toast.error("Payment failed. Please try again.");
      });
      pay.open();
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const handleEditAddress = () => {
    setEditAddress(!editAddress);
  };

  const handleContactChange = (e: any) => {
    const { name, value } = e.target;
    setContact((prevContact) => ({
      ...prevContact,
      [name]: value,
    }));
  };

  const handleNavigate = (route: string) => {
    router.push(`/${route}`);
  };

  useEffect(() => {
    if (!kaviFoodUser) {
      setContact({ name: name, mobile: mobile, email: email });
    }
  }, [name, mobile, email]);

  useEffect(() => {
    // console.log(name);
    if (kaviFoodUser) {
      setAddress({
        address: kaviFoodUser.address,
        city: kaviFoodUser.city,
        pincode: kaviFoodUser.pincode,
        state: kaviFoodUser.state,
        landmark: kaviFoodUser.landmark,
      });
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
            {kaviFoodUser ? (
              <div className="">
                <div>Name: {kaviFoodUser.name} </div> <div>Phone: {kaviFoodUser.phone} </div>{" "}
                <div>Email: {kaviFoodUser.email} </div>{" "}
              </div>
            ) : (
              <>
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="border border-themeColorDark py-2 px-5 rounded-md w-full outline-none"
                  value={kaviFoodUser ? kaviFoodUser.name : contact.name}
                  onChange={handleContactChange}
                />
                <input
                  type="text"
                  name="mobile"
                  placeholder="Phone Number"
                  className="border border-themeColorDark py-2 px-5 rounded-md w-full outline-none"
                  value={kaviFoodUser ? kaviFoodUser.mobile : contact.mobile}
                  onChange={handleContactChange}
                />
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  className="border border-themeColorDark py-2 px-5 rounded-md w-full outline-none"
                  value={kaviFoodUser ? kaviFoodUser.email : contact.email}
                  onChange={handleContactChange}
                />
              </>
            )}
            <div className="text-xs text-lightGrey">
              You may receive text messages related to order confirmation and shipping updates.
            </div>
            {!kaviFoodUser && (
              <div className="text-base text-lightGrey text-center w-full">
                Already a User.{" "}
                <span
                  className="text-themeColorDark font-semibold cursor-pointer"
                  onClick={() => {
                    handleNavigate("SignIn");
                  }}
                >
                  {" "}
                  Sign In ?{" "}
                </span>
              </div>
            )}{" "}
          </div>
          <div className="flex gap-4 flex-col">
            <div className="text-lg lg:text-xl font-semibold flex gap-2 items-center h-fit">
              Delivery Address{" "}
              {loadingAdd ? (
                <ClipLoader loading={loadingAdd} color="#a5c667" size={18} />
              ) : (
                <>
                  {" "}
                  {kaviFoodUser?.address ? (
                    !editAddress ? (
                      <LiaEditSolid onClick={handleEditAddress} className="cursor-pointer" />
                    ) : (
                      <LuSave onClick={handleSaveAddress} className="cursor-pointer" />
                    )
                  ) : (
                    <></>
                  )}
                </>
              )}
            </div>
            {kaviFoodUser?.address && !editAddress ? (
              <>
                <div className="flex flex-col gap-1">
                  <div>{`${kaviFoodUser.address},  ${kaviFoodUser.city} `} </div>
                  <div>{`${kaviFoodUser.state} - ${kaviFoodUser.pincode}`}</div>
                  {kaviFoodUser.landmark && (
                    <div>{`Landmark: ${kaviFoodUser.landmark ? kaviFoodUser.landmark : ""} `}</div>
                  )}
                </div>
              </>
            ) : (
              <>
                <input
                  type="text"
                  placeholder="Address"
                  name="address"
                  className="border border-themeColorDark py-2 px-5 rounded-md outline-none"
                  value={address.address}
                  onChange={handleAddressChange}
                />
                <input
                  type="text"
                  placeholder="Landmark (Optional)"
                  name="landmark"
                  className="border border-themeColorDark py-2 px-5 rounded-md outline-none"
                  value={address.landmark}
                  onChange={handleAddressChange}
                />
                <div className="flex flex-col lg:flex-row  gap-4 lg:gap-2">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    className="border border-themeColorDark py-2 px-5 rounded-md w-full lg:w-1/3  outline-none"
                    value={address.city}
                    onChange={handleAddressChange}
                  />
                  <input
                    type="text"
                    placeholder="State"
                    name="state"
                    className="border border-themeColorDark py-2 px-5 rounded-md w-full lg:w-1/3 outline-none"
                    value={address.state}
                    onChange={handleAddressChange}
                  />
                  <input
                    type="text"
                    placeholder="Pincode"
                    name="pincode"
                    className="border border-themeColorDark py-2 px-5 rounded-md w-full lg:w-1/3 outline-none"
                    value={address.pincode}
                    onChange={handleAddressChange}
                  />
                </div>
              </>
            )}
          </div>
          <div
            className="bg-themeColorDark flex items-center justify-center gap-4 text-milkWhite text-center px-20 py-3 rounded-md text-lg lg:text-xl font-semibold cursor-pointer"
            onClick={handleProceedtoPay}
          >
            Pay Now <>{loading && <ClipLoader loading={loading} color="#fff" size={18} />}</>
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
            <div className="flex justify-between">
              <span>Subtotal</span>{" "}
              <span className="flex items-center h-fit">
                <LiaRupeeSignSolid className="w-[14px] h-[14px] lg:w-4 lg:h-4" />{" "}
                {kaviFoodUser ? kaviFoodUser.cart.totalPrice : cart.totalPrice}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Shipping Cost</span>{" "}
              <span className="flex items-center h-fit">
                <LiaRupeeSignSolid className="w-[14px] h-[14px] lg:w-4 lg:h-4" /> 50
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-xl font-semibold">Total</span>{" "}
              <span className="text-xl font-semibold flex items-center h-fit">
                <LiaRupeeSignSolid className="w-[14px] h-[14px] lg:w-4 lg:h-4" />{" "}
                {kaviFoodUser ? kaviFoodUser.cart.totalPrice + 50 : cart.totalPrice + 50}
              </span>{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
