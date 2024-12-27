import React from "react";
import "./Header.css";
import { Button } from "@mui/material";
const Header = () => {
  return (
    <div>
      <div className="header">
        <div className="header-content">
          <h2>Order Your favourite food here!</h2>
          <p>
            Indulge in a mouthwatering variety of freshly prepared dishes — from
            sizzling burgers and crispy fries to gourmet pizzas, vibrant sushi,
            and indulgent desserts. Whether you're in the mood for comfort food
            or a healthy treat, we've got something for everyone.
          </p>
          <p>Order now and satisfy your cravings with just a few clicks!</p>
          <Button 
            variant="outlined"
          >
            View More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
