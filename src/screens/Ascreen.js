import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel } from "react-bootstrap";
import { Link } from "react-router-dom";
function Ascreen() 
{
    if(window.location.path === 'http://localhost:3000/bs')
    {
        window.location="http://localhost:4200/"
    }
    return(
       <div>
       </div>
    )
}
export default Ascreen;