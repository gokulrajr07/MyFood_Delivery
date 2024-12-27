import orderModel from "../models/orderModel.js";
import userModel from './../models/userModel.js';

// Place order function
export const placeOrder = async (req, res) => {
  let frontend_url = "http://localhost:5174"; // Frontend URL where the user will be redirected after order confirmation
  try {
    // Save the new order to the database
    let newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Prepare order items
    let items = req.body.items.map((item) => ({
      name: item.name || "Item",
      sku: item._id || "UNKNOWN",
      price: item.price.toFixed(2), // Price in USD
      currency: "USD",
      quantity: item.quantity || 1,
    }));

    let itemsSubtotal = items.reduce(
      (total, item) => total + parseFloat(item.price) * item.quantity,
      0
    );

    // Add delivery charge (example of a flat fee of 49 USD)
    let deliveryCharge = 49; // Delivery charge in USD
    items.push({
      name: "Delivery Charges",
      sku: "DELIVERY",
      price: deliveryCharge.toFixed(2),
      currency: "USD",
      quantity: 1,
    });

    // Calculate the total amount for the order
    let totalAmount = (itemsSubtotal + deliveryCharge).toFixed(2);

    // Construct the return URL after successful order placement
    const returnUrl = `${frontend_url}/verify?success=true&orderId=${newOrder._id}`;
    const cancelUrl = `${frontend_url}/verify?success=false&orderId=${newOrder._id}`;

    // Send response back to the frontend
    res.json({
      success: true,
      message: "Order placed successfully",
      orderId: newOrder._id,
      returnUrl,
      cancelUrl,
    });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error placing order" });
  }
};
