import React, { useContext, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { ImCart } from "react-icons/im";
import "./Navbar.css";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";
import { LuLogOut } from "react-icons/lu";
import { IoMdPerson } from "react-icons/io";
const Navbar = ({ setshowlogin }) => {
  let [menu, setmenu] = useState("Home");
  let { getTotalCartAmount, getTotalQuantity, token,setToken } = useContext(StoreContext);
let navigate=useNavigate();
  let logout=()=>
  {
      localStorage.removeItem("token");
      setToken("")
      navigate("/")
  }
  return (
    <div className="navebar">
      <div className="img">
        <Link to={"/"}>
          <img
            src="https://img.freepik.com/premium-vector/food-logo-with-smile-spoon-fork-delicious-food-design-illustration-tongue-saliva_207371-61.jpg?semt=ais_hybrid"
            alt="Food"
          />
        </Link>
      </div>
      <ul className="navebar-menu">
        <Link
          to={"/"}
          onClick={() => {
            setmenu("Home");
          }}
          className={menu === "Home" ? "active" : ""}
        >
          Home
        </Link>
        <a
          href="#explore-menu"
          onClick={() => {
            setmenu("Menu");
          }}
          className={menu === "Menu" ? "active" : ""}
        >
          menu
        </a>
        <a
          href="#app-download"
          onClick={() => {
            setmenu("Mobile-app");
          }}
          className={menu === "Mobile-app" ? "active" : ""}
        >
          mobile-app
        </a>
        <a
          href="#footer"
          onClick={() => {
            setmenu("Contact-us");
          }}
          className={menu === "Contact-us" ? "active" : ""}
        >
          contact-us
        </a>
      </ul>
      <div className="navbar-right">
        <IoSearch className="searchicon" />
        <div className="navbar-search-icon">
          <Link to={"/cart"}>
            <ImCart className="carticon" />
          </Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}>
            {getTotalQuantity()===0?"":getTotalQuantity()}
          </div>
        </div>
        {!token ?<Button
          className="btn"
          variant="contained"
          style={{ borderRadius: "50px", padding: "10px 30px" }}
          onClick={() => setshowlogin(true)}
        >
          Sign in
        </Button>:<div className="navbar-profile">
          <IoMdPerson className="profile" />
          <ul className="nav-profile-dropdown">
              <li onClick={logout}><LuLogOut className="profile" /><p>Logout</p></li>
          </ul>
          </div>}
        
      </div>
    </div>
  );
};

export default Navbar;
