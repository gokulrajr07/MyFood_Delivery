import React, { useContext } from "react";
import "./Cart.css";
import { IoClose } from "react-icons/io5";
import { StoreContext } from "./../../context/StoreContext";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";
const Cart = () => {
  let { foodlist, cartitem, removefromcart,getTotalCartAmount } = useContext(StoreContext);
  // console.log(foodlist)
  // console.log(cartitem)
  let navigate =useNavigate()
  // var scalar = 2;
// var pineapple = confetti.shapeFromText({ text: '❤🖤', scalar });
  let confettibtn=()=>
    {
      confetti({
        particleCount:2000,
        // shapes:[pineapple],
        // scalar,
        spread:1800,
      })
    }
  return (
    <div>
      <div className="cart">
        <div className="cart-items">
          <div className="cart-items-title">
            <p>Items</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />
          {foodlist.map((item, i) => {
            if (cartitem[item._id] > 0) {
              console.log(item)
              return (
                <div key={item._id}>
                  <div className="cart-items-title cart-items-item">
                    <img src={item.image} alt="" />
                    <p>{item.name}</p>
                    <p>{item.price}</p>
                    <p>{cartitem[item._id]}</p>
                    <p>{item.price * cartitem[item._id]}</p>
                    <p
                      onClick={() => removefromcart(item._id)}
                      className="cross"
                    >
                      <IoClose />
                    </p>
                  </div>
                  <hr />
                </div>
              );
            }
          })}
        </div>
        <div className="cart-bottom">
          <div className="cart-total">
            <h2>Cart Totals</h2>
            <div>
              <div className="cart-total-details">
                <p>Subtotal</p>
                <p>{getTotalCartAmount()}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <p>Delevery free</p>
                <p>{getTotalCartAmount()===0?0:49}</p>
              </div>
              <hr />
              <div className="cart-total-details">
                <b> Total</b>
                <b>{getTotalCartAmount()===0?0:getTotalCartAmount()+49}</b>
              </div>
            </div>
            <Button onClick={()=>navigate("/placeorder")} variant="outlined">PROCEED TO CHECKOUT</Button>
          </div>
        <div className="cart-promocode">
          <div>
            <p>If you have promo code, Enter it here</p>
            <div className="cart-promocode-input">
              <TextField
                label="promo code"
                variant="outlined"
                color="primary"
                size="small"
                sx={{ width: "330px" }}
              />
              <Button onClick={confettibtn}>Submit</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Cart;
