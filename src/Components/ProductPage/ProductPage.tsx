"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaArrowUpRightFromSquare, FaCartPlus } from "react-icons/fa6";
import { BsPlusLg } from "react-icons/bs";
import { AiOutlineMinus } from "react-icons/ai";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import Viewer from "@/Components/Viewer/Viewer";
import { SyncLoader } from "react-spinners";
import { useDispatch, useSelector } from "react-redux";
import { AddUserCart } from "@/redux/UserSlice";
import { AddGuestCart } from "@/redux/GuestSlice";

function ProductPage() {
  const [product, setProduct] = useState<Product>();
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams();
  const [isAdded, setIsAdded] = useState<boolean>(false);
  const { kaviFoodUser } = useSelector((state: any) => state.user);
  const { cart } = useSelector((state: any) => state.guestUser);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleNavigation = (url: string) => {
    router.push(`/${url}`);
  };

  const getProductData = async (productId: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/productsAPi?productId=${productId}`);
      console.log("GET response:", response.data);
      setProduct(response.data);
      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      console.error("Error calling GET API:", error);
      throw error;
    }
  };

  const getImageSrc = (url?: string) => {
    if (!url) return "";
    const id = url.match(/[-\w]{25,}/);
    return id ? `https://drive.google.com/uc?export=view&id=${id[0]}` : url;
  };


  const addToCart = async () => {
    try {
      if (kaviFoodUser) {
        dispatch(AddUserCart({ ...product, quantity: 1 }));
        const cartItem = { ...product, quantity: 1 };
        const payload = { action: "addCart", cartItem, _id: kaviFoodUser._id };

        const addCart = await axios.patch("/api/CartAPI", payload);
      } else {
        dispatch(AddGuestCart({ ...product, quantity: 1 }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (params.productId) {
      const productId = Array.isArray(params.productId) ? params.productId[0] : params.productId;
      getProductData(productId);
    }
  }, [params]);

  useEffect(() => {
    if (params.productId) {
      var productId = Array.isArray(params.productId) ? params.productId[0] : params.productId;
      // getProductData(productId);
    }
    if (kaviFoodUser) {
      const added = kaviFoodUser.cart.items.findIndex((p: any) => p._id === productId);

      if (added !== -1) {
        setIsAdded(true);
      }
    } else {
      const added = cart.items.findIndex((p: any) => p._id === productId);

      if (added !== -1) {
        setIsAdded(true);
      }
    }
  }, [cart, kaviFoodUser]);

  return (
    <div className="w-full flex justify-center">
      {loading ? (
        <div className="w-screen flex justify-center items-center min-h-[calc(100vh-88px)] lg:min-h-[calc(100vh-104px)] xl:min-h-[calc(100vh-120px)]">
          <SyncLoader
            color="#a5c667"
            loading={loading}
            margin={6}
            size={16}
            speedMultiplier={0.7}
          />{" "}
        </div>
      ) : (
        <div className="w-full max-w-[1850px] py-4 lg:px-10 flex flex-col md:flex-row gap-1 lg:gap-0 min-h-[calc(100vh-88px)] lg:min-h-[calc(100vh-104px)] xl:min-h-[calc(100vh-120px)] pageMountAnimation">
          <div className="w-full h-fit py-2 lg:px-4 lg:w-1/2 lg:height-2/4 flex justify-center items-center">
            <div className="relative w-60 h-[280px] lg:h-[520px] lg:w-[440px]">
              <Image src={getImageSrc(product?.productImage)} fill alt="" priority={true} loading="eager"/>
            </div>
          </div>

          <div className="w-full lg:w-1/2 py-1 pb-8 px-16 lg:px-6 ">
            <div className="lg:w-[480px] flex flex-col gap-2">
              <div className="text-xl tracking-wider text-themeColorDark uppercase font-semibold">
                {product?.name}
              </div>

              <div className="flex gap-3 items-center">
                <div className="flex text-lg gap-1 h-fit items-center">
                  <LiaRupeeSignSolid className="w-4 h-4" /> {product?.price}
                </div>
                <div className="text-xs text-#808080">{product?.weight_in_grams}gm</div>
              </div>

              {/* <div className="flex flex-col gap-0 mb-2">
              <div className="text-sm text-#808080">Quantity</div>
              <div className="border rounded-sm py-2 border-themeColorDark w-32 flex justify-around items-center">
                <div
                  className=" cursor-pointer"
                  onClick={() => {
                    if (count > 1) {
                      setCount(count - 1);
                    }
                  }}
                >
                  <AiOutlineMinus />
                </div>
                <span>{count}</span>
                <div className=" cursor-pointer" onClick={() => setCount(count + 1)}>
                  <BsPlusLg />
                </div>
              </div>
            </div> */}

            {
           kaviFoodUser && kaviFoodUser.isAdmin ? <></> : <>
              {isAdded ? (
                <div
                  className="flex w-full lg:w-[400px] h-fit py-2 items-center justify-center gap-2 border rounded-sm text-milkWhite bg-themeColorDark border-themeColorDark"
                  onClick={() => {
                    handleNavigation("myCart");
                  }}
                >
                  <div className="cursor-pointer">Added to Cart </div>
                  <FaArrowUpRightFromSquare />
                </div>
              ) : (
                <div
                  className="flex w-full cursor-pointer lg:w-[480px] h-fit py-2 items-center justify-center gap-2 border rounded-sm text-milkWhite bg-themeColorDark border-themeColorDark"
                  onClick={addToCart}
                >
                  <div className="">Add to Cart </div>
                  <FaCartPlus />
                </div>
              )}
              
              </>
            }
              
              <div className="mt-5">{product && <Viewer desc={product.description} />}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductPage;
