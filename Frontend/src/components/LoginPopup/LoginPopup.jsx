import React, {  useState } from "react";
import "./LoginPopup.css";
import { IoClose } from "react-icons/io5";
import { Button, TextField } from "@mui/material";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";
const LoginPopup = ({ setshowlogin }) => {
  let { url, setToken } = useContext(StoreContext);
  let [currstate, setcurrstate] = useState("Login");
  let [data, setdata] = useState({
    name: "",
    email: "",
    password: "",
  });

  let onChangeHeader = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setdata((data) => ({ ...data, [name]: value }));
  };

  let onlogin = async (event) => {
    event.preventDefault();
    let newUrl = url;
    if (currstate === "Login") {
      newUrl += "/api/user/login";
    } else {
      newUrl += "/api/user/register";
    }
    console.log(newUrl)
    let response = await axios.post(newUrl, data);
    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setshowlogin(false);
    } else {
      alert(response.data.message);
    }
  };
  // useEffect(()=>
  // {
  //   console.log(data)
  // },[data])
  return (
    <div className="login-popup">
      <form onSubmit={onlogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currstate}</h2>
          <IoClose className="img" onClick={() => setshowlogin(false)} />
        </div>
        <div className="login-popup-inputs">
          {currstate === "Login" ? (
            <></>
          ) : (
            <TextField
              name="name"
              onChange={onChangeHeader}
              value={data.name}
              label="Name"
              variant="outlined"
              color="primary"
              size="small"
              sx={{ width: "290px" }}
            />
          )}
          <TextField
            label="email"
            name="email"
            onChange={onChangeHeader}
            value={data.email}
            variant="outlined"
            color="primary"
            size="small"
            sx={{ width: "290px" }}
          />
          <TextField
            label="password"
            name="password"
            onChange={onChangeHeader}
            value={data.password}
            type="password"
            color="primary"
            variant="outlined"
            size="small"
            sx={{ width: "290px" }}
          />
        </div>
        <Button
          type="submit"
          variant="outlined"
          sx={{ backgroundColor: "orangered", color: "white", border: "none" }}
        >
          {currstate === "Sign up" ? "Create account" : "Login"}
        </Button>
        <div className="login-popup-condition">
          <input type="checkbox" required />{" "}
          <span>
            By continuing, i agree to the terms of use & privacy Policy.
          </span>
        </div>
        {currstate === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setcurrstate("Sign Up")}>click here!</span>{" "}
          </p>
        ) : (
          <p>
            Already have an acount?
            <span onClick={() => setcurrstate("Login")}>Login here!</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;
