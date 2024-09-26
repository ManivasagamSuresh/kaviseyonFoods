"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";

function Page() {
    const [loading, setLoading] = useState<boolean>(false);
    const { kaviFoodUser } = useSelector((state: any) => state.user);
    const router = useRouter();
  const [formValues, setFormValues] = useState<Product>({
    name: "",
    price: 0,
    category: "",
    weight_in_grams: 0,
    image: "",
    description: "",
    productImage: "",
  });

  const handleCategory = (e: any) => {
    const { value } = e.target; // Extract only the value since it's specifically for category
    setFormValues((prevValues) => ({
      ...prevValues,
      category: value, // Directly set the 'category' field
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log("Submitted form data:", formValues);
    await postproduct(formValues);
    setFormValues({
      name: "",
      price: 0,
      category: "",
      weight_in_grams: 0,
      image: "",
      description: "",
      productImage: "",
    });
    setLoading(false);
  };

  const postproduct = async (prod: Product) => {
    try {
      const response = await axios.post("/api/productsAPi", prod);
      console.log("POST response:", response.data);
      toast.success("Product Added successfully");
      setLoading(false);
    } catch (error) {
      console.error("Error calling POST API:", error);
      setLoading(false);
    }
  };


  useEffect(() => {
    if (!kaviFoodUser?.isAdmin) {
      router.push("/");
    }
  }, [kaviFoodUser]);


  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-white shadow-lg rounded-md my-20">
      <h1 className="text-2xl font-semibold mb-6 text-center text-themeColorDark">Add Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-themeColorDark text-sm font-semibold mb-2" htmlFor="name">
            Product Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formValues.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border outline-none rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-themeColorDark text-sm font-semibold mb-2" htmlFor="price">
            Price (in ₹)
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formValues.price}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border outline-none rounded"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-themeColorDark text-sm font-semibold mb-2"
            htmlFor="category"
          >
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formValues.category}
            onChange={handleCategory}
            className="w-full px-3 py-2 border outline-none rounded"
          >
            <option value="">Select Category</option>
            <option value="3-6 months baby">3-6 months baby</option>
            <option value="6-12 months baby">6-12 months baby</option>
            <option value="12-18 months baby">12-18 months baby</option>
            <option value="Kids">Kids</option>
            <option value="Adults">Adults</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-themeColorDark text-sm font-semibold mb-2"
            htmlFor="weight_in_grams"
          >
            Weight (in grams)
          </label>
          <input
            type="number"
            id="weight_in_grams"
            name="weight_in_grams"
            value={formValues.weight_in_grams}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border outline-none rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-themeColorDark text-sm font-semibold mb-2" htmlFor="image">
            Image URL
          </label>
          <input
            type="text"
            id="image"
            name="image"
            value={formValues.image}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border outline-none rounded"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-themeColorDark text-sm font-semibold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={8}
            value={formValues.description}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border outline-none rounded"
          ></textarea>
        </div>

        <div className="mb-4">
          <label
            className="block text-themeColorDark text-sm font-semibold mb-2"
            htmlFor="productImage"
          >
            Product Image URL
          </label>
          <input
            type="text"
            id="productImage"
            name="productImage"
            value={formValues.productImage}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border outline-none rounded"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-milkWhite border border-themeColorDark text-themeColorDark font-semibold py-2 px-10 my-5 rounded hover:bg-themeColorDark hover:text-milkWhite"
          >
            

            {loading ? (
              <div className="flex items-center justify-center gap-4">
                Adding <ClipLoader loading={loading} color="#fff" size={18} />
              </div>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Page;
