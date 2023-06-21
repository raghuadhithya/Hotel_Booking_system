import React, { useState, useEffect } from "react";
import axios from "axios";
import { DatePicker, Space, DatePickerProps } from 'antd';
import 'antd/dist/antd';
import Room from "../components/Room"
import Bookingscreen from "./Bookingscreen";
import Error from "../components/Error";
import moment from 'moment'
function Homescreen() {
    const [rooms, setrooms] = useState([])
    const [loading, setloading] = useState()
    const [error, seterror] = useState()
    const [dates, setdates] = useState([])
    const [fromdate, setfromdate] = useState()
    const [todate, settodate] = useState()
    const [drooms, setdrooms] = useState([])
    const [searchkey, setsearchkey] = useState()
    const [type, settype] = useState('all')
    const [drange,setdrange]=useState([
        moment('2022-01-01', 'YYYY-MM-DD'), // start date
        moment() // end date (defaults to current date)
    ])
    const { RangePicker } = DatePicker;
    console.log(dates)
    const myFunction = async () => {
        try {
            setloading(true)
            const data = (await axios.get('/api/rooms/getallrooms')).data
            setrooms(data)
            setdrooms(data)
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


    function filterBySearch()
     {
        const temprooms=drooms.filter(rooms=>rooms.city.toLowerCase().includes(searchkey.toLowerCase()))
        setrooms(temprooms)
    }
    function filterByType(e)
    {
        settype(e)
        if(e!=='all')
        {
            const temprooms=drooms.filter(rooms=>rooms.type.toLowerCase() == e.toLowerCase())
            setrooms(temprooms)
        }
        else
        {
            setrooms(drooms)
        }
        

    }
    return (
        <div className="container">
            <div className="row mt-5 bs" style={{margin:'0px 150px'}}>
                <div className="col-md-4">
                    <RangePicker   selected={dates} onChange={(values) => {
                        const dt = new Date(values[0])
                        var fmonth = String(dt.getMonth() + 1).padStart(2, '0');
                        var fdate = String(dt.getDate()).padStart(2, '0');
                        let format1 = `${fdate}-${fmonth}-${dt.getFullYear()}`;
                        setfromdate(format1)
                        console.log(format1)
                        const dt1 = new Date(values[1])
                        var tmonth = String(dt1.getMonth() + 1).padStart(2, '0');
                        var tdate = String(dt1.getDate()).padStart(2, '0');
                        let format2 = `${tdate}-${tmonth}-${dt1.getFullYear()}`;
                        settodate(format2)
                        console.log(format2)
                        var trooms = []
                        var k=true
                        console.log(drooms)
                        for (var room of rooms) 
                        {
                            
                            if (room.currentbookings.length > 0) {
                                for(var booking of room.currentbookings) 
                                {
                                    var availability = false
                                    console.log('Now in room')
                                    console.log(room.name)
                                    var fct = (booking.fromdate).split('-')
                                    var fctyear = parseInt(fct[2])
                                    var fctmonth = parseInt(fct[1])
                                    var fctdate = parseInt(fct[0])
                                    var fdt = new Date(fctyear, fctmonth - 1, fctdate)
                                    var cfd = moment(fdt).format('DD-MM-YYYY')
                                    var tct = (booking.todate).split('-')
                                    var tctyear = parseInt(tct[2])
                                    var tctmonth = parseInt(tct[1])
                                    var tctdate = parseInt(tct[0])
                                    var tdt = new Date(tctyear,tctmonth- 1, tctdate)
                                    var ctd = moment(tdt).format('DD-MM-YYYY')
                                    var fd = moment(dt).format('DD-MM-YYYY')
                                    var td = moment(dt1).format('DD-MM-YYYY')
                                    console.log(fd)
                                    console.log(td)
                                    console.log(cfd)
                                    console.log(ctd)
                                    console.log('res')
                                    console.log(!((dt.getTime() > fdt.getTime()) && (dt.getTime() < tdt.getTime())) && !((dt1.getTime() > fdt.getTime()) && (dt1.getTime() < tdt.getTime())))

                                    console.log(!((dt.getTime() > fdt.getTime()) && (dt.getTime() < tdt.getTime())) && !((dt1.getTime() > fdt.getTime()) && (dt1.getTime() < tdt.getTime())))
                                    console.log('check')
                                    console.log(moment(fdt).isBetween(dt,dt1))
                                    console.log(moment(tdt).isBetween(dt,dt1))
                                    
                                    if (!(moment(fdt).isBetween(dt,dt1)) && !(moment(tdt).isBetween(dt,dt1)) ) 
                                    {
                                        console.log('true1')
                                        if (fd !== cfd && fd !== ctd && td !== cfd && td !== ctd) 
                                        {
                                            console.log('true2')
                                            availability = true;
                                        }
                                        else
                                        {
                                            break;
                                        }

                                    }
                                    else
                                    {
                                       k=false 
                                       break
                                    }
                                
                                }
                            }
                            if (availability == true || room.currentbookings.length == 0 ||k)
                            {
                                console.log('saved')
                                trooms.push(room)
                                console.log(room.name)
                            }
                        }
                        setrooms(trooms)
                        console.log(trooms)
                        console.log(rooms)
                      }
                    } 
                   
                    />

                </div>
                <div className="col-md-4" >
                    <input type="text" className="form-control" placeholder="Search Place" value={searchkey} onChange={(e) => {
                        setsearchkey(e.target.value) }} onKeyUp={filterBySearch}/>
                </div>
                <div className="col-md-4">
                    <select className="form-control" value={type} onChange={(e)=>{filterByType(e.target.value)}}>
                        <option value="all">All</option>
                        <option value="delux">Delux</option>
                        <option value="non-delux">Non-Delux</option>
                    </select>
                </div>
            </div>
            <div className="row justify-content-center mt-5">
                {loading ? (<h1>loading....</h1>) : error ? (<Error />) : (rooms.map(room => {
                    return <div className="col-md-9 mt-2">
                        <Room room={room} fromdate={fromdate} todate={todate}/>

                    </div>
                }))}
            </div>

        </div>
    )
}
export default Homescreen;