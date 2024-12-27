import React, { useContext } from 'react'
import "./FoodDisplay.css"
import { StoreContext } from './../../context/StoreContext';
import Fooditem from './../Fooditems/Fooditem';
const FoodDisplay = ({category}) => {
    let {foodlist}=useContext(StoreContext)
    console.log(category)
  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className='food-dispaly-list'>
        {
            foodlist?.map((item,i)=>
            {
              // console.log(item_i)
              if(category==="All"||category===item.category)
              {
                return <Fooditem key={item._id} id={item._id} name={item.name} image={item.image}
                price={item.price} description={item.description} category={item.category}/>
              }
            })
        }
      </div>
    </div>
  )
}

export default FoodDisplay
