import React, { useState, useEffect, Component } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import Error from "../components/Error";
import './Homescreen'
import '../components/Room'
import moment from "moment";
import { Button, Modal, Carousel } from 'react-bootstrap';
import Room from "../components/Room";
import PdfGenerator from "./PdfGenerator";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2'

function Bookingscreen() {
    const [rooms, setrooms] = useState([])
    const [loading, setloading] = useState(true)
    const [error, seterror] = useState()
    const [avail, setavail] = useState(50)
    const [totalamount, settotalamount] = useState()
    const { roomid } = useParams();
    const { fromdate } = useParams();
    const { todate } = useParams();
    const { totalrooms } = useParams();
    var fparts = fromdate.split('-')
    var fyear = parseInt(fparts[2])
    var fmonth = parseInt(fparts[1])
    var fdate = parseInt(fparts[0])
    const from = new Date(fyear, fmonth, fdate)
    var tparts = todate.split('-')
    var tyear = parseInt(tparts[2])
    var tmonth = parseInt(tparts[1])
    var tdate = parseInt(tparts[0])
    const to = new Date(tyear, tmonth, tdate)
    const differ = to.getTime() - from.getTime()
    const totaldays = parseInt(differ) / parseInt((1000 * 3600 * 24))
    if (!localStorage.getItem('currentUser')) {
        window.location.href = '/login'
    }
    const myFunction = async () => {
        try {
            setloading(true)
            const data = (await axios.post('/api/rooms/getroombyid', { roomid: roomid })).data;
            settotalamount(data.rentperday * totaldays)
            console.log(data);
            console.log()
            setrooms(data)
            setloading(false)
        } catch (error) {
            seterror(true)
            console.log(error)
            setloading(false)
        }

    }
    useEffect(() => {

        myFunction();
    }, []);
    async function bookRoom() {
        const bookingDetails =
        {
            roomname: rooms.name,
            roomid: rooms._id,
            userid: JSON.parse(localStorage.getItem('currentUser'))._id,
            username: JSON.parse(localStorage.getItem('currentUser')).name,
            fromdate,
            todate,
            totalamount,
            totaldays,
        }
        const diff = avail - totalrooms

        setavail(diff)
        console.log('availllll')
        console.log(avail)
        console.log('boooookkkk')
        Swal.fire('Congrats','Room Booked Sucessfully','success')
        try {
            const result = await axios.post('/api/bookings/bookroom', bookingDetails)
            console.log(bookingDetails)
    

        }
        catch (error) {

        }
    }

    return (
        <div>
            {loading ? (<h1>Loading......</h1>) : error ? (<Error />) : (<div>
                <div className="row bs" style={{ margin: '20px' }}>
                    <div className="col-md-5">
                        <h1>{rooms.name}</h1>
                        <img src={rooms.imageurls[0]} className="bigimg" />
                    </div>
                    <div className="col-md-5">
                        <div style={{ textAlign: 'right' }}>
                            <h1>Booking Details</h1>
                            <hr />
                            <b>
                                <p>Name:{JSON.parse(localStorage.getItem('currentUser')).name}</p>
                                <p>Check-In:{fromdate}</p>
                                <p>Check-Out:{todate} </p>
                                <p>Max Count: {rooms.maxcount}</p>
                                <p>Rating:{rooms.review[0].rating}</p>
                            </b>
                        </div >
                        <div style={{ textAlign: 'right' }}>
                            <b>
                                <h1>Amount</h1>
                                <hr />
                                <p>Total days:{totaldays} </p>
                                <p>Rent Per day: {rooms.rentperday}</p>
                                <p>Total Amount: {totalamount}</p>
                            </b>
                        </div>
                        <div style={{ float: 'right' }}>
                            <Link to={`/pdf/${JSON.parse(localStorage.getItem('currentUser')).name}/${rooms.name}/${fromdate}/${todate}/${totaldays}/${totalamount}`}>
                                <button className="btn btn-primary" onClick={bookRoom} >Pay Now</button>

                            </Link>
                        </div>
                    </div>
                </div>
            </div>)}
        </div>
    );
}
export default Bookingscreen;