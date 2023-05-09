import mongoose from "mongoose";

const employeeSchema = mongoose.Schema(
    {
        firstName: {
            type:String,
            required:[true,"Please enter your name"]
        },
        lastName:{
            type:String,
            required:false
        },
        age:{
            type:Number,
            required:[true,"Please enter your age"]
        },
        salary:{
            type:Number,
            required:[true,"Please enter your salary"]
        },
        image:{
            type:String,
            required:false
        }
    },{
        timestamps:true
    }
)

const Employee = mongoose.model('Employee',employeeSchema);
export default Employee;