"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "@/Components/ProductCard/ProductCard";

export default function Home() {
  const [products,setProducts] = useState([]);

  const getAllProducts = async () => {
    try {
      const response = await axios.get("/api/productsAPi");
      setProducts(response.data);
      console.log("GET response:", response.data);
    } catch (error) {
      console.error("Error calling GET API:", error);
    }
  };

    const postproduct = async () => {
      try {
        const response = await axios.post("/api/productsAPi",{
          "name": "Ragi Milk Powder",
          "price": 500,
          "category": "Fruits",
          "weight_in_grams": 350,
          "image":"https://drive.google.com/file/d/1gHuW7rO-fgeXYsW5Uyv9-amqp5OA128S/view?usp=sharing"
        }
        );
        console.log("POST response:", response.data);
      } catch (error) {
        console.error("Error calling GET API:", error);
      }
    };


    useEffect(()=>{
      getAllProducts();
    },[])

  return (
    <div className="w-full flex justify-center p-4" >
      <div className="text-lg text-center flex flex-col  items-center gap-4 min-h-[calc(100vh-88px)] lg:min-h-[calc(100vh-104px)] xl:min-h-[calc(100vh-120px)] w-full max-w-[1850px]">
      <span> Hello All, Welcome to Kavi Seyon foods </span> 
      <div className=" w-full flex flex-col flex-wrap gap-4 justify-center items-center sm:w-3/4 lg:w-5/6 2xl:w-[1400px]  lg:gap-2 sm:flex-row sm:items-start  lg:justify-start">
      {
        products?.map((prod)=>{
          console.log(prod)
          return <ProductCard prod={prod} />
        })
      }
      </div>
       {/* <button onClick={postproduct}>POST</button> <button onClick={getAllProducts}>GET</button>  */}

      </div>
      
    </div>
  );
}
