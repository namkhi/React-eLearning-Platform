import React, { useState, useEffect } from 'react';
import './mainChat.css';
import ChatPanel from './chatPanel';
import axios from 'axios';
import ChatMessage from './chatMessage';
import {useLocation, useNavigate} from 'react-router-dom';


function MainChat(){
    
    const {state} = useLocation();
    const data = state.data;
    
    const navigate = useNavigate();

    const [currentUser, setCurrent] = useState([]);

    const [targetUser, setTarget] = useState([]);

    const [currentChat, setCurrentChat] = useState([]);
    const [messages, setMessages] = useState([]);
    const [formValue, setData] = useState({
        message: ""
    })
    
    const [users, setUsers] = useState([]);

    async function getUsers(e){
        e.preventDefault();
        try{ 
            const allUsers = await axios.get('/getAll')
            console.log(allUsers.data)
            setUsers(allUsers.data)
        }
        catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        const current = async() => {
            
            const res = await axios.get("/"+ state.data.username);
            setCurrent(res.data)
        };
        current()
    },[]);
    
    useEffect(() => {
    async function getConvo(){
        //gets specific convoid then gets all messages from convo
        try{
            const convoId = await axios.get('/conversations/find/' + currentUser._id + "/" + targetUser._id);
           
            if(convoId.data == null){
                
                const newConvo = await axios.post('/conversations/newConvo',{senderId:currentUser._id, receiverId:targetUser._id});
                console.log(newConvo);
                setCurrentChat(newConvo);
            }else{
                setCurrentChat(convoId.data);
            }
        }
        catch(err){
            console.log(err);
        }
        

    }getConvo()
    },[targetUser._id, currentUser._id]);

    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
    async function getMessages(){
            
        try{ 
            const convoMsgs = await axios.get('/messages/' + currentChat._id)
            
            setMessages(convoMsgs);
        }
        catch(err){
            console.log(err);
        }
        finally{
            setLoading(false);
        }

    }
    getMessages()
    },[currentChat,messages]);
    

    function handleChange(e){
        const newdata = {...formValue}
        newdata[e.target.name] = e.target.value
        setData(newdata)
        console.log(newdata)
    }


    function sendMessage(e){
        e.preventDefault();
        
        const msg = {
            message: formValue.message
        }
        try{
            axios.post("/messages/", {
                convoId: currentChat._id,
                sender: currentUser._id,
                text: msg.message
            })
        }
        catch(err){
            console.log(err);
        }
        setData("");
    }
    
    return(
        <div className="App container-fluid">
            <div className="row">
                <div className="ChatPanel col-3">
                <div className="topNav">
            <button type="button" className="panel btn btn-secondary border border-white" onClick={() => navigate('/LoggedIn', {state: {data}})}>Back to Menu</button>
            <button type="button" onClick={(e) => getUsers(e)} className="panel btn btn-secondary border border-white">Refresh List</button>
            </div>
                    {Object.keys(users).map(u =>(
                    <div onClick={() => setTarget(users[u])}>
                        <ChatPanel targetUser={users[u]} currentUser = {currentUser}/>
                    </div>
            ))}
                
                </div>
                
                    <div className="Chat col-9">
                    { currentChat?  <>
                        <div className="ChatWindow overflow-auto">
                        { !loading ? <>
                        {(messages.data).map(m => (
                            
                            <ChatMessage message={m} own={m.sender === currentUser._id}/>
                        ))}
                    </>: <div> <p>Loading... </p></div> }
                        </div>
                    {/* <div className="ChatNav">
                        <button className="btn btn-light border border-dark">General Chat</button>
                        <button className="btn btn-light border border-dark">Whipser Chat</button>
                    </div> */}
                    <form className="ChatBox" onSubmit={(e) => sendMessage(e)}>
                        <input type="text" id="thebutton" name="message" className="form-control" onChange={(e) => handleChange(e)} value={formValue.message} placeholder="Enter Message..."></input>
                        <button type="submit" className="btn btn-secondary"><i className="bi bi-send"></i></button> 
                    </form>
                    </>: <span className="noConversation"> Refresh List and open a conversation to start chat</span> }
                </div>
                
            </div>
        </div>
    );
}

export default MainChat;