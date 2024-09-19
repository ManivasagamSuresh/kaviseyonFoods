"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { SyncLoader } from "react-spinners";
import ProductCard from "../ProductCard/ProductCard";

function HomeProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getAllProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/productsAPi", {
        headers: { Authorization: localStorage.getItem("") },
      });
      setProducts(response.data);
      setLoading(false);
      // console.log("GET response:", response.data);
    } catch (error) {
      setLoading(false);
      console.error("Error calling GET API:", error);
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="w-full flex flex-col gap-12 min-[1600px]:w-[1400px] my-10 lg:my-32 py-10">
      <div className="text-2xl lg:text-3xl text-themeColorDark w-full text-center  font-semibold">
        Our Products
      </div>
      {loading ? (
        <div className="flex justify-center w-full h-72">
          <SyncLoader
            color="#a5c667"
            loading={loading}
            margin={6}
            size={16}
            speedMultiplier={0.7}
          />
        </div>
      ) : (
        <div className=" w-full flex flex-wrap gap-4 justify-center items-center lg:gap-2 sm:flex-row sm:items-start  lg:justify-start">
          {products?.map((prod) => {
            return <ProductCard prod={prod} key={prod._id} />;
          })}
        </div>
      )}
    </div>
  );
}

export default HomeProducts;
