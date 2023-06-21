import React, { useState } from "react";
import './register.css'
import succ from "../components/succ";
import Error from "../components/Error";
import { useParams } from 'react-router-dom';
import axios from "axios";
import Swal from "sweetalert2";
function Loginscreen() {
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [error, seterror] = useState()
    const [success, setsuccess] = useState()
    const [loading, setloading] = useState(true)
    async function login() {

        if(email=='' || password=='')
        {
            Swal.fire('Warning !','Please Fill All fields','error')
        }

        const user = {
            email,
            password
        }
        try {
            setloading(true)
            const result = (await axios.post('/api/users/login', user)).data
            setloading(false)
            localStorage.setItem('currentUser', JSON.stringify(result))
            const mem=JSON.parse(localStorage.getItem('currentUser'))
            if(mem.isAdmin)
            {
                window.location.href = '/admin' 
            }
            else
            {
                window.location.href = '/home'
            }
            
        } catch (error) {
            console.log(error)
            setloading(false)
            seterror(true)
        }
    }
    return (
        <div>
            
            <div class="con">
                <div class="wrapper">
                    {error && <Error message='Invalid Credentials'/>}
                    <div class="title">
                        Login
                    </div>
                    <div class="form">
                        <div class="inputfield">
                            <label>User Name</label>
                            <input type="text" class="input" value={email} onChange={(e) => { setemail(e.target.value) }} />
                        </div>
                        <div class="inputfield">
                            <label>Password</label>
                            <input type="password" class="input" value={password} onChange={(e) => { setpassword(e.target.value) }} />
                        </div>
                        <div class="inputfield">
                            <input type="submit" value="Login" class="btn" onClick={login} />
                        </div>
                        <div class="inputfield">
                           <label><a href="/register">Sign up?</a></label> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Loginscreen