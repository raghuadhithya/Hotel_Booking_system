const mongoose=require("mongoose")
const bookingSchema=mongoose.Schema(
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
        fromdate:{
            type:String,
            required:true
        },
        todate:{
            type:String,
            required:true
        },
        totaldays:{
            type:Number,
            required:true
        },
 
        totalamount:{
            type:Number,
            required:true
        },
        status:{
            type:String,
            required:true,
            default:'booked'
        }
    },
    {
        timestamps:true,
    }
) 

const bookingmodel=mongoose.model('bookings',bookingSchema);
module.exports=bookingmodel