import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "./../../context/StoreContext";
import "./MyOrders.css";
import { Typography } from "@mui/material";

const MyOrders = () => {
  const { foodlist, cartitem, setCartitem } = useContext(StoreContext); // Assuming you have a method to update cartitem
  const [timeRemaining, setTimeRemaining] = useState(10); // Start with 10 minutes
  const [orderStatus, setOrderStatus] = useState("Your order will arrive in 10 minutes");

  // Filter out items with quantity greater than 0
  const orderedItems = foodlist.filter((item) => cartitem[item._id] > 0);

  // Calculate total price and total quantity
  const totalPrice = orderedItems.reduce(
    (acc, item) => acc + item.price * cartitem[item._id],
    0
  );
  const totalQuantity = orderedItems.reduce(
    (acc, item) => acc + cartitem[item._id],
    0
  );

  // Timer to update the order status
  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 60000); // Decrease by 1 minute every minute

      return () => clearInterval(timer); // Cleanup interval on component unmount
    } else {
      setOrderStatus("Your order has arrived!");

      // Reset cartitem after order is delivered
    }
  }, [timeRemaining, setCartitem]);

  // Handle adding new item to cart
  const handleAddNewItem = (newItem) => {
    // Create a new order when adding an item
    setCartitem((prevCart) => ({
      ...prevCart,
      [newItem._id]: (prevCart[newItem._id] || 0) + 1, // Increment quantity for the new item
    }));
  };

  return (
    <div className="order-summary-container">
      <Typography variant="h4" gutterBottom>
        Order Summary
      </Typography>
      <img
        src="https://cdn.pixabay.com/photo/2024/01/13/17/36/delivery-8506321_1280.jpg"
        alt="Delivery"
        className="order-summary-image"
      />
      <div className="order-summary-details">
        <Typography>Total Quantity: {totalQuantity}</Typography>
        <Typography>Subtotal: ₹{totalPrice}</Typography>
        <Typography>Delivery Charge: ₹49</Typography>
        <Typography variant="h6">
          <b>Grand Total: ₹{totalPrice + 49}</b>
        </Typography>
        <Typography variant="h6" color="primary">
          <b>{orderStatus}</b>
        </Typography>
      </div>
    </div>
  );
};

export default MyOrders;
