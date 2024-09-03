"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "@/Components/ProductCard/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { EmptyUserCart } from "@/redux/UserSlice";
import { SyncLoader } from "react-spinners";
import Image from "next/image";
// import ProductCardH from "@/Components/ProductCardH/ProductCardH";

// TODO REMOVE ALL THE UNWANTED CODE AND FORMAT ALL THE DOCUMENTS
// TODO : BUG- ADDED TO CART NOT REFLECTING AFTER LOGOUT
export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const { mobile, email, cart, shippingAddress } = useSelector((state: any) => state.guestUser);
  
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

  const postproduct = async () => {
    try {
      const response = await axios.post("/api/productsAPi", {
        name: "Ragi Milk Powder",
        price: 499,
        category: "Baby Food",
        weight_in_grams: 200,
        image: "https://drive.google.com/file/d/1uKw2Cm7ZQ7TBVdYZVBFCGeytMTxWkkcN/view?usp=sharing",
        description: `
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
        `,
      });
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
      <div className="text-lg  flex flex-col items-center gap-4 min-h-[calc(100vh-88px)] lg:min-h-[calc(100vh-104px)] xl:min-h-[calc(100vh-120px)] w-full max-w-[1850px]">
        <div className="w-full h-40 min-[560px]:h-48 relative min-[560px]:w-3/4 lg:h-64 lg:w-5/6 xl:w-[75%] xl:h-80">
          <Image src="/Images/happybabySample.jpg" fill alt="logo" />
        </div>

        {loading ? (
          <>
            <SyncLoader
              color="#a5c667"
              loading={loading}
              margin={6}
              size={16}
              speedMultiplier={0.7}
            />
          </>
        ) : (
          <div className="w-full flex flex-col gap-4 min-[560px]:w-3/4  lg:w-5/6 xl:w-[75%] min-[1600px]:w-[1400px] mb-20">
            <div className="text-2xl lg:text-3xl text-themeColorDark  font-semibold">
              Our Products
            </div>
            <div className=" w-full flex flex-wrap gap-4 justify-center items-center lg:gap-2 sm:flex-row sm:items-start  lg:justify-start">
              {products?.map((prod) => {
                return <ProductCard prod={prod} key={prod._id} />;
              })}
            </div>
          </div>
        )}

        {/* <button onClick={postproduct}>POST</button> <button onClick={getAllProducts}>GET</button> */}
      </div>
    </div>
  );
}
