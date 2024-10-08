import { DBconnect, closeConnection } from "@/MongoDb/mongoDb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";


//Get Specific product details
export const GET = async (req: NextRequest) => {
  try {
    const url = new URL(req.url);
    const productId = url.searchParams.get("productId");
    const db = await DBconnect();
    if (productId) {
      const product = await db?.collection("products").findOne({ _id: new ObjectId(productId) });
      await closeConnection();
      return new NextResponse(JSON.stringify(product), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }


    //Get All product Lists
    const products = await db?.collection("products").find({}).toArray();
    await closeConnection();
    return new NextResponse(JSON.stringify(products), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error occurred", { status: 500 });
  }
};


//Add New product
export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();
    const db = await DBconnect();
    const product = await db?.collection("products").insertOne(data);
    await closeConnection();
    return new NextResponse(JSON.stringify(product), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error occurred", { status: 500 });
  }
};

//Edit Product details
export const PUT = async (req: NextRequest) => {
  try {
    const data = await req.json();
    console.log(data);
    const url = new URL(req.url);
    const productId = url.searchParams.get("productId");
    console.log(productId);
    const db = await DBconnect();
    if (productId) {
      const product = await db?.collection("products").updateOne({_id: new ObjectId(productId)}, {$set:data} );
      await closeConnection();
      return new NextResponse(JSON.stringify(product), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
   
  } catch (error) {
    console.error(error);
    return new NextResponse("Error occurred", { status: 500 });
  }
};
