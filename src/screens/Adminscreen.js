import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tabs } from 'antd';
import Swal from "sweetalert2";
const { TabPane } = Tabs
function Adminscreen() {
    if (!localStorage.getItem('currentUser')) {
        window.location.href = '/login'
    }
    return (
        <div className="mt-3 ml-3 bs">
            <h1 className="text-center"><b>Admin Panel</b></h1>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Bookings" key="1">
                    <Bookings />
                </TabPane>
                <TabPane tab="Rooms" key="2">
                    <Rooms />
                </TabPane>
                <TabPane tab="Add Rooms" key="3">
                    <Addroom />
                </TabPane>
                <TabPane tab="Users" key="4">
                    <Users />
                </TabPane>
            </Tabs>

        </div>
    )
}
export default Adminscreen;


export function Bookings() {
    const [bookings, setbookings] = useState(0)
    const myFunction = async () => {
        try {
            const data = (await axios.get("/api/bookings/getallbookings")).data
            setbookings(data)
        }
        catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        myFunction();
    }, []);
    return (
        <div className="row">
            <div className="col-md-10">
                <table>
                    <thead>
                        <tr>
                            <th>Booking ID</th>
                            <th>User ID</th>
                            <th>Room</th>
                            <th>Check In</th>
                            <th>Check Out</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length && (bookings.map(booking => {
                            return (
                                <tr>
                                    <td>{booking._id}</td>
                                    <td>{booking.userid}</td>
                                    <td>{booking.roomname}</td>
                                    <td>{booking.fromdate}</td>
                                    <td>{booking.todate}</td>
                                    <td>{booking.status}</td>
                                    <hr />
                                </tr>)
                        }))}
                    </tbody>
                </table>
            </div>

        </div>

    )

}


export function Rooms() {
    const [rooms, setrooms] = useState(0)
    const myFunction1 = async () => {
        try {
            const data = (await axios.get("/api/rooms/getallrooms")).data
            setrooms(data)
        }
        catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        myFunction1();
    }, []);
    return (
        <div className="row">
            <div className="col-md-10">
                <table>
                    <thead>
                        <tr>
                            <th>Room ID</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Rend Per day</th>
                            <th>Max Count</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.length && (rooms.map(room => {
                            return (
                                <tr>
                                    <td>{room._id}</td>
                                    <td>{room.name}</td>
                                    <td>{room.type}</td>
                                    <td>{room.rentperday}</td>
                                    <td>{room.maxcount}</td>
                                    <td>{room.phonenumber}</td>
                                </tr>)
                        }))}
                    </tbody>
                </table>
            </div>

        </div>

    )

}


export function Users() {
    const [users, setusers] = useState(0)
    const myFunction2 = async () => {
        try {
            const data = (await axios.get("/api/users/getallusers")).data
            setusers(data)
        }
        catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        myFunction2();
    }, []);

    return (
        <div className="row">
            <div className="col-md-10">
                <table>
                    <thead>
                        <tr>
                            <th>User ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone No</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length && (users.map(user => {
                            return (
                                <tr>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.phoneno}</td>
                                </tr>)
                        }))}
                    </tbody>
                </table>
            </div>

        </div>

    )

}

export function Addroom() {
    const [name, setroomname] = useState('')
    const [rentperday, setrend] = useState('')
    const [img1, setimg1] = useState('')
    const [img2, setimg2] = useState('')
    const [img3, setimg3] = useState('')
    const [type, settype] = useState("Delux")
    const [maxcount, setmax] = useState('')
    const [phonenumber, setphnno] = useState('')
    const [city, setcity] = useState('')
    const [description, setdesc] = useState('')
    async function addRoom() {
        const newroom = {
            name: name,
            rentperday: parseInt(rentperday),
            imageurls: [img1, img2, img3],
            type: type,
            maxcount: maxcount,
            phonenumber: phonenumber,
            city: city,
            description: description,
        }

        if (phonenumber.length == 10) {
            try {
                const result = await (await axios.post('/api/rooms/addroom', newroom)).data
                console.log(result);
            } catch (error) {
                console.log(error);
            }
            console.log(newroom)
        }


    }
    return (
        <div class="addroom">
            <form className="form-group">
                <div className="col-md-10">
                    <table class="form-tab">
                        <tr>
                            <td><label>Room Name</label></td>
                            <td><input type="text" className="form-control" value={name} onChange={(e) => { setroomname(e.target.value) }} required/></td>
                            <td><label>Rend Per Day</label></td>
                            <td><input type="number" className="form-control" value={rentperday} onChange={(e) => { setrend(e.target.value) }} required/></td>

                        </tr>
                        <tr>
                            <td><label>Type</label></td>
                            <td><select className="form-control" value={type} onChange={(e) => { settype(e.target.value) }}>
                                <option>Delux</option>
                                <option>Non-Delux</option>
                            </select></td>
                            <td><label>Image 1</label></td>
                            <td><input type="text" className="form-control" value={img1} onChange={(e) => { setimg1(e.target.value) }} required/></td>

                        </tr>
                        <tr>

                            <td><label>Image 2</label></td>
                            <td><input type="text" className="form-control" value={img2} onChange={(e) => { setimg2(e.target.value) }} required/></td>
                            <td><label>Image 3</label></td>
                            <td><input type="text" className="form-control" value={img3} onChange={(e) => { setimg3(e.target.value) }} required/></td>

                        </tr>
                        <tr>
                            <td><label>Max Count</label></td>
                            <td><input type="number" className="form-control" value={maxcount} onChange={(e) => { setmax(e.target.value) }} required/></td>
                            <td><label>City</label></td>
                            <td><input type="text" className="form-control" value={city} onChange={(e) => { setcity(e.target.value) }} required/></td>

                        </tr>
                        <tr>
                            <td><label>Phonenumber</label></td>
                            <td><input type="tell" className="form-control" value={phonenumber} onChange={(e) => { setphnno(e.target.value) }} required /></td>
                            <td ><label>Description</label></td>
                            <td><textarea className="form-control" rows={4} value={description} onChange={(e) => { setdesc(e.target.value) }} required></textarea></td>
                        </tr>
                        <tr>
                            <td colSpan={4} style={{ textAlign: 'center' }}><button className="btn btn-primary" onClick={addRoom} required>Add Room</button></td>
                        </tr>
                    </table>

                </div>
            </form>
        </div>)
}

