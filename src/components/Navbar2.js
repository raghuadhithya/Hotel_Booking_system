import React from "react";
import './Navbar.css'
import { Link } from "react-router-dom";
function Navbar2() {
  const user = JSON.parse(localStorage.getItem('currentUser'))
  function logout()
  {
    localStorage.removeItem('currentUser')
    window.location.href='/login'
  }
  return (
    <div class="navmain1 bs">
      <nav>
        <ul class="main1">
          
        {user ?
          (<ul class="main1">
            <li><a href="/">A to Z Booking</a></li>
            <div class="dropdown" style={{float:'right'}}>
              <button class="dropbtn">{user.name}</button>
              <div class="dropdown-con">
                <a href="/profile">Profile</a>
                <a href="" onClick={logout}>Logout</a>
              </div>
            </div>
          </ul>) : (
            <ul class="main1">
              <li><a href="/">A to Z Booking</a></li>
              <li style={{ float: 'right' }}><a href="/login">Login</a></li>
              <li style={{ float: 'right' }}><a href="/register">Register</a></li>
            </ul>
          )}
          </ul>
      </nav>
    </div>
  );



} export default Navbar2