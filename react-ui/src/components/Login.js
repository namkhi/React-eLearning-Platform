import React, {useState} from 'react';
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

  
function App(){
    const navigate = useNavigate();
    const [formValue, setData] = useState({
        username: "",
        password: "",
    })

    function handleChange(e){
        const newdata = {...formValue}
        newdata[e.target.name] = e.target.value
        setData(newdata)

    }

    function submitLogin(e){  
        e.preventDefault();
        const data = {
            username: formValue.username,
            password: formValue.password,
            login: "Log In"
        };
        

        // let axiosConfig = {
        //     headers: {
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //         "Access-Control-Allow-Origin": "*",
        //     }
        //   };

        axios.post('/', 
            data 
        )
        .then(response => {
            navigate('/LoggedIn', {state: {data}}); //confirm is just a place holder for test add route to game's port
        }).catch(response => {
            window.alert("Invalid input field(s)")
            navigate('/');
        }); 
    }

    return(
        <div className="App container-fluid">
        <div className="row">
            <div className="TitlePanel col-9" >
            <h1 className="display-1"> Scholar Village</h1>
            </div>
        <div className="LoginPanel col-3">
            <form className="FormPanel" onSubmit={(e) => submitLogin(e)}>
                <input type="text" className="form-control form-control-lg" name="username" placeholder="Username" onChange={(e) => handleChange(e)} value={formValue.username}/>
                
                <input type="password" className="form-control form-control-lg" name="password" placeholder="Password" onChange={(e) => handleChange(e)} value={formValue.password}/>
            
                <button type="submit" className="btn btn-light btn-lg" > 
                    <i className="bi bi-arrow-right"></i>
                </button>
            </form>
            <p>
                Don't have an account? <a href="register"> Sign me up</a>
            </p>
            </div>
        </div>
        </div>
      )
  
}



export default App;
