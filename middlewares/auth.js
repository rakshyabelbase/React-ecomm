import jwt from "jsonwebtoken";
import  User from "../models/user.js";

export const requireSignin = (req, res, next) => {
  try {
    const decoded = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
   // console.log("decoded=>", decoded);
   req.user = decoded;
   next();
  } catch(err) {
    return res.status(401).json(err);
  }
};

/* export const isAdmin = async(req,res,next)=>{
    try{
        const user = await User.findById(req.user._id);
        if(user.role!=1){
            return res.status(401).send("Unauthorized")
           // return res.redirect('');
        }else{
            next();
        }
    }catch(err){
        console.log(err)
    }
} */
export const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== 1) {
      // Redirect to home page if user does not have admin privileges
      return res.redirect('/');
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
