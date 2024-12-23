import jwt from "jsonwebtoken"

export const generateToken = (userId,res)=>{
    const token = jwt.sign({userId}, process.env.TOKEN_KEY, {
        expiresIn:"7d"
    })

    res.cookie("jwt",token,{
        mexAge: 7*24*60*60*1000, //ms
        httpOnly: true , // prevent xss attachs cross-site scripting attacks
        sameSite:"strict",
        secure:process.env.NODE_ENV!=="development"
    })

    return token;
}