const express=require("express") ;
const mongoose=require("mongoose") ;
const cors=require("cors")
const app=express()
mongoose.connect("mongodb://127.0.0.1:27017/hotel-booking",{useUnifiedTopology:true,useNewUrlParser:true},(err)=>{
    if(err)
    {
        console.log(err)
    }
    else{
        console.log("MongoDB Connected Sucessfully")
    }
})
const roomsRoute=require('./routes/roomRoute')
const userRoute=require('./routes/usersRoute')
const bookingsRoute=require('./routes/bookingsRoute')
const reviewRoute=require('./routes/reviewRoute')
app.use(express.json())
app.use('/api/rooms',roomsRoute)
app.use('/api/users',userRoute)
app.use('/api/bookings',bookingsRoute)
app.use('/api/review',reviewRoute)
app.listen(5000,()=>console.log("on port 5000!!!")) ;