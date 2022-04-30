import axios from 'axios';
import React, { useState } from 'react';
import './registration.css';
import { useNavigate } from 'react-router-dom';

function Registration(){
    
    const navigate = useNavigate();
    const[formValue, setData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        username: "",
        password: "",
        register: ""
    })

    // setRedirect = () => {
    //     this.setState({
    //       redirect: true
    //     })
    //     console.log('inside setRedirect')
    //     this.renderRedirect();
    // }
    // renderRedirect = () => {
    //     if (this.state.redirect) {
    //         this.setState({
    //         redirect: false
    //         })
    //         console.log('inside renderRedirect')
    //         return <Navigate replace to='/confirm' />
    //     }
    //   }

    // handleUsernameChange = event => {
        
    //     this.setState({
    //         username: event.target.value
    //     })
    // }

    // handlePasswordChange = event => {
    //     this.setState({
    //         password: event.target.value
    //     })
    // }
 
    // handleEmailChange = event => {
    //     this.setState({
    //         email: event.target.value
    //     })
    // }

    // ToConfirm = () => {
    //     window.location.href ='/confirm';
    // }
    function handleChange(e){
        const newdata = {...formValue}
        newdata[e.target.name] = e.target.value
        setData(newdata)

    }

    function handleSubmit(e){
        // alert(`${this.state.username}`) //this is where we have to implement if username and password match to mongodb user then it redirects to a new page
        e.preventDefault();

        const user = { 
            firstName: formValue.firstName,
            lastName: formValue.lastName,
            email: formValue.email,
            username: formValue.username,
            password: formValue.password,
            register: "Register"
        };
        console.log(user);
        axios.post('/register', user
        )
        .then(response => {
            console.log("Here:" + response);
            navigate('/Verify');

        }).catch(response => {
            console.log(response);
            window.alert('A Problem Occured creating your account')
            navigate('/register');
        })

    }

    
        return (
            <div>
          
            <form onSubmit={ (e) =>handleSubmit(e)}>
                <div className = "Registration-div">
                    <h1>
                        Create An Account
                    </h1>               
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
                        <label> Username: </label>
                        <input 
                            type="text" 
                            name="username" 
                            value={formValue.username} 
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        <label> First Name: </label>
                        <input 
                            type="firstName" 
                            name="firstName" 
                            value={formValue.firstName} 
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        <label> Last Name: </label>
                        <input 
                            type="lastName" 
                            name="lastName" 
                            value={formValue.lastName} 
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        <label> Password: </label>
                        <input 
                            type="password" 
                            name="password" 
                            value={formValue.password} 
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <button type="submit" >Create Account</button>
                </div>
            </form>
            </div>
        );
    }

 
export default Registration;