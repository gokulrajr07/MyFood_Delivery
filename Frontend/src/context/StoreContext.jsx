import { createContext, useEffect, useState } from "react";
import axios from "axios";

export let StoreContext = createContext(null);

let StoreContextProvider = (props) => {
  const [cartitem, setcartitem] = useState({});
  const [token, setToken] = useState("");
  const [foodlist, setFoodList] = useState([]);
  const url = "https://myfood-delivery-backend.onrender.com";
  let frontend_url="http://localhost:5173"
console.log(cartitem)
  // Add to cart function
  const addtocart = async (itemId) => {
    if (!cartitem[itemId]) {
      setcartitem((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setcartitem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if(token)
    {
      await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
    }
  };

  // Remove from cart function
  const removefromcart = async (itemId) => {
    setcartitem((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(token)
      {
        await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}})
      }
  };


// Get total cart amount
const getTotalCartAmount = () => {
 let totalAmount=0;
 for(let item in cartitem)
 {
  if(cartitem[item]>0)
  {
    let itemInfo=foodlist.find((product)=>product._id===item);
    totalAmount+=itemInfo?.price* cartitem[item];
  }
 }
 return totalAmount; 
};

// Get total quantity in the cart
const getTotalQuantity = () => {
  if (!cartitem || typeof cartitem !== "object") return 0; // Ensure cartitem is an object
  return Object.values(cartitem).reduce(
    (total, quantity) => total + (quantity || 0),
    0
  );
};


// Fetch food list from the API
const fetchFoodList = async () => {
  let response=await axios.get(url+'/api/food/list');
  setFoodList(response.data.data)
};

let loadCartData=async (token)=>
{
  let response=await axios.post(url+'/api/cart/get',{},{headers:{token}})
  setcartitem(response.data.cartData)
}
// Load data on component mount
useEffect(()=>
{
  async function loadData()
  {
    await fetchFoodList();
    if(localStorage.getItem("token"))
    {
      setToken(localStorage.getItem("token"))
      await loadCartData(localStorage.getItem("token"))
    }
  }
  loadData();
},[])
// Context value
const contextvalue = {
  foodlist,
  cartitem,
  frontend_url,
  addtocart,
  removefromcart,
  getTotalCartAmount,
  getTotalQuantity,
  url,
  token,
  setToken,
};

return (
  <StoreContext.Provider value={contextvalue}>
    {props.children}
  </StoreContext.Provider>
);
};
export default StoreContextProvider;
