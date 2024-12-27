import userModel from '../models/userModel.js';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import validator from 'validator';

//login user

let loginUser= async (req,res)=>
{
    let {email,password}=req.body;
    try {
         let user = await userModel.findOne({email});
        if(!user)
        {
            return res.json({success:false,message:"user Doesn't exist"})
        }
        let isMatch=await bcrypt.compare(password, user.password)

        if(!isMatch)
        {
            return res.json({success:false,message:"Invalid user"})
        }
        let token=createToken(user._id);
        res.json({success:true,token})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

let createToken=(id)=>
{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register user
let registerUser= async (req,res)=>
{
    let { name, password,email } = req.body;
    try {
        //checking is uder ia already exist or not
        let exist = await userModel.findOne({ email });
        if (exist) {
          return res.json({ success: false, message: "User already exist" });
        }
        //validating email format & strong password
        if(!validator.isEmail(email))
        {
            return res.json({success:false,message:"please enter a valid email"})
        }
        if(password.length<8)
        {
            return res.json({success:false,message:"please enter a strong password"})
        }
        //hashing user password

        let salt =await bcrypt.genSalt(10)
        let hashedpassword=await bcrypt.hash(password, salt)

        let newUser=new userModel(
            {
                name:name,
                password:hashedpassword,
                email:email
            }
        )
       let user= await newUser.save() 
       let token=createToken(user._id)
       res.json({success:true,token});
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}



export {loginUser,registerUser};