import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Modal, Carousel } from 'react-bootstrap';
import axios from "axios";
import Bookingscreen from "../screens/Bookingscreen";
import StarRatings from "react-star-ratings";
import './room.css'
import PdfGenerator from "../screens/PdfGenerator";
function Room({ room, fromdate, todate }) {

    var rating = 0, len=room.review.length;
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    function getStars(rating) 
    {
       return(<StarRatings
            rating={rating}
            starRatedColor="gold"
            numberOfStars={5}
            name='rating'
            starDimension="18px"
           starSpacing="0px" 
        />)
    }

    return (
        <div class="roommain">
            <div className="row bs">
                <div className="col-md-4">
                    <img src={room.imageurls[0]} class="smallimg"/>
                </div>
                <div className="col-md-7">
                    <div className="f1">
                    <p style={{fontFamily:'Times,serif'}}><b>{room.name}</b></p>
                    <p style={{fontSize:'18px',fontFamily:'Times,serif'}}>Max Count:   {room.maxcount}</p>
                    <p style={{fontSize:'18px',fontFamily:'Times,serif'}}>Phone number:{room.phonenumber}</p>
                    <p style={{fontSize:'18px',fontFamily:'Times,serif'}}>Type:        {room.type}</p>
                    <p style={{fontSize:'18px',fontFamily:'Times,serif'}}>City:        {room.city}</p>
                    {
                        
                        room.review.map(review => {
                        if(review.rating==0)
                        {
                            len=len-1;
                        }
                        rating = rating + parseInt(review.rating);
                    })
                    }
                    <p style={{fontSize:'18px',fontFamily:'Times,serif'}}>Rating:{getStars((parseInt(rating) / len))}</p>
                    </div>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <div class="bookbtn">
                    {(fromdate && todate) && (<Link to={`/book/${room._id}/${fromdate}/${todate}`}>
                        <button className="btn btn-primary">Book Now</button>
                    </Link>)}
                </div>
                <div class="viewbtn" onClick={handleShow}>
                    <button className="btn btn-primary">View Details</button>
                </div>
            </div>
            <Modal show={show} onHide={handleClose} size="lg" >
                <Modal.Header>
                    <Modal.Title style={{fontFamily:'Times,serif'}}>{room.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Carousel>
                        {room.imageurls.map(url => {
                            return <Carousel.Item>
                                <img
                                    className="d-block w-100 bigimg"
                                    src={url}
                                />
                            </Carousel.Item>
                        })}
                    </Carousel>
                    <p style={{fontFamily:'Times,serif'}}>{room.description}</p>
                    <p style={{fontFamily:'Times,serif',fontSize:'30px',fontWeight:'bold'}}>Ratings and Reviews</p>
                    {room.review.map(review => {
                        if(review.rating==0)
                        {
                            
                        }
                        else
                        {
                        return (
                            <div>
                                <hr></hr>
                                <p style={{fontFamily:'Times,serif',fontSize:'18px'}}>{review.username}</p>
                                <p style={{fontFamily:'Times,serif'}}>{getStars(parseInt(review.rating))} {review.date}</p>
                                <p style={{fontFamily:'Times,serif'}}>{review.reviewdesc}</p>
                                <hr></hr>
                            </div>
                        )
                        }
                    })
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
export default Room;