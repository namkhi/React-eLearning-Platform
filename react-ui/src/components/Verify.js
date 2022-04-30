import React, { useState }from 'react';
import './Verify.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


function Verify () {
    const navigate = useNavigate();
    const [formValue, setData] = useState({
        email: "",
        code: "",
        verify: "",
        resend: ""
    })

    function handleChange(e){
        const newdata = {...formValue}
        newdata[e.target.name] = e.target.value
        setData(newdata)

    }

    function handleResend(e){
        e.preventDefault();

        const resend = {
            email: formValue.email,
            code: formValue.code,
            verify: "",
            resend: "Resend"
        }
        console.log(resend.email);
        axios.post('/verify', resend).then(response =>{
            window.alert("A new code has been sent to the email")
        }).catch(response => {
            window.alert("Please enter a valid email address")
        })
    }

    function handleSubmit(e){
        // alert(`${this.state.username}`) //this is where we have to implement if username and password match to mongodb user then it redirects to a new page
        e.preventDefault();

        const verification = { 
            email: formValue.email,
            code: formValue.code,
            verify: "Verify",
            resend: ""
        };

        axios.post('/verify', verification
        )
        .then(response => {
            console.log("Here:" + response);
            navigate('/confirm');
        }).catch(response => {
            console.log(response);
            window.alert('Problem with Verifying occurred')
        })

    }

    return (
        <div className = "container-fluid verification-div">
            <h1 className="display-1">
                Verify Your Account
            </h1>
            <form onSubmit = {(e) => handleSubmit(e)}>
                <div className = "inner-div">
                    <div>
                        <label> Email Address: </label>
                        <input 
                            type="text" 
                            name="email" 
                            value={formValue.email}
                            onChange={(e) => handleChange(e)} 
                        />
                    </div>
                    <div>
                        <label> Verification Code: </label>
                        <input 
                            type="text" 
                            name="code" 
                            value={formValue.code}
                            onChange={(e) => handleChange(e)} 
                        />
                    </div>
                    <button type="submit" className="Verify-button"> Verify </button>
                    <button onClick={(e) => handleResend(e)}> Resend Code</button>
                </div>
            </form>
        </div>
    );
}
 
export default Verify;