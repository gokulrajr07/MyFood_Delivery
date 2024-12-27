import express from "express"

import { addFood,listFood,removeFood} from "../controllers/FoodControllers.js"
import multer from "multer"
let FoodRouters=express.Router()


let storage=multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>
    {
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

let upload =multer({storage:storage})



FoodRouters.post("/add",upload.single("image"),addFood)
FoodRouters.get("/list",listFood)
FoodRouters.post("/remove",removeFood)


 





export default FoodRouters;