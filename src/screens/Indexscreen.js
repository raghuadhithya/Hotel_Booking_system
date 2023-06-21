import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from "react-bootstrap";
import './home.css'
function Indexscreen() {

    return (
        <div class="front">
            <section class="slide">
                <Carousel>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://wallpaperaccess.com/full/2690549.jpg"
                            alt="First slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://wallpaperaccess.com/full/658374.jpg"
                            alt="Second slide"
                        />
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                            className="d-block w-100"
                            src="https://c4.wallpaperflare.com/wallpaper/686/52/945/luxurious-hotel-room-wallpaper-preview.jpg"
                            alt="Third slide"
                        />
                    </Carousel.Item>
                </Carousel>

            </section>
            <section class="header1">
                <div class="text-box1">
                    <h1>Are You Dreaming Of A Place To Stay ?</h1>
                    <p>We Are Here...Take It From Us.!!!<br></br>You're In Good Hands . Your Favourite Hotel Booking Partner!!!</p>
                    <a href="/home" class="hero-btn">Find Now</a>

                </div>
            </section>
            <div class="facil">
                <section class="facilities">
                    <h1>Our Facilities</h1>

                    <div class="row">
                        <div class="faci-col">
                            <img src="https://c4.wallpaperflare.com/wallpaper/921/708/937/best-hotels-travel-thailand-tourism-wallpaper-preview.jpg" />
                            <h3>5 Star Hotels</h3>
                            <p>Book your stay with us and immerse yourself in unparalleled luxury.Stay in style and Comfort at our exclusive 5-star properties.</p>
                        </div>
                        <div class="faci-col">
                            <img src="https://wallpaperaccess.com/full/1401021.jpg" />
                            <h3>Tasty And Healthy Food</h3>
                            <p>Something hot.Something tasty.Food that satisfies both the stomach and the soul.A fusion of flavors that will leave you wanting more.</p>
                        </div>
                        <div class="faci-col">
                            <img src="https://watermark.lovepik.com/photo/20211202/large/lovepik-hotel-service-close-to-housekeeper-picture_501417203.jpg" />
                            <h3>Room Service</h3>
                            <p>Room service that exceeds your expectations.Relax and let us take care of your culinary needs.</p>
                           
                        </div>
                    </div>
                </section>
            </div>

        </div>
    )
}
export default Indexscreen;