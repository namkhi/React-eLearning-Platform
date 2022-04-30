import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useLocation} from 'react-router';

function ModifyAccount () {
    const navigate = useNavigate();
    const {state} = useLocation();
    const data = state.data;

    const[formValue, setData] = useState({
        password: "",
        newPassword: "",
        confirmPassword: "",
        modify: ""
    })

    function handleChange(e){
        const newdata = {...formValue}
        newdata[e.target.name] = e.target.value
        setData(newdata)
    }

    function handleSubmit(e) {
        e.preventDefault();
        const passwordChange = {
            oldPassword: formValue.password,
            newPassword: formValue.newPassword,
            confirmPassword: formValue.confirmPassword,
            modify: "Modify"
        }

        axios.post('/profileMod', passwordChange).then(response => {
            navigate('/LoggedIn', {state: {data}})
        }).catch(response => {
            window.alert("Problem Occured during Modification")
        })
    }

    return (
        <div>
            <button onClick={() => navigate('/LoggedIn', {state: {data}})}>Return to Home</button>
            <form onSubmit={(e)=> handleSubmit(e)}>
                <div>
                    <label> Password: </label>
                    <input 
                        type="password" 
                        name="password" 
                        value={formValue.password} 
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label> New Password: </label>
                    <input 
                        type="password" 
                        name="newPassword" 
                        value={formValue.newPassword} 
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div>
                    <label> Confirm Password: </label>
                    <input 
                        type="password" 
                        name="confirmPassword" 
                        value={formValue.confirmPassword} 
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <button type="submit"> Modify </button>
            </form>
        </div>
    );
}

export default ModifyAccount;