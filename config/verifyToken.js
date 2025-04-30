import jwt, { decode } from "jsonwebtoken";

export const verifyToken = (req,res,next) => {
  let result = req.cookies.Authorization?.split(' ')[1]
  console.log(result,"Test");
  
  if (!result) {
    return res.status(200).json({ success: false, message: "No token provided", loggedin :false});
  }
  jwt.verify(result,process.env.JWT_SECRET,(err,decode)=>{
    // console.log(decode);
    
    if (err) {
      return res.status(403).json({ success: false, message: "Token invalid or expired", loggedin :false });
    }
    req.user=decode;
    next()
  })
}




