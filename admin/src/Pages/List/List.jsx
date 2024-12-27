import React, { useEffect, useState } from 'react';
import "./List.css";
import { toast } from 'react-toastify';
import axios from 'axios';

const List = ({url}) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Error fetching the list");
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Unable to connect to the server");
    }
  };
let removeFood=async (FoodId)=>
{
  let response= await axios.post(`${url}/api/food/remove`,{id:FoodId})
  await fetchList();
  if(response.data.success)
  {
    toast.success(response.data.message)
  }
  else{
    toast.error("Error")
  }
}
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className='list add'>
        <p>All Food List</p>
        <div className="list-table">
          <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
          </div>
          {
            list.map((item)=>
            {
              return(
                <div key={item._id} className='list-table-format'>
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>{item.category}</p>
                   <p>{item.price}</p>
                   <p onClick={()=>removeFood(item._id)} className='cursor'>X</p>
                </div>
              )
            })
          }
        </div>
    </div>
  );
};

export default List;
