import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
    {
        id: {
            type:String,
            required:true
        },
        username: {
            type:String,
            required:true
        },
        comment: {
            type:String,
            required:true
        }
    },{
        timestamps:true
    }
)

const Comments = mongoose.model('Comments',commentSchema);
export default Comments;