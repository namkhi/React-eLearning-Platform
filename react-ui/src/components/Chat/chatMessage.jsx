import React, {useEffect, useState} from 'react';
import './chatMessage.css';
import axios from 'axios';

function ChatMessage({message, own}){

    const [username, setUsername] = useState([]);
    useEffect(() => {
        const current = async() => {
            const res = await axios.get("/id/"+ message.sender);
            setUsername(res.data)
            console.log(username);
            
        };
        current()
    },[]);

return(
    <div className={own ? "message own" : "message"}>
        <div className="messageBody">
            <div className="username">
                <h6>{username}</h6>
            </div>
            {message.text}
        </div>
    </div>
);
}

export default ChatMessage;