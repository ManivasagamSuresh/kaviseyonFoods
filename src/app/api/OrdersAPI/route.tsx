import { DBconnect, closeConnection } from "@/MongoDb/mongoDb";
import { ObjectId } from "mongodb";
import { useSearchParams } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const data = await req.json();
    const db = await DBconnect();

    const payload = { ...data, orderStatus: "Yet To Dispatch" };
    const order = await db?.collection("orders").insertOne(payload);

    await closeConnection();
    return new NextResponse(JSON.stringify(order), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(error);
    return new NextResponse("Error occurred", { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    // Use req.nextUrl.searchParams to get query parameters from the request
    const params = req.nextUrl.searchParams;
    const action = params.get('action');
    const email = params.get('email');

    switch (action) {
      case "getAllOrders":
        return handleAllOrders();
      case "getMyOrders":
        if (email) {
          return handleMyOrders(email);
        } else {
          return NextResponse.json({ message: "Email is required" }, { status: 400 });
        }
      default:
        return NextResponse.json({ message: "Invalid action" }, { status: 400 });
    }
  } catch (error) {
    console.error("Error in GET:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
};

const handleAllOrders = async () => {
  try {

    const db = await DBconnect();
      
    const orders= await db?.collection("orders").find().toArray();
    await closeConnection();
    return new NextResponse(JSON.stringify(orders), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
    
  } catch (error) {
    return new NextResponse("Error occurred", { status: 500 });

  }
};



const handleMyOrders = async (email: string) => {
  try {
    
    const db = await DBconnect();
      
    const order = await db?.collection("orders").find({email:email}).toArray();
    await closeConnection();
    return new NextResponse(JSON.stringify(order), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {

    return new NextResponse("Error occurred", { status: 500 });

  }
};

export const PATCH = async(req: NextRequest) => {
  try {

    const {_id, orderStatus, trackingId } = await req.json();
    const db = await DBconnect();

    // Ensure we have a valid _id
    if (!_id) {
      return new NextResponse(JSON.stringify({ message: "Order ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

     // Prepare the update fields
     const updateFields: any = { orderStatus };

     // Only add trackingId to the update if it's provided
     if (trackingId) {
       updateFields.trackingId = trackingId;
     }
      
    const order = await db?.collection("orders").updateOne(
      { _id: new ObjectId(`${_id}`) },
      { $set: updateFields }
    );

    await closeConnection();

    // Check if the order was found and updated
    if (order?.modifiedCount === 0) {
      return new NextResponse(JSON.stringify({ message: "Order not found or not updated" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Return a success response
    return new NextResponse(JSON.stringify({ message: "Order updated successfully" }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
