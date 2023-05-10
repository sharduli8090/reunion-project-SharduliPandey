import mongoose from "mongoose";
import Comments from "./CommentModel.js";

const postSchema = mongoose.Schema(
    {
        id: {
            type:String,
            required:true
        },
        title: {
            type:String,
            required:true
        },
        description: {
            type:String,
            required:false
        }, 
        likes :[{
            type:mongoose.Schema.Types.ObjectId,
            required:false
        }],
        comments: [{
            type: mongoose.Schema.Types.ObjectId,
            ref:Comments,
            required: false,
          }]
    },{
        timestamps:true
    }
)

const Post = mongoose.model('Post',postSchema);
export default Post;