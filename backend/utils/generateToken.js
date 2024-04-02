//create  jwt
import  Jwt from "jsonwebtoken";
const generateTokenAndSetCookie =(userId,res)=>{
    const token =Jwt.sign  ({userId},process.env.JWT_SECRET,{
      expiresIn:"15d"
    });
    res.cookie("jwt",token,{
        httpOnly:true,//prevent Xss attacks cross site scripting attacks
        maxAge:15*24*60*60*1000, //MS format
        sameSite:"strict",
        secure:process.env.NODE_ENV!=="development"
    });
};
export default generateTokenAndSetCookie;


//we generate the jwt secret  using the bash git:$ openssl rand -base64 32