import React, { useState } from "react";
import "./Add.css";
import { Button } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
const Add = ({ url }) => {
  let [data, setdata] = useState({
    image: "",
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });
  let onchangehandler = (event) => {
    let name = event.target.name;
    let value = event.target.value;
    setdata((data) => ({ ...data, [name]: value }));
  };
  let onsubmithandler = async (event) => {
    event.preventDefault();
    let formData = new FormData();
    formData.append("image", data.image);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    let response = await axios.post(`${url}/api/food/add`, formData);
    if (response.data.success) {
      setdata({
        image: "",
        name: "",
        description: "",
        price: "",
        category: "Salad",
      });
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };
  return (
    <div>
      <div className="add">
        <form className="flex-col" onSubmit={onsubmithandler}>
          <div className="add-img-upload flex-col">
            <p>Upload Image Link</p>
            <label htmlFor="image">
              <input
                onChange={onchangehandler}
                value={data.image}
                type="text"
                name="image"
                placeholder="Image Link"
              />
            </label>
          </div>
          <div className="add-product-name flex-col">
            <p>Product name</p>
            <input
              onChange={onchangehandler}
              value={data.name}
              type="text"
              name="name"
              placeholder="type here"
            />
          </div>
          <div className="add-product-description flex-col">
            <p>Product Description</p>
            <textarea
              name="description"
              onChange={onchangehandler}
              value={data.description}
              rows={6}
              placeholder="write content here"
              required
            ></textarea>
          </div>
          <div className="add-category-price">
            <div className="add-category flex-col">
              <p>Product category</p>
              <select onChange={onchangehandler} name="category">
                <option value="Chicken Rice">Chicken Rice</option>
                <option value="Mutton Rice">Mutton Rice</option>
                <option value="Chicken Tandoori">Chicken Tandoori</option>
                <option value="Parotta">Parotta</option>
                <option value="Fish Curry">Fish Curry</option>
                <option value="Salad">Salad</option>
                <option value="Rolls">Rolls</option>
                <option value="Deserts">Deserts</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles </option>
                <option value="Ice Cream">Ice Cream</option>
              </select>
            </div>
            <div className="add-price flex-col">
              <p>Product Price</p>
              <input
                onChange={onchangehandler}
                value={data.price}
                type="Number"
                name="price"
                placeholder="ex:20"
              />
            </div>
          </div>
          <Button variant="outlined" type="submit" className="add-btn">
            ADD
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Add;
