import React,{useState,useEffect} from 'react'
import { Tabs } from 'antd';
import axios from 'axios';
import moment from 'moment';
import '../components/room.css'
import '../components/Room'
import { Button, Modal, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { PDFDownloadLink, Document, Page, Text } from '@react-pdf/renderer';
import PdfGenerator from './PdfGenerator';
import Swal from 'sweetalert2'
const { TabPane } = Tabs;
function Profilescreen() 
{

    if (!localStorage.getItem('currentUser')) {
        window.location.href = '/login'
    }
    const user=JSON.parse(localStorage.getItem('currentUser'))
    useEffect(() => 
    {
        if(user.name)
        {
           console.log('Login First')
        } 
        else
        {
            
           return(<h1>Login First</h1>)
           console.log('Login First')
        } 
    }, []);
    return (
        <div className='mt-5' style={{marginTop:'100px',marginLeft:'50px'}}>
            <Tabs defaultActiveKey="1"style={{fontSize:'25px'}}>
                <TabPane tab="Profile" key="1" >
                    <div className='col-md-6 bs'>
                   <h1 className='fnt' style={{fontSize:'24px',textAlign:'center'}}>My Profile</h1>
                   <hr/>
                   <h1 className='fnt'>Name:{user.name}</h1>
                   <h1 className='fnt'>Email:{user.email}</h1>
                   </div>
                </TabPane>
                <TabPane tab="Bookings" key="2">
                    <MyBookings/>
                </TabPane>
            </Tabs>
        </div>
    )
}
export default Profilescreen


export function MyBookings()
{
    const user=JSON.parse(localStorage.getItem('currentUser'))
    const userid=JSON.parse(localStorage.getItem('currentUser'))._id
    const[bookings,setbookings]=useState([]);
    const[rooms,setrooms]=useState([]);
    const [show, setShow] = useState(false);
    const [rating,setrating]=useState(1)
    const [reviewdesc,setreviewdesc]=useState()
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const currentdate=new Date();
    var cout;
    const myFunction = async () => {
        try
        {
            const data=await (await axios.post('/api/bookings/getbookingsbyuserid/',{userid:userid})).data
            console.log(data)
            setbookings(data)
        }catch(error)
        {
            console.log(error)
        }

    }
    useEffect(() => {
        myFunction();
    }, []);

    async function reviewSubmit(booking)
    {
        const reviewDetails =
        {
            roomname: booking.roomname,
            roomid: booking.roomid,
            userid: JSON.parse(localStorage.getItem('currentUser'))._id,
            username: JSON.parse(localStorage.getItem('currentUser')).name,
            rating:rating,
            reviewdesc:reviewdesc,
            date:moment().format('DD-MM-YYYY')
        }
        console.log(reviewDetails)
        
        try {
            const result = await axios.post('/api/review/reviewroom',reviewDetails)
            console.log(reviewDetails)
        }
        catch (error) 
        {

        }

    }
    async function cancelBooking(bid,id)
    {
 
        try 
        {
            const result = await (await axios.post('/api/bookings/cancelbooking',{bid,id})).data
            console.log(result)
            window.location.reload()

        }
        catch (error) 
        {
        }
    }

    return (
        <div>
            <div className='row'>
                <div className='col-md-6'>
                    {bookings && (bookings.map(booking=>{
                       return(
                       <div className='bs' style={{margin:'10px',paddingBottom:'50px'}}>
                            <h1 className='fnt'>{booking.roomname}</h1>
                            <hr></hr>
                            <h1 className='fnt'>Booking Id:{booking._id}</h1>
                            <h1 className='fnt'>Check In:{booking.fromdate}</h1>
                            <h1 className='fnt'>Check Out:{booking.todate}</h1>
                            <h1 className='fnt'>Amount:{booking.totalamount}</h1>
                            <h1 className='fnt'>Status:{booking.status}</h1>
                            {Reviewbtn(booking.todate,booking.roomid,booking._id,booking.status)}
          
                        </div>
                    )})) }
                </div>
            </div>
            
        </div>
    )

    function Reviewbtn(tdt,id,bid,status)
    {
        var fparts = tdt.split('-')
        var fyear = parseInt(fparts[2])
        var fmonth = parseInt(fparts[1])
        var fdate = parseInt(fparts[0])
        const cout = new Date(fyear, fmonth-1, fdate)
        console.log(cout)
        console.log(cout.getTime())
        console.log(currentdate.getTime())
        console.log(currentdate)
        if((cout.getTime())< (currentdate.getTime()))
        {
           
            return(
                <Link to={`/review/${id}`}>
                <button className='btn btn-primary' style={{float:'right'}}>Add Review</button>
                </Link>
            )
            
        }
        else
        {
            if(status != 'cancelled')
            {
                return(<button className='btn btn-primary' style={{float:'right'}} onClick={()=>{cancelBooking(bid,id)}}>Cancel Booking</button>)
            }    
        }
    
    }

}

