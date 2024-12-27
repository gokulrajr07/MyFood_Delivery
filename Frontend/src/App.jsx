import React, { useState } from "react";
import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LoginPopup from "./components/LoginPopup/LoginPopup";
import MyOrders from "./pages/PlaceOrder/MyOrders";
// import Payment from "./pages/PlaceOrder/Payment";
// import Verify from "./pages/PlaceOrder/Verify";
const App = () => {
  let [showlogin,setshowlogin]=useState(false)
  return (
    <>
    {showlogin?<LoginPopup setshowlogin={setshowlogin}/>:<></>}
      <div className="appnavebar">
        <Navbar setshowlogin={setshowlogin}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/placeorder" element={<PlaceOrder />} />
          <Route path="/myorders" element={<MyOrders />} />
          {/* <Route path="/verify" element={<Verify />} /> */}
        </Routes>
      </div>
      <Footer/>
    </>
  );
};

export default App;
