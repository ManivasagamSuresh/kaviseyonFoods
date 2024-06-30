"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaCartPlus } from "react-icons/fa6";
import { BsPlusLg } from "react-icons/bs";
import { AiOutlineMinus } from "react-icons/ai";
import { useParams } from "next/navigation";
import axios from "axios";
import Viewer from "@/Components/Viewer/Viewer";

function ProductPage() {
  const [count, setCount] = useState<number>(1);
  const [product, setProduct] = useState<Product>();
  const params = useParams();

  const getProductData = async (productId: string) => {
    try {
      const response = await axios.get(`/api/productsAPi?productId=${productId}`);
      console.log("GET response:", response.data);
      setProduct(response.data);
      return response.data;
    } catch (error) {
      console.error("Error calling GET API:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (params.productId) {
      const productId = Array.isArray(params.productId) ? params.productId[0] : params.productId;
      getProductData(productId);
    }
  }, [params]);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-[1850px] py-4 lg:px-10 flex flex-col md:flex-row gap-1 lg:gap-0 min-h-[calc(100vh-88px)] lg:min-h-[calc(100vh-104px)] xl:min-h-[calc(100vh-120px)]  pageMountAnimation">
        <div className="w-full h-fit py-2 lg:px-4 lg:w-1/2 lg:height-2/4 flex justify-center items-center">
          <div className="relative w-80 h-[360px] lg:h-[520px] lg:w-[440px]">
            <Image src="/Images/product1.jpeg" fill alt="" />
          </div>
        </div>

        <div className="w-full lg:w-1/2 py-1 pb-8 px-16 lg:px-6 ">
          <div className="lg:w-[480px] flex flex-col gap-2">
            <div className="text-xl tracking-wider uppercase font-semibold">{product?.name}</div>

            <div className="flex gap-3 items-center">
              <div className="flex text-lg gap-1 h-fit items-center">
                <LiaRupeeSignSolid className="w-4 h-4" /> {product?.price}
              </div>
              <div className="text-xs text-#808080">{product?.weight_in_grams}gm</div>
            </div>

            <div className="flex flex-col gap-0 mb-2">
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
            </div>
            <div className="flex w-full lg:w-[480px] h-fit py-2 items-center justify-center gap-2 border rounded-sm border-themeColorDark">
              <div className="">Add to Cart </div>
              <FaCartPlus />
            </div>

            <div className="mt-5">{product && <Viewer desc={product.description} />}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductPage;
