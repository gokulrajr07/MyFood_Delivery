import mongoose from "mongoose";
 export let connetDB=async ()=>
 {
    await mongoose.connect("mongodb+srv://FoodDeliveryApp:iH5joOXKkfsKKQMH@fooddelivery.mq9s9.mongodb.net/FoodDelivery").then(()=>console.log("DB connected"));
 }