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

//TODO SORT ORDER BASED ON DATE ANDB TIMING
export const GET = async (req: NextRequest) => {
  try {
    // Use req.nextUrl.searchParams to get query parameters from the request
    const params = req.nextUrl.searchParams;
    const action = params.get("action");
    const email = params.get("email");
    const OrderId = params.get("OrderId");

    switch (action) {
      case "getAllOrders":
        return handleAllOrders();
      case "getMyOrders":
        if (email) {
          return handleMyOrders(email);
        } else {
          return NextResponse.json({ message: "Email is required" }, { status: 400 });
        }
      case "getOrder":
        if (OrderId) {
          return handleGetOrder(OrderId);
        } else {
          return NextResponse.json({ message: "OrderId is required" }, { status: 400 });
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

    const orders = await db?.collection("orders").find().toArray();
    await closeConnection();
    
    if (!orders) {
      return new NextResponse(JSON.stringify({ message: "No orders found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    const sortedOrder = orders?.sort((a, b) => {
      const dateA = new Date(a.orderDate);
      const dateB = new Date(b.orderDate);
      return dateB.getTime() - dateA.getTime(); // Latest orders first
    });
    
    return new NextResponse(JSON.stringify(sortedOrder), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse("Error occurred", { status: 500 });
  }
};

const handleGetOrder = async (id: string) => {
  try {
    const db = await DBconnect();
    const order = await db?.collection("orders").findOne({ _id: new ObjectId(`${id}`) });
    await closeConnection();
    return new NextResponse(JSON.stringify(order), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
};

const handleMyOrders = async (email: string) => {
  try {
    const db = await DBconnect();
    const order = await db?.collection("orders").find({ email: email }).toArray();
    await closeConnection();

    if (!order) {
      return new NextResponse(JSON.stringify({ message: "No orders found" }), {
        status: 404,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    const sortedOrder = order?.sort((a, b) => {
      const dateA = new Date(a.orderDate);
      const dateB = new Date(b.orderDate);
      return dateB.getTime() - dateA.getTime(); // Latest orders first
    });
    
    return new NextResponse(JSON.stringify(sortedOrder), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 });
  }
};

export const PATCH = async (req: NextRequest) => {
  try {
    const { _id, orderStatus, trackingId } = await req.json();
    const db = await DBconnect();

    if (!_id) {
      return new NextResponse(JSON.stringify({ message: "Order ID is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const updateFields: any = { orderStatus };

    if (trackingId) {
      updateFields.trackingId = trackingId;
    }

    const order = await db
      ?.collection("orders")
      .updateOne({ _id: new ObjectId(`${_id}`) }, { $set: updateFields });

    await closeConnection();

    if (order?.modifiedCount === 0) {
      return new NextResponse(JSON.stringify({ message: "Order not found or not updated" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

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
};
