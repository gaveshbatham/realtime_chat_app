import mongoose from "mongoose";
const useSchema = mongoose.Schema({
    email:{
      type:String,
      require:true,
      unique:true,
    },
    fullName:{
        type:String,
        require:true,
    },
    password:{
        type:String,
        require:true,
        minlength:6,
    },
    profilePic:{
        type:String,
        defult:""
    },    
},
{timestamps:true}

)


const User=  mongoose.model("User",useSchema);

export default User