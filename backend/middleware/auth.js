import jwt from "jsonwebtoken";

let authMiddleware = async (req, res, next) => {
  let { token } = req.headers;
  if(!token)
  {
    return res.json({success:false,message:"Not Authorization Login Again"})
  }
  try {
    let token_decode=jwt.verify(token,process.env.JWT_SECRET);
    req.body.userId=token_decode.id;
    next()
  } catch (error) {
    console.log(error)
    res.json({success:false,message:"Error"})
  }
};

export default authMiddleware;
