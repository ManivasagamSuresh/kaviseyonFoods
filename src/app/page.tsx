"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "@/Components/ProductCard/ProductCard";
import ProductCardH from "@/Components/ProductCardH/ProductCardH";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  // TODO: make me to server side props fetching, or ill call twice
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
      const response = await axios.post("/api/productsAPi", {
        "name": "Ragi Milk Powder",
        "price": 399,
        "category": "Baby Food",
        "weight_in_grams": 200,
        "image": "https://drive.google.com/file/d/1gHuW7rO-fgeXYsW5Uyv9-amqp5OA128S/view?usp=sharing",
        "description": `
          ### **Ragi: A Nutrient Powerhouse**
          - **High in calcium, dietary fiber, iron, and multinutrients**
          - **Gluten-free and easy to digest**
          - **Recommended as the first solid food for babies**
          - **Boosts energy and promotes brain development**
      
          ### **How To Make Ragi Porridge**
          1. **Mix** 1-2 tablespoons of ragi flour with a little water to make a smooth paste.
          2. **Boil water** in a pan and add the ragi paste into it.
          3. **Stir completely** to avoid lumps.
          4. **Cook** for 6-7 mins.
          5. **Check the consistency** and add water if required.
          6. **Serve** to the baby when it is lukewarm.
          Your kid's tummy will be super happy!
      
          ### **Why Kaviseyon Food’s Ragi Milk Powder?**
          As a mom, our topmost priority is filling our lovely dove's stomach with nutrients that help them in their development. We promise that our Ragi milk powder is freshly homemade with chosen ingredients. **No additional flavors, no salt/sugar, no preservatives, and no milk.**
      
          ### **Ingredients**
          - Only Ragi.
      
          ### **Shelf Life**
          - **2 months.**
          - After opening the pack, store it in a clean, dry, airtight container.
        `
      }
      );
      console.log("POST response:", response.data);
    } catch (error) {
      console.error("Error calling POST API:", error);
    }
  };
  

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="w-full flex justify-center p-4">
      <div className="text-lg text-center flex flex-col  items-center gap-4 min-h-[calc(100vh-88px)] lg:min-h-[calc(100vh-104px)] xl:min-h-[calc(100vh-120px)] w-full max-w-[1850px]">
        <span> Hello All, Welcome to Kavi Seyon foods </span>

        {/*       

      <div className=" w-full flex-col flex flex-wrap gap-4 justify-center items-center min-[560px]:w-3/4  lg:w-5/6 xl:w-[75%] min-[1600px]:w-[1400px]  lg:gap-2 sm:flex-row sm:items-start  lg:justify-start">
      {
        products?.map((prod)=>{
          console.log(prod)
          return <ProductCardH prod={prod} />
        })
      }
      </div> */}

        <div className=" w-full flex flex-wrap gap-4 justify-center items-center min-[560px]:w-3/4  lg:w-5/6 xl:w-[75%] min-[1600px]:w-[1400px]  lg:gap-2 sm:flex-row sm:items-start  lg:justify-start">
          {products?.map((prod) => {
            console.log(prod);
            return <ProductCard prod={prod} />;
          })}
        </div>

        {/* <button onClick={postproduct}>POST</button> <button onClick={getAllProducts}>GET</button> ? */}
      </div>
    </div>
  );
}
