const mongoose=require("mongoose") ;
const userSchema=mongoose.Schema(
    {
        name:
        {
            type:String,
            required:true
        },
        email :
        {
            type:String,
            required:true
        },
        password:
        {
            type:String,
            required:true
        },
        gender:
        {
            type:String,
            required:true
        },
        phoneno:
        {
            type:Number,
            required:true
        },
        address:
        {
            type:String,
            required:true
        },
        pcode:
        {
            type:Number,
            required:true
        },
        aadhar:
        {
            type:Number,
            required:true
        },
        isAdmin :
        {
            type:Boolean,
            default:false
        },


    },
    {
        timestamps:true,
    }
)

const userModel = mongoose.model('users',userSchema)

module.exports=userModel
