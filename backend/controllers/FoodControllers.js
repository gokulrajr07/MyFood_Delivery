import foodModel from "../models/FoodModel.js";
import fs from "fs"

//add food item

let addFood=async (req,res)=>
{
    // let imagefilename =`${req.file?.filename}`;

    let food =new foodModel({
        name:req.body?.name,
        description:req.body?.description,
        price:req.body?.price,
        category:req.body?.category,
        image:req.body?.image
    })

    try{
        await food.save();
        res.json({success:true,message:"Food Added"})
    }
    catch(error)
    {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

// all food list

let listFood=async (req,res)=>
{
    try{
        let foods=await foodModel.find({});
        res.json({success:true,data:foods})
    }
    catch(error)
    {
        console.log(error)
        res.json({success:false,message:"error"})
    }
}
//remover food item

let removeFood=async (req,res)=>
{
    try{
        let food=await foodModel.findById(req.body.id);
        await foodModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"food Remove"})
    }
    catch(error)
    {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}
export {addFood,listFood,removeFood}