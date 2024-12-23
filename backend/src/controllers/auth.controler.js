import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js";

export  const signup= async (req,res)=>{
    const {fullName,email,password}=req.body;
    
    try{
        if(!fullName || !email || !password){
            return res.status(400).json({mess:"all fildes are require"})
        }

        if(password.length<6){
            return res.status(400).json({mess:"password should have to be grater then or equal to 6"})
        }

        const user=await User.findOne({email})

        if(user) return res.status(400).json({mess:"user alrady exist"})


        const salt =await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        const newuser =new User({
            fullName:fullName,
            email:email,
            password:hashedPassword
        })

        if(newuser){
            // generate JWT token
            generateToken(newuser._id,res)
            await newuser.save();
            res.status(200).json({
                _id: newuser._id,
                fullName: newuser.fullName,
                email: newuser.email,
                profilePicture: newuser.profilePicture,

            })


        }
        else{
           return  res.status(400).json({mess:"invalid user data"})
        }



    } catch(err){
        console.log ("error in signup controler ", err.message)
        res.status(500).json({mess:"internal server error"})
    }
}


export  const login=(req,res)=>{
    res.send("login route")
}


export  const logout=(req,res)=>{
    res.send("logout route")
}