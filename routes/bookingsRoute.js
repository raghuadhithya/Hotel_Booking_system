const express=require("express") ;
const router=express.Router() ;
const Booking=require("../models/booking");
const Room =require("../models/room")
router.post('/bookroom',async(req,res)=>{
    
    try
    {
        const newbooking=new Booking(req.body)
        const booking=await newbooking.save()
        const roomid=req.body.roomid;
        const userid=req.body.userid;
        const fromdate=req.body.fromdate;
        const todate=req.body.todate;
        const totaldays=req.body.totaldays;
        const bid=booking._id;
        const rooomtemp=await Room.updateOne({_id:roomid},
            { $push: {currentbookings:
                {
                    bookingid:bid,
                    userid:userid,
                    fromdate:fromdate,
                    todate:todate,
                    totaldays:totaldays,
                    status:booking.status
                }
            }})
        await rooomtemp.save()
        res.send(bid)
    }catch(error)
    {
        return res.status(400).json({error}) ;
    }

}) ;
router.get("/getallbookings",async(req,res)=>
{
    try
    {
        const bookings=await Booking.find()
        res.send(bookings)
    }
    catch(error)
    {
        return res.status(400).json({error});
    }
})


router.post('/getbookingsbyuserid',async(req,res)=>{

    const userid=req.body.userid
    try
    {

         const bookings=await Booking.find({userid:userid})
         res.send(bookings)

    }catch(error){

        return res.status(400).json({error});

    }
})


router.post('/cancelbooking',async(req,res)=>
{

    const {bid,id}=req.body
    try
    {

         const bookingitems=await Booking.findOne({_id:bid})
         bookingitems.status='cancelled'
         await bookingitems.save()
         const room1=await Room.findOne({_id:id})
         const bookingDe=room1.currentbookings
         const temp1=bookingDe.filter(booking=>booking.bid.toString() != bid)
         room1.currentbookings=temp1
         await room1.save()
         res.send('Booking Cancelled')
        
    }catch(error){

        return res.status(400).json({error});

    } 

})

module.exports=router;