import React, { useState } from "react";
import './register.css'
import Error from "../components/Error";
import succ from "../components/succ";
import axios from "axios";
import { triggerFocus } from "antd/es/input/Input";
import Swal from "sweetalert2";
function Registerscreen() {
    const [name, setName] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [cpassword, setcpassword] = useState('')
    const [phoneno, setphoneno] = useState('')
    const [address, setaddress] = useState('')
    const [pcode, setpcode] = useState('')
    const [aadhar, setaadhar] = useState('')
    const [gender, setgender] = useState('')
    const [error, seterror] = useState()
    const [success, setsuccess] = useState()
    const [loading,setloading]=useState(true)
    function checkEmail(em)
    {
        return /\S+@\S+\.\S+/.test(em);
    }
    async function register() {

        if(name=='' ||email=='' || password=='' || cpassword=='' || phoneno=='' || address==''||pcode==''||aadhar==''||gender=='')
        {
            Swal.fire('Warning !','Please Fill All fields','error')
        }
        if(typeof(name) != 'string')
        {
            Swal.fire('Warning !','Please Fill Correct data type','error')
        }
        if(phoneno.length != 10)
        {
            Swal.fire('Warning !','Phone number must be 10 digit','error')
        }
        if(password != cpassword)
        {
            Swal.fire('Warning !','Password not matched!!!','error')
        }
        if(!checkEmail(email))
        {
            Swal.fire('Warning !','Incorrect Email Format!','error')
        }
        if(pcode.length!=6)
        {
            Swal.fire('Warning !','Postal Code Must Be 6 digit!','error')
        }
        if(aadhar.length!=12)
        {
            Swal.fire('Warning !','Aadhar Must Be 12 digit!','error')
        }
        if (password == cpassword && phoneno.length==10 && checkEmail(email) && pcode.length == 6 && aadhar.length==12) {
            const user = {
                name,
                password,
                cpassword,
                gender,
                email,
                phoneno,
                address,
                pcode,
                aadhar

            }
            try {
                setloading(true)
                const result = await (await axios.post('/api/users/register', user)).data
                setloading(false)
                setsuccess(true)
                setName('')
                setpassword('')
                setcpassword('')
                setgender('')
                setemail('')
                setphoneno('')
                setaddress('')
                setpcode('')
                setaadhar('')
                Swal.fire('Congrats!','Registered Successfully!','success')
            } catch (error) {
                setloading(false)
                seterror(true)
                console.log(error)
            }
           
        }
    }
    return (
        <div>
            {error && <h1>Error...</h1>}
            <div class="regbody">

                <div class="regcon">
                    <div class="forms1">
                        <div class="wrapper">
                        {success && <succ message='Register Successfully.'/> }
                            <div class="title">
                                Registration
                            </div>
                            <div class="form">
                                <div class="inputfield">
                                    <label>Name</label>
                                    <input type="text" class="input" value={name} onChange={(e) => { setName(e.target.value) }} />
                                </div>
                                <div class="inputfield">
                                    <label>Password</label>
                                    <input type="password" class="input" value={password} onChange={(e) => { setpassword(e.target.value) }} />
                                </div>
                                <div class="inputfield">
                                    <label>Confirm Password</label>
                                    <input type="password" class="input" value={cpassword} onChange={(e) => { setcpassword(e.target.value) }} />
                                </div>
                                <div class="inputfield">
                                    <label>Gender</label>
                                    <div class="custom_select">
                                        <select value={gender} onChange={(e) => { setgender(e.target.value) }}>
                                            <option value="">Select</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="inputfield">
                                    <label>Email Address</label>
                                    <input type="text" class="input" value={email} onChange={(e) => { setemail(e.target.value) }} />
                                </div>
                                <div class="inputfield">
                                    <label>Phone Number</label>
                                    <input type="number" class="input" value={phoneno} onChange={(e) => { setphoneno(e.target.value) }} />
                                </div>
                                <div class="inputfield">
                                    <label>Address</label>
                                    <textarea class="textarea" value={address} onChange={(e) => { setaddress(e.target.value) }} />
                                </div>
                                <div class="inputfield">
                                    <label>Postal Code</label>
                                    <input type="text" class="input" value={pcode} onChange={(e) => { setpcode(e.target.value) }} />
                                </div>
                                <div class="inputfield">
                                    <label>Aadhar</label>
                                    <input type="text" class="input" value={aadhar} onChange={(e) => { setaadhar(e.target.value) }} />
                                </div>
                                <div class="inputfield">
                                    <input type="submit" value="Register" class="btn" onClick={register} />
                                </div>
                                <div class="inputfield">
                                    <label><a href="/login">Already Have an Account?</a></label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Registerscreen