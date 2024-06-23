"use client";
import { useEffect } from "react";
import axios from "axios";

export default function Home() {
  const getAllProducts = async () => {
    try {
      const response = await axios.get("/api/productsAPi");
      console.log("GET response:", response.data);
    } catch (error) {
      console.error("Error calling GET API:", error);
    }
  };

    const postproduct = async () => {
      try {
        const response = await axios.post("/api/productsAPi",{
          "name": "Organic Apple",
          "price": 2.99,
          "category": "Fruits",
          "weight_in_grams": 150
        }
        );
        console.log("POST response:", response.data);
      } catch (error) {
        console.error("Error calling GET API:", error);
      }
    };


  return (
    <div className="w-full flex justify-center">
      <div className="text-lg text-center flex flex-col justify-center items-center gap-4 min-h-[calc(100vh-88px)] lg:min-h-[calc(100vh-104px)] xl:min-h-[calc(100vh-120px)] w-full max-w-[1850px]">
      <span> Hello All, Welcome to Kavi Seyon foods </span>  <button onClick={postproduct}>POST</button> <button onClick={getAllProducts}>GET</button> 
      </div>
      
    </div>
  );
}
