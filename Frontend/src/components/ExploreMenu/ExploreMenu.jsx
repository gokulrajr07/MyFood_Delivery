import React from 'react'
import './ExploreMenu.css'
import menu from '../../Jsonfolder/Menu.json'
const ExploreMenu = ({category,setcategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
        <h1>Explore our menu</h1>
        <p className='explore-menu-text'>choose from a diverse menu featuring a delectable array of dishes. our missing is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.</p>
        <div className="explore-menu-list">
        {
        menu.map((item)=>
        {
            return(
                <div onClick={()=>setcategory(prev=>prev===item.menu?"All":item.menu)} key={item._id} className="explore-menu-list-item">
                    <img className={category===item.menu?"active":""} src={item.menuimg} alt="img" />
                    <p>{item.menu}</p>
                </div>
            )
        })
      }
        </div>
        <hr />
    </div>
  )
}

export default ExploreMenu
