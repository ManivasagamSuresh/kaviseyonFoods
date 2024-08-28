// src/app/api/CartAPI/route.tsx
import { DBconnect, closeConnection } from '@/MongoDb/mongoDb';
import { SignInFormValues, SignUpFormValues, User } from '@/types/profile';
import { NextRequest, NextResponse } from 'next/server';
import { ObjectId } from "mongodb";


export const PATCH = async (request: NextRequest) => {
  const { action, _id, cartItem } = await request.json();
  // console.log(action,_id, cartItem);
  // console.log(request);
  switch (action) {
    case 'addCart':
      return handleAddCart(_id, cartItem);
    case 'removeCart':
      return handleRemoveCart(_id, cartItem);
    case 'reduceQuantity':
      return handleReduceQuantity(_id, cartItem);
      case 'EmptyCart':
      return handleEmptyCart(_id);
    default:
      return NextResponse.json({ message: 'Invalid action' }, { status: 400 });
  }
}


const handleAddCart = async (_id: any, cartItem: any) => {
  try {
    const db = await DBconnect();
    
    
    // Find the user by their ID
    const user = await db?.collection('user').findOne({ _id: new ObjectId(`${_id}`) });
    
    if (!user) {
      await closeConnection();
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isAdded = user.cart.items.some((item: any) => item._id === cartItem._id);

    if (isAdded) {
      const increaseQuantity = await db?.collection('user').updateOne( { 
        _id: new ObjectId(`${_id}`), 
        "cart.items._id": cartItem._id  // Use a filter to find the specific cart item
      },
      { 
        $inc: { "cart.items.$.quantity": 1 } // Use the positional operator $ to target the matched element
      }); 

      const increaseTotal = await db?.collection('user').updateOne({ _id: new ObjectId(`${_id}`)},{$inc:{"cart.totalPrice": cartItem.price}})
       await closeConnection();

      // Check if the update operation was successful
      if (increaseQuantity && increaseQuantity.modifiedCount > 0) {
        return NextResponse.json({ message: "Item quantity increased" }, { status: 200 });
      } else {
        return NextResponse.json({ error: "Failed to update item quantity" }, { status: 500 });
      }
    }

    // Update user's cart by pushing the new item
    const addCart = await db?.collection('user').updateOne(
      { _id: new ObjectId(`${_id}`) }, 
      { $push: { "cart.items": cartItem } }
    );
    const increaseTotal = await db?.collection('user').updateOne({ _id: new ObjectId(`${_id}`)},{$inc:{"cart.totalPrice": cartItem.price}})
    // Check if the update operation was successful
    if (addCart && addCart.modifiedCount > 0) {
      await closeConnection();
      return NextResponse.json({ message: "Item added to cart successfully" }, { status: 200 });
    } else {
      await closeConnection();
      return NextResponse.json({ error: "Failed to add item to cart" }, { status: 500 });
    }

  } catch (error) {
    console.error("Error in handleAddCart:", error);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
};




const handleReduceQuantity = async(_id: any, cartItem: any)=>{
  try {
    const db = await DBconnect();
   
    const decreaseQuantity = await db?.collection('user').updateOne( { 
      _id: new ObjectId(`${_id}`), 
      "cart.items._id": cartItem._id  // Use a filter to find the specific cart item
    },
    { 
      $inc: { "cart.items.$.quantity": -1 } // Use the positional operator $ to target the matched element
    }); 
    const decreaseTotal = await db?.collection('user').updateOne({ _id: new ObjectId(`${_id}`)},{$inc:{"cart.totalPrice": -cartItem.price}})
 
     await closeConnection();

    // Check if the update operation was successful
    if (decreaseQuantity && decreaseQuantity.modifiedCount > 0) {
      return NextResponse.json({ message: "Item quantity decreased" }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Failed to update item quantity" }, { status: 500 });
    }
  } catch (error) {
    return NextResponse.json({ error: "Failed to update item quantity" }, { status: 400 });

  }
}

const handleRemoveCart = async(_id: any, cartItem: any)=>{
  try {
    const db = await DBconnect();
    // const itemId = typeof cartItem._id === "string" ? new ObjectId(cartItem._id) : cartItem._id;

    const removeResult = await db?.collection('user').updateOne(
      { _id: new ObjectId(`${_id}`) },
      { $pull: { "cart.items": { _id: cartItem._id } } } as any
    );
    const decreaseTotal = await db?.collection('user').updateOne({ _id: new ObjectId(`${_id}`)},{$inc:{"cart.totalPrice": -(cartItem.price*cartItem.quantity)}})
 

    // Close the database connection
    await closeConnection();

    // Check if the item was successfully removed
    if (removeResult && removeResult.modifiedCount > 0) {
      return NextResponse.json({ message: "Item removed successfully" }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Failed to remove item" }, { status: 400 });
    }
  } catch (error) {
     return NextResponse.json({ error: "Failed to Remove item" }, { status: 400 });
  }
}

const handleEmptyCart = async (_id: string) => {
  try {
    // Connect to the database
    const db = await DBconnect();
    
    // Ensure that you are not closing the connection before running the query
    const emptyCart = await db?.collection('user').updateOne(
      { _id: new ObjectId(`${_id}`) },
      { $set: { cart: { totalPrice: 0, items: [] } } }
    );

    // Close the connection after the query
    await closeConnection();

    if (emptyCart && emptyCart.modifiedCount && emptyCart.modifiedCount > 0) {
      return NextResponse.json({ message: "Cart emptied successfully" }, { status: 200 });
    } else {
      return NextResponse.json({ error: "Failed to empty cart" }, { status: 400 });
    }

  } catch (error) {
    console.error("Error emptying cart:", error); // Log the error for debugging
    return NextResponse.json({ error: "Failed to empty cart" }, { status: 400 });
  }
};