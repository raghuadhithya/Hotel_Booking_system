const express=require("express") ;
const router=express.Router() ;

const Room=require('../models/room')
router.get("/getallrooms",async(req,res)=>{
    try
    {
        const rooms=await Room.find({})
        res.send(rooms)
    }catch(error)
    {
        return res.status(400).json({message:error}) ;
    }
}) ;

router.post("/getroombyid",async(req,res)=>{
    const roomid=req.body.roomid;
    try
    {
        const rooms=await Room.findById({_id:roomid})
        res.send(rooms)
    }catch(error)
    {
        return res.status(400).json({message:error}) ;
    }
}) ;


router.post("/addroom",async(req,res) =>{
    try
    {
        const newroom=new Room(req.body);  
        await newroom.save()
        const roomname=req.body.name;
        const rooomreview=await Room.updateOne({name:roomname},
            { $push: {review:
                {
                   rating:1
                }
            }})
        await rooomreview.save()
        res.send('New Room Added Successfully');

    }catch(error)
    {
        return res.status(400).json({message:error}) ;
    }

});

module.exports=router;

