import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import axios from 'axios';
import './LoggedIn.css'

function LoggedIn() {
    const {state} = useLocation();
    const data = state.data;
    const [show, setShow] = useState(false)
    const navigate = useNavigate();

    function logout (e) {
        e.preventDefault();
        axios.post('/logout').then(response => {
            navigate('/');
        }).catch(response => {
            navigate('/');
        });
    }

    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <h1> {data.username} </h1>
                <button onClick={() => navigate('/ModifyAccount', {state: {data}})}> 
                    Modify Account
                </button>
                {/* Might have to make logout buttonclick set username, password, email back to default values of null, not sure tho */}
                <button onClick={(e) => logout(e)}>
                    Logout
                </button>
                <button onClick={()=>setShow(!show)}>
                    Access Guidebook
                </button>
                <button onClick={() => navigate('/chat', {state: {data}})}>
                    Chat
                </button>
            </nav>
            {
                show?<p className="guidebook">placeholder text for guidebook</p>:null
            }
            <div className="generalPage">
                <div className="space">
                </div>
                <div className="game">
                    This is where the game will be
                </div>
            </div>
        </div>
    );
}

export default LoggedIn;