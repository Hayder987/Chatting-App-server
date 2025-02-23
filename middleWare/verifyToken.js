import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

const verifyToken = async (req, res, next)=>{
    try{
        const token = req.cookies.token;
        if(!token){
          return  res.status(401).json({ error: "UnAuthorized No Token Found" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECURE);

        if(!decoded){
            return  res.status(401).json({ error: "UnAuthorized No Token Found" });   
        }
        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return  res.status(404).json({ error: "User Not Found" });  
        }

        req.user = user
        next()
    }
    catch(err){
        console.log(err.message);
        res.status(500).json({ error: "internal server error" });
    }

}

export default verifyToken