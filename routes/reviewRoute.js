const express=require("express") ;
const router=express.Router() ;
const Review=require("../models/review")
const Room =require("../models/room")
router.post('/reviewroom',async(req,res)=>{
    
    try
    {
        const newreview=new Review(req.body)
        const review=await newreview.save()
        const roomid=req.body.roomid;
        const userid=req.body.userid;
        const date=req.body.date;
        const rating=req.body.rating;
        const reviewdesc=req.body.reviewdesc;
        const roomname=req.body.roomname;
        const username=req.body.username;
        const rooomreview1=await Room.updateOne({_id:roomid},
            { $push: {review:
                {
                    userid:userid,
                    roomid:roomid,
                    date:date,
                    rating:rating,
                    reviewdesc:reviewdesc,
                    roomname:roomname,
                    username:username

                }
            }})
        await rooomreview1.save()
        res.send(userid)
    }catch(error)
    {
        return res.status(400).json({error}) ;
    }

}) ;

module.exports=router;