import React, { useContext } from "react";
import "./Fooditem.css";
import rating from "../../assert/rating.png";
import add_icon_green from "../../assert/add_icon_green.png";
import add_icon_white from "../../assert/add_icon_white.png";
import remove_icon_red from "../../assert/remove_icon_red.png";
import { StoreContext } from "../../context/StoreContext";
const Fooditem = ({ id, name, image, price, description, category }) => {

  let { cartitem, addtocart, removefromcart } =
    useContext(StoreContext);
    // console.log(cartitem)
  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img className="food-item-image" src={image} alt="" />
        {!cartitem[id] ? (
          <img
            className="add"
            onClick={() => addtocart(id)}
            src={add_icon_white}
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removefromcart(id)}
              src={remove_icon_red}
            />
            <p className="itemcount">{cartitem[id]}</p>
            <img
              src={add_icon_green}
              onClick={() =>addtocart(id)}
            />
          </div>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={rating} alt="" />
        </div>
      </div>
      <p className="food-item-desc">{description}</p>
    </div>
  );
};

export default Fooditem;
