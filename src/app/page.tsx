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
      // console.log({
      //   "name": "Organic Apple",
      //   "price": 2.99,
      //   "category": "Fruits",
      //   "weight_in_grams": 150,
      //   "image":img
      // })
      try {
        const response = await axios.post("/api/productsAPi",{
          "name": "Organic Apple",
          "price": 2.99,
          "category": "Fruits",
          "weight_in_grams": 150,
          "image":"https://drive.google.com/file/d/1fA9hPDz5C8mRj9-pWJnJPqoTiMJBezU9/view?usp=sharing"
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
    <div className="w-full flex justify-center">
      <div className="text-lg text-center flex flex-col justify-center items-center gap-4 min-h-[calc(100vh-88px)] lg:min-h-[calc(100vh-104px)] xl:min-h-[calc(100vh-120px)] w-full max-w-[1850px]">
      <span> Hello All, Welcome to Kavi Seyon foods </span> 
      {
        products?.map((prod)=>{
          console.log(prod)
          return <ProductCard prod={prod} />
        })
      }
      
      {/* <input type="file" name="" id="" onChange={(e)=>{ if (e.target.files && e.target.files[0]) {
              setImg(e.target.files[0]);
            }}}/> */}
       <button onClick={postproduct}>POST</button> <button onClick={getAllProducts}>GET</button> 
      </div>
      
    </div>
  );
}
