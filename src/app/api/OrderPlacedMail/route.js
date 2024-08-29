import nodemailer from "nodemailer";
import { NextRequest, NextResponse } from "next/server";
const emailUser = process.env.EMAIL_USER; // Replace with actual environment variable for email
const emailPassword = process.env.EMAIL_PASSWORD;

export const POST = async (request) => {
  try {
    const { _id, name, email, mobile, deliveryAddress, orderTotal, products, razorpay_paymentId } =
      await request.json();

    const transporter = await nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPassword,
      },
    });

    let productDetails = "";
    products.forEach((product) => {
      productDetails += `<li>${product.name} - ${product.quantity} qty - ₹${product.price}</li>`;
    });

    // Email to the customer
    const customerMailOptions = {
      from: emailUser,
      to: email,
      subject: `Order Confirmation: Your Order #${_id} is Placed`,
      html: `
                <p>Hi ${name},</p>
                <p>Thank you for your order! Your order has been placed successfully.</p>
                
                <h3>Order Details:</h3>
                <ul>
                     <li><strong>Order ID:</strong> ${_id}</li>
                    <li><strong>Transaction ID:</strong> ${razorpay_paymentId}</li>
                    <li><strong>Name:</strong> ${name}</li>
                    <li><strong>Email:</strong> ${email}</li>
                    <li><strong>Mobile:</strong> ${mobile}</li>
                    <li><strong>Delivery Address:</strong> ${deliveryAddress.address}, ${deliveryAddress.city}, ${deliveryAddress.state} - ${deliveryAddress.pincode}</li>
                </ul>
                
                <h3>Products Ordered:</h3>
                <ul>
                    ${productDetails}
                </ul>

                <p><strong>Order Total:</strong> ₹${orderTotal}</p>
                
                <p>We will notify you once your order is dispatched.</p>

                <p>Thank you for shopping with us!</p>

                <p>Regards,<br>Kavi Seyon Foods</p>
            `,
    };

    // Email to the admin
    const adminMailOptions = {
      from: emailUser,
      to: "kaviseyonfoods@gmail.com", // Admin email address
      subject: `New Order Placed: Order #${_id}`,
      html: `
                <p>A new order has been placed.</p>
                
                <h3>Order Details:</h3>
                <ul>
                    <li><strong>Order ID:</strong> ${_id}</li>
                    <li><strong>Transaction ID:</strong> ${razorpay_paymentId}</li>
                    <li><strong>Customer Name:</strong> ${name}</li>
                    <li><strong>Customer Email:</strong> ${email}</li>
                    <li><strong>Customer Mobile:</strong> ${mobile}</li>
                    <li><strong>Delivery Address:</strong> ${deliveryAddress.address}, ${deliveryAddress.city}, ${deliveryAddress.state} - ${deliveryAddress.pincode}</li>
                </ul>
                
                <h3>Products Ordered:</h3>
                <ul>
                    ${productDetails}
                </ul>

                <p><strong>Order Total:</strong> ₹${orderTotal}</p>
                
                <p><strong>Payment ID:</strong> ${razorpay_paymentId}</p>

                <p>Please process this order as soon as possible.</p>

                <p>Regards,<br>Your beloved Brother</p>
            `,
    };

    // Send email to the customer
    await transporter.sendMail(customerMailOptions);
    // Send email to the admin
    const adminInfo = await transporter.sendMail(adminMailOptions);

    return NextResponse.json({ message: "Mail sent successfully" }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
};
