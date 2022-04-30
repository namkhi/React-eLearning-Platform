import {React, useEffect, useState} from 'react';
import './chatPanel.css';
import axios from 'axios';

function ChatPanel({targetUser, currentUser}){

    const [convo, setConvo] = useState(null)

    // useEffect(() => {
    //   const convo = async ()=> {
    //     try{
    //     const res = await axios.get("/conversations/find/")
    //     }
    //     catch(err){
    //         console.log(err)
    //     }
    // }
    // },[])
    return (
        <div className="Panel">
             <button type="button" className="panel btn btn-primary">{targetUser.username}</button>
        </div>
    )

}


export default ChatPanel;