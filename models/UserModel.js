import mongoose from "mongoose";
import Post from "./PostModel.js";

const userSchema = mongoose.Schema(
    {
        
        id: {
            type:String,
            required:true
        },
        username: {
            type:String,
            required:true
        },
        email:{
            type:String,
            unique:true,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        followers:[{
            type:mongoose.Schema.Types.ObjectId,
            required:false
        }],
        followings:[{
            type:mongoose.Schema.Types.ObjectId,
            required:false
        }],  
        posts:[{
            type: mongoose.Schema.Types.ObjectId,
            ref:Post,
            required: false,
          }]
    },{
        timestamps:true
    }
)

const User = mongoose.model('User',userSchema);
export default User;