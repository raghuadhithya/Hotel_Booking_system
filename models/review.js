const mongoose=require("mongoose")
const reviewSchema=mongoose.Schema(
    {
        roomid:{
            type:String,
            required:true
        },
        roomname:{
            type:String,
            required:true
        },
        userid:{
            type:String,
            required:true
        },
        username:{
            type:String,
            required:true
        },
        rating:{
            type:Number,
            required:true
        },
        reviewdesc:{
            type:String,
            required:true
        },
        date:{
            type:String,
            required:true
        }
    },
    {
        timestamps:true,
    }
)

const reviewmodel=mongoose.model('review',reviewSchema);
module.exports=reviewmodel