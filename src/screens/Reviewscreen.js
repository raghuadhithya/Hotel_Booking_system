import React, { useState, useEffect, Component } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import Swal from "sweetalert2";
import moment from "moment";
function Reviewscreen() {
    const [rooms, setrooms] = useState([])
    const [rating, setrating] = useState(1)
    const [reviewdesc, setreviewdesc] = useState()
    const [reviewval, setreviewval] = useState(1)
    const { roomid } = useParams();
    if (!localStorage.getItem('currentUser')) {
        window.location.href = '/login'
    }
    const myFunction = async () => {
        try {
            const data = (await axios.post('/api/rooms/getroombyid', { roomid: roomid })).data;
            console.log(data);
            console.log()
            setrooms(data)
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        myFunction();
    }, []);

    async function reviewSubmit() {
        const reviewDetails =
        {
            roomname: rooms.name,
            roomid: rooms._id,
            userid: JSON.parse(localStorage.getItem('currentUser'))._id,
            username: JSON.parse(localStorage.getItem('currentUser')).name,
            rating: rating,
            reviewdesc: reviewdesc,
            date: moment().format('DD-MM-YYYY')
        }
        console.log(reviewDetails)

        try {
            const result = await axios.post('/api/review/reviewroom', reviewDetails)
            console.log(reviewDetails)
        }
        catch (error) {

        }

    }
    return (
        <div>
            <br></br>
            <p style={{ textAlign: 'center', fontSize: '23px' }}><b>{rooms.name}</b></p>
            <p style={{ textAlign: 'center', fontSize: '23px' }}><b>User Review</b></p>
            <div style={{margin:'0px 180px'}} >
                <form>
                    <div class="reviewform">
                        <label >Rating</label>
                        <select className="form-control" value={rating} onChange={(e) => setrating(e.target.value)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <label>Write Your Feedback</label>
                        <textarea className="form-control" rows="3" placeholder="Describe Your Experience..." value={reviewdesc} onChange={(e) => setreviewdesc(e.target.value)}></textarea>
                        <button onClick={reviewSubmit}>Submit</button>
                    </div>
                </form>

            </div>
        </div>
    );
}
export default Reviewscreen;